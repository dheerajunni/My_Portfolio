import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../../data/blogs";
import styles from "./BlogPost.module.css";

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogs.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found.</h2>
        <button onClick={() => navigate("/blogs")}>← Back to Articles</button>
      </div>
    );
  }

  const renderContent = (content) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className={styles.heading2}>{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("```")) {
        return null;
      }
      if (line.trim() === "") {
        return <br key={i} />;
      }
      return <p key={i} className={styles.paragraph}>{line}</p>;
    });
  };

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navBrand}>Dheeraj Pulijala — Writing</span>
        <button className={styles.backBtn} onClick={() => navigate("/blogs")}>
          ← All Articles
        </button>
      </nav>

      <article className={styles.article}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.dot}>·</span>
          <span>{post.date}</span>
          <span className={styles.dot}>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.summary}>{post.summary}</p>
        <hr className={styles.divider} />
        <div className={styles.content}>
          {renderContent(post.content)}
        </div>

        <div className={styles.footer}>
          <button className={styles.backBtn} onClick={() => navigate("/blogs")}>
            ← Back to Articles
          </button>
          <a href="https://dheerajpulijala.netlify.app" className={styles.portfolioLink}>
            View Portfolio →
          </a>
        </div>
      </article>
    </div>
  );
};