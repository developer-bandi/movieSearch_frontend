/** @jsx h */
import h, { useLookup } from "../../../../lib/react";
import { useParams, useRouter } from "../../../../lib/react-router-dom";
import SearchInput from "./SearchInput";

const SearchInputContainer = () => {
  const router = useRouter();
  const lookup = useLookup();
  const params = useParams();

  const searchMovie = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.keyCode == 13)) {
      router.push(`/result?keyword=${lookup("search").value}&page=1`);
    }
  };

  return <SearchInput searchMovie={searchMovie} />;
};

export default SearchInputContainer;
