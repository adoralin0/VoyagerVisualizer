import { renderChrome, el, field, specimenOptions } from "./shell.js";
import {
  specimens,
  getSpecimen,
  viewableSpecimens,
  boneSpecimen,
  citation,
  growthStages
} from "./specimens.js";
import {
  NORMA,
  BONES,
  LANDMARKS,
  viewerFrame,
  setOrbit,
  readOrbit,
  rememberPose,
  restorePose,
  projectionMode,
  toggleProjection,
  setProjection,
  materialEntries,
  recolorMaterial,
  restoreMaterials,
  separateMeshMaterials,
  setMaterialGhost,
  setMaterialVisibility,
  partOfNode,
  meshWorldCenter,
  meshWorldBox,
  projectOntoFrame,
  findThreeScene,
  orthoWorldHeight,
  loadSpecimen,
  applyModelOrientation,
  onReady,
  modelRadius,
  copyLockedOrbit,
  setTapeMeasure,
  tapeStatus,
  tapeTool
} from "./voyager.js";

/** Sample pin notes for the Pins and articles page. Not digitized coordinates from SkeletalGrowthDB. */
const PIN_ARTICLES = [
  {
    id: "nasion",
    name: "Nasion",
    color: "#8c3a2b",
    pitch: 0,
    yaw: 0,
    definition: "Midline point where the frontonasal suture meets the internasal suture.",
    article: "Nasion is the usual zero for facial height. In a teaching scene the pin sits on the midline at the root of the nose, and the short article beside the viewer can hold the definition, the measurement that uses it, and a note about how the point was placed on this mesh."
  },
  {
    id: "glabella",
    name: "Glabella",
    color: "#23483f",
    pitch: 0,
    yaw: 0,
    definition: "Most anterior midline point of the frontal, between the superciliary arches.",
    article: "Glabella is the forward peak of the forehead between the brows. A Voyager pin would open this note without leaving the model. The text here is sample article copy so the department can judge length and layout before real research notes are authored."
  },
  {
    id: "bregma",
    name: "Bregma",
    color: "#3d5d86",
    pitch: -90,
    yaw: 0,
    definition: "Intersection of the coronal and sagittal sutures on the cranial vault.",
    article: "Bregma marks the meeting of the coronal and sagittal sutures on the vault. The dorsal camera preset brings that region into view. This article is simulated: SkeletalGrowthDB does not publish landmark coordinates for these skulls, so the pin is placed from the vault mesh bounds for the demo only."
  },
  {
    id: "lambda",
    name: "Lambda",
    color: "#6a7032",
    pitch: 0,
    yaw: 180,
    definition: "Intersection of the sagittal and lambdoid sutures.",
    article: "Lambda sits at the back of the vault where the sagittal and lambdoid sutures meet. Opening the pin turns the skull to the occipital view and keeps the longer note in the side panel, which is the same pattern a full Voyager document would use for a scrollable article."
  }
];

const renders = {
  metadata: renderMetadata,
  norma: renderNorma,
  landmarks: renderLandmarks,
  indices: renderIndices,
  bones: renderBones,
  scale: renderScale,
  growth: renderGrowth,
  compare: renderCompare,
  study: renderStudy,
  collection: renderCollection,
  ortho: renderOrtho,
  shortcuts: renderShortcuts,
  presets: renderPresets,
  autoload: renderAutoload,
  backgrounds: renderBackgrounds,
  annotations: renderAnnotations,
  ghost: renderGhost
};

export function renderExample(root, example, context) {
  root.innerHTML = renderChrome(example);
  const workspace = root.querySelector("#workspace");
  renders[example.id](workspace, context);
  workspace.append(snippet(example));
}

function snippet(example) {
  return el(`<details class="snippet"><summary>The call this page makes</summary><pre>${escapeHtml(example.snippet)}</pre></details>`);
}

function escapeHtml(value) {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

function note(text) {
  return el(`<p class="note">${text}</p>`);
}

function mountViewer(parent, specimen, options) {
  const frame = viewerFrame(specimen, options);
  parent.append(frame);
  return frame;
}

function picker(items, selectedId, label = "Specimen") {
  return el(`<label class="picker">${label} <select>${specimenOptions(items, selectedId)}</select></label>`);
}

function scaleChoices(mmPerPx) {
  const options = [5, 10, 20, 50, 100, 200];
  for (const mm of options) {
    const px = mm / mmPerPx;
    if (px >= 64 && px <= 180) return { mm, px };
  }
  const mm = 50;
  return { mm, px: Math.max(40, Math.min(200, mm / mmPerPx)) };
}

function attachScaleBar(frame) {
  const bar = el(`<div class="scalebar is-idle"><i></i><span>Scale bar in orthographic view</span></div>`);
  frame.append(bar);
  const tick = () => {
    if (!frame.isConnected) return;
    const explorer = frame.querySelector("voyager-explorer");
    const worldHeight = explorer ? orthoWorldHeight(explorer) : null;
    const line = bar.querySelector("i");
    const label = bar.querySelector("span");
    if (!worldHeight || !frame.clientHeight) {
      bar.classList.add("is-idle");
      line.style.width = "0px";
      label.textContent = "Scale bar in orthographic view";
    } else {
      const chosen = scaleChoices(worldHeight / frame.clientHeight);
      bar.classList.remove("is-idle");
      line.style.width = `${Math.round(chosen.px)}px`;
      label.textContent = `${chosen.mm} mm`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  return bar;
}

function requireExplorer(frame) {
  const explorer = frame.querySelector("voyager-explorer");
  if (!explorer) throw new Error("This specimen has no mesh.");
  return explorer;
}

function renderMetadata(workspace, { specimen }) {
  workspace.append(note("These cards use the Skeletal Growth Database. Sex, locality, and scanner settings stay blank where that record does not publish them. Download opens the department .glb."));
  const bar = el(`<div class="toolbar"></div>`);
  const select = picker(specimens, specimen.id);
  bar.append(select);
  const grid = el(`<div class="split"></div>`);
  const card = el(`<aside class="specimen-card"></aside>`);
  const stage = el(`<div></div>`);
  grid.append(card, stage);
  workspace.append(bar, grid);

  const paint = (current) => {
    card.innerHTML = metadataMarkup(current);
    stage.replaceChildren(viewerFrame(current));
    bindCitation(card, current);
  };
  paint(specimen);
  select.querySelector("select").addEventListener("change", (event) => {
    paint(getSpecimen(event.target.value));
  });
}

function metadataMarkup(specimen) {
  const cite = citation(specimen);
  const download = specimen.glbUrl
    ? `<a class="button" href="${specimen.glbUrl}">Download .glb</a>`
    : `<button type="button" disabled>Mesh download not connected</button>`;
  return `
    <p class="eyebrow">${specimen.family}</p>
    <h2>${specimen.scientific}</h2>
    <p class="common">${specimen.common}</p>
    <p class="catalog-id mono">${specimen.catalog}</p>
    <div class="badges">${specimen.badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}</div>
    <dl class="fields">
      ${field("Suborder", specimen.suborder)}
      ${field("Infraorder", specimen.infraorder)}
      ${field("Sex", specimen.sex)}
      ${field("Age stage", specimen.age)}
      ${field("Provenance", specimen.provenance)}
      ${field("Place", specimen.place)}
      ${field("Collected", specimen.collected)}
      ${field("Collector", specimen.collector)}
      ${field("Modality", specimen.modality)}
      ${field("Resolution", specimen.resolution)}
      ${field("Units", specimen.units)}
      ${field("Scanner", specimen.scanner)}
    </dl>
    <p class="note">${specimen.unitsNote}</p>
    <div class="cite-actions">
      <button type="button" data-copy="apa">Copy APA</button>
      <button type="button" data-copy="bibtex">Copy BibTeX</button>
      ${download}
      <button type="button" disabled>Osteometric CSV not published</button>
    </div>
    <pre class="cite" data-cite="apa">${escapeHtml(cite.apa)}</pre>
    <pre class="cite" data-cite="bibtex" hidden>${escapeHtml(cite.bibtex)}</pre>`;
}

function bindCitation(card, specimen) {
  const cite = citation(specimen);
  card.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const key = button.dataset.copy;
      const block = card.querySelector(`[data-cite="${key}"]`);
      card.querySelectorAll("[data-cite]").forEach((node) => {
        node.hidden = node.dataset.cite !== key;
      });
      try {
        await navigator.clipboard.writeText(cite[key]);
        const original = button.textContent;
        button.textContent = "Copied";
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch {
        button.textContent = "Select the citation below";
      }
    });
  });
}

function renderNorma(workspace, { specimen }) {
  workspace.append(note("These six buttons match Voyager's built-in view presets. A UF mesh should be authored so anatomical anterior is the front preset, or given a per-specimen yaw offset."));
  const { bar, frameSlot } = singleStage(workspace, specimen);
  const ortho = el(`<button type="button" aria-pressed="false">Orthographic</button>`);
  const readout = el(`<span class="status"></span>`);
  NORMA.forEach((view) => {
    const button = el(`<button type="button">${view.latin}<br>${view.plain}</button>`);
    button.addEventListener("click", () => {
      const explorer = requireExplorer(frameSlot());
      setOrbit(explorer, view.pitch, view.yaw);
      bar.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", node === button ? "true" : "false"));
      const pose = readOrbit(explorer);
      readout.textContent = pose ? `${view.plain} · pitch ${Math.round(pose.pitch)}° · yaw ${Math.round(pose.yaw)}°` : view.plain;
    });
    bar.append(button);
  });
  bar.append(ortho, readout);
  ortho.addEventListener("click", () => {
    const result = toggleProjection(requireExplorer(frameSlot()));
    ortho.setAttribute("aria-pressed", String(result.mode === "orthographic"));
    ortho.textContent = result.mode === "orthographic" ? "Perspective" : "Orthographic";
  });
}

function singleStage(workspace, specimen, hooks = {}) {
  const prepare = hooks.prepareSpecimen || ((item) => item);
  const bar = el(`<div class="toolbar"></div>`);
  const selectWrap = picker(viewableSpecimens(), specimen.placeholder ? viewableSpecimens()[0].id : specimen.id);
  bar.append(selectWrap);
  const holder = el(`<div></div>`);
  workspace.append(bar, holder);
  let current = prepare(specimen.placeholder ? viewableSpecimens()[0] : specimen);
  let frame = mountViewer(holder, current);
  if (hooks.onLoaded) {
    const first = frame.querySelector("voyager-explorer");
    let settled = false;
    const attempt = () => {
      if (settled || frame.dataset.loaded !== "true") return;
      if (hooks.onLoaded(first) === false) return;
      settled = true;
      first.removeEventListener("scene-load", attempt);
      first.removeEventListener("model-load", attempt);
    };
    first?.addEventListener("scene-load", attempt);
    first?.addEventListener("model-load", attempt);
    if (frame.dataset.loaded === "true") attempt();
  }
  selectWrap.querySelector("select").addEventListener("change", (event) => {
    const next = prepare(getSpecimen(event.target.value));
    const explorer = frame.querySelector("voyager-explorer");
    const pose = explorer ? rememberPose(explorer) : null;
    if (hooks.remount) {
      const nextFrame = viewerFrame(next);
      frame.replaceWith(nextFrame);
      frame = nextFrame;
      const loadedExplorer = nextFrame.querySelector("voyager-explorer");
      let settled = false;
      const attempt = () => {
        if (settled || nextFrame.dataset.loaded !== "true") return;
        if (pose) restorePose(loadedExplorer, pose);
        if (hooks.onLoaded?.(loadedExplorer) === false) return;
        settled = true;
        loadedExplorer.removeEventListener("scene-load", attempt);
        loadedExplorer.removeEventListener("model-load", attempt);
      };
      loadedExplorer.addEventListener("scene-load", attempt);
      loadedExplorer.addEventListener("model-load", attempt);
      current = next;
      return;
    }
    const hint = el(`<p class="viewer-hint">Loading ${next.catalog}…</p>`);
    frame.append(hint);
    loadSpecimen(explorer, next, pose);
    const onReady = () => {
      hint.remove();
      if (hooks.onLoaded?.(explorer)) {
        explorer.removeEventListener("scene-load", onReady);
        explorer.removeEventListener("model-load", onReady);
      }
    };
    explorer.addEventListener("scene-load", onReady);
    explorer.addEventListener("model-load", onReady);
    current = next;
  });
  return {
    bar,
    frameSlot: () => frame,
    get specimen() { return current; }
  };
}

function renderLandmarks(workspace, { specimen }) {
  workspace.append(note("Coordinates stay blank. The database does not include digitized landmark points. Choosing a name still turns the skull to the norma where that point is usually read."));
  const grid = el(`<div class="split"></div>`);
  const panel = el(`<div class="panel"></div>`);
  const stage = el(`<div></div>`);
  grid.append(panel, stage);
  workspace.append(grid);
  const frame = mountViewer(stage, specimen.placeholder ? viewableSpecimens()[0] : specimen);
  const list = el(`<div class="list-buttons"></div>`);
  const copy = el(`<p class="definition">Choose a landmark.</p>`);
  const coords = el(`<p class="mono status">x, y, z — not digitized</p>`);
  const scenePins = el(`<div class="stack"></div>`);
  panel.append(el(`<h3>Craniometric landmarks</h3>`), list, copy, coords, scenePins);

  LANDMARKS.forEach((landmark) => {
    const button = el(`<button type="button">${landmark.name}</button>`);
    button.addEventListener("click", () => {
      const explorer = requireExplorer(frame);
      setOrbit(explorer, landmark.pitch, landmark.yaw);
      copy.textContent = landmark.definition;
      coords.textContent = `${landmark.name} · x, y, z — not digitized on this mesh`;
      list.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", node === button ? "true" : "false"));
    });
    list.append(button);
  });

  onReady(requireExplorer(frame), () => {
    const explorer = requireExplorer(frame);
    const pins = explorer.getAnnotations?.() || [];
    if (!pins.length) {
      scenePins.append(note("This scene file has no Voyager annotation pins. Landmark rows above are the page's own list."));
      return;
    }
    const block = el(`<div class="list-buttons"></div>`);
    scenePins.append(el(`<h3>Pins in this scene</h3>`), block);
    pins.forEach((pin) => {
      const id = pin.id || pin.data?.id;
      const title = pin.title || pin.data?.title || id || "Pin";
      const button = el(`<button type="button">${title}</button>`);
      button.addEventListener("click", () => {
        if (id) explorer.setActiveAnnotation(id);
      });
      block.append(button);
    });
  });
}

function renderIndices(workspace, { specimen }) {
  workspace.append(note("The formulas are standard. The numbers are not measurements of the skull on screen. Turn on the filled preview only to judge the table layout, then keep the empty cells for real CSV values."));
  const { bar, frameSlot } = singleStage(workspace, specimen);
  const measure = el(`<button type="button" aria-pressed="false">Tape measure</button>`);
  const sample = el(`<button type="button" aria-pressed="false">Preview filled table</button>`);
  const measureStatus = el(`<span class="status"></span>`);
  bar.append(measure, sample, measureStatus);
  const paintMeasure = () => {
    const explorer = frameSlot().querySelector("voyager-explorer");
    measureStatus.textContent = tapeStatus(explorer ? tapeTool(explorer) : null);
  };
  const watchMeasure = () => {
    const explorer = frameSlot().querySelector("voyager-explorer");
    const tape = explorer ? tapeTool(explorer) : null;
    paintMeasure();
    if (!tape || tape.__pageWatch) return;
    const onUpdate = () => paintMeasure();
    tape.on("update", onUpdate);
    tape.__pageWatch = onUpdate;
  };
  const explorer = frameSlot().querySelector("voyager-explorer");
  if (explorer) {
    explorer.addEventListener("scene-load", watchMeasure);
    explorer.addEventListener("model-load", watchMeasure);
    onReady(explorer, watchMeasure);
  }
  const table = el(`
    <table class="indices">
      <thead><tr><th>Index</th><th>Definition</th><th>Value</th></tr></thead>
      <tbody>
        <tr data-sample="78.4"><td>Cranial index</td><td>Maximum cranial breadth × 100 / maximum cranial length (eu–eu / g–op)</td><td class="value">—</td></tr>
        <tr data-sample="91.2"><td>Orbital index</td><td>Orbital height × 100 / orbital breadth</td><td class="value">—</td></tr>
        <tr data-sample="11.6 mm"><td>Interorbital breadth</td><td>Breadth between the orbits, using the lab's chosen points (mf–mf or d–d)</td><td class="value">—</td></tr>
      </tbody>
    </table>`);
  workspace.append(table);
  measure.addEventListener("click", () => {
    const explorer = requireExplorer(frameSlot());
    const pressed = measure.getAttribute("aria-pressed") !== "true";
    const result = setTapeMeasure(explorer, pressed);
    measure.setAttribute("aria-pressed", String(result.ok && pressed));
    paintMeasure();
  });
  sample.addEventListener("click", () => {
    const pressed = sample.getAttribute("aria-pressed") !== "true";
    sample.setAttribute("aria-pressed", String(pressed));
    table.classList.toggle("is-sample", pressed);
    table.querySelectorAll("tbody tr").forEach((row) => {
      row.querySelector(".value").textContent = pressed ? `${row.dataset.sample} sample` : "—";
    });
  });
}

function renderBones(workspace, { specimen }) {
  const params = new URLSearchParams(location.search);
  const requested = params.get("specimen") ? specimen : getSpecimen("aotus107");
  const source = boneSpecimen(requested);
  workspace.append(note(source.colors || specimen.colors
    ? "This skull has a segmented Colors model. The checklist uses the part names from that JSON. Color and dim follow those mesh names."
    : "This record's Taxon model is split into calotte, cranial base, mandible, and teeth. Per-bone names exist on the juvenile and newborn night monkey Colors models."));
  const grid = el(`<div class="split"></div>`);
  const panel = el(`<div class="panel"></div>`);
  const stage = el(`<div></div>`);
  grid.append(panel, stage);
  workspace.append(grid);
  const frame = mountViewer(stage, source);
  const checks = el(`<div class="check-list"></div>`);
  const parts = source.parts || [];
  parts.forEach((part) => {
    checks.append(el(`<label><input type="checkbox" value="${part.name}"> <span style="color:${part.color}">●</span> ${part.display}</label>`));
  });
  const hide = el(`<label class="check-list"><input type="checkbox"> Hide mandible</label>`);
  const mode = el(`
    <div class="chips" role="group" aria-label="Isolation mode">
      <button type="button" data-mode="color" aria-pressed="true">False color</button>
      <button type="button" data-mode="dim" aria-pressed="false">Dim surroundings</button>
    </div>`);
  const status = el(`<p class="status">Waiting for the scene.</p>`);
  panel.append(el(`<h3>${source.modelName}</h3>`), checks, hide, mode, status);

  let isolation = "color";

  const apply = () => {
    const explorer = frame.querySelector("voyager-explorer");
    const selected = new Set([...checks.querySelectorAll("input:checked")].map((input) => input.value));
    if (!explorer || frame.dataset.loaded !== "true") return;
    separateMeshMaterials(explorer);
    restoreMaterials(explorer);
    const entries = materialEntries(explorer);
    const seen = new Set();
    entries.forEach((entry) => {
      const part = partOfNode(entry.node, parts);
      const nodeName = `${entry.node.name || ""} ${part?.name || ""}`;
      if (hide.querySelector("input").checked && /mandible/i.test(nodeName)) {
        setMaterialVisibility([entry], false);
        return;
      }
      if (part && selected.has(part.name)) {
        recolorMaterial([entry], part.color);
        seen.add(part.name);
        return;
      }
      if (isolation === "dim" && selected.size) setMaterialGhost([entry], true);
    });
    const nodeNames = [...new Set(entries.map((entry) => entry.node.name).filter(Boolean))];
    status.textContent = nodeNames.length
      ? `Meshes: ${nodeNames.slice(0, 12).join(", ")}${nodeNames.length > 12 ? "…" : ""}. ${seen.size ? `${seen.size} selected part${seen.size === 1 ? "" : "s"} recolored.` : "Select a part whose mesh name matches the database."}`
      : "The scene has not exposed named meshes yet.";
  };

  checks.addEventListener("change", apply);
  hide.addEventListener("change", apply);
  mode.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    isolation = button.dataset.mode;
    mode.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
    apply();
  });
  onReady(requireExplorer(frame), apply);
}

function renderScale(workspace, { specimen }) {
  workspace.append(note("Turn orthographic on, then zoom. The bar picks 10 mm, 50 mm, or another round length so it stays readable. Perspective has no single scale, so the label waits."));
  const { bar, frameSlot } = singleStage(workspace, specimen);
  const ortho = el(`<button type="button" aria-pressed="false">Orthographic</button>`);
  bar.append(ortho);
  attachScaleBar(frameSlot());
  ortho.addEventListener("click", () => {
    const result = toggleProjection(requireExplorer(frameSlot()));
    const on = result.mode === "orthographic";
    ortho.setAttribute("aria-pressed", String(on));
    ortho.textContent = on ? "Perspective" : "Orthographic";
  });
}

function renderGrowth(workspace) {
  workspace.append(note("Newborn is Aotus108, juvenile is Aotus107, and adult is DWA-Aotus1. All three are Aotus nancymaae in SkeletalGrowthDB. The orbit carries across a swap."));
  const stages = el(`<div class="stages" role="tablist"></div>`);
  const holder = el(`<div></div>`);
  workspace.append(stages, holder);
  let pose = null;
  let frame = null;

  const show = (stage, button) => {
    if (frame?.querySelector("voyager-explorer")) {
      pose = rememberPose(frame.querySelector("voyager-explorer")) || pose;
    }
    stages.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
    const specimen = stage.specimenId ? getSpecimen(stage.specimenId) : null;
    if (!specimen) {
      frame = null;
      holder.innerHTML = `<div class="viewer-frame"><div class="viewer-empty"><p class="eyebrow">${stage.label}</p><p>No ${stage.label.toLowerCase()} Aotus scan is in SkeletalGrowthDB.</p></div></div>`;
      return;
    }
    frame = viewerFrame(specimen);
    holder.replaceChildren(frame);
    onReady(frame.explorer, () => restorePose(frame.explorer, pose));
  };

  growthStages.forEach((stage, index) => {
    const button = el(`<button type="button" aria-pressed="${index === 1}">${stage.label}</button>`);
    button.addEventListener("click", () => show(stage, button));
    stages.append(button);
    if (index === 1) show(stage, button);
  });
}

function renderCompare(workspace) {
  workspace.append(note("Cameras start locked. Drag either skull and the other turns to the same angle. Each skull keeps a camera distance that fits its own size."));
  const viewable = viewableSpecimens();
  const bar = el(`<div class="toolbar"></div>`);
  const leftPick = picker(viewable, "dwa-aotus1", "Left");
  const rightPick = picker(viewable, "aotus107", "Right");
  const lock = el(`<button type="button" aria-pressed="true">Lock cameras</button>`);
  bar.append(leftPick, rightPick, lock);
  const grid = el(`<div class="compare-grid"></div>`);
  workspace.append(bar, grid);

  const make = (specimen) => {
    const frame = viewerFrame(specimen);
    grid.append(frame);
    return frame;
  };
  let left = make(getSpecimen("dwa-aotus1"));
  let right = make(getSpecimen("aotus107"));
  let lastLeft = "";
  let lastRight = "";
  let hold = 0;

  const poseKey = (pose) => {
    if (!pose) return "";
    const offset = pose.offset ? pose.offset.map((value) => Math.round(value)).join(",") : "";
    return `${Math.round(pose.pitch)}:${Math.round(pose.yaw)}:${offset}`;
  };
  const explorerIn = (frame) => frame.querySelector("voyager-explorer");
  const locked = () => lock.getAttribute("aria-pressed") === "true";

  const faceFront = (explorer) => {
    if (!explorer || explorer.dataset.faced === "true" || !modelRadius(explorer)) return;
    try {
      setOrbit(explorer, 0, 0);
      explorer.dataset.faced = "true";
    } catch {
      /* The viewer is still starting. */
    }
  };

  function swap(which, id) {
    const specimen = getSpecimen(id);
    const frame = which === "left" ? left : right;
    const other = which === "left" ? right : left;
    const explorer = explorerIn(frame);
    delete explorer.dataset.faced;
    const hint = el(`<p class="viewer-hint">Loading ${specimen.catalog}…</p>`);
    frame.append(hint);
    loadSpecimen(explorer, specimen, locked() ? null : rememberPose(explorer));
    explorer.addEventListener("scene-load", () => {
      hint.remove();
      const source = explorerIn(other);
      if (locked() && source) copyLockedOrbit(source, explorer);
      else faceFront(explorer);
      hold = 3;
    }, { once: true });
  }
  leftPick.querySelector("select").addEventListener("change", (event) => swap("left", event.target.value));
  rightPick.querySelector("select").addEventListener("change", (event) => swap("right", event.target.value));
  lock.addEventListener("click", () => {
    const pressed = lock.getAttribute("aria-pressed") !== "true";
    lock.setAttribute("aria-pressed", String(pressed));
    if (pressed) {
      copyLockedOrbit(explorerIn(left), explorerIn(right));
      hold = 3;
    }
  });

  const tick = () => {
    if (!grid.isConnected) return;
    requestAnimationFrame(tick);
    const leftExplorer = explorerIn(left);
    const rightExplorer = explorerIn(right);
    faceFront(leftExplorer);
    faceFront(rightExplorer);
    const leftKey = poseKey(readOrbit(leftExplorer));
    const rightKey = poseKey(readOrbit(rightExplorer));
    if (hold > 0) {
      hold -= 1;
      lastLeft = leftKey;
      lastRight = rightKey;
      return;
    }
    if (locked() && leftKey && rightKey) {
      const leftChanged = lastLeft && leftKey !== lastLeft;
      const rightChanged = lastRight && rightKey !== lastRight;
      if (leftChanged && !rightChanged) {
        copyLockedOrbit(leftExplorer, rightExplorer);
        hold = 2;
        return;
      }
      if (rightChanged && !leftChanged) {
        copyLockedOrbit(rightExplorer, leftExplorer);
        hold = 2;
        return;
      }
    }
    lastLeft = leftKey;
    lastRight = rightKey;
  };
  requestAnimationFrame(tick);
}

function canonicalBone(nodeName) {
  return String(nodeName || "")
    .replace(/_forColors|_forTaxon/gi, "")
    .replace(/^(left|right|l|r)[\s_-]?/i, "")
    .toLowerCase();
}

function sideLabel(nodeName, boneName) {
  if (/^(L|Left)/.test(nodeName)) return `Left ${boneName.toLowerCase()}`;
  if (/^(R|Right)/.test(nodeName)) return `Right ${boneName.toLowerCase()}`;
  return boneName;
}

function renderStudy(workspace, { specimen }) {
  const params = new URLSearchParams(location.search);
  const requested = params.get("specimen") ? specimen : getSpecimen("aotus107");
  const source = boneSpecimen(requested);
  const segmented = Boolean(requested.colors);
  workspace.append(note(segmented
    ? "Click a bone name to color that mesh and pin the name on it. A paired bone gets a left pin and a right pin. Hide labels clears the pins and this list. Landmark names stay in the list because SkeletalGrowthDB does not publish their coordinates."
    : "This Taxon model is not split into separate cranial bones. The juvenile and newborn night monkey Colors models are the ones with a mesh per bone."));
  const bar = el(`<div class="toolbar"></div>`);
  const toggle = el(`<button type="button" aria-pressed="false">Hide labels</button>`);
  bar.append(toggle);
  const grid = el(`<div class="split study-board"></div>`);
  const panel = el(`<div class="panel"></div>`);
  const stage = el(`<div></div>`);
  const status = el(`<p class="js-label status">Click a bone name to pin it on the skull.</p>`);
  panel.innerHTML = `
    <h3 class="js-label">Bones</h3>
    <ul class="js-label bone-picks">${BONES.map((bone) => `<li><button type="button" data-bone="${bone.id}" aria-pressed="false"><i style="background:${bone.color}"></i>${bone.name}</button></li>`).join("")}</ul>
    <h3 class="js-label">Landmarks</h3>
    <ul class="js-label">${LANDMARKS.map((landmark) => `<li>${landmark.name}</li>`).join("")}</ul>`;
  panel.append(status);
  grid.append(panel, stage);
  workspace.append(bar, grid);
  const frame = mountViewer(stage, source);
  const selected = new Set();
  const tags = new Map();

  const positionTags = () => {
    const explorer = frame.querySelector("voyager-explorer");
    if (!explorer) return;
    tags.forEach((tag) => {
      const point = meshWorldCenter(tag.__node);
      const spot = point && projectOntoFrame(explorer, frame, point);
      if (grid.classList.contains("study-mode") || !spot || spot.behind) {
        tag.hidden = true;
        return;
      }
      tag.hidden = false;
      tag.style.left = `${spot.x}px`;
      tag.style.top = `${spot.y}px`;
    });
  };

  const syncTags = () => {
    const explorer = frame.querySelector("voyager-explorer");
    if (!explorer || frame.dataset.loaded !== "true") {
      status.textContent = "Waiting for the segmented skull.";
      return;
    }
    separateMeshMaterials(explorer);
    restoreMaterials(explorer);
    const entries = materialEntries(explorer);
    const wanted = new Set();
    const missing = [];
    let pinned = 0;
    BONES.forEach((bone) => {
      if (!selected.has(bone.id)) return;
      const matches = entries.filter((entry) => canonicalBone(entry.node.name) === bone.name.toLowerCase());
      if (!matches.length) {
        missing.push(bone.name);
        return;
      }
      recolorMaterial(matches, bone.color);
      matches.forEach((entry) => {
        const key = entry.node.uuid;
        wanted.add(key);
        let tag = tags.get(key);
        if (!tag) {
          tag = document.createElement("span");
          tag.className = "bone-tag js-label";
          frame.append(tag);
          tags.set(key, tag);
        }
        tag.textContent = sideLabel(entry.node.name, bone.name);
        tag.style.setProperty("--tag", bone.color);
        tag.__node = entry.node;
        pinned += 1;
      });
    });
    tags.forEach((tag, key) => {
      if (wanted.has(key)) return;
      tag.remove();
      tags.delete(key);
    });
    const missingText = missing.length
      ? `${missing.join(", ")} ${missing.length === 1 ? "is" : "are"} not ${missing.length === 1 ? "a separate mesh" : "separate meshes"} in this file.`
      : "";
    if (!selected.size) status.textContent = "Click a bone name to pin it on the skull.";
    else if (!pinned) status.textContent = missingText;
    else status.textContent = missingText
      ? `${pinned} pin${pinned === 1 ? "" : "s"} on the skull. ${missingText}`
      : `${pinned} pin${pinned === 1 ? "" : "s"} on the skull.`;
    positionTags();
  };

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-bone]");
    if (!button) return;
    const id = button.dataset.bone;
    const on = !selected.has(id);
    if (on) selected.add(id);
    else selected.delete(id);
    button.setAttribute("aria-pressed", String(on));
    syncTags();
  });
  toggle.addEventListener("click", () => {
    const hidden = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(hidden));
    toggle.textContent = hidden ? "Show labels" : "Hide labels";
    grid.classList.toggle("study-mode", hidden);
    const explorer = frame.querySelector("voyager-explorer");
    if (!explorer || frame.dataset.loaded !== "true") return;
    explorer.setAnnotationsEnabled(!hidden);
    if (hidden) {
      restoreMaterials(explorer);
      tags.forEach((tag) => { tag.hidden = true; });
      return;
    }
    syncTags();
  });
  onReady(frame.querySelector("voyager-explorer"), syncTags);
  const follow = () => {
    if (!frame.isConnected) return;
    positionTags();
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);
}

function renderCollection(workspace) {
  workspace.append(note("Taxon view groups the Skeletal Growth Database by family. Trait view filters across those skulls. Enlarged orbits finds the night monkeys. Segmented bones finds the Colors models."));
  const bar = el(`<div class="toolbar"></div>`);
  const taxon = el(`<button type="button" aria-pressed="true">By taxon</button>`);
  const trait = el(`<button type="button" aria-pressed="false">By trait</button>`);
  bar.append(taxon, trait);
  const chips = el(`<div class="chips" hidden></div>`);
  const board = el(`<div></div>`);
  workspace.append(bar, chips, board);
  const traits = ["Adult", "Juvenile", "Newborn", "Infant", "Platyrrhine", "Strepsirrhine", "Enlarged orbits", "Segmented bones", "Teeth model"];
  const selected = new Set();
  traits.forEach((label) => {
    const button = el(`<button type="button" aria-pressed="false">${label}</button>`);
    button.addEventListener("click", () => {
      const on = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(on));
      if (on) selected.add(label);
      else selected.delete(label);
      paint();
    });
    chips.append(button);
  });

  let mode = "taxon";
  taxon.addEventListener("click", () => { mode = "taxon"; syncMode(); paint(); });
  trait.addEventListener("click", () => { mode = "trait"; syncMode(); paint(); });

  function syncMode() {
    taxon.setAttribute("aria-pressed", String(mode === "taxon"));
    trait.setAttribute("aria-pressed", String(mode === "trait"));
    chips.hidden = mode !== "trait";
  }

  function card(specimen) {
    const genus = specimen.scientific.split(" ")[0];
    const age = specimen.age === "Juvenile" ? "Juvenile" : specimen.age;
    return `
      <a class="specimen-link" href="example.html?id=metadata&specimen=${specimen.id}">
        <div class="plate"><strong>${genus}</strong><small>Plate · still to render</small></div>
        <div class="pad">
          <h3><em>${specimen.scientific}</em></h3>
          <p>${specimen.common}</p>
          <p class="mono">${specimen.catalog}</p>
          <p>${age}</p>
          <div class="badges">${specimen.badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}</div>
        </div>
      </a>`;
  }

  function matches(specimen, label) {
    const values = [specimen.sex, specimen.age, specimen.provenance, specimen.infraorder, ...(specimen.traits || []), ...(specimen.badges || [])];
    if (label === "Platyrrhine" || label === "Strepsirrhine") {
      const byGroup = label === "Platyrrhine"
        ? specimen.infraorder === "Platyrrhini"
        : specimen.suborder === "Strepsirrhini";
      return byGroup || (specimen.traits || []).includes(label);
    }
    return values.includes(label);
  }

  function paint() {
    if (mode === "taxon") {
      const families = [...new Set(specimens.map((item) => item.family))];
      board.innerHTML = families.map((family) => `
        <section class="collection-block">
          <h2>${family}</h2>
          <div class="specimen-grid">${specimens.filter((item) => item.family === family).map(card).join("")}</div>
        </section>`).join("");
      return;
    }
    const list = specimens.filter((item) => [...selected].every((label) => matches(item, label)));
    board.innerHTML = list.length
      ? `<div class="specimen-grid">${list.map(card).join("")}</div>`
      : `<p class="note">No specimen carries every selected tag.</p>`;
  }
  paint();
}

function renderOrtho(workspace, { specimen }) {
  workspace.append(note("Visitors can already flip this inside Voyager: Tools, View, Orthographic. This button does that from the page and sets the orthographic height from the current camera distance so the skull does not jump."));
  const { bar, frameSlot } = singleStage(workspace, specimen);
  const button = el(`<button type="button" aria-pressed="false">Orthographic</button>`);
  const status = el(`<span class="status"></span>`);
  bar.append(button, status);
  button.addEventListener("click", () => {
    const result = toggleProjection(requireExplorer(frameSlot()));
    const on = result.mode === "orthographic";
    button.setAttribute("aria-pressed", String(on));
    button.textContent = on ? "Perspective" : "Orthographic";
    status.textContent = result.ok ? `Projection: ${result.mode}` : "Navigation component was not found.";
  });
}

function renderShortcuts(workspace, { specimen }) {
  workspace.append(note("O projection, M measure, R reset, 1 through 6 for the norma views. The listener ignores keystrokes while a field is focused."));
  const keys = el(`<div class="keys"></div>`);
  const labels = [["O", "projection"], ["M", "measure"], ["R", "reset"], ["1–6", "norma"]];
  labels.forEach(([key, meaning]) => {
    keys.append(el(`<kbd data-key="${key.slice(0, 1)}">${key}</kbd>`));
    keys.append(el(`<span>${meaning}</span>`));
  });
  workspace.append(keys);
  const { bar, frameSlot } = singleStage(workspace, specimen);
  const status = el(`<span class="status"></span>`);
  bar.append(status);

  const flash = (id) => {
    const key = keys.querySelector(`kbd[data-key="${id}"]`);
    if (!key) return;
    key.classList.add("is-down");
    setTimeout(() => key.classList.remove("is-down"), 160);
  };

  window.addEventListener("keydown", (event) => {
    if (!workspace.isConnected) return;
    if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
    const target = event.target;
    if (target instanceof HTMLElement && target.closest("input, textarea, select")) return;
    const explorer = frameSlot().querySelector("voyager-explorer");
    if (!explorer) return;
    const key = event.key.toLowerCase();
    if (key >= "1" && key <= "6") {
      const view = NORMA[Number(key) - 1];
      setOrbit(explorer, view.pitch, view.yaw);
      status.textContent = view.latin;
      flash(key);
      event.preventDefault();
      return;
    }
    if (key === "o") {
      const result = toggleProjection(explorer);
      status.textContent = result.mode;
      flash("O");
    } else if (key === "m") {
      const next = !tapeTool(explorer)?.ins.enabled.value;
      const result = setTapeMeasure(explorer, next);
      status.textContent = result.ok ? tapeStatus(result.tape) : "The skull is still loading.";
      flash("M");
    } else if (key === "r") {
      explorer.resetViewer();
      status.textContent = "Viewer reset";
      flash("R");
    } else {
      return;
    }
    event.preventDefault();
  });
}

function isVaultMesh(node) {
  let current = node;
  while (current && !current.isScene) {
    const name = String(current.name || "");
    if (/frontal|parietal|calotte/i.test(name)) return true;
    current = current.parent;
  }
  return false;
}

function renderPresets(workspace, { specimen }) {
  workspace.append(note("One flag holds the whole setup. Off calls resetViewer() and then puts back the dark solid background and the perspective camera. Ghost vault stays on when the specimen changes and fades that skull's frontal, parietals, or calotte."));
  const button = el(`<button type="button" aria-pressed="false">Research plate</button>`);
  const part = el(`<button type="button" aria-pressed="false">Ghost vault only</button>`);
  const status = el(`<span class="status"></span>`);
  let isPresetOn = false;
  let vaultGhosted = false;

  const applyPlate = (explorer) => {
    explorer.setBackgroundStyle("LinearGradient");
    explorer.setBackgroundColor("#24312e", "#101311");
    explorer.setAnnotationsEnabled(true);
    setOrbit(explorer, 0, 0);
    setProjection(explorer, "orthographic");
    status.textContent = "Plate on: gradient, anterior, orthographic.";
  };

  const applyVault = (explorer, ghosted) => {
    separateMeshMaterials(explorer);
    const entries = materialEntries(explorer).filter((entry) => isVaultMesh(entry.node));
    if (!entries.length) {
      vaultGhosted = false;
      part.setAttribute("aria-pressed", "false");
      status.textContent = "This model has no frontal, parietal, or calotte mesh to ghost.";
      return;
    }
    vaultGhosted = ghosted;
    part.setAttribute("aria-pressed", String(ghosted));
    setMaterialGhost(entries, ghosted);
    const names = [...new Set(entries.map((entry) => entry.node.name).filter(Boolean))];
    status.textContent = ghosted ? `Vault at 25% opacity: ${names.join(", ")}.` : "Vault restored.";
  };

  const { bar, frameSlot } = singleStage(workspace, specimen, {
    prepareSpecimen: boneSpecimen,
    remount: true,
    onLoaded: (explorer) => {
      const named = materialEntries(explorer).some((entry) => entry.node?.name);
      if (!named) return false;
      if (isPresetOn) applyPlate(explorer);
      if (vaultGhosted) applyVault(explorer, true);
      return true;
    }
  });
  bar.append(button, part, status);

  button.addEventListener("click", () => {
    const explorer = requireExplorer(frameSlot());
    isPresetOn = !isPresetOn;
    button.setAttribute("aria-pressed", String(isPresetOn));
    if (isPresetOn) {
      applyPlate(explorer);
      if (vaultGhosted) applyVault(explorer, true);
      return;
    }
    explorer.resetViewer();
    requestAnimationFrame(() => {
      applyModelOrientation(explorer, explorer.__specimen);
      setProjection(explorer, "perspective");
      explorer.setBackgroundStyle("Solid");
      explorer.setBackgroundColor("#1c1916");
      explorer.setAnnotationsEnabled(false);
      if (vaultGhosted) applyVault(explorer, true);
    });
    status.textContent = vaultGhosted ? status.textContent : "Plate off. Viewer reset.";
  });

  part.addEventListener("click", () => {
    const explorer = requireExplorer(frameSlot());
    if (frameSlot().dataset.loaded !== "true") {
      status.textContent = "Waiting for the skull.";
      return;
    }
    applyVault(explorer, !vaultGhosted);
  });
}

function renderAutoload(workspace, { specimen }) {
  workspace.append(note("As soon as the skull finishes loading, this page sets a dark gradient, turns annotation mode on, and aims the camera at the anterior preset. A bare department .glb has no pins or articles inside the file, so the count stays at zero."));
  const log = el(`<ol class="log"></ol>`);
  const holder = el(`<div></div>`);
  workspace.append(log, holder);
  const current = specimen.placeholder ? viewableSpecimens()[0] : specimen;
  const frame = mountViewer(holder, current, { bgStyle: "Solid", bgColor: "#1c1916" });
  const write = (message) => log.append(el(`<li>${message}</li>`));
  write("Waiting for the first load.");
  const explorer = requireExplorer(frame);
  let ran = false;
  const setup = () => {
    if (ran) return;
    ran = true;
    write("Load finished.");
    explorer.setBackgroundStyle("LinearGradient");
    explorer.setBackgroundColor("#24312e", "#121614");
    write("Background set to a linear gradient.");
    explorer.setAnnotationsEnabled(true);
    write(`Annotations enabled. Pins in the scene: ${(explorer.getAnnotations?.() || []).length}.`);
    setOrbit(explorer, 0, 0);
    write("Camera set to the anterior preset.");
    write(`Articles in the scene: ${(explorer.getArticles?.() || []).length}.`);
  };
  explorer.addEventListener("scene-load", setup);
  explorer.addEventListener("model-load", setup);
  frame.addEventListener("voyager-ready", setup);
  if (frame.dataset.loaded === "true") setup();
}

function renderBackgrounds(workspace, { specimen }) {
  workspace.append(note("Solid, linear, and radial. The same attributes can be set on the tag before the model loads: bgStyle and bgColor."));
  const { bar, frameSlot } = singleStage(workspace, specimen);
  const styles = [
    ["Solid", "#1c1916", null],
    ["LinearGradient", "#3c4a45", "#141614"],
    ["RadialGradient", "#efe6d4", "#8c3a2b"]
  ];
  styles.forEach(([style, first, second]) => {
    const button = el(`<button type="button">${style}</button>`);
    button.addEventListener("click", () => {
      const explorer = requireExplorer(frameSlot());
      explorer.setBackgroundStyle(style);
      if (second) explorer.setBackgroundColor(first, second);
      else explorer.setBackgroundColor(first);
      bar.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
    });
    bar.append(button);
  });
}

function namedMeshBox(scene, pattern) {
  let box = null;
  scene.traverse((node) => {
    if (!pattern.test(node.name || "")) return;
    node.traverse((child) => {
      const part = meshWorldBox(child);
      if (!part) return;
      box = box ? box.union(part) : part.clone();
    });
  });
  return box;
}

function modelMeshBox(scene) {
  let box = null;
  scene.traverse((node) => {
    const part = meshWorldBox(node);
    if (!part) return;
    box = box ? box.union(part) : part.clone();
  });
  return box;
}

/** Approximate landmark spots from mesh bounds. Demo only — not digitized database points. */
function simulatedLandmarkPoints(explorer) {
  const scene = findThreeScene(explorer);
  if (!scene) return null;
  const vault = namedMeshBox(scene, /calotte|frontal/i) || modelMeshBox(scene);
  if (!vault) return null;
  const teeth = namedMeshBox(scene, /teeth_max|mandible/i);
  const center = vault.getCenter(vault.min.clone());
  const size = vault.getSize(vault.min.clone());
  const up = center.clone().set(0, 1, 0);
  const face = teeth ? teeth.getCenter(teeth.min.clone()) : null;
  let anterior = center.clone().set(0, 0, 1);
  if (face) {
    anterior = face.clone().sub(center);
    anterior.y = 0;
  }
  if (anterior.lengthSq() < 1e-6) anterior.set(0, 0, 1);
  else anterior.normalize();
  const reach = Math.max(size.x, size.y, size.z);
  const brow = face ? face.clone().lerp(center, 0.45) : center.clone().addScaledVector(anterior, reach * 0.45);
  return {
    nasion: brow.clone().addScaledVector(up, reach * 0.02),
    glabella: brow.clone().addScaledVector(up, reach * 0.16).addScaledVector(anterior, reach * 0.04),
    bregma: center.clone().addScaledVector(up, reach * 0.5),
    lambda: center.clone().addScaledVector(anterior, -reach * 0.48).addScaledVector(up, reach * 0.2)
  };
}

function renderAnnotations(workspace, { specimen }) {
  workspace.append(note("Simulated pins sit on the vault from mesh bounds. The articles beside them are sample copy. SkeletalGrowthDB does not publish landmark coordinates for these skulls."));
  const grid = el(`<div class="split"></div>`);
  const panel = el(`<div class="panel"><h3>Article</h3><p class="definition">Choose a pin or a landmark name.</p><div class="article-body" hidden></div><div id="scene-articles"></div></div>`);
  const stage = el(`<div></div>`);
  grid.append(panel, stage);
  workspace.append(grid);
  const frame = mountViewer(stage, specimen.placeholder ? viewableSpecimens()[0] : specimen);
  const list = el(`<div class="list-buttons"></div>`);
  panel.prepend(list);
  const definition = panel.querySelector(".definition");
  const articleBody = panel.querySelector(".article-body");
  const status = panel.querySelector("#scene-articles");
  const tags = new Map();
  const pins = el(`<button type="button" aria-pressed="true">Scene pins</button>`);
  const reader = el(`<button type="button">Scene articles</button>`);
  let pinsOn = true;
  let activeId = null;
  let points = null;

  const showArticle = (item) => {
    activeId = item.id;
    definition.textContent = `${item.name}. ${item.definition}`;
    articleBody.hidden = false;
    articleBody.textContent = item.article;
    list.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", String(node.dataset.pin === item.id)));
    tags.forEach((tag, id) => tag.classList.toggle("is-active", id === item.id));
  };

  const positionTags = () => {
    const explorer = frame.querySelector("voyager-explorer");
    if (!explorer || !points) return;
    tags.forEach((tag, id) => {
      const point = points[id];
      const spot = point && projectOntoFrame(explorer, frame, point);
      if (!pinsOn || !spot || spot.behind) {
        tag.hidden = true;
        return;
      }
      tag.hidden = false;
      tag.style.left = `${spot.x}px`;
      tag.style.top = `${spot.y}px`;
    });
  };

  const buildPins = () => {
    const explorer = frame.querySelector("voyager-explorer");
    if (!explorer || frame.dataset.loaded !== "true") return;
    points = simulatedLandmarkPoints(explorer);
    if (!points) {
      status.innerHTML = `<p class="note">The mesh is not ready for simulated pins yet.</p>`;
      return;
    }
    PIN_ARTICLES.forEach((item) => {
      let tag = tags.get(item.id);
      if (!tag) {
        tag = document.createElement("button");
        tag.type = "button";
        tag.className = "bone-tag sim-pin";
        tag.textContent = item.name;
        tag.style.setProperty("--tag", item.color);
        tag.addEventListener("click", () => {
          setOrbit(explorer, item.pitch, item.yaw);
          showArticle(item);
          status.innerHTML = `<p class="note">Simulated pin · sample article. Not a digitized SkeletalGrowthDB coordinate.</p>`;
        });
        frame.append(tag);
        tags.set(item.id, tag);
      }
    });
    pins.setAttribute("aria-pressed", String(pinsOn));
    setOrbit(explorer, 0, 0);
    positionTags();
    status.innerHTML = `<p class="note">${PIN_ARTICLES.length} simulated pins on the vault. Click one to open its sample article.</p>`;
  };

  PIN_ARTICLES.forEach((item) => {
    const button = el(`<button type="button" data-pin="${item.id}">${item.name}</button>`);
    button.addEventListener("click", () => {
      const explorer = requireExplorer(frame);
      setOrbit(explorer, item.pitch, item.yaw);
      showArticle(item);
      status.innerHTML = `<p class="note">Sample article open beside the viewer.</p>`;
      positionTags();
    });
    list.append(button);
  });

  panel.append(el(`<div class="cite-actions"></div>`));
  panel.querySelector(".cite-actions").append(pins, reader);

  pins.addEventListener("click", () => {
    pinsOn = !pinsOn;
    pins.setAttribute("aria-pressed", String(pinsOn));
    if (!tags.size) buildPins();
    positionTags();
    status.innerHTML = `<p class="note">${pinsOn ? `${PIN_ARTICLES.length} simulated pins shown.` : "Simulated pins hidden."}</p>`;
  });

  reader.addEventListener("click", () => {
    const on = reader.getAttribute("aria-pressed") !== "true";
    reader.setAttribute("aria-pressed", String(on));
    if (!on) {
      articleBody.hidden = true;
      definition.textContent = "Choose a pin or a landmark name.";
      status.innerHTML = `<p class="note">Sample articles closed.</p>`;
      return;
    }
    const first = PIN_ARTICLES.find((item) => item.id === activeId) || PIN_ARTICLES[0];
    setOrbit(requireExplorer(frame), first.pitch, first.yaw);
    showArticle(first);
    status.innerHTML = `<p class="note">${PIN_ARTICLES.length} sample articles. Showing ${first.name}.</p>`;
    positionTags();
  });

  onReady(requireExplorer(frame), buildPins);
  const follow = () => {
    if (!frame.isConnected) return;
    positionTags();
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);
}

function renderGhost(workspace, { specimen }) {
  workspace.append(note("Click a bone or part to ghost it to 25% opacity. Click again to make it solid. Colors models list every cranial bone; Taxon models list calotte, cranial base, mandible, and teeth."));
  const partsBar = el(`<div class="list-buttons" aria-label="Parts"></div>`);
  const status = el(`<p class="status">Waiting for the scene.</p>`);
  let activeName = "";
  let activeSpecimen = boneSpecimen(specimen.placeholder ? viewableSpecimens()[0] : specimen);

  const pickEntries = (explorer, name) => {
    separateMeshMaterials(explorer);
    const parts = activeSpecimen.parts || [];
    return materialEntries(explorer).filter((entry) => {
      const part = partOfNode(entry.node, parts);
      if (part) return part.name === name;
      return entry.node.name === name;
    });
  };

  const syncPressed = () => {
    partsBar.querySelectorAll("button").forEach((node) => {
      node.setAttribute("aria-pressed", String(node.dataset.part === activeName));
    });
  };

  const fill = (explorer) => {
    partsBar.innerHTML = "";
    activeName = "";
    separateMeshMaterials(explorer);
    const parts = activeSpecimen.parts || [];
    const items = parts.length
      ? parts.map((part) => ({ name: part.name, label: part.display || part.name }))
      : [...new Set(materialEntries(explorer).map((entry) => entry.node.name).filter(Boolean))]
        .map((name) => ({ name, label: name }));
    if (!items.length) {
      status.textContent = "This file has no named meshes to ghost.";
      return;
    }
    items.forEach((item) => {
      const button = el(`<button type="button" data-part="${escapeHtml(item.name)}" aria-pressed="false">${escapeHtml(item.label)}</button>`);
      partsBar.append(button);
    });
    status.textContent = `${items.length} part${items.length === 1 ? "" : "s"}. Click one to ghost it.`;
  };

  const { bar, frameSlot } = singleStage(workspace, specimen, {
    prepareSpecimen: (item) => {
      activeSpecimen = boneSpecimen(item);
      return activeSpecimen;
    },
    remount: true,
    onLoaded: (explorer) => {
      fill(explorer);
      return true;
    }
  });
  workspace.append(partsBar, status);

  partsBar.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-part]");
    if (!button) return;
    const explorer = requireExplorer(frameSlot());
    if (frameSlot().dataset.loaded !== "true") {
      status.textContent = "Waiting for the skull.";
      return;
    }
    const name = button.dataset.part;
    const label = button.textContent;
    if (activeName && activeName !== name) {
      setMaterialGhost(pickEntries(explorer, activeName), false);
    }
    const turnOn = activeName !== name;
    const entries = pickEntries(explorer, name);
    if (!entries.length) {
      activeName = "";
      syncPressed();
      status.textContent = `${label} is in the list, but no mesh matched that name in the scene.`;
      return;
    }
    setMaterialGhost(entries, turnOn);
    activeName = turnOn ? name : "";
    syncPressed();
    status.textContent = turnOn ? `${label} at 25% opacity.` : `${label} solid.`;
  });
}
