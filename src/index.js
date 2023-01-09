import { render, createContext } from "../lib/react";
import { createStore } from "../lib/redux";
import App from "./app";
import reducers from "./store";
import "./index.css";

createContext("store", createStore(reducers));
render(document.querySelector("#root"), App);
