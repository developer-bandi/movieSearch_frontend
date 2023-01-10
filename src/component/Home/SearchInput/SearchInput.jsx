/** @jsx h */
import h, { useLookup } from "../../../../lib/react";
import { useRouter } from "../../../../lib/react-router-dom";
import styles from "./SearchInput.module.css";

const SearchInput = () => {
  const router = useRouter();
  const lookup = useLookup();
  return (
    <div class={styles.mainBlock}>
      <div class={styles.inputBlock}>
        <input
          id="search"
          class={styles.input}
          placeholder="원하는 영화를 검색해보세요"
        ></input>
        <button
          class={styles.button}
          onClick={() => {
            router.push(`/result?keyword=${lookup("search").value}&page=1`);
          }}
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
