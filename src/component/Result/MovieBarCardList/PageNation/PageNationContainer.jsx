/** @jsx h */
import h from "../../../../../lib/react";
import PageNation from "./PageNation";

const PageNationContainer = ({
  page,
  changePage,
  totalAmount,
  pageUnit,
  contentUnit,
}) => {
  const allowPrevPageSet = ({ page, pageUnit }) => {
    if (page < pageUnit) return false;
    return true;
  };

  const makePrevSetPage = ({ page, pageUnit }) =>
    (Math.floor((page - 1) / pageUnit) - 1) * pageUnit + 1;

  const makePages = ({ page, totalAmount, contentUnit, pageUnit }) => {
    const pageSetOrder = Math.ceil(page / pageUnit) - 1;
    const pageCount = Math.ceil(
      Math.min(
        (totalAmount - pageSetOrder * pageUnit * contentUnit) / contentUnit,
        pageUnit
      )
    );
    const pages = new Array(pageCount)
      .fill(0)
      .map((_, index) => index + 1 + pageSetOrder * 5);

    return pages;
  };

  const allowNextPageSet = ({ page, contentUnit, totalAmount, pageUnit }) => {
    if (Math.ceil(page / pageUnit) * contentUnit * pageUnit < totalAmount)
      return true;
    return false;
  };

  const makeNextSetPage = ({ page, pageUnit }) =>
    Math.ceil(page / pageUnit) * pageUnit + 1;

  return (
    <PageNation
      allowPrevPageSet={allowPrevPageSet}
      makePrevSetPage={makePrevSetPage}
      makePages={makePages}
      allowNextPageSet={allowNextPageSet}
      makeNextSetPage={makeNextSetPage}
      page={page}
      changePage={changePage}
      totalAmount={totalAmount}
      pageUnit={pageUnit}
      contentUnit={contentUnit}
    />
  );
};

export default PageNationContainer;
