import React from "react";
import md5 from "md5";
import styles from "./EmailField.module.scss";

export default function({ email, gravatarSize = 200 }) {
  const hash = md5((email || "").trim().toLowerCase());
  const gravatarURL = new URL("https://www.gravatar.com");
  gravatarURL.pathname = `/avatar/${hash}`;
  gravatarURL.searchParams.append("size", gravatarSize);
  return (
    <span className={styles.email}>
      {email && <img src={gravatarURL} alt={email} />}
      {email}
    </span>
  );
}
