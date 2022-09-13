import { defineComponent as o, toRefs as a, createVNode as c } from "vue";
const i = {
  data: {
    type: Object,
    required: !0
  }
}, l = o({
  name: "CTree",
  props: i,
  setup(e) {
    const {
      data: t
    } = a(e);
    return () => c("div", {
      class: "s-tree"
    }, [t.value.map((n) => n.label)]);
  }
}), f = "s", s = "_Cai", P = "C", m = (e, t = { classPrefix: f }) => {
  var n;
  e.config.globalProperties[s] = {
    ...(n = e.config.globalProperties[s]) != null ? n : {},
    classPrefix: t.classPrefix
  };
}, d = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : P;
};
function C(e, t, n) {
  const r = d(n);
  e.component(r + t.name) || (m(e, n), e.component(r + t.name, t));
}
const x = {
  install(e, t) {
    C(e, l, t);
  }
};
export {
  l as Tree,
  x as default
};
