import { reRender } from "./react";

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_REGEXP = "([^\\/]+)";

const router = [];
let ishandlerActive = false;

export function Routes() {
  if (!ishandlerActive) {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState(null, "", e.target.pathname);
        reRender(true);
      }
    });
    window.addEventListener("popstate", () => reRender(true));
    ishandlerActive = true;
  }

  const { element } = router.find(({ fragmentRegExp }, index) => {
    const result = fragmentRegExp.test(window.location.pathname);
    return result;
  });

  return element();
}

export function Route(props) {
  if (!ishandlerActive) {
    const { path, element } = props;
    const params = [];
    const parsedFragment = path
      .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_REGEXP;
      })
      .replace(/\//g, "\\/");

    router.push({
      fragmentRegExp: new RegExp(`^${parsedFragment}$`),
      element,
      params,
    });
  }
}

export const Link = (props, children) => {
  return {
    type: "a",
    props: { ...props, "data-link": true },
    children: children.flat(),
  };
};

export const useParams = () => {
  const href = window.location.pathname;
  const { params, fragmentRegExp } = router.find(({ fragmentRegExp }) =>
    fragmentRegExp.test(href)
  );

  const matches = href.match(fragmentRegExp);
  const result = params
    .map((parm, index) => {
      return { key: parm, value: matches[index + 1] };
    })
    .reduce((prev, { key, value }) => {
      prev[key] = value;
      return prev;
    }, {});
  return result;
};

export const useQueries = () => {
  return Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );
};

export const useRouter = () => {
  return {
    push: (href) => {
      history.pushState(null, "", href);
      reRender(true);
    },
  };
};
