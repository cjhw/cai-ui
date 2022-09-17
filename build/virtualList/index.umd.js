(function(i,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(i=typeof globalThis<"u"?globalThis:i||self,e(i.index={},i.Vue))})(this,function(i,e){"use strict";const g={data:{type:Array,default:[]},itemHeight:{type:Number,default:22},component:{type:String,default:"div"}},N="",c=e.defineComponent({name:"VirtualList",props:g,setup(t,{slots:n}){const{data:l,itemHeight:o,component:f}=e.toRefs(t),d=e.ref(),m=e.ref(0),v=e.ref(0),s=e.ref(0),y=e.computed(()=>Math.ceil(m.value/o.value)),L=e.computed(()=>l.value.slice(s.value,Math.min(s.value+y.value,l.value.length)));e.onMounted(()=>{var a;m.value=(a=d.value)==null?void 0:a.clientHeight});const M=function(a){const r=a.target.scrollTop;s.value=Math.floor(r/o.value),v.value=r-r%o.value};return()=>e.createVNode(f.value,{class:"s-virtual-list__container",ref:d,onScroll:M},{default:()=>[e.createVNode("div",{class:"s-virtual-list__blank",style:{height:`${l.value.length*o.value}px`}},null),e.createVNode("div",{class:"s-virtual-list",style:{transform:`translate3d(0,${v.value}px,0)`}},[L.value.map((a,r)=>{var p;return(p=n.default)==null?void 0:p.call(n,{item:a,index:r})})])]})}}),h="s",u="_cai",P="C",x=(t,n={classPrefix:h})=>{var l;t.config.globalProperties[u]={...(l=t.config.globalProperties[u])!=null?l:{},classPrefix:n.classPrefix}},_=t=>{var n;return(n=t==null?void 0:t.componentPrefix)!=null?n:P};function C(t,n,l){const o=_(l);t.component(o+n.name)||(x(t,l),t.component(o+n.name,n))}const b={install(t,n){C(t,c,n)}};i.VirtualList=c,i.default=b,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
