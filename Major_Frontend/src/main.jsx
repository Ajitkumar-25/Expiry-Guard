import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../src/Redux/store/store.js";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from "./services/common";
  
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
