/** @jsx h */
import h from "../../lib/react";
import Footer from "../component/common/Footer/Footer";
import Header from "../component/common/Header/Header";
import KeywordContainer from "../component/Result/Keyword/KeywordContainer";
import MovieBarCardListContainer from "../component/Result/MovieBarCardList/MovieBarCardListContainer";

const Result = () => {
  return (
    <div>
      <Header />
      <main>
        <KeywordContainer />
        <MovieBarCardListContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Result;
