import { reRender, useContext } from "./react";

export const useSelector = (selectorFn) => {
  const store = useContext("store");
  store.subscribe(reRender);
  return selectorFn(store.getState());
};

export const useDispatch = () => {
  const store = useContext("store");
  return store.dispatch;
};
