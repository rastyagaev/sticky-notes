import React from "react";
import styles from "./ColorSelector.module.scss";

export default function ColorSelector({ color, colors = [], onSet }) {
  return (
    <ul className={styles.container}>
      {colors.map(c => (
        <li
          key={c}
          style={{ background: c }}
          data-selected={color === c}
          onClick={onSet.bind(null, c)}
        />
      ))}
    </ul>
  );
}
