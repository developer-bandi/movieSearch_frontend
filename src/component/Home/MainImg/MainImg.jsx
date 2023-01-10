/** @jsx h */
import h from "../../../../lib/react";
import styles from "./MainImg.module.css";
import "../../../img/main.png";

const MainImg = () => {
  return (
    <div class={styles.mainBlock}>
      <img src="./main.png" class={styles.img}></img>
    </div>
  );
};

export default MainImg;
