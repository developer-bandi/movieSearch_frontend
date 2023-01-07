export function createStore(reducer) {
  let state;
  let handlers = [];
  reducer(state, {
    type: "__InitialState__",
  });
  return {
    dispach: (action) => {
      const newState = reducer(state, action);
      if (state !== newState) {
        state = newState;
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
