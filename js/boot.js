import { getExample } from "./catalog.js";
import { renderExample } from "./examples.js";
import { getSpecimen } from "./specimens.js";

const params = new URLSearchParams(location.search);
const example = getExample(params.get("id"));
const specimen = getSpecimen(params.get("specimen"));
document.title = `${example.title} · Voyager Visualizer`;

if (location.protocol === "file:") {
  document.querySelector("#app").innerHTML = `<p class="note">Open this site through a local server so the modules and the Voyager scene can load. From the project folder: python3 -m http.server 4173</p>`;
} else {
  renderExample(document.querySelector("#app"), example, { specimen });
}
