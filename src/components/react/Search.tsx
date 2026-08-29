import { useState, useEffect, useRef, useCallback } from "react";

interface SearchIndexEntry {
  type: "LAB" | "PROJECT" | "ARTICLE" | "RESEARCH" | "EXPERIMENT" | "PERSON" | "OPEN_SOURCE";
  title: string;
  slug: string;
  description: string;
  href: string;
  tags?: string[];
  lab?: string;
}

const TYPE_BADGE_STYLES: Record<string, { bg: string; text: string; border?: string }> = {
  LAB: { bg: "var(--color-accent)", text: "var(--color-accent-contrast)" },
  PROJECT: { bg: "var(--color-surface)", text: "var(--color-text-strong)", border: "var(--border-subtle)" },
  ARTICLE: { bg: "var(--color-surface)", text: "var(--color-text-strong)", border: "var(--border-subtle)" },
  RESEARCH: { bg: "var(--color-surface)", text: "var(--color-text-strong)", border: "var(--border-subtle)" },
  EXPERIMENT: { bg: "var(--color-surface)", text: "var(--color-text-strong)", border: "var(--border-subtle)" },
  PERSON: { bg: "var(--color-surface)", text: "var(--color-text-strong)", border: "var(--border-subtle)" },
  OPEN_SOURCE: { bg: "var(--color-accent)", text: "var(--color-accent-contrast)" },
};

interface SearchProps {
  initialIndex?: SearchIndexEntry[];
}

export function Search({ initialIndex = [] }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<SearchIndexEntry[]>(initialIndex);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load full index on mount if not provided
  useEffect(() => {
    if (initialIndex.length === 0) {
      fetch("/search-index.json")
        .then((res) => res.json())
        .then((data) => setIndex(data))
        .catch(console.error);
    }
  }, [initialIndex.length]);

  const search = useCallback(
    (q: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (!q.trim()) {
          setResults([]);
          setSelectedIndex(-1);
          return;
        }
        const lower = q.toLowerCase();
        const matched = index.filter(
          (item) =>
            item.title.toLowerCase().includes(lower) ||
            item.description.toLowerCase().includes(lower) ||
            item.tags?.some((t) => t.toLowerCase().includes(lower))
        );
        setResults(matched.slice(0, 8));
        setSelectedIndex(-1);
      }, 150);
    },
    [index]
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i < results.length - 1 ? i + 1 : i));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : i));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        window.location.href = results[selectedIndex].href;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (query.trim()) setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleResultClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <label htmlFor="search-input" className="visually-hidden">
        Search KCB Labs
      </label>
      <input
        ref={inputRef}
        id="search-input"
        type="search"
        placeholder="Search labs, projects, journal…"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={isOpen && results.length > 0}
        autoComplete="off"
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "var(--space-2) var(--space-3)",
          fontSize: "var(--text-body)",
          border: "var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          background: "var(--color-bg)",
          color: "var(--color-text)",
          transition: "border-color var(--motion-duration) var(--motion-ease), box-shadow var(--motion-duration) var(--motion-ease)",
        }}
      />
      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          id="search-results"
          role="listbox"
          aria-live="polite"
          style={{
            position: "absolute",
            top: "calc(100% + var(--space-1))",
            left: 0,
            right: 0,
            maxHeight: "400px",
            overflowY: "auto",
            background: "var(--color-surface)",
            border: "var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            zIndex: "var(--z-dropdown)",
          }}
        >
          {results.map((result, i) => (
            <button
              key={result.href}
              role="option"
              aria-selected={i === selectedIndex}
              onClick={() => handleResultClick(result.href)}
              onMouseEnter={() => setSelectedIndex(i)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-2)",
                width: "100%",
                padding: "var(--space-3)",
                border: "none",
                background: i === selectedIndex ? "var(--color-accent-alpha)" : "transparent",
                textAlign: "left",
                cursor: "pointer",
                borderBottom: i < results.length - 1 ? "var(--border-subtle)" : "none",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: "var(--text-metadata)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--weight-medium)",
                  padding: "0.15em 0.5em",
                  borderRadius: "var(--radius-full)",
                  background: TYPE_BADGE_STYLES[result.type]?.bg || "var(--color-surface)",
                  color: TYPE_BADGE_STYLES[result.type]?.text || "var(--color-text-strong)",
                  border: TYPE_BADGE_STYLES[result.type]?.border ? "var(--border-subtle)" : "none",
                  flexShrink: 0,
                  marginTop: "0.15em",
                }}
              >
                {result.type.replace("_", " ")}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "var(--text-body)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--color-text-strong)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  {result.title}
                </div>
                <div
                  style={{
                    fontSize: "var(--text-small)",
                    color: "var(--color-muted-strong)",
                    lineHeight: "var(--leading-body)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {result.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {isOpen && results.length === 0 && query.trim() && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + var(--space-1))",
            left: 0,
            right: 0,
            padding: "var(--space-3)",
            background: "var(--color-surface)",
            border: "var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            zIndex: "var(--z-dropdown)",
            textAlign: "center",
            color: "var(--color-muted-strong)",
            fontSize: "var(--text-small)",
          }}
        >
          No results for "{query}"
        </div>
      )}
      <style>{`
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .search-container input:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
          border-color: var(--color-accent);
        }
      `}</style>
    </div>
  );
}