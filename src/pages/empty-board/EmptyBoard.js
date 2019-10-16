import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBoard } from "state/boards";

export default function EmptyBoard() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleCreateBoard() {
      const { id } = await dispatch(createBoard());
      history.push(`/${id}`);
    }
    handleCreateBoard();
  }, [history, dispatch]);
  return <span />;
}
