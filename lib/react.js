const DELETE_CHILD_NODE = -1;
const FIX_CHILD_NODE = 0;
const APPEND_CHILD_NODE = 1;

const eventMap = { onClick: "click", onChange: "change", onKeyDown: "keydown" };
let eventList = { click: [], change: [], keydown: [] };
const options = {
  states: [],
  stateCount: 0,
  rootDom: null,
  rootComponent: null,
  oldNode: null,
  context: {},
  effects: [],
};

export function useLookup() {
  return (id) => document.querySelector(`#${id}`);
}

export function useEffect(callback) {
  options.effects.push(callback);
}

export function useContext(key) {
  if (typeof options.context[key] === "object" && key !== null) {
    return new Proxy(options.context[key], {
      set() {
        return;
      },
    });
  } else {
    return options.context[key];
  }
}

export function createContext(key, value) {
  options.context[key] = value;
}

export function useState(initialState) {
  if (options.stateCount === options.states.length) {
    options.states[options.stateCount] = initialState;
  }
  const index = options.stateCount;
  const state = options.states[index];
  function setState(changeState) {
    if (state === changeState) return;
    if (JSON.stringify(state) === JSON.stringify(changeState)) return;
    options.states[index] = changeState;
    reRender();
  }
  options.stateCount++;
  return [state, setState];
}

export const createElement = (node) => {
  if (typeof node !== "object" && node !== null)
    return document.createTextNode(node);

  const element = document.createElement(node.type);

  if (node.props !== null) {
    Object.keys(node.props).forEach((attribute) => {
      if (eventMap[attribute]) {
        const handler = (event) => {
          if (event.target === element) node.props[attribute](event);
        };
        eventList[eventMap[attribute]].push({
          element,
          handler,
        });
      } else {
        element.setAttribute(attribute, node.props[attribute]);
      }
    });
  }

  node.children
    .map(createElement)
    .forEach((childNode) => element.appendChild(childNode));

  return element;
};

export function updateElement(parents, newNode, oldnode, index = 0) {
  if (oldnode === undefined && newNode !== undefined) {
    parents.appendChild(createElement(newNode));
    return APPEND_CHILD_NODE;
  }

  if (oldnode !== undefined && newNode === undefined) {
    parents.removeChild(parents.childNodes[index]);
    return DELETE_CHILD_NODE;
  }

  if (
    typeof oldnode !== "object" &&
    typeof newNode !== "object" &&
    oldnode !== null &&
    newNode !== null
  ) {
    if (oldnode === newNode) return FIX_CHILD_NODE;
    parents.replaceChild(createElement(newNode), parents.childNodes[index]);
    return FIX_CHILD_NODE;
  }

  if (oldnode.type !== newNode.type) {
    parents.replaceChild(createElement(newNode), parents.childNodes[index]);
    return FIX_CHILD_NODE;
  }

  const oldProps = oldnode.props === null ? [] : Object.keys(oldnode.props);
  const newProps = newNode.props === null ? [] : Object.keys(newNode.props);

  for (let i = 0; i < oldProps.length; i++) {
    if (newNode.props === null || newNode.props[oldProps[i]] === undefined) {
      if (eventMap[oldProps[i]]) {
        const eventInfo = eventList[eventMap[oldProps[i]]]
          .map((e, index) => ({ ...e, index }))
          .filter(({ element }) => element === parents.childNodes[index])[0];
        eventList.splice(eventInfo.index, 1);
      } else {
        parents.childNodes[index].removeAttribute(oldProps[i]);
      }
    } else {
      if (eventMap[oldProps[i]]) {
        const eventInfo = eventList[eventMap[oldProps[i]]]
          .map((e, index) => ({ ...e, index }))
          .filter(({ element }) => element === parents.childNodes[index])[0];
        const handler = (event) => {
          if (event.target === parents.childNodes[index])
            newNode.props[oldProps[i]](event);
        };
        eventList[eventMap[oldProps[i]]][eventInfo.index].handler = handler;
      } else {
        parents.childNodes[index].setAttribute(
          oldProps[i],
          newNode.props[oldProps[i]]
        );
      }
    }
  }

  for (let i = 0; i < newProps.length; i++) {
    if (oldnode.props === null || oldnode.props[newProps[i]] === undefined) {
      if (eventMap[newProps[i]]) {
        const handler = (event) => {
          if (event.target === parents.childNodes[index])
            newNode.props[newProps[i]](event);
        };
        eventList[eventMap[newProps[i]]].push({
          element: parents.childNodes[index],
          handler,
        });
      } else {
        parents.childNodes[index].setAttribute(
          newProps[i],
          newNode.props[newProps[i]]
        );
      }
    }
  }

  const max = Math.max(oldnode.children.length, newNode.children.length);

  let childIndex = 0;
  for (let i = 0; i < max; i++) {
    const result = updateElement(
      parents.childNodes[index],
      newNode.children[i],
      oldnode.children[i],
      childIndex
    );
    if (result !== DELETE_CHILD_NODE) {
      childIndex++;
    }
  }
  return FIX_CHILD_NODE;
}

function debounceFrame(callback) {
  let nextFrameCallback = -1;
  return (changed) => {
    window.cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = window.requestAnimationFrame(() => callback(changed));
  };
}

export const render = (rootDom, rootComponent) => {
  options.rootDom = rootDom;
  options.rootComponent = rootComponent;
  options.oldNode = rootComponent();
  updateElement(rootDom, options.oldNode);
  Object.keys(eventList).forEach((key) => {
    options.rootDom.addEventListener(key, (event) => {
      eventList[key].forEach(({ element, handler }) => {
        if (event.target === element) handler(event);
      });
    });
  });
  options.effects.forEach((callback) => callback());
};

export const reRender = debounceFrame((changed) => {
  if (changed) options.states = [];
  options.stateCount = 0;
  options.effects = [];
  const newNode = options.rootComponent();
  updateElement(options.rootDom, newNode, options.oldNode);
  Object.keys(eventList).forEach((key) => {
    eventList[key] = eventList[key].filter(({ element }) => {
      if (!element.parentNode) {
        return false;
      }
      return true;
    });
  });
  console.log(eventList);

  options.oldNode = newNode;
  options.effects.forEach((callback) => callback());
});

export default function h(type, props, ...children) {
  if (typeof type === "function") {
    return type(props, children);
  }
  return { type, props, children: children.flat() };
}
