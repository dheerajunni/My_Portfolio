import React from "react";
import styles from "./Experience.module.css";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.content}>
        <ul className={styles.history}>
          {history.map((historyItem, id) => (
            <li key={id} className={`${styles.historyItem} ${styles.fadeIn} ${styles[`delay-${id}`]}`}>
              <img
                src={getImageUrl(historyItem.imageSrc)}
                alt={`${historyItem.organisation} Logo`}
                className={styles.historyItemImage}
              />
              <div className={styles.historyItemText}>
                <h3 className={styles.historyItemTitle}>
                  {`${historyItem.role}, ${historyItem.organisation}`}
                </h3>
                <p className={styles.historyItemDate}>
                  {`${historyItem.startDate} - ${historyItem.endDate}`}
                </p>
                <ul className={styles.experienceList}>
                  {historyItem.experiences.map((experience, expId) => (
                    <li key={expId} className={styles.experienceListItem}>
                      {experience}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};







