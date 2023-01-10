const initialState = { page: 1 };

const reducer = (state = initialState, action) => {
  if (action.type === "left" && state.page !== 1)
    return { page: state.page - 1 };
  if (action.type === "right" && state.page !== 4)
    return { page: state.page + 1 };
  return state;
};

export default reducer;
