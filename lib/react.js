export default function h(type, props, ...children) {
  if (typeof type === "function") {
    return type(type, props, children);
  }
  return { type, props, children: children.flat() };
}
