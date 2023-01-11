/** @jsx h */
import h from "../../../../lib/react";
import styles from "./Header.module.css";
import "../../../img/icon.png";

const Header = () => {
  return (
    <header class={styles.mainBlock}>
      <div class={styles.subBlock}>
        <div class={styles.logoBlock}>
          <img class={styles.logoIcon} src="/icon.png"></img>
          <div class={styles.logoWord}>MovieSearch</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
