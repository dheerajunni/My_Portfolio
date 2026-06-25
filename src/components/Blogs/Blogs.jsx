import React from "react";
import styles from "./Blogs.module.css";
import { getImageUrl } from "../../utils";

export const Blogs = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Blogs and Articles</h1>
      <p className={styles.description}>
        Welcome to the Blogs and Articles section. Here you will find a collection of my writings and thoughts on various topics.
      </p>
      {/* Add content like blog entries or articles here */}
    </section>
  );
};
