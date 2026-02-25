"use client";

import { useTheme } from "@/components/ThemeProvider/ThemeContext";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <div className={styles.page}>
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
      </main>
    </div>
  );
}