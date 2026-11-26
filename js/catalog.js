export const catalog = [
  {
    id: "metadata",
    number: "01",
    group: "Research record",
    title: "Specimen card",
    summary: "Taxon, catalog number, sex, age, provenance, and scan notes sit beside the mesh.",
    hover: "A researcher gets the scientific name, accession, wild or captive origin, and scan calibration before orbiting the model. Citation and download sit on the same card.",
    capability: "Page content beside the viewer. Facts come from each model's JSON in SkeletalGrowthDB.",
    snippet: "The card is ordinary HTML next to <voyager-explorer>. It does not need a Voyager method."
  },
  {
    id: "norma",
    number: "02",
    group: "Osteology",
    title: "Norma views",
    summary: "Anterior, both laterals, dorsal, ventral, and posterior, plus orthographic.",
    hover: "Standard cranial orientations replace a generic view cube. Orthographic projection takes the perspective parallax out of a morphological comparison.",
    capability: "Public setCameraOrbit, using Voyager's own view-preset order. Orthographic is the internal projection switch.",
    snippet: "explorer.setCameraOrbit(pitch, yaw)  // orbit vector is [pitch, yaw, 0]"
  },
  {
    id: "landmarks",
    number: "03",
    group: "Osteology",
    title: "Landmark pins",
    summary: "Nasion, glabella, bregma, lambda, prosthion, zygion, and inion, each with a definition.",
    hover: "Choosing a landmark turns the skull to the view where that point is read and opens a short definition. Digitized x, y, z values drop into the same row later.",
    capability: "Camera moves use the public orbit method. Coordinate cells stay empty until landmarks are digitized on the mesh.",
    snippet: "explorer.setCameraOrbit(pitch, yaw)"
  },
  {
    id: "indices",
    number: "04",
    group: "Osteology",
    title: "Cranial indices",
    summary: "A small index table next to Voyager's point-to-point tape measure.",
    hover: "Breadth/length, orbital index, and interorbital breadth stay visible while someone measures the mesh. Empty cells are ready for a CSV from the lab.",
    capability: "Turns on Voyager's tape tool so two taps on the mesh report a distance. Index cells stay empty.",
    snippet: "tape.ins.enabled.setValue(true)"
  },
  {
    id: "bones",
    number: "05",
    group: "Osteology",
    title: "Bone isolation",
    summary: "A checklist for the vault and face that colors, dims, or hides a named part.",
    hover: "Aotus107 Colors already has one mesh per bone: frontal, parietal, maxilla, mandible, and the rest. Checking a name colors that mesh.",
    capability: "Matches the GLB node name to the database part name. The file has no materials, so each mesh gets its own color here.",
    snippet: "node.material.color.set(\"#c4553a\")"
  },
  {
    id: "scale",
    number: "06",
    group: "Osteology",
    title: "Scale bar",
    summary: "A 10 mm or 50 mm bar that tracks orthographic zoom.",
    hover: "In orthographic view the bar is a true scene-unit scale, so a screenshot can go on a plate. Perspective view has no single scale, and the bar says so.",
    capability: "Reads Voyager's orthographic height from the orbit offset. Scene units on the checked chimpanzee document are millimeters.",
    snippet: "worldHeight = navigation.ins.offset.value[2]  // mm, orthographic"
  },
  {
    id: "growth",
    number: "07",
    group: "Compare and teach",
    title: "Growth stages",
    summary: "Newborn, juvenile, and adult, without resetting the camera.",
    hover: "The timeline swaps Aotus nancymaae from newborn (Aotus108) to juvenile (Aotus107) to adult (DWA-Aotus1) and keeps the orbit.",
    capability: "Changing the root attribute reloads the Voyager document. The saved orbit is applied again on scene-load.",
    snippet: "explorer.setAttribute(\"root\", nextPackageRoot)"
  },
  {
    id: "compare",
    number: "08",
    group: "Compare and teach",
    title: "Side by side",
    summary: "Two Voyager viewports, with an optional lock so the orbits move together.",
    hover: "Adult night monkey beside the juvenile. The cameras start locked, so dragging either skull turns the other to the same angle. Each keeps a distance that fits its own size.",
    capability: "Two <voyager-explorer> elements. Sync uses the public orbit and offset methods.",
    snippet: "other.setCameraOrbit(pitch, yaw)"
  },
  {
    id: "study",
    number: "09",
    group: "Compare and teach",
    title: "Study mode",
    summary: "Click a bone name to pin it on the mesh. One switch hides the pins and the list.",
    hover: "The juvenile night monkey Colors model has a mesh per bone. A click colors that mesh and pins its name at the center. Hide labels clears the pins and the side list.",
    capability: "Colors the named mesh and places its name at the mesh center. Hide labels removes those pins.",
    snippet: "recolorMaterial(frontalMeshes, \"#c4553a\")"
  },
  {
    id: "collection",
    number: "10",
    group: "Collection",
    title: "Collection browse",
    summary: "Browse by family, or filter by sex, age, provenance, and a few traits.",
    hover: "Cards carry the scientific name, age, sex, and badges. Trait filters include platyrrhine and enlarged orbits so the night monkey template can be found. Thumbnails are plates until orthographic stills are rendered.",
    capability: "Static cards. Each one opens the specimen card with that record selected.",
    snippet: "example.html?id=metadata&specimen=alouatta"
  },
  {
    id: "ortho",
    number: "11",
    group: "Viewer controls",
    title: "Orthographic toggle",
    summary: "One button flips perspective and orthographic without a jump in size.",
    hover: "The public element only exposes orbit and offset. This button sets CVOrbitNavigation's projection and resizes the frustum from the current distance so the skull stays the same apparent size.",
    capability: "Internal navigation component. Visitors can also use Tools → View → Orthographic inside Voyager.",
    snippet: "navigation.ins.projection.setValue(1)  // orthographic"
  },
  {
    id: "shortcuts",
    number: "12",
    group: "Viewer controls",
    title: "Keyboard shortcuts",
    summary: "O, M, and R, plus number keys for the six norma views.",
    hover: "Voyager does not take over single-key shortcuts. This page listens on the window and calls the same methods as the buttons. Typing in a field does not trigger them.",
    capability: "window keydown → public methods, plus the orthographic helper.",
    snippet: "window.addEventListener(\"keydown\", onKey)"
  },
  {
    id: "presets",
    number: "13",
    group: "Viewer controls",
    title: "One preset switch",
    summary: "A single control turns a whole viewing setup on, and reset restores it.",
    hover: "On: dark gradient, orthographic, anterior. Off: resetViewer(), then the default background and perspective camera. Ghost vault fades the frontal, parietal, or calotte mesh.",
    capability: "A boolean around public methods plus the orthographic helper.",
    snippet: "isPresetOn = !isPresetOn"
  },
  {
    id: "autoload",
    number: "14",
    group: "Viewer controls",
    title: "Setup on load",
    summary: "Background and an anterior view apply the moment the scene finishes loading.",
    hover: "The log lists each call after load. Annotation mode is turned on, but a bare department .glb has no pins or articles inside the file.",
    capability: "explorer.addEventListener(\"scene-load\", ...).",
    snippet: "explorer.addEventListener(\"scene-load\", setup)"
  },
  {
    id: "backgrounds",
    number: "15",
    group: "Viewer controls",
    title: "Backgrounds",
    summary: "Solid, linear, and radial backgrounds, changed live.",
    hover: "The same colors can be set on the HTML tag before load. These buttons call setBackgroundStyle and setBackgroundColor after the model is up.",
    capability: "Public background methods.",
    snippet: "explorer.setBackgroundStyle(\"LinearGradient\")"
  },
  {
    id: "annotations",
    number: "16",
    group: "Viewer controls",
    title: "Pins and articles",
    summary: "Simulated pins on the vault open sample articles beside the skull.",
    hover: "Pins are placed from mesh bounds for the demo. The articles are sample copy. SkeletalGrowthDB does not publish landmark coordinates for these skulls.",
    capability: "HTML pins projected onto the viewer, with sample article text in the side panel.",
    snippet: "showArticle(pin); projectOntoFrame(explorer, frame, point)"
  },
  {
    id: "ghost",
    number: "17",
    group: "Viewer controls",
    title: "Ghost one part",
    summary: "Drop one bone or part to 25% opacity and leave the rest solid.",
    hover: "The list uses mesh names from the database record: cranial bones on Colors models, or calotte, cranial base, mandible, and teeth on Taxon models.",
    capability: "Three.js material opacity matched to mesh names.",
    snippet: "material.opacity = 0.25; material.depthWrite = false"
  }
];

export function getExample(id) {
  return catalog.find((item) => item.id === id) || catalog[0];
}
