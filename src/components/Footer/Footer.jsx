import React from "react";
import styles from "./Footer.module.css";
import { getImageUrl } from "../../utils";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/dheerajunni" target="_blank" rel="noopener noreferrer">
            <img src={getImageUrl("contact/githubIcon.png")} alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/pulijala-dheeraj/" target="_blank" rel="noopener noreferrer">
            <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon"/>
          </a>
          <a href="mailto:dheerajpulijala@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          </a>
        </div>
        <div className={styles.text}>
          <p>&copy; 2024 Dheeraj Pulijala. All rights reserved.</p>
        </div>
      </div>
      <button className={styles.goToTop} onClick={scrollToTop} aria-label="Go to top">
        <span className={styles.arrow}>↑</span>
        <span className={styles.label}>Go to Top</span>
      </button>
    </footer>
  );
};
