/** @jsx h */
import h from "../../../../lib/react";
import PopularCard from "./PopularCard/PopularCard";
import styles from "./PopularCardList.module.css";

const PopularCardList = ({ cardList, page, changePage }) => {
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
      <div class={styles.buttonBlock}>
        {page !== 1 ? (
          <button
            class={`${styles.button} ${styles.leftButton}`}
            onClick={() => changePage("left")}
          />
        ) : (
          <div></div>
        )}
      </div>
      {cardList.content.slice(5 * (page - 1), 5 * page).map((card) => {
        return <PopularCard card={card} />;
      })}
      <div class={styles.buttonBlock}>
        {page !== 4 ? (
          <button
            class={`${styles.button} ${styles.rightButton}`}
            onClick={() => changePage("right")}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PopularCardList;
