import React, { useState, useEffect } from "react";
import styles from "./Welcome.module.css";

export const Welcome = () => {
  const [visible, setVisible] = useState(false);

 useEffect(() => {
  const seen = sessionStorage.getItem("welcomeSeen");
  if (!seen) {
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("welcomeSeen", "true");
    }, 500);
    return () => clearTimeout(timer);
  }
}, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.badge}>Welcome</div>
        <h1 className={styles.heading}>
          Hi, I'm <span className={styles.highlight}>Dheeraj</span>
        </h1>
       <p className={styles.tagline}> 
        I build production .NET applications and integrate AI into enterprise systems — currently serving as the primary developer for five production web systems at the State of New Mexico.
        </p>
        <div className={styles.divider} />
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Try the <strong>AI Assistant</strong> in the bottom right corner — ask it anything about my experience, skills, or projects.
          </p>
        </div>
        <button className={styles.btn} onClick={() => setVisible(false)}>
          Explore Portfolio →
        </button>
        <p className={styles.hint}>or click anywhere to dismiss</p>
      </div>
    </div>
  );
};