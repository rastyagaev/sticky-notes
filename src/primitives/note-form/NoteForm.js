import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import Note from "../note";
import styles from "./NoteForm.module.scss";

export default function NoteForm({
  note,
  onSubmit,
  onDelete,
  defaultName = "",
  defaultEmail = ""
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Note rotate={note.get("rotate")} color={note.get("color")}>
        <TextareaAutosize
          defaultValue={note.get("text")}
          placeholder="Text"
          name="text"
        />
        <input
          type="text"
          name="name"
          defaultValue={note.get("name") || defaultName}
          placeholder="Your name"
        />
        <input
          type="email"
          name="email"
          defaultValue={note.get("email") || defaultEmail}
          placeholder="Email"
        />
        <footer>
          <button type="submit">Save</button>
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </footer>
      </Note>
    </form>
  );
}
