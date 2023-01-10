/** @jsx h */
import h from "../../lib/react";
import Footer from "../component/common/Footer/Footer";
import Header from "../component/common/Header/Header";
import Keyword from "../component/Result/Keyword";
import PosterListContainer from "../component/Result/PosterList/PosterListContainer";

const Result = () => {
  return (
    <div>
      <Header />
      <main>
        <Keyword />
        <PosterListContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Result;
