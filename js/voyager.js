/**
 * Small helpers around <voyager-explorer>.
 *
 * Public methods used here are documented at
 * https://smithsonian.github.io/dpo-voyager/explorer/api/
 *
 * Orthographic projection and material edits are not in that public API.
 * They go through Voyager's CVOrbitNavigation component and the Three.js
 * scene, which is what the built-in Tools → View → Orthographic control does.
 */

export const NORMA = [
  { id: "frontalis", latin: "Norma frontalis", plain: "Anterior", pitch: 0, yaw: 0 },
  { id: "lateralis-l", latin: "Norma lateralis", plain: "Left", pitch: 0, yaw: -90 },
  { id: "lateralis-r", latin: "Norma lateralis", plain: "Right", pitch: 0, yaw: 90 },
  { id: "verticalis", latin: "Norma verticalis", plain: "Dorsal", pitch: -90, yaw: 0 },
  { id: "basilaris", latin: "Norma basilaris", plain: "Ventral", pitch: 90, yaw: 0 },
  { id: "occipitalis", latin: "Norma occipitalis", plain: "Posterior", pitch: 0, yaw: 180 }
];

export const BONES = [
  { id: "frontal", name: "Frontal", color: "#c4553a" },
  { id: "parietal", name: "Parietal", color: "#d4a017" },
  { id: "temporal", name: "Temporal", color: "#2f6f62" },
  { id: "occipital", name: "Occipital", color: "#3d5d86" },
  { id: "zygomatic", name: "Zygomatic", color: "#c47b3a" },
  { id: "maxilla", name: "Maxilla", color: "#8d4d68" },
  { id: "mandible", name: "Mandible", color: "#6a7032" }
];

export const LANDMARKS = [
  {
    id: "nasion",
    name: "Nasion",
    pitch: 0,
    yaw: 0,
    definition: "Midline point where the frontonasal suture meets the internasal suture."
  },
  {
    id: "glabella",
    name: "Glabella",
    pitch: 0,
    yaw: 0,
    definition: "Most anterior midline point of the frontal, between the superciliary arches."
  },
  {
    id: "bregma",
    name: "Bregma",
    pitch: -90,
    yaw: 0,
    definition: "Intersection of the coronal and sagittal sutures on the cranial vault."
  },
  {
    id: "lambda",
    name: "Lambda",
    pitch: 0,
    yaw: 180,
    definition: "Intersection of the sagittal and lambdoid sutures."
  },
  {
    id: "prosthion",
    name: "Prosthion",
    pitch: 0,
    yaw: 0,
    definition: "Most anterior midline point on the maxillary alveolar process."
  },
  {
    id: "zygion",
    name: "Zygion",
    pitch: 0,
    yaw: -90,
    definition: "Most lateral point on the zygomatic arch. Left and right zygion set bizygomatic breadth."
  },
  {
    id: "inion",
    name: "Inion",
    pitch: 0,
    yaw: 180,
    definition: "Most prominent point of the external occipital protuberance, in the midline."
  }
];

const PERSPECTIVE = 0;
const ORTHOGRAPHIC = 1;

export function createExplorer(specimen, options = {}) {
  const el = document.createElement("voyager-explorer");
  el.__specimen = specimen;
  el.setAttribute("root", specimen.root);
  el.setAttribute("model", specimen.model);
  el.setAttribute("bgStyle", options.bgStyle || "Solid");
  el.setAttribute("bgColor", options.bgColor || "#1c1916");
  if (options.uiMode) el.setAttribute("uiMode", options.uiMode);
  return el;
}

export function viewerFrame(specimen, options = {}) {
  const frame = document.createElement("div");
  frame.className = "viewer-frame";

  if (!specimen || specimen.placeholder || !specimen.model) {
    frame.innerHTML = `
      <div class="viewer-empty">
        <p class="eyebrow">No mesh in the database</p>
        <p>SkeletalGrowthDB does not include a model for this stage.</p>
      </div>`;
    frame.explorer = null;
    return frame;
  }

  const explorer = createExplorer(specimen, options);
  const hint = document.createElement("p");
  hint.className = "viewer-hint";
  hint.textContent = `Loading ${specimen.catalog}…`;
  frame.append(explorer, hint);

  const finish = () => {
    applyModelOrientation(explorer, specimen);
    if (frame.dataset.loaded === "true") return;
    hint.remove();
    frame.dataset.loaded = "true";
    frame.dispatchEvent(new CustomEvent("voyager-ready"));
  };
  explorer.addEventListener("scene-load", finish);
  explorer.addEventListener("model-load", finish);
  explorer.addEventListener("model-error", (event) => {
    hint.textContent = `The model did not load. ${event.detail || ""}`.trim();
  });
  window.setTimeout(() => {
    if (!hint.isConnected || frame.dataset.loaded === "true") return;
    hint.textContent = "The department model has not arrived yet. The page controls still work. Check that digitalworlds.github.io can be reached from this browser.";
  }, 12000);

  frame.explorer = explorer;
  return frame;
}

export function components(explorer) {
  const system = explorer?.application?.system;
  if (!system?.components?.getArray) return [];
  return system.components.getArray();
}

export function byType(explorer, typeName) {
  return components(explorer).filter((component) => {
    return component?.constructor?.typeName === typeName || component?.typeName === typeName;
  });
}

export function navigation(explorer) {
  return byType(explorer, "CVOrbitNavigation")[0] || null;
}

/**
 * Voyager's public setCameraOrbit(first, second) writes the orbit vector
 * [first, second, 0]. In CVOrbitNavigation that vector is [pitch, yaw, roll],
 * and the built-in view presets use the same order. Callers pass pitch first.
 */
export function setOrbit(explorer, pitch, yaw) {
  explorer.setCameraOrbit(pitch, yaw);
}

export function readOrbit(explorer) {
  const orbit = explorer.getCameraOrbit?.();
  const offset = explorer.getCameraOffset?.();
  if (!orbit) return null;
  return {
    pitch: orbit[0],
    yaw: orbit[1],
    offset: offset ? offset.slice() : null
  };
}

export function rememberPose(explorer) {
  return readOrbit(explorer);
}

export function modelRadius(explorer) {
  const radius = activeDocument(explorer)?.root?.scene?.outs?.boundingRadius?.value;
  return typeof radius === "number" && radius > 0 ? radius : null;
}

/** Copy the viewing angle, and scale the camera distance by each skull's size. */
export function copyLockedOrbit(source, target) {
  const pose = readOrbit(source);
  const sourceRadius = modelRadius(source);
  const targetRadius = modelRadius(target);
  if (!pose || !sourceRadius || !targetRadius) return false;
  const scale = targetRadius / sourceRadius;
  setOrbit(target, pose.pitch, pose.yaw);
  if (pose.offset) {
    target.setCameraOffset(
      pose.offset[0] * scale,
      pose.offset[1] * scale,
      pose.offset[2] * scale
    );
  }
  return true;
}

export function restorePose(explorer, pose) {
  if (!pose) return;
  setOrbit(explorer, pose.pitch, pose.yaw);
  if (pose.offset) {
    explorer.setCameraOffset(pose.offset[0], pose.offset[1], pose.offset[2]);
  }
}

export function projectionMode(explorer) {
  const nav = navigation(explorer);
  if (!nav) return "unknown";
  return nav.ins.projection.value === ORTHOGRAPHIC ? "orthographic" : "perspective";
}

/**
 * Match the current perspective framing when flipping to orthographic.
 * Voyager treats offset.z as the orthographic height (camera.size = offset.z).
 * Perspective visible height at the same distance is 2 * distance * tan(fov/2).
 */
export function setProjection(explorer, mode) {
  const nav = navigation(explorer);
  if (!nav) return { ok: false, mode: "unknown" };
  const ins = nav.ins;
  const offset = ins.offset.value.slice();

  if (mode === "orthographic") {
    const camera = findCamera(explorer);
    const distance = Math.abs(offset[2]) || 100;
    const fov = camera?.fov || camera?.camera?.fov || 45;
    const visibleHeight = 2 * distance * Math.tan((fov * Math.PI) / 360);
    if (!explorer._perspectiveOffset) explorer._perspectiveOffset = offset.slice();
    ins.offset.setValue([offset[0], offset[1], visibleHeight]);
    ins.projection.setValue(ORTHOGRAPHIC);
    return { ok: true, mode: "orthographic" };
  }

  ins.projection.setValue(PERSPECTIVE);
  if (explorer._perspectiveOffset) {
    ins.offset.setValue(explorer._perspectiveOffset);
    explorer._perspectiveOffset = null;
  }
  return { ok: true, mode: "perspective" };
}

export function toggleProjection(explorer) {
  const next = projectionMode(explorer) === "orthographic" ? "perspective" : "orthographic";
  return setProjection(explorer, next);
}

export function findCamera(explorer) {
  for (const component of components(explorer)) {
    const camera = component.camera;
    if (camera && (camera.isPerspectiveCamera || camera.isOrthographicCamera)) return camera;
  }
  return null;
}

export function findThreeScene(explorer) {
  const seen = new Set();
  const found = [];

  function consider(value, depth) {
    if (!value || typeof value !== "object" || seen.has(value) || depth > 2) return;
    seen.add(value);
    if (value.isScene && typeof value.traverse === "function") found.push(value);
  }

  for (const component of components(explorer)) {
    consider(component.scene, 0);
    consider(component.activeScene, 0);
    if (component.renderer) consider(component.renderer.activeScene, 0);
    for (const key of Object.keys(component)) {
      if (key.startsWith("_")) continue;
      try {
        consider(component[key], 1);
      } catch {
        /* Some component getters throw before the scene is ready. */
      }
    }
  }
  return found[0] || null;
}

/** World-space AABB of a mesh, after Voyager's orientation is applied. */
export function meshWorldBox(node) {
  if (!node?.geometry) return null;
  node.updateWorldMatrix(true, false);
  if (!node.geometry.boundingBox && node.geometry.computeBoundingBox) node.geometry.computeBoundingBox();
  const box = node.geometry.boundingBox;
  if (!box?.clone || !node.matrixWorld) return null;
  return box.clone().applyMatrix4(node.matrixWorld);
}

/** World-space center of a mesh, after Voyager's orientation is applied. */
export function meshWorldCenter(node) {
  if (!node) return null;
  const box = meshWorldBox(node);
  if (!box) {
    const point = node.position.clone();
    return node.getWorldPosition ? node.getWorldPosition(point) : point;
  }
  return box.getCenter(node.position.clone());
}

/** Project a world point onto a viewer frame. `behind` is true when it faces away from the camera. */
export function projectOntoFrame(explorer, frame, point) {
  const camera = findCamera(explorer);
  const canvas = explorer.shadowRoot?.querySelector("canvas");
  if (!camera || !canvas || !point?.clone) return null;
  camera.updateWorldMatrix(true, false);
  const ndc = point.clone().project(camera);
  const cameraPosition = point.clone();
  camera.getWorldPosition(cameraPosition);
  const toward = point.clone().sub(cameraPosition);
  const forward = point.clone().set(0, 0, -1).applyQuaternion(camera.quaternion);
  const canvasRect = canvas.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  return {
    x: (ndc.x * 0.5 + 0.5) * canvasRect.width + canvasRect.left - frameRect.left,
    y: (-ndc.y * 0.5 + 0.5) * canvasRect.height + canvasRect.top - frameRect.top,
    behind: toward.dot(forward) <= 0
  };
}

export function materialEntries(explorer) {
  const scene = findThreeScene(explorer);
  const entries = [];
  if (!scene) return entries;
  scene.traverse((node) => {
    if (!node.isMesh || !node.material) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material, index) => {
      const label = material.name?.trim() || `Unnamed material ${entries.length + 1}`;
      entries.push({ node, material, index, label });
    });
  });
  return entries;
}

export function uniqueMaterials(explorer) {
  const entries = materialEntries(explorer);
  const byLabel = new Map();
  entries.forEach((entry) => {
    if (!byLabel.has(entry.label)) byLabel.set(entry.label, []);
    byLabel.get(entry.label).push(entry);
  });
  return byLabel;
}

function rememberMaterial(material) {
  if (material.userData.__voyagerOriginal) return;
  material.userData.__voyagerOriginal = {
    color: material.color ? material.color.getHexString() : null,
    opacity: material.opacity,
    transparent: material.transparent,
    depthWrite: material.depthWrite,
    metalness: material.metalness,
    roughness: material.roughness
  };
}

/**
 * The Colors GLBs have one mesh per bone and no materials. Voyager assigns
 * a single shared material, so coloring one mesh recolors every bone.
 * Clone that material the first time a mesh is edited.
 */
export function separateMeshMaterials(explorer) {
  const entries = materialEntries(explorer);
  const counts = new Map();
  entries.forEach((entry) => {
    if (!entry.material) return;
    counts.set(entry.material, (counts.get(entry.material) || 0) + 1);
  });
  entries.forEach((entry) => {
    const current = entry.node.userData.__partMaterial;
    if (current) {
      entry.node.material = current;
      return;
    }
    const material = entry.material;
    if (!material || (counts.get(material) || 0) < 2) return;
    const clone = material.clone();
    clone.userData = { ...material.userData };
    delete clone.userData.__voyagerOriginal;
    entry.node.userData.__partMaterial = clone;
    entry.node.material = clone;
  });
}

/**
 * Voyager redraws only when its own system changes. A Three.js color edit
 * has to request that redraw or the canvas keeps the previous frame.
 */
export function requestRender(explorer) {
  const explorers = explorer ? [explorer] : [...document.querySelectorAll("voyager-explorer")];
  explorers.forEach((item) => {
    const renderer = components(item).find((component) => component?.constructor?.typeName === "CRenderer");
    renderer?.forceRender?.();
  });
}

export function recolorMaterial(entries, hex) {
  entries.forEach(({ material }) => {
    if (!material.color) return;
    rememberMaterial(material);
    material.color.set(hex);
    material.metalness = 0;
    material.roughness = 0.65;
    material.needsUpdate = true;
  });
  requestRender();
}

export function restoreMaterials(explorer) {
  materialEntries(explorer).forEach(({ node, material }) => {
    const original = material.userData.__voyagerOriginal;
    node.visible = true;
    if (!original) return;
    if (original.color && material.color) material.color.set(`#${original.color}`);
    material.opacity = original.opacity;
    material.transparent = original.transparent;
    material.depthWrite = original.depthWrite;
    if (original.metalness != null) material.metalness = original.metalness;
    if (original.roughness != null) material.roughness = original.roughness;
    material.needsUpdate = true;
  });
  requestRender(explorer);
}

export function setMaterialGhost(entries, ghosted) {
  entries.forEach(({ material }) => {
    rememberMaterial(material);
    material.transparent = ghosted;
    material.opacity = ghosted ? 0.25 : 1;
    material.depthWrite = !ghosted;
    material.needsUpdate = true;
  });
  requestRender();
}

export function setMaterialVisibility(entries, visible) {
  entries.forEach(({ node }) => {
    node.visible = visible;
  });
  requestRender();
}

export function orthoWorldHeight(explorer) {
  const nav = navigation(explorer);
  if (!nav || nav.ins.projection.value !== ORTHOGRAPHIC) return null;
  const height = Math.abs(nav.ins.offset.value[2]);
  return height > 0 ? height : null;
}

function modelRoot(scene) {
  let model = null;
  scene.traverse((node) => {
    if (!model && node.name === "Model") model = node;
  });
  return model;
}

/**
 * USNM-337324 is the skull whose resting pose comes out sideways.
 * Its mesh nodes already stand the crown up. The database pitch of -90
 * is a Unity parent rotation, and writing that onto the scene Graph
 * spins the camera along with the mesh, so the picture never changes.
 * viewerQuaternion turns only the Model node, which leaves the camera put.
 * It puts the crown up and the snout toward the camera, on the same axes
 * as the other skulls. Other skulls already rest that way, so they carry
 * no viewerQuaternion. Returns false when the Model node is not in the
 * scene yet.
 */
export function applyModelOrientation(explorer, specimen) {
  const quaternion = specimen?.viewerQuaternion;
  if (!quaternion) return true;
  const scene = findThreeScene(explorer);
  if (!scene) return false;
  const model = modelRoot(scene);
  if (!model) return false;
  model.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
  model.updateMatrix();
  model.updateMatrixWorld(true);
  requestRender(explorer);
  return true;
}

export function loadSpecimen(explorer, specimen, pose) {
  explorer.__specimen = specimen;
  let restored = false;
  const ready = () => {
    const placed = applyModelOrientation(explorer, specimen);
    if (!restored) {
      restorePose(explorer, pose);
      restored = true;
    }
    if (!placed) return;
    explorer.removeEventListener("scene-load", onScene);
    explorer.removeEventListener("model-load", onModel);
  };
  const onScene = () => ready();
  const onModel = () => ready();
  explorer.addEventListener("scene-load", onScene);
  explorer.addEventListener("model-load", onModel);
  const app = explorer.application;
  if (app?.props && app.reloadDocument) {
    app.props.document = "";
    app.props.model = specimen.model;
    app.props.root = specimen.root;
    app.reloadDocument();
    return;
  }
  explorer.removeAttribute("document");
  explorer.setAttribute("root", specimen.root);
  explorer.setAttribute("model", specimen.model);
}

export function partOfNode(node, parts) {
  let current = node;
  while (current) {
    const hit = parts.find((part) => current.name === part.name);
    if (hit) return hit;
    current = current.parent;
  }
  return null;
}

/**
 * setMeasurementEnabled only sets tape.visible. Voyager attaches the
 * click handler when tape.enabled changes, and a visible-only update sets
 * enabled without that change. Set enabled so the next two taps place the tape.
 *
 * These GLBs are millimeters. Voyager's bare-model default label is centimeters.
 * Scene units are updated silently, and each model's local units move with them,
 * so the label changes and the mesh scale stays put.
 */
const MILLIMETERS = 0;

function activeDocument(explorer) {
  const list = components(explorer);
  return list.find((component) => component?.setup?.tape && component?.ins?.active?.value)
    || list.find((component) => component?.setup?.tape)
    || null;
}

function useMillimeterLabels(documentComponent) {
  const scene = documentComponent?.root?.scene;
  const tape = documentComponent?.setup?.tape;
  if (tape?.ins?.localUnits && tape.ins.localUnits.value !== MILLIMETERS) {
    tape.ins.localUnits.setValue(MILLIMETERS);
  }
  const models = scene?.models || [];
  models.forEach((model) => {
    if (model?.ins?.localUnits && model.ins.localUnits.value !== MILLIMETERS) {
      model.ins.localUnits.setValue(MILLIMETERS);
    }
  });
  if (scene?.ins?.units && scene.ins.units.value !== MILLIMETERS) {
    scene.outs?.units?.setValue?.(MILLIMETERS, true);
    scene.ins.units.setValue(MILLIMETERS, true);
  }
}

export function tapeTool(explorer) {
  return activeDocument(explorer)?.setup?.tape || null;
}

export function setTapeMeasure(explorer, on) {
  const documentComponent = activeDocument(explorer);
  const tape = documentComponent?.setup?.tape;
  if (!tape) return { ok: false, tape: null };
  if (on) useMillimeterLabels(documentComponent);
  tape.ins.enabled.setValue(Boolean(on));
  return { ok: true, tape };
}

export function tapeStatus(tape) {
  if (!tape) return "The tape measure is not ready until the skull loads.";
  if (!tape.ins.enabled.value) return "Tape measure is off.";
  const distance = Number(tape.outs?.distance?.value) || 0;
  const placingEnd = tape.outs?.state?.value === 1;
  if (placingEnd) return "Start is set. Tap the skull again to set the end.";
  if (distance > 0) return `${distance.toFixed(2)} mm between the two taps.`;
  return "Tap the skull once to set the start of the tape.";
}

export function onReady(explorer, callback) {
  if (!explorer) return;
  if (explorer.parentElement?.dataset.loaded === "true") {
    callback();
    return;
  }
  const done = () => {
    explorer.removeEventListener("scene-load", done);
    explorer.removeEventListener("model-load", done);
    callback();
  };
  explorer.addEventListener("scene-load", done);
  explorer.addEventListener("model-load", done);
}
