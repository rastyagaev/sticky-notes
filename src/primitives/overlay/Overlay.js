import React from "react";
import styles from "./Overlay.module.scss";

export default function Overlay({ onClose, children }) {
  return (
    <div
      className={styles.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  );
}
