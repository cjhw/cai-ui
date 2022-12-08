import { ref as d, defineComponent as P, toRefs as C, computed as u, createVNode as r, createTextVNode as c, onMounted as b, watch as i, mergeProps as N } from "vue";
const m = {
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  modelValue: {
    type: Number,
    default: 1
  }
};
function I(e = 1) {
  const t = d(e), a = (o) => {
    t.value = o;
  }, n = (o) => {
    t.value += o;
  };
  return { pageIndex: t, setPageIndex: a, jumpPage: n, prevPage: () => n(-1), nextPage: () => n(1) };
}
const k = (e, t, a) => {
  const n = Array.from(Array(e).keys());
  if (e <= a)
    return n.slice(2, e);
  {
    const l = Math.ceil(a / 2);
    return t <= l ? n.slice(2, a) : t >= e - l + 1 ? n.slice(e - a + 2, e) : n.slice(t - l + 2, t + l - 1);
  }
}, E = m, h = P({
  name: "CPager",
  props: E,
  setup(e) {
    const {
      total: t,
      pageSize: a,
      pagerCount: n
    } = C(e), l = u(() => Math.ceil(t.value / a.value)), {
      pageIndex: s,
      setPageIndex: o,
      jumpPage: p,
      prevPage: f,
      nextPage: v
    } = I(), x = u(() => k(l.value, s.value, n.value));
    return {
      totalPage: l,
      pageIndex: s,
      setPageIndex: o,
      jumpPage: p,
      prevPage: f,
      nextPage: v,
      centerPages: x
    };
  },
  render() {
    const {
      pagerCount: e,
      totalPage: t,
      pageIndex: a,
      setPageIndex: n,
      jumpPage: l,
      centerPages: s
    } = this;
    return r("ul", {
      class: "s-pager"
    }, [r("li", {
      onClick: () => n(1),
      class: {
        current: a === 1
      }
    }, [c("1")]), t > e && a > Math.ceil(e / 2) && r("li", {
      class: "more left",
      onClick: () => l(-5)
    }, [c("...")]), s.map((o) => r("li", {
      onClick: () => n(o),
      class: {
        current: a === o
      }
    }, [o])), t > e && a < t - Math.ceil(e / 2) + 1 && r("li", {
      class: "more right",
      onClick: () => l(5)
    }, [c("...")]), t > 1 && r("li", {
      onClick: () => n(t),
      class: {
        current: a === t
      }
    }, [t])]);
  }
}), y = P({
  name: "Pagination",
  props: m,
  emits: ["update:modelValue"],
  setup(e, {
    emit: t
  }) {
    const a = d(), n = u(() => a.value ? a.value.pageIndex < 2 : !0), l = u(() => a.value ? a.value.pageIndex > a.value.totalPage - 1 : !0);
    return b(() => {
      i(() => a.value.pageIndex, (s) => {
        t("update:modelValue", s);
      }), i(() => e.modelValue, (s) => {
        a.value.pageIndex = s;
      });
    }), () => r("div", {
      class: "s-pagination"
    }, [r("button", {
      disabled: n.value,
      onClick: () => a.value.prevPage()
    }, [c("\u4E0A\u4E00\u9875")]), r(h, N(e, {
      ref: a
    }), null), r("button", {
      disabled: l.value,
      onClick: () => a.value.nextPage()
    }, [c("\u4E0B\u4E00\u9875")])]);
  }
}), A = "c", g = "_cai", M = "C", V = (e, t = { classPrefix: A }) => {
  var a;
  e.config.globalProperties[g] = {
    ...(a = e.config.globalProperties[g]) != null ? a : {},
    classPrefix: t.classPrefix
  };
}, _ = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : M;
};
function O(e, t, a) {
  const n = _(a);
  e.component(n + t.name) || (V(e, a), e.component(n + t.name, t));
}
const j = {
  install(e, t) {
    O(e, y, t);
  }
};
export {
  y as Pagination,
  j as default
};
