import React from "react";
import ReactDOM from "react-dom/client";
import debounce from "debounce";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { saveState } from "./store/localStorage";

// saves redux state to localStorage
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider {...{ store }}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
