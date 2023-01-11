/** @jsx h */
import h from "../../../../../lib/react";
import styles from "./PageNation.module.css";

const PageNation = ({
  page,
  changePage,
  allowPrevPageSet,
  movePrevPageSet,
  makePages,
  allowNextPageSet,
  moveNextPageSet,
}) => {
  return (
    <ul class={styles.pageButtonList}>
      <li key={"prev"}>
        <div
          class={`${styles.pageIcon} ${allowPrevPageSet() ? "" : styles.ban}`}
          onClick={() => {
            if (allowPrevPageSet()) movePrevPageSet();
          }}
        >
          &lt;
        </div>
      </li>
      {makePages().map((cur) => {
        return (
          <li
            class={`${styles.pageButton} ${
              cur === page ? styles.selected : ""
            }`}
            onClick={() => {
              changePage(cur);
            }}
            key={cur}
          >
            {cur}
          </li>
        );
      })}
      <li key={"next"}>
        <div
          class={`${styles.pageIcon} ${allowNextPageSet() ? "" : styles.ban}`}
          onClick={() => {
            if (allowNextPageSet()) moveNextPageSet();
          }}
        >
          &gt;
        </div>
      </li>
    </ul>
  );
};

export default PageNation;
