import { defineComponent as o, createVNode as c } from "vue";
const i = {}, l = o({
  name: "CTree",
  props: i,
  setup(e) {
    return () => c("div", {
      class: "s-tree"
    }, null);
  }
}), f = "s", s = "_Cai", a = "C", P = (e, n = { classPrefix: f }) => {
  var r;
  e.config.globalProperties[s] = {
    ...(r = e.config.globalProperties[s]) != null ? r : {},
    classPrefix: n.classPrefix
  };
}, m = (e) => {
  var n;
  return (n = e == null ? void 0 : e.componentPrefix) != null ? n : a;
};
function C(e, n, r) {
  const t = m(r);
  e.component(t + n.name) || (P(e, r), e.component(t + n.name, n));
}
const d = {
  install(e, n) {
    C(e, l, n);
  }
};
export {
  l as Tree,
  d as default
};
