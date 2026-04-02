import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeSwitcher.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const themes = [
  { label: "Light", value: "light", color: "#7427a1" },
  { label: "Dark", value: "dark", color: "#0f0f12" },
  { label: "Electric", value: "electric", color: "#3b82f6" },
  { label: "Emerald", value: "emerald", color: "#10b981" },
];

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeTheme = themes.find((t) => t.value === theme);

  return (
    <div className="theme-switcher" ref={ref}>

      <button
        className="theme-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className="theme-dot"
          style={{ background: activeTheme?.color }}
        />
        {activeTheme?.label}
        <span className={`arrow ${open ? "open" : ""}`}>
          {open ? (
            <ChevronUp className="icon icon-up" size={16} />
          ) : (
            <ChevronDown className="icon icon-down" size={16} />
          )}
        </span>
      </button>

      {open && (
        <div className="theme-dropdown-menu">
          {themes.map((t) => (
            <div
              key={t.value}
              className={`theme-option ${theme === t.value ? "active" : ""
                }`}
              onClick={() => {
                changeTheme(t.value);
                setOpen(false);
              }}
            >
              <span
                className="theme-dot"
                style={{ background: t.color }}
              />
              {t.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;