import React from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../data/blogs";
import styles from "./BlogList.module.css";

export const BlogList = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navBrand}>Dheeraj Pulijala — Writing</span>
        <button className={styles.homeBtn} onClick={() => navigate("/")}>
          ← Portfolio
        </button>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.subtitle}>
          Technical articles on .NET development, AI integration, and cloud architecture.
        </p>
      </div>

      <div className={styles.list}>
        {blogs.map((post) => (
          <article
            key={post.id}
            className={styles.card}
            onClick={() => navigate(`/blogs/${post.id}`)}
          >
            <div className={styles.cardMeta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.readTime}>{post.readTime}</span>
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardSummary}>{post.summary}</p>
            <span className={styles.readMore}>Read article →</span>
          </article>
        ))}
      </div>
    </div>
  );
};