/** @jsx h */
import h from "../lib/react";
import { Route, Routes } from "../lib/react-router-dom";
import Detail from "./page/detail";
import Home from "./page/home";
import Result from "./page/result";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/result" element={Result} />
      <Route path="/detail/:id" element={Detail} />
    </Routes>
  );
};

export default App;
