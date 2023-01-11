/** @jsx h */
import h from "../../lib/react";
import Footer from "../component/common/Footer/Footer";
import Header from "../component/common/Header/Header";
import MovieArticleCardContainer from "../component/Detail/MovieArticleCard/MovieArticleCardContainer";

const Detail = () => {
  return (
    <div>
      <Header />
      <MovieArticleCardContainer />
      <Footer />
    </div>
  );
};

export default Detail;
