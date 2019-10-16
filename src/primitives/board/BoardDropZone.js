import React from "react";
import { useDrop } from "react-dnd";
import EmailField from "../email-field";
import Note from "../note";
import styles from "./Board.module.scss";

export default function BoardDropZone({ onAdd, onEdit, notes, colors }) {
  function handleNoteDrop(_, monitor) {
    const { x, y } = monitor.getSourceClientOffset();
    onAdd({ x, y });
  }
  const [, drop] = useDrop({ accept: colors, drop: handleNoteDrop });

  return (
    <div className={styles.board} ref={drop}>
      {notes.map(note => (
        <div
          key={note.id}
          style={{ top: note.get("y"), left: note.get("x") }}
          className={styles.note}
          onClick={onEdit.bind(null, note)}
        >
          <Note rotate={note.get("rotate")} color={note.get("color")}>
            <div>{note.get("text")}</div>
            <div>
              {note
                .get("created")
                .toDate()
                .toLocaleDateString()}
            </div>
            <EmailField name={note.get("name")} email={note.get("email")} />
          </Note>
        </div>
      ))}
    </div>
  );
}
