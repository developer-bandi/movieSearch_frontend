/** @jsx h */
import h from "../../lib/react";
import Footer from "../component/common/Footer/Footer";
import Header from "../component/common/Header/Header";
import MainImg from "../component/Home/MainImg/MainImg";
import PopularCardListContainer from "../component/Home/PopularCardList/PopularCardListContainer";
import SearchInput from "../component/Home/SearchInput/SearchInput";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <MainImg />
        <SearchInput />
        <PopularCardListContainer />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
