import render, { createContext } from "../lib/react";
import { createStore } from "../lib/redux";
import reducers from "./store";

createContext("store", createStore(reducers));
render(document.querySelector("#root"), App);
