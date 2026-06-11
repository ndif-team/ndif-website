"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface PaginationProps {
  total: number;
  page: number;
  revealed: number;
  pageSize?: number;
  revealStep?: number;
  onShowMore: () => void;
  onPageChange: (page: number) => void;
}

export function itemsOnPage(total: number, page: number, pageSize: number): number {
  const start = (page - 1) * pageSize;
  return Math.max(0, Math.min(pageSize, total - start));
}

export function pageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const out: (number | "...")[] = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);
  if (left > 2) out.push("...");
  for (let p = left; p <= right; p++) out.push(p);
  if (right < totalPages - 1) out.push("...");
  out.push(totalPages);
  return out;
}

export default function Pagination({
  total,
  page,
  revealed,
  pageSize = 36,
  revealStep = 12,
  onShowMore,
  onPageChange,
}: PaginationProps) {
  const onPage = itemsOnPage(total, page, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showMoreVisible = revealed < onPage;
  const pagerVisible = total > pageSize && revealed === onPage;

  if (!showMoreVisible && !pagerVisible) return null;

  const nextRevealCount = Math.min(revealed + revealStep, onPage);

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      {showMoreVisible && (
        <button
          onClick={onShowMore}
          className="px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
        >
          Show {nextRevealCount - revealed} more
        </button>
      )}

      {pagerVisible && (
        <nav aria-label="Pagination">
          <ul className="flex items-center gap-1">
            <li>
              <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="p-2 rounded-md text-slate-500 disabled:opacity-40 hover:text-brand-600"
              >
                <FiChevronLeft />
              </button>
            </li>
            {pageNumbers(page, totalPages).map((p, i) =>
              p === "..." ? (
                <li key={`e${i}`} className="px-2 text-slate-400">…</li>
              ) : (
                <li key={p}>
                  <button
                    onClick={() => onPageChange(p)}
                    aria-current={p === page ? "page" : undefined}
                    className={`min-w-[2.25rem] h-9 px-2 rounded-md text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-brand-600 text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="p-2 rounded-md text-slate-500 disabled:opacity-40 hover:text-brand-600"
              >
                <FiChevronRight />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
