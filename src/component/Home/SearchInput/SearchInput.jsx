/** @jsx h */
import h from "../../../../lib/react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ searchMovie }) => {
  return (
    <div class={styles.mainBlock}>
      <div class={styles.inputBlock}>
        <input
          id="search"
          class={styles.input}
          placeholder="원하는 영화를 검색해보세요"
          onKeyDown={searchMovie}
        ></input>
        <button class={styles.button} onClick={searchMovie}>
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
