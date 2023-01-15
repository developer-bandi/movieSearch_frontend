/** @jsx h */
import h from "../../../../lib/react";
import styles from "./Footer.module.css";
import "../../../img/github.png";

const Footer = () => {
  return (
    <footer class={styles.mainBlock}>
      <div class={styles.subBlock}>
        <div class={styles.infoBlock}>
          <div class={styles.logo}>MovieSearch</div>
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
          <div>Copyright 2023. 김상두 all right reserved</div>
        </div>
        <div class={styles.contactBlock}>
          <a
            target="_black"
            href="https://github.com/puki4416/movieSearch_frontend"
          >
            <img class={styles.icon} src="/github.png" alt="깃허브 로고"></img>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
