/** @jsx h */
import h from "../../../../../lib/react";
import { Link } from "../../../../../lib/react-router-dom";
import styles from "./MovieBarCard.module.css";
import "../../../../img/nullmovie.webp";

const MovieBarCard = ({ title, id, posterPath, rate, release }) => {
  return (
    <div class={styles.mainBlock}>
      <Link class={styles.subBlock} href={`/detail/${id}`}>
        <img
          class={styles.posterBlock}
          data-src={
            posterPath
              ? `https://image.tmdb.org/t/p/w185${posterPath}`
              : "./nullmovie.webp"
          }
          id={`image${id}`}
          alt={`영화 ${title} 포스터`}
        ></img>
        <div class={styles.infoBlock}>
          <div class={styles.title}>{title}</div>
          <div class={styles.infoRowBlock}>
            <i class={styles.subTitle}>개봉</i>
            {release}
          </div>
          <div class={styles.infoRowBlock}>
            <i class={styles.subTitle}>평점</i>
            {rate}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieBarCard;
