/** @jsx h */
import h from "../../../../lib/react";
import PageNationContainer from "./PageNation/PageNationContainer";
import MovieBarCard from "./MovieBarCard/MovieBarCard";
import styles from "./MovieBarCardList.module.css";

const MovieBarCardList = ({ posterList, changePage, page }) => {
  if (posterList.loading) {
    return (
      <div class={styles.mainBlock}>
        {new Array(20).fill(0).map(() => {
          return (
            <div class={styles.loadingPosterBlock}>
              <div class={styles.loadingPoster}></div>
              <div class={styles.loadingInfoBlock}>
                <div class={styles.loadingTitle}></div>
                <div class={styles.loadingElseInfo}></div>
                <div class={styles.loadingElseInfo}></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (posterList.error) {
    return (
      <div class={styles.mainBlock}>
        <div class={styles.error}>에러발생</div>
      </div>
    );
  }
  return (
    <div class={styles.mainBlock}>
      {posterList.content.results.map(
        ({ title, id, posterPath, rate, release }) => {
          return (
            <MovieBarCard
              title={title}
              id={id}
              posterPath={posterPath}
              rate={rate}
              release={release}
            />
          );
        }
      )}
      <PageNationContainer
        page={page}
        changePage={changePage}
        totalPage={posterList.content.totalPage}
        pageUnit={5}
      />
    </div>
  );
};

export default MovieBarCardList;
