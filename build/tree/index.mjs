import { computed as D, ref as b, reactive as j, unref as R, defineComponent as E, toRefs as O, inject as $, createVNode as h, mergeProps as B, withDirectives as A, vModelCheckbox as G, onMounted as q, provide as F, createTextVNode as U } from "vue";
function M(n, e = 0, r = []) {
  return e++, n.reduce((s, t) => {
    var l;
    const o = { ...t };
    if (o.level = e, r.length > 0 && r[r.length - 1].level >= e)
      for (; ((l = r[r.length - 1]) == null ? void 0 : l.level) >= e; )
        r.pop();
    r.push(o);
    const d = r[r.length - 2];
    if (d && (o.parentId = d.id), o.children) {
      const a = M(o.children, e, r);
      return delete o.children, s.concat(o, a);
    } else
      return o.isLeaf === void 0 && (o.isLeaf = !0), s.concat(o);
  }, []);
}
function X(n, { getChildren: e }) {
  return {
    toggleCheckNode: (s) => {
      s.checked = !s.checked, e(s).forEach((l) => {
        l.checked = s.checked;
      });
      const t = n.value.find(
        (l) => l.id === s.parentId
      );
      if (!t)
        return;
      const o = e(t, !1), d = o.filter((l) => l.checked);
      d.length === o.length ? t.checked = !0 : d.length === 0 && (t.checked = !1);
    }
  };
}
function Y(n) {
  const e = D(() => {
    let l = [];
    const a = [];
    for (const p of n.value)
      l.map((c) => c.id).includes(p.id) || (p.expanded !== !0 && (l = r(p)), a.push(p));
    return a;
  }), r = (l, a = !0) => {
    const p = [], c = n.value.findIndex((g) => g.id === l.id);
    for (let g = c + 1; g < n.value.length && l.level < n.value[g].level; g++)
      (a || l.level === n.value[g].level - 1) && p.push(n.value[g]);
    return p;
  }, s = (l, a = []) => {
    const p = r(l, !1);
    return a.push(...p), p.forEach((c) => {
      c.expanded && s(c, a);
    }), a;
  };
  return {
    expendedTree: e,
    getChildren: r,
    getChildrenExpanded: s,
    getIndex: (l) => l ? n.value.findIndex((a) => a.id === l.id) : -1,
    getNode: (l) => n.value.find((a) => a.id === l.id),
    getParent: (l) => n.value.find((a) => a.id === l.parentId)
  };
}
function J(n = 8) {
  const e = "abcdefghijklmnopqrstuvwxyz0123456789";
  let r = "";
  for (let s = 0; s < n; s++)
    r += e[parseInt((Math.random() * e.length).toString())];
  return r;
}
function K(n, { getChildren: e, getIndex: r }) {
  return {
    append: (o, d) => {
      const l = e(o, !1), a = l[l.length - 1];
      let p = r(o) + 1;
      a && (p = r(a) + 1), o.expanded = !0, o.isLeaf = !1;
      const c = b({
        ...d,
        level: o.level + 1,
        parentId: o.id,
        isLeaf: !0
      });
      c.value.id === void 0 && (c.value.id = J()), n.value.splice(p, 0, c.value);
    },
    remove: (o) => {
      const d = e(o).map((l) => l.id);
      n.value = n.value.filter(
        (l) => l.id !== o.id && !d.includes(l.id)
      );
    }
  };
}
function Q(n, e, r, s) {
  const { lazyLoadNodes: t } = s;
  return {
    toggleNode: (d) => {
      const l = n.value.find((a) => a.id === d.id);
      l && (l.expanded = !l.expanded, l.expanded && t(l));
    }
  };
}
function W(n, { getNode: e, getIndex: r, getChildren: s }, { emit: t }) {
  const o = (p) => {
    const c = e(p);
    c && c.isLeaf === !1 && !c.childNodeCount && (c.loading = !0, t("lazy-load", p, d));
  }, d = (p) => {
    const c = e(p.node);
    if (c) {
      c.loading = !1;
      const g = b(
        M(p.treeItems, c.level)
      );
      l(c, g), a(c, g);
      const m = s(c);
      c.childNodeCount = m.length;
    }
  }, l = (p, c) => {
    c.value.forEach((g) => {
      g.level - 1 === p.level && !g.parentId && (g.parentId = p.id);
    });
  }, a = (p, c) => {
    const g = r(p);
    g && n.value.splice(g + 1, 0, ...c.value);
  };
  return {
    lazyLoadNodes: o
  };
}
const _ = {
  dropPrev: "s-tree__node--drop-prev",
  dropNext: "s-tree__node--drop-next",
  dropInner: "s-tree__node--drop-inner"
};
function Z(n, e, { getChildren: r, getParent: s }) {
  const t = j({
    dropType: void 0,
    draggingNode: null,
    draggingTreeNode: null
  }), o = D(
    () => e.value.reduce(
      (i, u) => ({
        ...i,
        [u.id]: u
      }),
      {}
    )
  ), d = (i) => {
    i == null || i.classList.remove(...Object.values(_));
  }, l = (i, u) => {
    var v;
    const f = (v = o.value[i]) == null ? void 0 : v.parentId;
    return f === u ? !0 : f !== void 0 ? l(f, u) : !1;
  }, a = () => {
    t.dropType = void 0, t.draggingNode = null, t.draggingTreeNode = null;
  }, p = (i, u) => {
    var f;
    i.stopPropagation(), t.draggingNode = i.target, t.draggingTreeNode = u, (f = i.dataTransfer) == null || f.setData("dragNodeId", u.id);
  }, c = (i) => {
    if (i.preventDefault(), i.stopPropagation(), !!t.draggingNode && n) {
      if (i.dataTransfer && (i.dataTransfer.dropEffect = "move"), !e)
        return;
      let u = {};
      typeof n == "object" ? u = n : n === !0 && (u = { dropInner: !0 });
      const { dropPrev: f, dropNext: v, dropInner: x } = u;
      let I;
      const T = f ? x ? 0.25 : v ? 0.45 : 1 : -1, C = v ? x ? 0.75 : f ? 0.55 : 0 : 1, y = i.currentTarget, L = y == null ? void 0 : y.getBoundingClientRect(), w = i.clientY - ((L == null ? void 0 : L.top) || 0);
      if (w < ((L == null ? void 0 : L.height) || 0) * T ? I = "dropPrev" : w > ((L == null ? void 0 : L.height) || 0) * C ? I = "dropNext" : x ? I = "dropInner" : I = void 0, I) {
        const P = y == null ? void 0 : y.classList;
        P && (P.contains(_[I]) || (d(y), P.add(_[I])));
      } else
        d(y);
      t.dropType = I;
    }
  }, g = (i) => {
    i.stopPropagation(), t.draggingNode && d(i.currentTarget);
  }, m = (i, u) => {
    var v;
    if (i.preventDefault(), i.stopPropagation(), d(i.currentTarget), !t.draggingNode || !n)
      return;
    const f = (v = i.dataTransfer) == null ? void 0 : v.getData("dragNodeId");
    if (f) {
      const x = l(u.id, f);
      if (f === u.id || x)
        return;
      t.dropType && N(f, u), a();
    }
  };
  function N(i, u) {
    const f = e.value.find((v) => v.id === i);
    if (f) {
      let v;
      const x = r(f), I = s(f);
      if (t.dropType === "dropInner") {
        v = {
          ...f,
          parentId: u.id,
          level: u.level + 1
        };
        const T = e.value.indexOf(u);
        e.value.splice(T + 1, 0, v), u.isLeaf = void 0;
        const C = e.value.indexOf(f);
        e.value.splice(C, 1);
      } else if (t.dropType === "dropNext") {
        v = {
          ...f,
          parentId: u.parentId,
          level: u.level
        };
        const T = e.value.indexOf(u), C = r(u, !0).length;
        e.value.splice(
          T + C + 1,
          0,
          v
        );
        const y = e.value.indexOf(f);
        e.value.splice(y, 1);
      } else if (t.dropType === "dropPrev") {
        v = {
          ...f,
          parentId: u.parentId,
          level: u.level
        };
        const T = e.value.indexOf(u);
        e.value.splice(T, 0, v);
        const C = e.value.indexOf(f);
        e.value.splice(C, 1);
      }
      t.dropType = "dropInner", x.forEach((T) => N(T.id, v)), I && r(I).length === 0 && (I.isLeaf = !0);
    }
  }
  return {
    onDragstart: p,
    onDragover: c,
    onDragleave: g,
    onDrop: m,
    onDragend: (i) => {
      i.preventDefault(), i.stopPropagation(), a();
    }
  };
}
function ee(n, e, r) {
  const s = R(n), t = b(M(s)), o = Y(t), d = [Q, X, K], l = W(t, o, r), a = Z(e.dragdrop, t, o);
  return {
    ...d.reduce((c, g) => ({ ...c, ...g(t, o, r, l) }), {}),
    ...o,
    ...a,
    treeData: t
  };
}
const V = {
  data: {
    type: Object,
    required: !0
  },
  checkable: {
    type: Boolean,
    default: !1
  },
  lineable: {
    type: Boolean,
    default: !1
  },
  operable: {
    type: Boolean,
    default: !1
  },
  dragdrop: {
    type: [Boolean, Object],
    default: !1
  },
  height: {
    type: Number
  },
  itemHeight: {
    type: Number,
    default: 30
  }
}, ne = {
  ...V,
  treeNode: {
    type: Object,
    required: !0
  }
}, H = 32, S = 24, te = E({
  name: "CTreeNode",
  props: ne,
  setup(n, {
    slots: e
  }) {
    const {
      lineable: r,
      checkable: s,
      treeNode: t,
      operable: o,
      dragdrop: d
    } = O(n), {
      toggleCheckNode: l,
      getChildrenExpanded: a,
      append: p,
      remove: c,
      onDragend: g,
      onDragleave: m,
      onDragover: N,
      onDragstart: k,
      onDrop: i
    } = $("TREE_UTILS"), u = b(!1), f = () => {
      u.value ? u.value = !1 : u.value = !0;
    };
    let v = {};
    return d.value && (v = {
      draggable: !0,
      onDragend: (x) => g(x),
      onDragleave: (x) => m(x),
      onDragover: (x) => N(x),
      onDragstart: (x) => k(x, t.value),
      onDrop: (x) => i(x, t.value)
    }), () => h("div", {
      class: "relative leading-8 hover:bg-slate-300",
      style: {
        paddingLeft: `${S * (t.value.level - 1)}px`
      },
      onMouseenter: f,
      onMouseleave: f
    }, [!t.value.isLeaf && t.value.expanded && r.value && h("span", {
      class: "s-tree-node__vline absolute w-px bg-slate-300",
      style: {
        height: `${H * a(t.value).length}px`,
        left: `${S * (t.value.level - 1) + 12}px`,
        top: `${H}px`
      }
    }, null), h("div", B({
      class: "s-tree__node--content"
    }, v), [t.value.isLeaf ? h("span", {
      style: {
        display: "inline-block",
        width: "25px"
      }
    }, null) : e.icon(), s.value && A(h("input", {
      type: "checkbox",
      "onUpdate:modelValue": (x) => t.value.checked = x,
      class: "relative top-[2px] mr-1",
      onClick: () => {
        l(t.value);
      }
    }, null), [[G, t.value.checked]]), e.content(), o.value && u.value && h("span", {
      class: "inline-flex ml-1"
    }, [h("svg", {
      onClick: () => {
        p(t.value, {
          label: "\u65B0\u8282\u70B9"
        });
      },
      viewBox: "0 0 1024 1024",
      width: "14",
      height: "14",
      class: "cursor-pointer"
    }, [h("path", {
      d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
    }, null)]), h("svg", {
      onClick: () => {
        c(t.value);
      },
      viewBox: "0 0 1024 1024",
      width: "14",
      height: "14",
      class: "cursor-pointer ml-1"
    }, [h("path", {
      d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
    }, null)])]), t.value.loading && e.loading()])]);
  }
}), le = (n, {
  emit: e
}) => h("svg", {
  style: {
    width: "25px",
    height: "16px",
    display: "inline-block",
    transform: n.expanded ? "rotate(90deg)" : ""
  },
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  onClick: () => e("onClick")
}, [h("path", {
  fill: "currentColor",
  d: "M384 192v640l384-320.064z"
}, null)]);
const oe = {
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
const re = E({
  name: "VirtualList",
  props: oe,
  setup(n, {
    slots: e
  }) {
    const {
      data: r,
      itemHeight: s,
      component: t
    } = O(n), o = b(), d = b(0), l = b(0), a = b(0), p = D(() => Math.ceil(d.value / s.value)), c = D(() => r.value.slice(a.value, Math.min(a.value + p.value, r.value.length)));
    q(() => {
      var m;
      d.value = (m = o.value) == null ? void 0 : m.clientHeight;
    });
    const g = function(m) {
      const N = m.target.scrollTop;
      a.value = Math.floor(N / s.value), l.value = N - N % s.value;
    };
    return () => h(t.value, {
      class: "s-virtual-list__container",
      ref: o,
      onScroll: g
    }, {
      default: () => [h("div", {
        class: "s-virtual-list__blank",
        style: {
          height: `${r.value.length * s.value}px`
        }
      }, null), h("div", {
        class: "s-virtual-list",
        style: {
          transform: `translate3d(0,${l.value}px,0)`
        }
      }, [c.value.map((m, N) => {
        var k;
        return (k = e.default) == null ? void 0 : k.call(e, {
          item: m,
          index: N
        });
      })])]
    });
  }
}), ae = "c", z = "_cai", se = "C", ce = (n, e = { classPrefix: ae }) => {
  var r;
  n.config.globalProperties[z] = {
    ...(r = n.config.globalProperties[z]) != null ? r : {},
    classPrefix: e.classPrefix
  };
}, de = (n) => {
  var e;
  return (e = n == null ? void 0 : n.componentPrefix) != null ? e : se;
};
function ie(n, e, r) {
  const s = de(r);
  n.component(s + e.name) || (ce(n, r), n.component(s + e.name, e));
}
const ue = E({
  name: "Tree",
  props: V,
  emits: ["lazy-load"],
  setup(n, e) {
    const {
      data: r,
      height: s,
      itemHeight: t
    } = O(n), {
      slots: o
    } = e, d = ee(r.value, n, e);
    return F("TREE_UTILS", d), () => {
      const l = (a) => h(te, B(n, {
        treeNode: a
      }), {
        content: () => o.content ? o.content(a) : a.label,
        icon: () => o.icon ? o.icon({
          nodeData: a,
          toggleNode: d.toggleNode
        }) : h(le, {
          expanded: !!a.expanded,
          onClick: () => d.toggleNode(a)
        }, null),
        loading: () => o.loading ? o.loading({
          nodeData: d
        }) : h("span", {
          class: "ml-1"
        }, [U("loading...")])
      });
      return h("div", {
        class: "s-tree"
      }, [s != null && s.value ? h("div", {
        style: {
          height: `${s.value}px`
        }
      }, [h(re, {
        data: d.expendedTree.value,
        itemHeight: t.value
      }, {
        default: ({
          item: a
        }) => l(a)
      })]) : d.expendedTree.value.map((a) => l(a))]);
    };
  }
}), fe = {
  install(n, e) {
    ie(n, ue, e);
  }
};
export {
  ue as Tree,
  fe as default
};
