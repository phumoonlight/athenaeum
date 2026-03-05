"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ClipboardItem {
  id: string;
  text: string;
  label: string;
  createdAt: number;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const STORAGE_KEY = "clipboard-store-items";

export default function ClipboardStorePage() {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);
  const [importToast, setImportToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);


  // Load from localStorage after hydration.
  // Calling setState inside a mount-only effect is the correct Next.js pattern
  // for syncing client-only APIs (localStorage) that don't exist on the server.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as ClipboardItem[]); // eslint-disable-line
    } catch { }
    setIsMounted(true);
  }, []);

  // Persist to localStorage (only after mount to avoid overwriting with [])
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isMounted]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Auto-resize edit textarea
  useEffect(() => {
    if (editTextareaRef.current) {
      editTextareaRef.current.style.height = "auto";
      editTextareaRef.current.style.height = `${editTextareaRef.current.scrollHeight}px`;
    }
  }, [editText]);

  const handleAdd = useCallback(() => {
    if (!text.trim()) return;
    setIsAdding(true);
    setTimeout(() => {
      const newItem: ClipboardItem = {
        id: generateId(),
        text: text.trim(),
        label: label.trim() || "",
        createdAt: Date.now(),
      };
      setItems((prev) => [newItem, ...prev]);
      setText("");
      setLabel("");
      setIsAdding(false);
      setShowForm(false);
    }, 150);
  }, [text, label]);

  const handleCopy = useCallback(async (item: ClipboardItem) => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for HTTP
      const el = document.createElement("textarea");
      el.value = item.text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const handleRequestDelete = useCallback((id: string) => {
    setConfirmDeleteId(id);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setConfirmDeleteId(null);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setConfirmDeleteId(null);
    setDeletingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAdd();
    }
    if (e.key === "Escape") {
      setShowForm(false);
      setText("");
      setLabel("");
    }
  };

  const handleStartEdit = useCallback((item: ClipboardItem) => {
    setConfirmDeleteId(null);
    setEditingId(item.id);
    setEditLabel(item.label);
    setEditText(item.text);
    setTimeout(() => editTextareaRef.current?.focus(), 50);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditText("");
    setEditLabel("");
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!editText.trim() || !editingId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? { ...item, text: editText.trim(), label: editLabel.trim() }
          : item
      )
    );
    setEditingId(null);
    setEditText("");
    setEditLabel("");
  }, [editText, editLabel, editingId]);

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  const handleExport = useCallback(() => {
    const exportData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      count: items.length,
      items,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clipboard-store-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [items]);

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset so same file can be re-imported
    e.target.value = "";

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string);
        // Accept both { items: [...] } wrapper format and bare arrays
        const incoming: ClipboardItem[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw.items)
            ? raw.items
            : null;

        if (!incoming) throw new Error("Unrecognised format");

        // Validate each item has required fields
        const valid = incoming.filter(
          (i) =>
            typeof i.id === "string" &&
            typeof i.text === "string" &&
            typeof i.createdAt === "number"
        );

        if (valid.length === 0) throw new Error("No valid snippets found");

        // Merge: skip items whose ID already exists
        setItems((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          const newOnes = valid.filter((i) => !existingIds.has(i.id));
          return [...newOnes, ...prev];
        });

        const skipped = valid.length !== incoming.length
          ? ` (${incoming.length - valid.length} invalid skipped)`
          : "";
        setImportToast({ type: "success", message: `Imported ${valid.length} snippet${valid.length !== 1 ? "s" : ""}${skipped}` });
      } catch (err) {
        setImportToast({ type: "error", message: `Import failed: ${err instanceof Error ? err.message : "Invalid file"}` });
      }
      setTimeout(() => setImportToast(null), 4000);
    };
    reader.readAsText(file);
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.id === editingId ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: "100vh", padding: "0 0 80px" }}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10, 10, 15, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 24px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px var(--accent-glow)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="4" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M12 12h4M12 16h4M8 12h.01M8 16h.01" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
                Clipboard Store
              </h1>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
                {items.length} {items.length === 1 ? "snippet" : "snippets"}
              </p>
            </div>
          </div>

          {/* Search */}
          <div style={{ flex: 1, position: "relative" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="search-input"
              type="text"
              placeholder="Search snippets…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "8px 12px 8px 36px",
                color: "var(--text-primary)",
                fontSize: 13,
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Export button */}
          <button
            id="export-btn"
            onClick={handleExport}
            disabled={items.length === 0}
            title="Export snippets as JSON"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "8px 10px",
              color: items.length === 0 ? "var(--text-muted)" : "var(--text-secondary)",
              cursor: items.length === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
              fontFamily: "inherit",
              flex: "0 0 auto",
            }}
            onMouseEnter={(e) => {
              if (items.length > 0) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color = items.length === 0 ? "var(--text-muted)" : "var(--text-secondary)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          {/* Import button */}
          <button
            id="import-btn"
            onClick={() => importFileRef.current?.click()}
            title="Import snippets from JSON"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "8px 10px",
              color: "var(--text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
              fontFamily: "inherit",
              flex: "0 0 auto",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          {/* Hidden file input for import */}
          <input
            ref={importFileRef}
            id="import-file-input"
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            style={{ display: "none" }}
          />
          <button
            id="add-snippet-btn"
            onClick={() => {
              setShowForm((v) => !v);
              setTimeout(() => textareaRef.current?.focus(), 50);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: showForm ? "var(--bg-card)" : "linear-gradient(135deg, #6c63ff, #a78bfa)",
              border: showForm ? "1px solid var(--border)" : "none",
              borderRadius: 10,
              padding: "8px 14px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              boxShadow: showForm ? "none" : "0 0 20px var(--accent-glow)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d={showForm ? "M18 6L6 18M6 6l12 12" : "M12 5v14M5 12h14"} />
            </svg>
            {showForm ? "Cancel" : "Add"}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 24px 0" }}>
        {/* Add Form */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: showForm ? "400px" : "0",
            opacity: showForm ? 1 : 0,
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            marginBottom: showForm ? 24 : 0,
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-focus)",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 0 40px rgba(108, 99, 255, 0.12)",
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-2)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              New Snippet
            </p>

            {/* Label input */}
            <input
              id="label-input"
              type="text"
              placeholder="Label (optional)…"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "9px 14px",
                color: "var(--text-primary)",
                fontSize: 13,
                outline: "none",
                marginBottom: 10,
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            {/* Text area */}
            <textarea
              id="text-input"
              ref={textareaRef}
              placeholder="Paste or type your text here… (Ctrl+Enter to save)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              style={{
                width: "100%",
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "var(--text-primary)",
                fontSize: 13,
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                lineHeight: 1.6,
                display: "block",
                overflow: "hidden",
                minHeight: 90,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {text.length > 0 && `${text.length} characters`}
              </p>
              <button
                id="save-snippet-btn"
                onClick={handleAdd}
                disabled={!text.trim() || isAdding}
                style={{
                  background: text.trim() ? "linear-gradient(135deg, #6c63ff, #a78bfa)" : "var(--bg-input)",
                  border: "none",
                  borderRadius: 10,
                  padding: "9px 20px",
                  color: text.trim() ? "#fff" : "var(--text-muted)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: text.trim() ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: text.trim() ? "0 0 20px var(--accent-glow)" : "none",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Snippet
              </button>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            {searchQuery ? (
              <>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>No snippets match &ldquo;{searchQuery}&rdquo;</p>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>Try a different search term</p>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="9" y="2" width="6" height="4" rx="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: 15, fontWeight: 500 }}>No snippets yet</p>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
                  Click <strong style={{ color: "var(--accent-2)" }}>Add</strong> to save your first snippet
                </p>
              </>
            )}
          </div>
        )}

        {/* Items list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredItems.map((item, index) => {
            const isCopied = copiedId === item.id;
            const isDeleting = deletingIds.has(item.id);
            const isPendingDelete = confirmDeleteId === item.id;
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                id={`snippet-${item.id}`}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isEditing ? "var(--border-focus)" : isPendingDelete ? "var(--danger)" : isCopied ? "var(--success)" : "var(--border)"}`,
                  borderRadius: 14,
                  padding: isEditing ? "16px 20px" : "14px 16px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  opacity: isDeleting ? 0 : 1,
                  transform: isDeleting ? "translateX(20px) scale(0.97)" : "translateX(0) scale(1)",
                  animationName: "slideIn",
                  animationDuration: "0.3s",
                  animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                  animationDelay: `${Math.min(index * 30, 150)}ms`,
                  animationFillMode: "both",
                  boxShadow: isEditing
                    ? "0 0 40px rgba(108, 99, 255, 0.12)"
                    : isPendingDelete
                      ? "0 0 24px rgba(248, 113, 113, 0.12)"
                      : isCopied
                        ? "0 0 20px rgba(52, 211, 153, 0.15)"
                        : "none",
                }}
              >
                {isEditing ? (
                  /* Inline edit form */
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-2)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Edit Snippet
                    </p>
                    <input
                      type="text"
                      placeholder="Label (optional)…"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      style={{
                        width: "100%",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "9px 14px",
                        color: "var(--text-primary)",
                        fontSize: 13,
                        outline: "none",
                        marginBottom: 10,
                        fontFamily: "inherit",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                    <textarea
                      ref={editTextareaRef}
                      placeholder="Text…"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      rows={3}
                      style={{
                        width: "100%",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "10px 14px",
                        color: "var(--text-primary)",
                        fontSize: 13,
                        outline: "none",
                        resize: "none",
                        fontFamily: "inherit",
                        lineHeight: 1.6,
                        display: "block",
                        overflow: "hidden",
                        minHeight: 90,
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {editText.length > 0 && `${editText.length} characters`}
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={handleCancelEdit}
                          style={{
                            background: "var(--bg-input)",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            padding: "9px 16px",
                            color: "var(--text-secondary)",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            fontFamily: "inherit",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-focus)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          disabled={!editText.trim()}
                          style={{
                            background: editText.trim() ? "linear-gradient(135deg, #6c63ff, #a78bfa)" : "var(--bg-input)",
                            border: "none",
                            borderRadius: 10,
                            padding: "9px 20px",
                            color: editText.trim() ? "#fff" : "var(--text-muted)",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: editText.trim() ? "pointer" : "not-allowed",
                            transition: "all 0.2s",
                            fontFamily: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            boxShadow: editText.trim() ? "0 0 20px var(--accent-glow)" : "none",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                          </svg>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Index badge */}
                    <div
                      style={{
                        flex: "0 0 auto",
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: isCopied ? "rgba(52,211,153,0.15)" : "var(--bg-input)",
                        border: `1px solid ${isCopied ? "var(--success)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: isCopied ? "var(--success)" : "var(--text-muted)",
                        transition: "all 0.3s",
                        marginTop: 1,
                      }}
                    >
                      {isCopied ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {item.label && (
                        <p style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--accent-2)",
                          marginBottom: 4,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {item.label}
                        </p>
                      )}
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--text-primary)",
                          lineHeight: 1.65,
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          maxHeight: 120,
                          overflow: "hidden",
                          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                        }}
                      >
                        {item.text}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
                        {timeAgo(item.createdAt)}
                        {" · "}
                        {item.text.length} chars
                      </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 6, flex: "0 0 auto", marginTop: 1, alignItems: "center" }}>
                      {/* Copy button — hidden while confirming delete */}
                      {!isPendingDelete && (
                        <button
                          id={`copy-btn-${item.id}`}
                          onClick={() => handleCopy(item)}
                          title="Copy to clipboard"
                          style={{
                            background: isCopied ? "rgba(52,211,153,0.15)" : "var(--bg-input)",
                            border: `1px solid ${isCopied ? "var(--success)" : "var(--border)"}`,
                            borderRadius: 8,
                            padding: "6px 10px",
                            color: isCopied ? "var(--success)" : "var(--text-secondary)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 500,
                            transition: "all 0.2s",
                            fontFamily: "inherit",
                          }}
                          onMouseEnter={(e) => {
                            if (!isCopied) {
                              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card-hover)";
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isCopied) {
                              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-input)";
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                            }
                          }}
                        >
                          {isCopied ? (
                            <>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      )}

                      {/* Edit button — hidden while confirming delete */}
                      {!isPendingDelete && (
                        <button
                          id={`edit-btn-${item.id}`}
                          onClick={() => handleStartEdit(item)}
                          title="Edit snippet"
                          style={{
                            background: "var(--bg-input)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            padding: "6px 10px",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 500,
                            transition: "all 0.2s",
                            fontFamily: "inherit",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card-hover)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-input)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </button>
                      )}

                      {/* Delete — inline confirm flow */}
                      {isPendingDelete ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "rgba(248,113,113,0.08)",
                            border: "1px solid var(--danger)",
                            borderRadius: 8,
                            padding: "5px 10px",
                            animation: "fadeIn 0.15s ease",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                          <span style={{ fontSize: 12, color: "var(--danger)", fontWeight: 600, whiteSpace: "nowrap" }}>
                            Delete?
                          </span>
                          {/* Confirm */}
                          <button
                            id={`confirm-delete-btn-${item.id}`}
                            onClick={() => handleDelete(item.id)}
                            title="Yes, delete"
                            style={{
                              background: "var(--danger)",
                              border: "none",
                              borderRadius: 6,
                              padding: "3px 8px",
                              color: "#fff",
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontFamily: "inherit",
                              transition: "opacity 0.15s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Yes
                          </button>
                          {/* Cancel */}
                          <button
                            id={`cancel-delete-btn-${item.id}`}
                            onClick={handleCancelDelete}
                            title="Cancel"
                            style={{
                              background: "transparent",
                              border: "none",
                              borderRadius: 6,
                              padding: "3px 6px",
                              color: "var(--text-muted)",
                              fontSize: 11,
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontFamily: "inherit",
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)")}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          id={`delete-btn-${item.id}`}
                          onClick={() => handleRequestDelete(item.id)}
                          title="Delete snippet"
                          style={{
                            background: "var(--bg-input)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            padding: "6px 8px",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s",
                            fontFamily: "inherit",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,113,113,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--danger)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--danger)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-input)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Import/Export toast */}
      {importToast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: importToast.type === "success" ? "rgba(20,30,25,0.97)" : "rgba(30,15,15,0.97)",
            border: `1px solid ${importToast.type === "success" ? "var(--success)" : "var(--danger)"}`,
            borderRadius: 12,
            padding: "12px 18px",
            boxShadow: `0 8px 32px ${importToast.type === "success" ? "rgba(52,211,153,0.18)" : "rgba(248,113,113,0.18)"}`,
            animation: "slideUp 0.25s cubic-bezier(0.4,0,0.2,1)",
            whiteSpace: "nowrap",
          }}
        >
          {importToast.type === "success" ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          <span style={{ fontSize: 13, fontWeight: 500, color: importToast.type === "success" ? "var(--success)" : "var(--danger)" }}>
            {importToast.message}
          </span>
          <button
            onClick={() => setImportToast(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0 0 0 4px",
              display: "flex",
              marginLeft: 4,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </main>
  );
}
