/** @jsx h */
import h from "../../../../../lib/react";
import styles from "./PageMoveButton.module.css";

const PageMoveButton = ({ page, banPage, direction, changePage }) => {
  return (
    <div class={styles.mainBlock}>
      {page !== banPage ? (
        <button class={styles.button} onClick={() => changePage(direction)}>
          {direction === "left" ? "❮" : "❯"}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PageMoveButton;
