(function(n,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],o):(n=typeof globalThis<"u"?globalThis:n||self,o(n.index={},n.Vue))})(this,function(n,o){"use strict";const f={data:{type:Object,required:!0}},s=o.defineComponent({name:"CTree",props:f,setup(e){const{data:t}=o.toRefs(e);return()=>o.createVNode("div",{class:"s-tree"},[t.value.map(r=>r.label)])}}),d="s",i="_Cai",l="C",a=(e,t={classPrefix:d})=>{var r;e.config.globalProperties[i]={...(r=e.config.globalProperties[i])!=null?r:{},classPrefix:t.classPrefix}},u=e=>{var t;return(t=e==null?void 0:e.componentPrefix)!=null?t:l};function P(e,t,r){const c=u(r);e.component(c+t.name)||(a(e,r),e.component(c+t.name,t))}const m={install(e,t){P(e,s,t)}};n.Tree=s,n.default=m,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
