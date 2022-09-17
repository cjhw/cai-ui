import { defineComponent as x, toRefs as C, ref as r, computed as m, onMounted as _, createVNode as i } from "vue";
const b = {
  data: {
    type: Array,
    default: []
  },
  itemHeight: {
    type: Number,
    default: 22
  },
  component: {
    type: String,
    default: "div"
  }
};
const L = x({
  name: "VirtualList",
  props: b,
  setup(e, {
    slots: t
  }) {
    const {
      data: n,
      itemHeight: l,
      component: c
    } = C(e), u = r(), v = r(0), f = r(0), s = r(0), p = m(() => Math.ceil(v.value / l.value)), P = m(() => n.value.slice(s.value, Math.min(s.value + p.value, n.value.length)));
    _(() => {
      var a;
      v.value = (a = u.value) == null ? void 0 : a.clientHeight;
    });
    const h = function(a) {
      const o = a.target.scrollTop;
      s.value = Math.floor(o / l.value), f.value = o - o % l.value;
    };
    return () => i(c.value, {
      class: "s-virtual-list__container",
      ref: u,
      onScroll: h
    }, {
      default: () => [i("div", {
        class: "s-virtual-list__blank",
        style: {
          height: `${n.value.length * l.value}px`
        }
      }, null), i("div", {
        class: "s-virtual-list",
        style: {
          transform: `translate3d(0,${f.value}px,0)`
        }
      }, [P.value.map((a, o) => {
        var d;
        return (d = t.default) == null ? void 0 : d.call(t, {
          item: a,
          index: o
        });
      })])]
    });
  }
}), y = "s", g = "_cai", M = "C", N = (e, t = { classPrefix: y }) => {
  var n;
  e.config.globalProperties[g] = {
    ...(n = e.config.globalProperties[g]) != null ? n : {},
    classPrefix: t.classPrefix
  };
}, E = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : M;
};
function A(e, t, n) {
  const l = E(n);
  e.component(l + t.name) || (N(e, n), e.component(l + t.name, t));
}
const I = {
  install(e, t) {
    A(e, L, t);
  }
};
export {
  L as VirtualList,
  I as default
};
