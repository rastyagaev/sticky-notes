import React from "react";
import { useDrag } from "react-dnd";
import Note from "../note";

export default function NewNote({ color }) {
  const [, drag] = useDrag({ item: { type: color } });
  return (
    <div ref={drag}>
      <Note color={color}>Drag to add a note</Note>
    </div>
  );
}
