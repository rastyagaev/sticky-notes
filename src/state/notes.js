import database from "database";
import { firestore } from "firebase/app";

export function subscribeToNotes({ boardId }) {
  return dispatch => {
    return database
      .collection("notes")
      .orderBy("created")
      .where("boardId", "==", boardId)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(({ type, doc }) => {
          if (type === "added") {
            dispatch({ type: "NOTES_SUBSCRIBE_ADDED", boardId, doc });
          } else if (type === "modified") {
            dispatch({ type: "NOTES_SUBSCRIBE_MODIFIED", doc });
          } else if (type === "removed") {
            dispatch({ type: "NOTES_SUBSCRIBE_REMOVED", doc });
          }
        });
      });
  };
}

export function createNote({ boardId, ...note }) {
  return async () => {
    const ref = await database.collection("notes").add({
      boardId,
      created: firestore.Timestamp.now(),
      ...note
    });
    return ref.get();
  };
}

export function updateNote(note, data) {
  return () => {
    return note.ref.update(data);
  };
}

export function deleteNote(note) {
  return () => {
    return note.ref.delete();
  };
}

const initial = {
  collection: []
};

export default function notes(state = initial, action) {
  switch (action.type) {
    case "NOTES_SUBSCRIBE_ADDED":
      return {
        ...state,
        collection: [...state.collection, action.doc]
      };
    case "NOTES_SUBSCRIBE_MODIFIED": {
      const modifiedCollection = [...state.collection];
      const index = modifiedCollection.findIndex(
        doc => action.doc.id === doc.id
      );
      modifiedCollection[index] = action.doc;
      return {
        ...state,
        collection: modifiedCollection
      };
    }
    case "NOTES_SUBSCRIBE_REMOVED": {
      const index = state.collection.findIndex(doc => action.doc.id === doc.id);
      return {
        ...state,
        collection: [
          ...state.collection.slice(0, index),
          ...state.collection.slice(index + 1)
        ]
      };
    }
    default:
      return state;
  }
}
