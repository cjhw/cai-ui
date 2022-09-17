import { defineComponent as i, toRefs as f, createVNode as u } from "vue";
const d = {
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
}, b = i({
  name: "Button",
  props: d,
  setup(e, {
    slots: t
  }) {
    return () => {
      const {
        type: n,
        size: o,
        disabled: s,
        block: a
      } = f(e), c = t.default ? t.default() : "\u6309\u94AE", r = a.value ? "s-btn--block" : "";
      return u("button", {
        disabled: s.value,
        class: `s-btn s-btn--${n.value} s-btn--${o.value} ${r}`
      }, [c]);
    };
  }
}), P = "s", l = "_cai", m = "C", g = (e, t = { classPrefix: P }) => {
  var n;
  e.config.globalProperties[l] = {
    ...(n = e.config.globalProperties[l]) != null ? n : {},
    classPrefix: t.classPrefix
  };
}, C = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : m;
};
function p(e, t, n) {
  const o = C(n);
  e.component(o + t.name) || (g(e, n), e.component(o + t.name, t));
}
const y = {
  install(e, t) {
    p(e, b, t);
  }
}, x = [y], E = {
  install(e) {
    x.forEach((t) => e.use(t));
  }
};
export {
  b as Button,
  E as default
};
