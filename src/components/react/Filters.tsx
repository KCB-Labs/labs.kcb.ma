import { useState, useEffect, useCallback } from "react";

const LAB_STATUSES = ["active", "exploring", "paused", "archived"] as const;
type LabStatus = (typeof LAB_STATUSES)[number];

const PROJECT_TYPES = ["Internal", "Client", "Startup", "Collaboration", "Open Source", "Research"] as const;
type ProjectType = (typeof PROJECT_TYPES)[number];

const PROJECT_STAGES = ["Idea", "Validating", "Validated", "Implementation", "Live", "Completed", "Spun Out", "Archived"] as const;
type ProjectStage = (typeof PROJECT_STAGES)[number];

function readParam(key: string): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function setParam(key: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value === null || value === "") {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  window.history.replaceState({}, "", url.toString());
}

function dispatchFilterChange() {
  window.dispatchEvent(new CustomEvent("filters-changed"));
}

interface FilterButtonProps {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: "var(--space-1) var(--space-3)",
        fontSize: "var(--text-small)",
        fontFamily: "var(--font-mono)",
        border: active ? "var(--border-strong)" : "var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--color-accent)" : "var(--color-surface)",
        color: active ? "var(--color-bg)" : "var(--color-text)",
        cursor: "pointer",
        transition: "all var(--motion-duration) var(--motion-ease)",
      }}
    >
      {label}
    </button>
  );
}

interface FilterGroupProps {
  label: string;
  options: readonly string[];
  selected: string | null;
  paramKey: string;
  onSelect: (value: string | null) => void;
}

function FilterGroup({ label, options, selected, onSelect }: FilterGroupProps) {
  return (
    <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
      <legend style={{ fontSize: "var(--text-small)", fontFamily: "var(--font-mono)", color: "var(--color-muted)", marginBottom: "var(--space-2)" }}>
        {label}
      </legend>
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
        <FilterButton label="All" value="" active={selected === null} onClick={() => onSelect(null)} />
        {options.map((opt) => (
          <FilterButton key={opt} label={opt} value={opt} active={selected === opt} onClick={() => onSelect(opt)} />
        ))}
      </div>
    </fieldset>
  );
}

export function LabsFilters() {
  const [status, setStatus] = useState<LabStatus | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = readParam("status");
    if (saved && LAB_STATUSES.includes(saved as LabStatus)) {
      setStatus(saved as LabStatus);
    }
    setMounted(true);
  }, []);

  const handleStatusChange = useCallback((value: string | null) => {
    setStatus(value as LabStatus | null);
    setParam("status", value);
    dispatchFilterChange();
  }, []);

  if (!mounted) return null;

  return (
    <nav aria-label="Filter labs" style={{ marginBottom: "var(--space-4)" }}>
      <FilterGroup
        label="Status"
        options={LAB_STATUSES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
        selected={status ? status.charAt(0).toUpperCase() + status.slice(1) : null}
        paramKey="status"
        onSelect={(val) => handleStatusChange(val ? val.toLowerCase() : null)}
      />
    </nav>
  );
}

export function ProjectsFilters() {
  const [type, setType] = useState<ProjectType | null>(null);
  const [stage, setStage] = useState<ProjectStage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedType = readParam("type");
    const savedStage = readParam("stage");
    if (savedType && PROJECT_TYPES.includes(savedType as ProjectType)) {
      setType(savedType as ProjectType);
    }
    if (savedStage && PROJECT_STAGES.includes(savedStage as ProjectStage)) {
      setStage(savedStage as ProjectStage);
    }
    setMounted(true);
  }, []);

  const handleTypeChange = useCallback((value: string | null) => {
    setType(value as ProjectType | null);
    setParam("type", value);
    dispatchFilterChange();
  }, []);

  const handleStageChange = useCallback((value: string | null) => {
    setStage(value as ProjectStage | null);
    setParam("stage", value);
    dispatchFilterChange();
  }, []);

  if (!mounted) return null;

  return (
    <nav aria-label="Filter projects" style={{ marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      <FilterGroup
        label="Type"
        options={PROJECT_TYPES}
        selected={type}
        paramKey="type"
        onSelect={handleTypeChange}
      />
      <FilterGroup
        label="Stage"
        options={PROJECT_STAGES}
        selected={stage}
        paramKey="stage"
        onSelect={handleStageChange}
      />
    </nav>
  );
}
