import React from "react";
import { useTheme } from "../../context/ThemeContext";
import './ThemeSwitcher.css'

const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
];

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="theme-dropdown"
      >
        {themes.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;