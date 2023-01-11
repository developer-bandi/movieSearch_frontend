/** @jsx h */
import h, { useLookup } from "../../../../lib/react";
import { useRouter } from "../../../../lib/react-router-dom";

const SearchInputContainer = () => {
  const router = useRouter();
  const lookup = useLookup();

  const searchMovie = () => {
    router.push(`/result?keyword=${lookup("search").value}&page=1`);
  };

  return <SearchInput searchMovie={searchMovie} />;
};

export default SearchInputContainer;
