"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Image from "next/image";

type Theme = {
  class: string;
  color: string;
  bgLight: string;
  image: string;
};

const themes: Theme[] = [
  { class: "", color: "#F4C550", bgLight: "#FBE9BA", image: "/images/yellow.png" },
  { class: styles.themeGreen, color: "#9FBAAE", bgLight: "#CBDED3", image: "/images/green.png" },
  { class: styles.themeBlue, color: "#9FB7CE", bgLight: "#BFD6EA", image: "/images/blue.png" },
  { class: styles.themeRed, color: "#E0A39A", bgLight: "#F2C0BD", image: "/images/red.png" },
  { class: styles.themeOrange, color: "#F0AA8D", bgLight: "#F4C8BA", image: "/images/orange.png" },
];

export default function Home() {
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedThemeIdx");
    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentThemeIdx(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentThemeIdx];
    if (!theme) return;

    document.documentElement.style.setProperty('--main-color', theme.color);
    document.documentElement.style.setProperty('--bg-light', theme.bgLight);

    localStorage.setItem("selectedThemeIdx", currentThemeIdx.toString());
  }, [currentThemeIdx]);

  const currentTheme = themes[currentThemeIdx];

  return (
    <div className={`${styles.page} ${currentTheme.class}`}>
      <div 
        className={styles.page} 
        style={{ 
          '--main-color': currentTheme.color,
          '--bg-light': currentTheme.bgLight
        } as React.CSSProperties}
      >
      <Header />

      <main className={styles.mainContent}>        
        <section className={styles.heroContainer}>
          <div className={styles.leftCard}>
            <h1 className={styles.title}>
              Unlock your potential with <br /> 
              the best <span className={styles.highlight}>language</span> tutors
            </h1>
            <p style={{ maxWidth: '471px', marginBottom: '64px' }}>
              Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
            </p>
            <button className={styles.btn}>Get started</button>
          </div>

          {/* Права частина з картинкою */}
          <div className={styles.rightCard}>
            <Image
              src={currentTheme.image} 
              alt="Tutor"
              fill 
              priority
              className={styles.heroImage} 
              sizes="(max-width: 768px) 568px, 530px"
            />
          </div>
        </section>

        <div className={styles.statsBar}>
          <div><strong>32,000 +</strong> Experienced tutors</div>
          <div><strong>300,000 +</strong> 5-star reviews</div>
          <div><strong>120 +</strong> Subjects taught</div>
          <div><strong>200 +</strong> Tutor nationalities</div>
        </div>

        <div className={styles.themeMenuContainer}>
          <div className={`${styles.optionsList} ${isOpened ? styles.visible : ""}`}>
            {themes.map((theme, index) => (
              <button
                key={index}
                className={styles.themeOption}
                style={{ backgroundColor: theme.color }}
                onClick={() => {
                  setCurrentThemeIdx(index);
                  setIsOpened(false);
                }}
                title={`Обрати тему ${index + 1}`}
              />
            ))}
          </div>

          <button 
            className={styles.themeToggle} 
            onClick={() => setIsOpened(!isOpened)}
            style={{ backgroundColor: currentTheme.color }}
          ></button>
        </div>
      </main>
      </div>
    </div>
  );
}