/** @jsx h */
import h from "../lib/react";
import { createElement } from "../lib/react";

document.querySelector("#root").appendChild(
  createElement(
    <div>
      <h1>제목</h1>
      <p>안녕하세요</p>
      <button
        onClick={(e) => {
          alert("호출되었습니다");
        }}
      >
        클릭하세요
      </button>
    </div>
  )
);
