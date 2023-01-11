/** @jsx h */
import h from "../../../../lib/react";
import styles from "./Keyword.module.css";

const Keyword = ({ keyword }) => {
  return (
    <div class={styles.mainBlock}>
      <div class={styles.content}>
        '<i class={styles.keyword}>{keyword}</i> ' 검색결과
      </div>
    </div>
  );
};

export default Keyword;
