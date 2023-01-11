/** @jsx h */
import h from "../../lib/react";
import Footer from "../component/common/Footer/Footer";
import Header from "../component/common/Header/Header";
import IntroduceImg from "../component/Home/IntroduceImg/IntroduceImg";
import MoviePosterCardListContainer from "../component/Home/MoviePosterCardList/MoviePosterCardListContainer";
import SearchInput from "../component/Home/SearchInput/SearchInput";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <IntroduceImg />
        <SearchInput />
        <MoviePosterCardListContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
