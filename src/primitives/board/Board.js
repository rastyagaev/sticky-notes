import React, { useState } from "react";
import { random } from "lodash";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {
  Container as OverlayContainer,
  createOverlay,
  closeOverlay
} from "../overlay";
import ColorSelector from "../color-selector";
import NoteForm from "../note-form";
import NewNote from "./NewNote";
import BoardDropZone from "./BoardDropZone";
import styles from "./Board.module.scss";

const COLORS = [
  "#E0FEFE",
  "#C7CEEA",
  "#FFDAC1",
  "#FF9AA2",
  "#FFFFD8",
  "#B5EAD7"
];

const MAX_ROTATE = 3.0;

function useRandom(min, max) {
  const [value, setValue] = useState(random(min, max));
  return [value, () => setValue(random(min, max))];
}

export default function Board({
  notes = [],
  onDelete = () => {},
  onUpdate = () => {},
  onAdd = () => {}
}) {
  const [rotate, resetRotate] = useRandom(-1 * MAX_ROTATE, MAX_ROTATE);
  const [color, setColor] = useState(COLORS[0]);

  async function handleAddNote({ x, y }) {
    const note = await onAdd({ x, y, rotate, color });
    handleNoteEdit(note);
    resetRotate();
  }

  async function handleNoteSave(note, event) {
    event.preventDefault();
    const text = event.target["text"].value;
    const email = event.target["email"].value;
    await onUpdate(note, { text, email });
    closeOverlay();
  }

  async function handleNoteDelete(note) {
    await onDelete(note);
    closeOverlay();
  }

  function handleNoteEdit(note) {
    createOverlay(
      <div
        style={{ top: note.get("y"), left: note.get("x") }}
        className={styles.note}
      >
        <NoteForm
          note={note}
          onSubmit={handleNoteSave.bind(null, note)}
          onDelete={handleNoteDelete.bind(null, note)}
        />
      </div>
    );
  }

  return (
    <>
      <OverlayContainer />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <BoardDropZone
            onEdit={handleNoteEdit}
            onAdd={handleAddNote}
            notes={notes}
            colors={COLORS}
          />
          <div className={styles.controls}>
            <div className={styles.newNote}>
              <NewNote rotate={rotate} color={color} />
            </div>
            <ColorSelector color={color} colors={COLORS} onSet={setColor} />
            <h2>
              <a href="/" target="_blank">
                New board
              </a>
            </h2>
          </div>
        </div>
      </DndProvider>
    </>
  );
}
