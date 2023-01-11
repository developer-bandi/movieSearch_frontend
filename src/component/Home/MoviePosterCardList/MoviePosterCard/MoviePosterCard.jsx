/** @jsx h */
import h from "../../../../../lib/react";
import { Link } from "../../../../../lib/react-router-dom";
import styles from "./MoviePosterCard.module.css";

const MoviePosterCard = ({ card }) => {
  return (
    <article class={styles.mainBlock}>
      <img
        class={styles.img}
        src={`https://image.tmdb.org/t/p/w500${card.posterPath}`}
        alt={`영화 ${card.title} 포스터`}
      ></img>
      <div class={styles.order}>{card.order}</div>
      <div class={styles.voteAverage}>평점 {card.voteAverage}</div>
      <Link class={styles.overview} href={`/detail/${card.id}`}>
        {card.overview}
      </Link>
      <div class={styles.title}>{card.title}</div>
    </article>
  );
};

export default MoviePosterCard;
