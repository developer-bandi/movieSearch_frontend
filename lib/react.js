const DELETE_CHILD_NODE = -1;
const FIX_CHILD_NODE = 0;
const APPEND_CHILD_NODE = 1;

const eventMap = { onClick: "click", onChange: "change" };
let eventList = [];
const options = {
  states: [], // 여러개의 상태값을 보관
  stateCount: 0, // 저장된 상태값 개수를 관리
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
        options.rootDom.addEventListener(eventMap[attribute], handler);
        eventList.push({
          element,
          type: eventMap[attribute],
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
  // 1. newNode만 있는 경우
  if (oldnode === undefined && newNode !== undefined) {
    parents.appendChild(createElement(newNode));
    return APPEND_CHILD_NODE;
  }

  // 2. oldNode만 있는 경우
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

  //이전 속성값에서 사라진 부분 삭제
  //이전 속성값에서 변경된 부분 변경

  for (let i = 0; i < oldProps.length; i++) {
    if (newNode.props === null || newNode.props[oldProps[i]] === undefined) {
      if (eventMap[oldProps[i]]) {
        const eventInfo = eventList
          .map((e, index) => ({ ...e, index }))
          .filter(({ element }) => element === parents.childNodes[index])[0];

        options.rootDom.removeEventListener(eventInfo.type, eventInfo.handler);
        eventList.splice(eventInfo.index, 1);
      } else {
        parents.childNodes[index].removeAttribute(oldProps[i]);
      }
    } else {
      if (eventMap[oldProps[i]]) {
        const eventInfo = eventList
          .map((e, index) => ({ ...e, index }))
          .filter(({ element }) => element === parents.childNodes[index])[0];
        options.rootDom.removeEventListener(eventInfo.type, eventInfo.handler);
        const handler = (event) => {
          if (event.target === parents.childNodes[index])
            newNode.props[oldProps[i]](event);
        };
        options.rootDom.addEventListener(eventInfo.type, handler);
        eventList[eventInfo.index].handler = handler;
      } else {
        parents.childNodes[index].setAttribute(
          oldProps[i],
          newNode.props[oldProps[i]]
        );
      }
    }
  }

  //이전 속성값에서 새롭게 추가된 부분 추가
  for (let i = 0; i < newProps.length; i++) {
    if (oldnode.props === null || oldnode.props[newProps[i]] === undefined) {
      if (eventMap[newProps[i]]) {
        options.rootDom.addEventListener(eventMap[newProps[i]], (event) => {
          if (event.target === parents.childNodes[index])
            newNode.props[newProps[i]](event);
        });
        eventList.push({
          element: parents.childNodes[index],
          type: eventMap[newProps[i]],
          handler: newNode.props[newProps[i]],
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
  options.effects.forEach((callback) => callback());
};

export const reRender = debounceFrame((changed) => {
  if (changed) options.states = [];
  options.stateCount = 0;
  options.effects = [];
  const newNode = options.rootComponent();
  updateElement(options.rootDom, newNode, options.oldNode);
  eventList = eventList.filter(({ element, type, handler }) => {
    if (!element.parentNode) {
      options.rootDom.removeEventListener(type, handler);
      return false;
    }
    return true;
  });
  options.oldNode = newNode;
  options.effects.forEach((callback) => callback());
});

export default function h(type, props, ...children) {
  if (typeof type === "function") {
    return type(props, children);
  }
  return { type, props, children: children.flat() };
}
