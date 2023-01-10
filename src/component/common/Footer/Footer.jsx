/** @jsx h */
import h from "../../../../lib/react";
import styles from "./Footer.module.css";
import "../../../img/icon.png";
import "../../../img/github.png";

const Footer = () => {
  return (
    <footer class={styles.mainBlock}>
      <div class={styles.subBlock}>
        <div class={styles.infoBlock}>
          <div class={styles.logoBlock}>
            <img class={styles.logoIcon} src="./icon.png"></img>
            <div class={styles.logoWord}>MovieSearch</div>
          </div>
          <a
            href="https://www.flaticon.com/free-icons/watching-a-movie"
            title="watching a movie icons"
          >
            Watching a movie icons created by iconixar - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/clapperboard"
            title="clapperboard icons"
          >
            Clapperboard icons created by Prosymbols - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/github"
            title="github icons"
          >
            Github icons created by Pixel perfect - Flaticon
          </a>
          <div>Copyright 2022. 김상두 all right reserved</div>
        </div>
        <div class={styles.contactBlock}>
          <a target="_black" href="https://github.com/puki4416">
            <img class={styles.logoIcon} src="./github.png"></img>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
