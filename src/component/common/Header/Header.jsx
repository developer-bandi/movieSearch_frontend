/** @jsx h */
import h from "../../../../lib/react";
import styles from "./Header.module.css";
import { Link } from "../../../../lib/react-router-dom";

const Header = () => {
  return (
    <header class={styles.mainBlock}>
      <div class={styles.subBlock}>
        <Link class={styles.logo} href="/">
          MovieSearch
        </Link>
      </div>
    </header>
  );
};

export default Header;
