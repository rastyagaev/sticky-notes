import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  subscribeToNotes,
  createNote,
  updateNote,
  deleteNote
} from "state/notes";
import Board from "primitives/board";
import styles from "./Board.module.scss";

export default function BoardPage() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.collection);

  useEffect(() => {
    // returns unsibscribe()
    return dispatch(subscribeToNotes({ boardId }));
  }, [boardId, dispatch]);

  function handleCreateNote(note) {
    return dispatch(createNote({ boardId, ...note }));
  }

  function handleUpdateNote(note, { name = "", email = "", ...data }) {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    return dispatch(updateNote(note, { name, email, ...data }));
  }

  function handleDeleteNote(note) {
    return dispatch(deleteNote(note));
  }

  return (
    <div className={styles.boardPage}>
      <Board
        notes={notes}
        onAdd={handleCreateNote}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
        defaultName={window.localStorage.getItem("name")}
        defaultEmail={window.localStorage.getItem("email")}
      />
    </div>
  );
}
