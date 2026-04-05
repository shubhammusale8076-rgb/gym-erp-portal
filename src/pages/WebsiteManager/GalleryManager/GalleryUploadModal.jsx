import React, { useState, useRef } from "react";
import "./GalleryUploadModal.css";

const CATEGORIES = ["INTERIOR", "EQUIPMENT", "TRAINING", "EXTERIOR", "EVENTS"];

const GalleryUploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({}); // { filename: percent }
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [metaMap, setMetaMap] = useState({}); // { filename: { title, altText, category } }

  if (!isOpen) return null;

  const addFiles = (newFiles) => {
    const arr = Array.from(newFiles).filter((f) =>
      ["image/png", "image/jpeg", "image/webp"].includes(f.type)
    );
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      return [...prev, ...arr.filter((f) => !existing.has(f.name))];
    });
    setMetaMap((prev) => {
      const next = { ...prev };
      arr.forEach((f) => {
        if (!next[f.name]) {
          next[f.name] = { title: "", altText: "", category: "INTERIOR" };
        }
      });
      return next;
    });
    // Simulate upload progress for demo purposes
    arr.forEach((f) => {
      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.floor(Math.random() * 15) + 5;
        if (pct >= 100) {
          pct = 100;
          clearInterval(interval);
        }
        setUploadProgress((prev) => ({ ...prev, [f.name]: pct }));
      }, 200);
    });
  };

  const handleFileInput = (e) => addFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleMetaChange = (filename, field, value) => {
    setMetaMap((prev) => ({
      ...prev,
      [filename]: { ...prev[filename], [field]: value },
    }));
  };

  const removeFile = (filename) => {
    setFiles((prev) => prev.filter((f) => f.name !== filename));
    setUploadProgress((prev) => {
      const next = { ...prev };
      delete next[filename];
      return next;
    });
    setMetaMap((prev) => {
      const next = { ...prev };
      delete next[filename];
      return next;
    });
  };

  const handleSubmit = async () => {
    if (files.length === 0) return alert("Please select at least one image.");
    try {
      setLoading(true);
      // TODO: integrate real upload logic here
      await new Promise((res) => setTimeout(res, 1200));
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="gum-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="gum-modal">
        {/* Header */}
        <div className="gum-header">
          <div>
            <h2 className="gum-title">Upload New Assets</h2>
            <p className="gum-subtitle">
              Enhance your gallery with high-fidelity visual storytelling.
            </p>
          </div>
          <button className="gum-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Drag & Drop Zone */}
        <div
          className={`gum-dropzone${dragging ? " gum-dropzone--active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="gum-drop-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="var(--accent-soft, #ede9fe)" />
              <path
                d="M12 16V8M12 8l-3 3M12 8l3 3"
                stroke="var(--accent, #7c3aed)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 16h10"
                stroke="var(--accent, #7c3aed)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="gum-drop-title">Drag and drop images here</p>
          <p className="gum-drop-hint">PNG, JPG or WebP up to 10MB each</p>
          <button
            className="gum-browse-btn"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            Browse Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
        </div>

        {/* Upload Progress */}
        {files.length > 0 && (
          <div className="gum-progress-list">
            {files.map((f) => {
              const pct = uploadProgress[f.name] ?? 0;
              return (
                <div key={f.name} className="gum-progress-item">
                  <div className="gum-progress-info">
                    <div className="gum-progress-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="var(--accent-soft, #ede9fe)" />
                        <path d="M8 17l4-10 4 10M9.5 13.5h5" stroke="var(--accent, #7c3aed)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="gum-progress-name">{f.name}</span>
                    <span className="gum-progress-pct">{pct}%</span>
                    <button
                      className="gum-remove-btn"
                      onClick={() => removeFile(f.name)}
                      title="Remove"
                    >×</button>
                  </div>
                  <div className="gum-bar-track">
                    <div
                      className="gum-bar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Queue & Metadata */}
        {files.length > 0 && (
          <div className="gum-queue">
            <p className="gum-queue-label">QUEUE &amp; METADATA</p>
            <div className="gum-queue-list">
              {files.map((f) => {
                const meta = metaMap[f.name] || { title: "", altText: "", category: "INTERIOR" };
                const previewUrl = URL.createObjectURL(f);
                return (
                  <div key={f.name} className="gum-queue-item">
                    <div
                      className="gum-thumb"
                      style={{ backgroundImage: `url(${previewUrl})` }}
                    />
                    <div className="gum-meta-fields">
                      <div className="gum-field-row">
                        <div className="gum-field gum-field--full">
                          <label className="gum-field-label">TITLE</label>
                          <input
                            className="gum-input"
                            placeholder="e.g. Main Lifting Platform"
                            value={meta.title}
                            onChange={(e) => handleMetaChange(f.name, "title", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="gum-field-row">
                        <div className="gum-field">
                          <label className="gum-field-label">ALT TEXT (SEO)</label>
                          <input
                            className="gum-input"
                            placeholder="Describe this image"
                            value={meta.altText}
                            onChange={(e) => handleMetaChange(f.name, "altText", e.target.value)}
                          />
                        </div>
                        <div className="gum-field">
                          <label className="gum-field-label">CATEGORY</label>
                          <select
                            className="gum-input gum-select"
                            value={meta.category}
                            onChange={(e) => handleMetaChange(f.name, "category", e.target.value)}
                          >
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c.charAt(0) + c.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="gum-file-size">{formatSize(f.size)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="gum-footer">
          <button className="gum-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="gum-upload-btn"
            onClick={handleSubmit}
            disabled={loading || files.length === 0}
          >
            {loading ? "Uploading…" : "Upload to Gallery"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryUploadModal;