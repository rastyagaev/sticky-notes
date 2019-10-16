import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";

import Overlay from "./Overlay";

const reducer = (state, { overlay }) => ({ overlay });
const store = createStore(reducer);

function ContainerOverlay() {
  const overlay = useSelector(state => state.overlay);
  const root = document.getElementById("overlayRoot");
  return overlay ? createPortal(<Overlay {...overlay} />, root) : null;
}

export default function Container() {
  useEffect(() => {
    const root = document.createElement("div");
    root.id = "overlayRoot";
    root.style.position = "relative";
    document.body.appendChild(root);
    return () => document.getElementById("overlayRoot").remove();
  }, []);

  return (
    <Provider store={store}>
      <ContainerOverlay />
    </Provider>
  );
}

export function closeOverlay() {
  store.dispatch({ type: "CLOSE_OVERLAY" });
}

export function createOverlay(
  children,
  options = {
    onClose: closeOverlay
  }
) {
  store.dispatch({ type: "CREATE_OVERLAY", overlay: { children, ...options } });
}
