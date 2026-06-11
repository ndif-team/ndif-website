// Subset of GitHub's linguist color map covering languages in our dataset.
// Source: https://github.com/ozh/github-colors
const COLORS: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Cuda: "#3A4E3A",
  TeX: "#3D6117",
  Dockerfile: "#384d54",
  YAML: "#cb171e",
  Lua: "#000080",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

export function languageColor(lang: string | null): string {
  if (!lang) return "#94a3b8"; // slate-400
  return COLORS[lang] ?? "#94a3b8";
}
