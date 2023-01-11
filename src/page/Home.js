/** @jsx h */
import h from "../../lib/react";
import Footer from "../component/common/Footer/Footer";
import Header from "../component/common/Header/Header";
import IntroduceImg from "../component/Home/IntroduceImg/IntroduceImg";
import MoviePosterCardListContainer from "../component/Home/MoviePosterCardList/MoviePosterCardListContainer";
import SearchInputContainer from "../component/Home/SearchInput/SearchInputContainer";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <IntroduceImg />
        <SearchInputContainer />
        <MoviePosterCardListContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
