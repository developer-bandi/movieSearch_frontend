/** @jsx h */
import h from "../../../../../lib/react";
import { useEffect, useLookup } from "../../../../../lib/react";
import MovieBarCard from "./MovieBarCard";

const MovieBarContainer = ({ title, id, posterPath, rate, release }) => {
  const lookUp = useLookup();
  useEffect(() => {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(lookUp(`image${id}`));
  });

  return (
    <MovieBarCard
      id={id}
      title={title}
      posterPath={posterPath}
      rate={rate}
      release={release}
    />
  );
};

export default MovieBarContainer;
