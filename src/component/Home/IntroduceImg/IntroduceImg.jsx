/** @jsx h */
import h from "../../../../lib/react";
import styles from "./IntroduceImg.module.css";
import "../../../img/introduce.png";

const IntroduceImg = () => {
  return (
    <div class={styles.mainBlock}>
      <img src="/introduce.png" class={styles.img}></img>
    </div>
  );
};

export default IntroduceImg;
