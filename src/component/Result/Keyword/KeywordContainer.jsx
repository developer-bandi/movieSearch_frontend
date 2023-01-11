/** @jsx h */
import h from "../../../../lib/react";
import { useQueries } from "../../../../lib/react-router-dom";
import Keyword from "./Keyword";

const KeywordContainer = () => {
  const { keyword } = useQueries();
  return <Keyword keyword={keyword} />;
};

export default KeywordContainer;
