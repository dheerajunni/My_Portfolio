import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../data/blogs";
import styles from "./BlogList.module.css";

export const BlogList = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = blogs.filter((post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );
  });

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
        <input
          className={styles.search}
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.noResults}>No articles found for "{query}"</p>
        ) : (
          filtered.map((post) => (
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
          ))
        )}
      </div>
    </div>
  );
};