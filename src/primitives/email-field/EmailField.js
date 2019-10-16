import React from "react";
import md5 from "md5";
import styles from "./EmailField.module.scss";

export default function({ name, email, gravatarSize = 200 }) {
  const label = name || email;
  const hash = md5((email || "").trim().toLowerCase());
  const gravatarURL = new URL("https://www.gravatar.com");
  gravatarURL.pathname = `/avatar/${hash}`;
  gravatarURL.searchParams.append("size", gravatarSize);
  return (
    <span className={styles.email}>
      {email && <img src={gravatarURL} alt={label} />}
      {label}
    </span>
  );
}
