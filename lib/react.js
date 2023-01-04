const eventMap = { onClick: "click", onChange: "change" };
const eventList = [];
const options = {
  root: document.querySelector("#root"),
};

export const createElement = (node) => {
  if (typeof node === "string") return document.createTextNode(node);

  const element = document.createElement(node.type);

  if (node.props !== null) {
    Object.keys(node.props).forEach((attribute) => {
      if (eventMap[attribute]) {
        options.root.addEventListener(eventMap[attribute], (event) => {
          if (event.target === element) node.props[attribute](event);
        });
        eventList.push({
          element,
          type: eventMap[attribute],
          handler: node.props[attribute],
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

export default function h(type, props, ...children) {
  if (typeof type === "function") {
    return type(type, props, children);
  }
  return { type, props, children: children.flat() };
}
