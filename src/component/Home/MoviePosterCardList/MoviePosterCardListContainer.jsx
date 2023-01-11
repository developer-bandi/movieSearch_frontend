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
      fetch(`http://localhost:8000/home`)
        .then((response) => response.json())
        .then((data) => {
          setCardList({ loading: false, error: false, content: data });
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
