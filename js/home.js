import { catalog } from "./catalog.js";

export function renderHome() {
  const catalogRoot = document.querySelector("#catalog");
  const filters = document.querySelector("#filters");
  if (!catalogRoot || !filters) return;

  if (location.protocol === "file:") {
    catalogRoot.innerHTML = `<p class="note">These pages use ES modules, which a browser will not load from a file address. From this folder, run <span class="mono">python3 -m http.server 4173</span> and open <span class="mono">http://localhost:4173</span>.</p>`;
    return;
  }

  const groups = ["All", ...new Set(catalog.map((item) => item.group))];
  let active = "All";

  const paintFilters = () => {
    filters.innerHTML = "";
    groups.forEach((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = group;
      button.setAttribute("aria-pressed", String(group === active));
      button.addEventListener("click", () => {
        active = group;
        paintFilters();
        paintCards();
      });
      filters.append(button);
    });
  };

  const paintCards = () => {
    const items = catalog.filter((item) => active === "All" || item.group === active);
    catalogRoot.innerHTML = items.map((item) => `
      <a class="card" href="example.html?id=${item.id}">
        <div class="card-body">
          <div class="card-kicker"><span>${item.group}</span><span class="mono">${item.number}</span></div>
          <h2>${item.title}</h2>
          <p class="always">${item.summary}</p>
          <div class="more"><p>${item.hover}</p></div>
        </div>
      </a>`).join("");
  };

  paintFilters();
  paintCards();
}

if (typeof document !== "undefined") renderHome();
