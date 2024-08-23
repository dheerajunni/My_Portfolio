import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const handleResumeClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleViewOrDownload = () => {
    setPopupOpen(false);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <>
          <div className={styles.overlay} onClick={handleClosePopup}></div>
          <div ref={popupRef} className={styles.popup}>
            <button className={styles.closeBtn} onClick={handleClosePopup}>
              X
            </button>
            <a
              href="/Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              onClick={handleViewOrDownload}
            >
              View
            </a>
            <a
              href="/Resume.pdf" 
              download
              className={styles.button}
              onClick={handleViewOrDownload}
            >
              Download
            </a>
          </div>
        </>
      )}
    </nav>
  );
};
