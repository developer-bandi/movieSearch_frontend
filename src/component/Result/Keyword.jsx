/** @jsx h */
import h from "../../../lib/react";
import { useQueries } from "../../../lib/react-router-dom";
import styles from "./Keyword.module.css";

const Keyword = () => {
  const { keyword } = useQueries();
  return (
    <div class={styles.mainBlock}>
      <div class={styles.content}>
        '<i class={styles.keyword}>{keyword}</i> ' 검색결과
      </div>
    </div>
  );
};

export default Keyword;
