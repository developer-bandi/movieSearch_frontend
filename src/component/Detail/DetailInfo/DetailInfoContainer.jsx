/** @jsx h */
import h from "../../../../lib/react";
import { useEffect, useState } from "../../../../lib/react";
import { useParams } from "../../../../lib/react-router-dom";
import DetailInfo from "./DetailInfo";

const DetailInfoContainer = () => {
  const [movieInfo, setMovieInfo] = useState({ loading: true, error: false });
  const { id } = useParams();
  useEffect(() => {
    if (movieInfo.loading) {
      fetch(`http://localhost:8000/detail?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieInfo({ loading: false, error: false, content: data });
        })
        .catch(() => {
          setMovieInfo({ loading: false, error: true });
        });
    }
  });

  return <DetailInfo movieInfo={movieInfo} />;
};

export default DetailInfoContainer;
