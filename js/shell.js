import { catalog } from "./catalog.js";

export function renderChrome(example) {
  const groups = groupCatalog();
  const nav = groups.map((group) => {
    const links = group.items.map((item) => {
      const current = item.id === example.id ? " aria-current=\"page\"" : "";
      return `<a href="example.html?id=${item.id}"${current}><span>${item.number}</span>${item.title}</a>`;
    }).join("");
    return `<p class="nav-label">${group.title}</p>${links}`;
  }).join("");

  return `
    <header class="topbar">
      <a class="brand" href="index.html">Voyager Visualizer</a>
      <a class="text-link" href="index.html">All ideas</a>
    </header>
    <div class="example-layout">
      <nav class="example-nav" aria-label="Examples">${nav}</nav>
      <article class="example-main">
        <p class="eyebrow">${escapeHtml(example.group)}</p>
        <h1>${escapeHtml(example.title)}</h1>
        <p class="lede">${escapeHtml(example.summary)}</p>
        <p class="capability">${escapeHtml(example.capability)}</p>
        <div id="workspace"></div>
      </article>
    </div>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

function groupCatalog() {
  const order = ["Research record", "Osteology", "Compare and teach", "Collection", "Viewer controls"];
  return order.map((title) => ({
    title,
    items: catalog.filter((item) => item.group === title)
  }));
}

export function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function field(label, value) {
  return `<div class="field"><dt>${label}</dt><dd>${value || "—"}</dd></div>`;
}

export function specimenOptions(items, selectedId) {
  return items.map((item) => {
    const selected = item.id === selectedId ? " selected" : "";
    return `<option value="${item.id}"${selected}>${item.catalog} · ${item.age} · ${item.scientific}</option>`;
  }).join("");
}
