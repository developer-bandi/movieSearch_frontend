/** @jsx h */
import h, { useState, useEffect } from "../../../../lib/react";
import { useDispatch, useSelector } from "../../../../lib/react-redux";
import MoviePosterCardList from "./MoviePosterCardList";

const MoviePosterCardListContainer = () => {
  const page = useSelector((store) => store.mainPosterPage.page);
  const dispatch = useDispatch();
  const [cardList, setCardList] = useState({ loading: true, error: false });
  useEffect(() => {
    if (cardList.loading) {
      fetch(`https://movieinfoserver.herokuapp.com/home`)
        .then((response) => response.json())
        .then((data) => {
          setCardList({ loading: false, error: false, content: data });
          data.forEach(({ posterPath }) => {
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
