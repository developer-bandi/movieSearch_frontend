/** @jsx h */
import h from "../../../../lib/react";
import PageNationContainer from "./PageNation/PageNationContainer";
import Poster from "./Poster/Poster";
import styles from "./PosterList.module.css";

const PosterList = ({ posterList, changePage, page }) => {
  if (posterList.loading) {
    return (
      <div class={styles.mainBlock}>
        {new Array(10).fill(0).map(() => {
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
            <Poster
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
        totalAmount={posterList.content.totalPage * 20}
        pageUnit={5}
        contentUnit={20}
      />
    </div>
  );
};

export default PosterList;
