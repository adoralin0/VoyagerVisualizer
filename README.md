# Voyager Visualizer

Working interface studies for the [Vertebrate Skulls](https://adoralin0.github.io/VertebrateSkulls/) redesign. Each idea is a separate page so the lab can keep the ones it wants.

The skulls are the department models in [SkeletalGrowthDB](https://github.com/digitalworlds/SkeletalGrowthDB), loaded by Voyager from GitHub Pages. The same files are what the Unity [OsteologyViewer](https://github.com/digitalworlds/OsteologyViewer) and the [skeletal-growth-website](https://github.com/digitalworlds/skeletal-growth-website) use. The viewer script in `vendor/voyager-explorer.min.js` is Smithsonian Voyager, Apache-2.0, unmodified.

## Look through the ideas

From this folder:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173). Hover a plate for the description, then open it.

## Deploy on GitHub Pages

The site is static (no build). Pushing to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml) and publishes GitHub Pages.

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push `main` (or run **Actions → Deploy GitHub Pages → Run workflow**).
3. The site will be at `https://adoralin0.github.io/VoyagerVisualizer/`.

## Where the skulls come from

`js/specimens.js` lists the taxon models in SkeletalGrowthDB. Each viewer loads that record's `.glb`. Bone colors use the Colors model when the database has one (Aotus107 and Aotus108), matching the part names in that JSON.

Sex, locality, and scanner settings are blank because those fields are not in the database records.

## What uses Voyager's public API

Camera orbits, measurement, annotations, articles, tours, the tool drawer, backgrounds, and reset are public methods on `<voyager-explorer>`.

Orthographic projection and material edits are the same internal path as Voyager's own Tools → View → Orthographic control. They are marked on those pages.
