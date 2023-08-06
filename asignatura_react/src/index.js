import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { writeRows } from "./Table";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

writeRows();

root.render(<App />);
