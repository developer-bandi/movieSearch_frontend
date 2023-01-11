/** @jsx h */
import h from "../../../../lib/react";
import PageMoveButton from "./PageMoveButton/PageMoveButton";
import PopularCard from "./MoviePosterCard/MoviePosterCard";
import styles from "./MoviePosterCardList.module.css";

const MoviePosterCardList = ({ cardList, page, changePage }) => {
  if (cardList.loading) {
    return (
      <div class={styles.mainBlock}>
        <div class={styles.buttonBlock}></div>
        {new Array(5).fill(0).map(() => {
          return <div class={styles.loading}></div>;
        })}
        <div class={styles.buttonBlock}></div>
      </div>
    );
  } else if (cardList.error) {
    return (
      <div class={styles.mainBlock}>
        <div class={styles.error}>에러발생</div>
      </div>
    );
  }
  return (
    <div class={styles.mainBlock}>
      <PageMoveButton
        page={page}
        banPage={1}
        direction={"left"}
        changePage={changePage}
      />
      {cardList.content.slice(5 * (page - 1), 5 * page).map((card) => {
        return <PopularCard card={card} />;
      })}
      <PageMoveButton
        page={page}
        banPage={4}
        direction={"right"}
        changePage={changePage}
      />
    </div>
  );
};

export default MoviePosterCardList;
