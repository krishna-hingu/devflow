import { useState } from "react";
function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <header className="flex h-16 items-center justify-between border-b border-devflow-border bg-devflow-header px-6">
      <div className="hidden w-full max-w-5xl items-center sm:flex">
        <div className="flex w-full items-center gap-3 rounded-lg border border-devflow-border bg-devflow-card px-4 focus-within:border-devflow-blue">
          <span className="text-devflow-text-muted" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search projects and tasks..."
            aria-label="Search projects and tasks"
            className="w-full bg-transparent py-2 text-sm text-devflow-text placeholder:text-devflow-text-muted outline-none"
          />
        </div>
      </div>
      <button
        type="button"
        className="ml-4 flex shrink-0 items-center gap-2 rounded-lg border border-devflow-border px-3 py-2 text-sm text-devflow-text transition-colors hover:bg-devflow-card"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-devflow-blue font-semibold text-white"
          aria-hidden="true"
        >
          K
        </span>
        <span>Profile</span>
      </button>
    </header>
  );
}
export default Header;
