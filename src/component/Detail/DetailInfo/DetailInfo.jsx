/** @jsx h */
import h from "../../../../lib/react";
import styles from "./DetailInfo.module.css";

const DetailInfo = ({ movieInfo }) => {
  if (movieInfo.loading) {
    return (
      <main class={styles.mainBlock}>
        <div class={styles.topBlock}>
          <div class={styles.loadingPoster}></div>
          <div class={styles.infoBlock}>
            <div class={styles.loadingTitle} />
            <div class={styles.loadingElseInfo} />
            <div class={styles.loadingElseInfo} />
            <div class={styles.loadingElseInfo} />
            <div class={styles.loadingElseInfo} />
          </div>
        </div>
        <div class={styles.bottomBlock}>
          <div class={styles.loadingTagline} />
          <div class={styles.loadingOverview} />
          <div class={styles.loadingOverview} />
          <div class={styles.loadingOverview} />
          <div class={styles.loadingOverview} />
        </div>
      </main>
    );
  }
  if (movieInfo.error) {
    return (
      <main class={styles.mainBlock}>
        <div class={styles.error}>에러발생</div>
      </main>
    );
  }

  const {
    overview,
    title,
    rate,
    posterPath,
    release,
    nation,
    genres,
    tagline,
  } = movieInfo.content;
  return (
    <main class={styles.mainBlock}>
      <div class={styles.topBlock}>
        <img
          class={styles.poster}
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : "./nullmovie.webp"
          }
        ></img>
        <div class={styles.infoBlock}>
          <div class={styles.title}>{title}</div>
          <div class={styles.infoRowBlock}>
            <i class={styles.subTitle}>개봉</i>
            {release}
          </div>
          <div class={styles.infoRowBlock}>
            <i class={styles.subTitle}>장르</i>
            {genres.join(" ")}
          </div>
          <div class={styles.infoRowBlock}>
            <i class={styles.subTitle}>국가</i>
            {nation}
          </div>
          <div class={styles.infoRowBlock}>
            <i class={styles.subTitle}>평점</i>
            {rate}
          </div>
        </div>
      </div>
      <div class={styles.bottomBlock}>
        <div class={styles.tagline}>{tagline}</div>
        <div class={styles.overview}>{overview}</div>
      </div>
    </main>
  );
};

export default DetailInfo;
