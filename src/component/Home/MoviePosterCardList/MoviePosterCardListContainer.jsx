/** @jsx h */
import h, { useState, useEffect } from "../../../../lib/react";
import { useDispatch, useSelector } from "../../../../lib/react-redux";
import MoviePosterCardList from "./MoviePosterCardList";

const MoviePosterCardListContainer = () => {
  const page = useSelector((store) => store.mainPosterPage.page);
  const dispatch = useDispatch();
  const [loadPage, setLoadPage] = useState([]);
  const [cardList, setCardList] = useState({ loading: true, error: false });
  useEffect(() => {
    if (cardList.loading) {
      fetch(`https://movieinfoserver.herokuapp.com/home`)
        .then((response) => response.json())
        .then((data) => {
          setCardList({ loading: false, error: false, content: data });
          loadPage[1] = 1;
          loadPage[2] = 1;
          setLoadPage([...loadPage]);
          data.slice(0, 10).forEach(({ posterPath }) => {
            const image = new Image();
            image.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
          });
        })
        .catch(() => {
          setCardList({ loading: false, error: true });
        });
    }
  });

  const changePage = (direction) => {
    dispatch("mainPosterPage", { type: direction });
    if (page + 2 !== 1 && page + 2 <= Math.ceil(cardList.content.length / 5)) {
      loadPage[page + 2] = 1;
      cardList.content
        .slice((page + 1) * 5, (page + 2) * 5)
        .forEach(({ posterPath }) => {
          const image = new Image();
          console.log(posterPath);
          image.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
        });
      setLoadPage([...loadPage]);
    }
  };
  return (
    <MoviePosterCardList
      cardList={cardList}
      page={page}
      changePage={changePage}
    />
  );
};

export default MoviePosterCardListContainer;
