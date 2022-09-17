import { ref as g, defineComponent as P, toRefs as x, computed as i, createVNode as a, createTextVNode as l, mergeProps as v } from "vue";
const f = {
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
  }
};
function N(e = 1) {
  const t = g(e), n = (c) => {
    t.value = c;
  }, r = (c) => {
    t.value += c;
  };
  return { pageIndex: t, setPageIndex: n, jumpPage: r, prevPage: () => r(-1), nextPage: () => r(1) };
}
const b = (e, t, n) => {
  const r = Array.from(Array(e).keys());
  if (e <= n)
    return r.slice(2, e);
  {
    const s = Math.ceil(n / 2);
    return t <= s ? r.slice(2, n) : t >= e - s + 1 ? r.slice(e - n + 2, e) : r.slice(t - s + 2, t + s - 1);
  }
}, k = f, E = P({
  name: "CPager",
  props: k,
  setup(e) {
    const {
      total: t,
      pageSize: n,
      pagerCount: r
    } = x(e), s = i(() => Math.ceil(t.value / n.value)), {
      pageIndex: o,
      setPageIndex: c,
      jumpPage: m,
      prevPage: p,
      nextPage: d
    } = N(), C = i(() => b(s.value, o.value, r.value));
    return {
      totalPage: s,
      pageIndex: o,
      setPageIndex: c,
      jumpPage: m,
      prevPage: p,
      nextPage: d,
      centerPages: C
    };
  },
  render() {
    const {
      pagerCount: e,
      totalPage: t,
      pageIndex: n,
      setPageIndex: r,
      jumpPage: s,
      centerPages: o
    } = this;
    return a("ul", {
      class: "s-pager"
    }, [a("li", {
      onClick: () => r(1),
      class: {
        current: n === 1
      }
    }, [l("1")]), t > e && n > Math.ceil(e / 2) && a("li", {
      class: "more left",
      onClick: () => s(-5)
    }, [l("...")]), o.map((c) => a("li", {
      onClick: () => r(c),
      class: {
        current: n === c
      }
    }, [c])), t > e && n < t - Math.ceil(e / 2) + 1 && a("li", {
      class: "more right",
      onClick: () => s(5)
    }, [l("...")]), t > 1 && a("li", {
      onClick: () => r(t),
      class: {
        current: n === t
      }
    }, [t])]);
  }
}), A = P({
  name: "Pagination",
  props: f,
  emits: [],
  setup(e, t) {
    const n = g();
    return () => a("div", {
      class: "s-pagination"
    }, [a("button", {
      onClick: () => n.value.prevPage()
    }, [l("\u4E0A\u4E00\u9875")]), a(E, v(e, {
      ref: n
    }), null), a("button", {
      onClick: () => n.value.nextPage()
    }, [l("\u4E0B\u4E00\u9875")])]);
  }
}), h = "s", u = "_cai", y = "C", I = (e, t = { classPrefix: h }) => {
  var n;
  e.config.globalProperties[u] = {
    ...(n = e.config.globalProperties[u]) != null ? n : {},
    classPrefix: t.classPrefix
  };
}, M = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : y;
};
function _(e, t, n) {
  const r = M(n);
  e.component(r + t.name) || (I(e, n), e.component(r + t.name, t));
}
const S = {
  install(e, t) {
    _(e, A, t);
  }
};
export {
  A as Pagination,
  S as default
};
