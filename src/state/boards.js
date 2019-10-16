import database from "database";

export function createBoard() {
  return dispatch => {
    return database.collection("boards").add({});
  };
}

const initial = {};

export default function notes(state = initial, action) {
  return state;
}
