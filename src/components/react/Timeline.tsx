import { useState, useEffect, useRef, useCallback } from "react";

interface TimelineEvent {
  label: string;
  title: string;
  date?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const sortedEvents = [...events].sort((a, b) => {
    if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (sortedEvents.length === 0) return;

      let nextIndex = activeIndex;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = Math.min(activeIndex + 1, sortedEvents.length - 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = Math.max(activeIndex - 1, 0);
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = sortedEvents.length - 1;
      }

      if (nextIndex !== activeIndex) {
        setActiveIndex(nextIndex);
        itemRefs.current[nextIndex]?.focus();
      }
    },
    [activeIndex, sortedEvents.length]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches && activeIndex >= 0) {
      itemRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex]);

  if (sortedEvents.length === 0) {
    return <p style={{ color: "var(--color-muted)", fontSize: "var(--text-small)" }}>No timeline events yet.</p>;
  }

  return (
    <ul
      ref={listRef}
      role="list"
      aria-label="Timeline"
      onKeyDown={handleKeyDown}
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        borderLeft: "2px solid var(--color-border)",
        paddingLeft: "var(--space-4)",
        display: "grid",
        gap: "var(--space-3)",
      }}
    >
      {sortedEvents.map((event, i) => (
        <li
          key={`${event.label}-${event.title}-${i}`}
          ref={(el) => { itemRefs.current[i] = el; }}
          tabIndex={0}
          role="listitem"
          aria-label={`${event.label}: ${event.title}`}
          onFocus={() => setActiveIndex(i)}
          style={{
            padding: "var(--space-3)",
            borderRadius: "var(--radius-md)",
            background: activeIndex === i ? "var(--color-surface)" : "transparent",
            border: activeIndex === i ? "var(--border-strong)" : "1px solid transparent",
            transition: "background var(--motion-duration) var(--motion-ease), border-color var(--motion-duration) var(--motion-ease)",
            outline: "none",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-metadata)", color: "var(--color-muted)", margin: 0 }}>
            {event.label}
          </p>
          <p style={{ margin: "var(--space-1) 0 0", fontSize: "var(--text-body)" }}>
            {event.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
