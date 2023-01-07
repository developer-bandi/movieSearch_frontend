export function createStore(reducers) {
  let state = {};
  let handlers = [];
  Object.keys(reducers).forEach((name) => {
    state[name] = reducers[name](state[name], {
      type: "__InitialState__",
    });
  });
  return {
    dispatch: (name, action) => {
      const newState = reducers[name](state[name], action);
      if (state !== newState) {
        state[name] = newState;
        handlers.forEach((handler) => {
          handler();
        });
      }
    },
    subscribe: (handler) => {
      handlers.push(handler);
    },
    getState: () => {
      new Proxy(state, {
        set() {
          return;
        },
      });
    },
  };
}
