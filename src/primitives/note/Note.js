import React from "react";
import styles from "./Note.module.scss";

export default function Note({ children, className, color, rotate = 0 }) {
  return (
    <div
      className={`${styles.note} ${className} `}
      style={{ transform: `rotate(${rotate}deg)`, background: color }}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
