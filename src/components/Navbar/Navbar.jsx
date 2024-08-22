import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleResumeClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleViewOrDownload = () => {
    setPopupOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About Me</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#certificates">Certificates</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <button onClick={handleResumeClick} className={styles.resumeBtn}>
              Resume
            </button>
          </li>
        </ul>
      </div>

      {popupOpen && (
        <div className={styles.popup}>
          <button className={styles.closeBtn} onClick={handleClosePopup}>
            X
          </button>
          <a
            href="/public/Resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            onClick={handleViewOrDownload}
          >
            View
          </a>
          <a
            href="public/Resume.pdf" 
            download
            className={styles.button}
            onClick={handleViewOrDownload}
          >
            Download
          </a>
        </div>
      )}
    </nav>
  );
};
