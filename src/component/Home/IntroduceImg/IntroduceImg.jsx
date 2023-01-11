/** @jsx h */
import h from "../../../../lib/react";
import styles from "./IntroduceImg.module.css";
import "../../../img/introduce.png";

const IntroduceImg = () => {
  return (
    <div class={styles.mainBlock}>
      <img
        src="/introduce.png"
        class={styles.img}
        alt="영화를 보고있는 사람들"
      ></img>
    </div>
  );
};

export default IntroduceImg;
