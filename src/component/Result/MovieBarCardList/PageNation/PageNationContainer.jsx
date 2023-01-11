/** @jsx h */
import h from "../../../../../lib/react";
import PageNation from "./PageNation";

const PageNationContainer = ({ page, changePage, totalPage, pageUnit }) => {
  const allowPrevPageSet = () => {
    if (page <= pageUnit) return false;
    return true;
  };

  const movePrevPageSet = () => {
    changePage((Math.floor((page - 1) / pageUnit) - 1) * pageUnit + 1);
  };

  const makePages = () => {
    const set = (Math.ceil(page / pageUnit) - 1) * 5;
    return new Array(5)
      .fill(0)
      .map((_, index) => {
        return index + 1 + set;
      })
      .filter((value) => value <= totalPage);
  };

  const allowNextPageSet = () => {
    if (Math.ceil(page / pageUnit) * 5 <= totalPage) return true;
    return false;
  };

  const moveNextPageSet = () => {
    changePage(Math.ceil(page / pageUnit) * pageUnit + 1);
  };

  return (
    <PageNation
      allowPrevPageSet={allowPrevPageSet}
      movePrevPageSet={movePrevPageSet}
      makePages={makePages}
      allowNextPageSet={allowNextPageSet}
      moveNextPageSet={moveNextPageSet}
      page={page}
      changePage={changePage}
    />
  );
};

export default PageNationContainer;
