import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../../data/blogs";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql";
import cs from "react-syntax-highlighter/dist/esm/languages/hljs/csharp";
import styles from "./BlogPost.module.css";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("csharp", cs);

const parseContent = (content) => {
  const lines = content.split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.replace("```", "").trim() || "javascript";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "code", lang, content: codeLines.join("\n") });
    } else if (line.startsWith("## ")) {
      const text = line.replace("## ", "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      blocks.push({ type: "h2", text, id });
    } else if (line.trim() === "") {
      blocks.push({ type: "spacer" });
    } else {
      blocks.push({ type: "p", text: line });
    }
    i++;
  }
  return blocks;
};

const extractHeadings = (content) => {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.replace("## ", "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { text, id };
    });
};

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogs.find((b) => b.id === id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const articleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const article = articleRef.current;
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const articleHeight = article.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(100, (scrolled / (articleHeight - window.innerHeight)) * 100);
      setScrollProgress(isNaN(progress) ? 0 : progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!post) return;
    const headings = extractHeadings(post.content);
    const observers = [];
    headings.forEach(({ id: hId }) => {
      const el = document.getElementById(hId);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHeading(hId);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [post]);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found.</h2>
        <button onClick={() => navigate("/blogs")}>Back to Articles</button>
      </div>
    );
  }

  const blocks = parseContent(post.content);
  const headings = extractHeadings(post.content);

  const getTocClass = (hId) => {
    return hId === activeHeading
      ? styles.tocLink + " " + styles.tocActive
      : styles.tocLink;
  };

  return (
    <div className={styles.page}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: scrollProgress + "%" }} />
      </div>

      <nav className={styles.nav}>
        <span className={styles.navBrand}>Dheeraj Pulijala — Writing</span>
        <button className={styles.backBtn} onClick={() => navigate("/blogs")}>
          Back to Articles
        </button>
      </nav>

      <div className={styles.layout}>
        {headings.length > 0 && (
          <aside className={styles.toc}>
            <p className={styles.tocTitle}>On this page</p>
            <ul className={styles.tocList}>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={"#" + heading.id}
                    className={getTocClass(heading.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(heading.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <article className={styles.article} ref={articleRef}>
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
            {blocks.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} id={block.id} className={styles.heading2}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "code") {
                return (
                  <div key={i} className={styles.codeBlock}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeLang}>{block.lang}</span>
                    </div>
                    <SyntaxHighlighter
                      language={block.lang}
                      style={atomOneDark}
                      customStyle={{
                        margin: 0,
                        borderRadius: "0 0 8px 8px",
                        fontSize: "13px",
                        padding: "20px",
                      }}
                    >
                      {block.content}
                    </SyntaxHighlighter>
                  </div>
                );
              }
              if (block.type === "spacer") {
                return <br key={i} />;
              }
              return (
                <p key={i} className={styles.paragraph}>
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className={styles.footer}>
            <button className={styles.backBtn} onClick={() => navigate("/blogs")}>
              Back to Articles
            </button>
            <a href="https://dheerajpulijala.com" className={styles.portfolioLink}>
              View Portfolio
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};