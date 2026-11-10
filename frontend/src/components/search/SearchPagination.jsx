import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  // Show a maximum of 5 page numbers.
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust the starting page when near the end.
    startPage = Math.max(1, endPage - maxVisiblePages + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  };

  return (
    <nav
      aria-label="Search results pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 items-center gap-1 rounded-xl border border-white/10 px-3 text-sm text-[#CBD5E1] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          type="button"
          aria-current={currentPage === page ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-medium transition ${
            currentPage === page
              ? "border-[#4F8CFF]/50 bg-[#4F8CFF]/15 text-[#7DAAFF]"
              : "border-white/10 text-[#CBD5E1] hover:bg-white/5"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 items-center gap-1 rounded-xl border border-white/10 px-3 text-sm text-[#CBD5E1] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
