import { defineComponent as f, toRefs as i, createVNode as d } from "vue";
const u = {
  type: {
    type: String,
    default: "secondary"
  },
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  block: {
    type: Boolean,
    default: !1
  }
}, b = f({
  name: "Button",
  props: u,
  setup(e, {
    slots: t
  }) {
    return () => {
      const {
        type: n,
        size: o,
        disabled: s,
        block: a
      } = i(e), c = t.default ? t.default() : "\u6309\u94AE", r = a.value ? "s-btn--block" : "";
      return d("button", {
        disabled: s.value,
        class: `s-btn s-btn--${n.value} s-btn--${o.value} ${r}`
      }, [c]);
    };
  }
}), m = "c", l = "_cai", P = "C", g = (e, t = { classPrefix: m }) => {
  var n;
  e.config.globalProperties[l] = {
    ...(n = e.config.globalProperties[l]) != null ? n : {},
    classPrefix: t.classPrefix
  };
}, C = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : P;
};
function p(e, t, n) {
  const o = C(n);
  e.component(o + t.name) || (g(e, n), e.component(o + t.name, t));
}
const y = {
  install(e, t) {
    p(e, b, t);
  }
};
export {
  b as Button,
  y as default
};
