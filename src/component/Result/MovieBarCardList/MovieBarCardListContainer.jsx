/** @jsx h */
import h, { useEffect, useState } from "../../../../lib/react";
import { useQueries } from "../../../../lib/react-router-dom";
import PosterList from "./MovieBarCardList";

const PosterListContainer = () => {
  const { keyword } = useQueries();
  const [page, setPage] = useState(1);
  const [posterList, setPosterList] = useState({ loading: true, error: false });

  useEffect(() => {
    if (posterList.loading) {
      fetch(
        `https://movieinfoserver.herokuapp.com/search?keyword=${keyword}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPosterList({ loading: false, error: false, content: data });
        })
        .catch(() => {
          setPosterList({ loading: false, error: true });
        });
    }
  });

  const changePage = (page) => {
    setPosterList({ loading: true, error: false });
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <PosterList posterList={posterList} changePage={changePage} page={page} />
  );
};

export default PosterListContainer;
