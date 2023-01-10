/** @jsx h */
import h from "../../../../../lib/react";
import { Link } from "../../../../../lib/react-router-dom";
import styles from "./PopularCard.module.css";

const PopularCard = ({ card }) => {
  return (
    <Link class={styles.mainBlock} href={`/detail/${card.id}`}>
      <img
        class={styles.img}
        src={`https://image.tmdb.org/t/p/w500${card.posterPath}`}
        alt="poster"
      ></img>
      <div class={styles.order}>{card.order}</div>
      <div class={styles.voteAverage}>평점 {card.voteAverage}</div>
      <div class={styles.overview}>{card.overview}</div>
      <div class={styles.title}>{card.title}</div>
    </Link>
  );
};

export default PopularCard;
