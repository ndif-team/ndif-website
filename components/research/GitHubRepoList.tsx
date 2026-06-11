"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedValue } from "../../lib/useUrlState";
import { githubRepos, type GitHubRepo } from "../../data/github-repos";
import { hasPaper, isPopular, isActive } from "../../lib/repos";
import GitHubRepoCard from "./GitHubRepoCard";
import Pagination, { itemsOnPage } from "./Pagination";

type Chip = "has-paper" | "popular" | "active";
type Sort = "stars" | "recent" | "added" | "az";

const PAGE_SIZE = 36;
const REVEAL_STEP = 12;

const CHIP_LABELS: Record<Chip, string> = {
  "has-paper": "Has paper",
  popular: "Popular",
  active: "Active",
};

function chipMatch(repo: GitHubRepo, chips: Chip[]): boolean {
  if (chips.includes("has-paper") && !hasPaper(repo)) return false;
  if (chips.includes("popular") && !isPopular(repo)) return false;
  if (chips.includes("active") && !isActive(repo)) return false;
  return true;
}

function sortRepos(list: GitHubRepo[], sort: Sort): GitHubRepo[] {
  const copy = [...list];
  if (sort === "stars") {
    copy.sort((a, b) => b.stars - a.stars || (b.last_commit ?? "").localeCompare(a.last_commit ?? ""));
  } else if (sort === "recent") {
    copy.sort((a, b) => (b.last_commit ?? "").localeCompare(a.last_commit ?? ""));
  } else if (sort === "added") {
    copy.sort(
      (a, b) =>
        (b.first_seen ?? "").localeCompare(a.first_seen ?? "") || b.stars - a.stars
    );
  } else {
    copy.sort((a, b) => `${a.owner}/${a.repo}`.localeCompare(`${b.owner}/${b.repo}`));
  }
  return copy;
}

export default function GitHubRepoList() {
  const [search, setSearch] = useState("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [sort, setSort] = useState<Sort>("stars");
  const [page, setPage] = useState(1);
  const [revealed, setRevealed] = useState(REVEAL_STEP);

  const router = useRouter();
  const params = useSearchParams();

  // One-time hydrate from URL on mount
  useEffect(() => {
    const q = params.get("q") ?? ""; if (q) setSearch(q);
    const f = params.get("f");
    if (f) {
      const valid = f.split(",").filter((x): x is Chip =>
        x === "has-paper" || x === "popular" || x === "active"
      );
      setChips(valid);
    }
    const s = params.get("sort");
    if (s === "stars" || s === "recent" || s === "added" || s === "az") setSort(s);
    const pg = parseInt(params.get("page") ?? "1", 10);
    if (!Number.isNaN(pg) && pg > 0) setPage(pg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useDebouncedValue(search, 300);

  // Sync URL params; preserves params not owned by this tab (e.g. ?tab=)
  useEffect(() => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (!debouncedSearch) next.delete("q"); else next.set("q", debouncedSearch);
    if (chips.length === 0) next.delete("f"); else next.set("f", chips.join(","));
    if (sort === "stars") next.delete("sort"); else next.set("sort", sort);
    next.delete("low"); // legacy low-signal toggle param — everything is shown now
    if (page === 1) next.delete("page"); else next.set("page", String(page));
    const qs = next.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, chips, sort, page]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = githubRepos as GitHubRepo[];
    list = list.filter((r) => chipMatch(r, chips));
    if (q) {
      list = list.filter(
        (r) =>
          r.repo.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return sortRepos(list, sort);
  }, [search, chips, sort]);

  const total = filtered.length;
  const onPage = itemsOnPage(total, page, PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + Math.min(revealed, onPage));

  // Clamp page to a valid range whenever filtered length changes
  // (handles invalid `?page=99` from URL hydration and over-filtering).
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (page > totalPages) setPage(totalPages);
  }, [total, page]);

  // Reset page+reveal whenever filter inputs change
  const filterKey = `${search}|${chips.join(",")}|${sort}`;
  const lastKey = useRef(filterKey);
  useEffect(() => {
    if (lastKey.current !== filterKey) {
      lastKey.current = filterKey;
      setPage(1);
      setRevealed(REVEAL_STEP);
    }
  }, [filterKey]);

  function toggleChip(c: Chip) {
    setChips((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-4">
        <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search repos by name, owner, or description…"
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Chips + toggle + sort */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {(["has-paper", "popular", "active"] as Chip[]).map((c) => (
          <button
            key={c}
            onClick={() => toggleChip(c)}
            aria-pressed={chips.includes(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-950 ${
              chips.includes(c)
                ? "bg-brand-600 border-brand-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-400/70 dark:hover:bg-slate-700/70 dark:hover:text-brand-300"
            }`}
          >
            {CHIP_LABELS[c]}
          </button>
        ))}

        <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          aria-label="Sort repos"
          className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          <option value="stars">Stars</option>
          <option value="recent">Recent</option>
          <option value="added">Added</option>
          <option value="az">A–Z</option>
        </select>
      </div>

      {/* Grid */}
      {total === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 text-lg">No repos match your filters.</p>
          <button
            onClick={() => {
              setSearch("");
              setChips([]);
              setSort("stars");
            }}
            className="mt-4 text-brand-600 dark:text-brand-400 font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((r) => (
              <GitHubRepoCard key={`${r.owner}/${r.repo}`} repo={r} />
            ))}
          </div>

          <Pagination
            total={total}
            page={page}
            revealed={Math.min(revealed, onPage)}
            pageSize={PAGE_SIZE}
            revealStep={REVEAL_STEP}
            onShowMore={() => setRevealed((r) => Math.min(r + REVEAL_STEP, onPage))}
            onPageChange={(p) => {
              setPage(p);
              setRevealed(REVEAL_STEP);
              if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}
