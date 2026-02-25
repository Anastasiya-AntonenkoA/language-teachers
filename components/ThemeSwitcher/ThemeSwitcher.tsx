"use client";

import { useState } from "react";
import { useTheme, themes } from "../ThemeProvider/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { setTheme, currentTheme } = useTheme();
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={styles.themeMenuContainer}>
      <div className={`${styles.optionsList} ${isOpened ? styles.visible : ""}`}>
        {themes.map((theme, index) => (
          <button
            key={index}
            className={styles.themeOption}
            style={{ backgroundColor: theme.color }}
            onClick={() => {
              setTheme(index);
              setIsOpened(false);
            }}
          />
        ))}
      </div>
      <button 
        className={styles.themeToggle} 
        onClick={() => setIsOpened(!isOpened)}
        style={{ backgroundColor: currentTheme.color }}
      />
    </div>
  );
};

export default ThemeSwitcher;