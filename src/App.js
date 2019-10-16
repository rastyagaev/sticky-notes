import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Board from "pages/board";
import EmptyBoard from "pages/empty-board";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:boardId" component={Board} />
        <Route exact path="/" component={EmptyBoard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
