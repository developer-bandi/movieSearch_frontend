/** @jsx h */
import h from "../../../../../lib/react";
import styles from "./PageNation.module.css";

const PageNation = ({
  page,
  changePage,
  totalAmount,
  pageUnit,
  contentUnit,
  allowPrevPageSet,
  makePrevSetPage,
  makePages,
  allowNextPageSet,
  makeNextSetPage,
}) => {
  return (
    <ul class={styles.pageButtonList}>
      <li key={"prev"}>
        <div
          class={`${styles.pageIcon} ${page > 5 ? "" : styles.ban}`}
          onClick={() => {
            if (allowPrevPageSet({ page, pageUnit }))
              changePage(makePrevSetPage({ page, pageUnit }));
          }}
        >
          &lt;
        </div>
      </li>
      {makePages({ page, totalAmount, contentUnit, pageUnit }).map((cur) => {
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
          class={`${styles.pageIcon} ${
            allowNextPageSet({ page, totalAmount, contentUnit, pageUnit })
              ? ""
              : styles.ban
          }`}
          onClick={() => {
            if (allowNextPageSet({ page, totalAmount, contentUnit, pageUnit }))
              changePage(makeNextSetPage({ page, pageUnit }));
          }}
        >
          &gt;
        </div>
      </li>
    </ul>
  );
};

export default PageNation;
