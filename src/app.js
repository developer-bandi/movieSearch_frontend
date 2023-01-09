/** @jsx h */
import h from "../lib/react";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/result" element={Page} />
      <Route path="/detail/:id" element={Page} />
    </Routes>
  );
};

export default App;
