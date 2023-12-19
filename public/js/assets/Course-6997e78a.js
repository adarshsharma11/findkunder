import{r as y,O as A,Q as V,s as E,R as L,U as F,V as Y,j as s,W as B,X as G,Y as ft,Z as Lt,$ as ht,a0 as vt,a1 as gt,N as _t,a2 as Mt,w as Nt,v as Rt,k as It,a3 as jt,a4 as Pt,i as Tt,a5 as Ot,a6 as Et,a7 as ze,F as Dt,a8 as de,P as He,E as pe,a9 as Ue,b as z,T as Ae,aa as qt,B as fe,ab as kt,ac as $t,ad as Xt,ae as Wt}from"./app-dd54c10f.js";import{C as Ve,a as zt}from"./CourseProgress-31544bf7.js";import"src/i18n";import"./LinearProgress-782ebc45.js";const Ht=y.createContext({}),oe=Ht,Ut=y.createContext({}),Se=Ut;function At(e){return A("MuiStep",e)}V("MuiStep",["root","horizontal","vertical","alternativeLabel","completed"]);const Vt=["active","children","className","completed","disabled","expanded","index","last"],Ft=e=>{const{classes:r,orientation:n,alternativeLabel:i,completed:a}=e;return G({root:["root",n,i&&"alternativeLabel",a&&"completed"]},At,r)},Yt=E("div",{name:"MuiStep",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,r[n.orientation],n.alternativeLabel&&r.alternativeLabel,n.completed&&r.completed]}})(({ownerState:e})=>L({},e.orientation==="horizontal"&&{paddingLeft:8,paddingRight:8},e.alternativeLabel&&{flex:1,position:"relative"})),Bt=y.forwardRef(function(r,n){const i=F({props:r,name:"MuiStep"}),{active:a,children:l,className:u,completed:d,disabled:S,expanded:h=!1,index:p,last:g}=i,f=Y(i,Vt),{activeStep:x,connector:M,alternativeLabel:R,orientation:w,nonLinear:I}=y.useContext(oe);let[_=!1,D=!1,P=!1]=[a,d,S];x===p?_=a!==void 0?a:!0:!I&&x>p?D=d!==void 0?d:!0:!I&&x<p&&(P=S!==void 0?S:!0);const T=y.useMemo(()=>({index:p,last:g,expanded:h,icon:p+1,active:_,completed:D,disabled:P}),[p,g,h,_,D,P]),q=L({},i,{active:_,orientation:w,alternativeLabel:R,completed:D,disabled:P,expanded:h}),c=Ft(q),m=s.jsxs(Yt,L({className:B(c.root,u),ref:n,ownerState:q},f,{children:[M&&R&&p!==0?M:null,l]}));return s.jsx(Se.Provider,{value:T,children:M&&!R&&p!==0?s.jsxs(y.Fragment,{children:[M,m]}):m})}),Gt=Bt,Qt=ft(s.jsx("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"}),"CheckCircle"),Zt=ft(s.jsx("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");function Jt(e){return A("MuiStepIcon",e)}const Kt=V("MuiStepIcon",["root","active","completed","error","text"]),be=Kt;var Fe;const er=["active","className","completed","error","icon"],tr=e=>{const{classes:r,active:n,completed:i,error:a}=e;return G({root:["root",n&&"active",i&&"completed",a&&"error"],text:["text"]},Jt,r)},Ce=E(Lt,{name:"MuiStepIcon",slot:"Root",overridesResolver:(e,r)=>r.root})(({theme:e})=>({display:"block",transition:e.transitions.create("color",{duration:e.transitions.duration.shortest}),color:(e.vars||e).palette.text.disabled,[`&.${be.completed}`]:{color:(e.vars||e).palette.primary.main},[`&.${be.active}`]:{color:(e.vars||e).palette.primary.main},[`&.${be.error}`]:{color:(e.vars||e).palette.error.main}})),rr=E("text",{name:"MuiStepIcon",slot:"Text",overridesResolver:(e,r)=>r.text})(({theme:e})=>({fill:(e.vars||e).palette.primary.contrastText,fontSize:e.typography.caption.fontSize,fontFamily:e.typography.fontFamily})),nr=y.forwardRef(function(r,n){const i=F({props:r,name:"MuiStepIcon"}),{active:a=!1,className:l,completed:u=!1,error:d=!1,icon:S}=i,h=Y(i,er),p=L({},i,{active:a,completed:u,error:d}),g=tr(p);if(typeof S=="number"||typeof S=="string"){const f=B(l,g.root);return d?s.jsx(Ce,L({as:Zt,className:f,ref:n,ownerState:p},h)):u?s.jsx(Ce,L({as:Qt,className:f,ref:n,ownerState:p},h)):s.jsxs(Ce,L({className:f,ref:n,ownerState:p},h,{children:[Fe||(Fe=s.jsx("circle",{cx:"12",cy:"12",r:"12"})),s.jsx(rr,{className:g.text,x:"12",y:"16",textAnchor:"middle",ownerState:p,children:S})]}))}return S}),or=nr;function ir(e){return A("MuiStepLabel",e)}const ar=V("MuiStepLabel",["root","horizontal","vertical","label","active","completed","error","disabled","iconContainer","alternativeLabel","labelContainer"]),H=ar,sr=["children","className","componentsProps","error","icon","optional","StepIconComponent","StepIconProps"],lr=e=>{const{classes:r,orientation:n,active:i,completed:a,error:l,disabled:u,alternativeLabel:d}=e;return G({root:["root",n,l&&"error",u&&"disabled",d&&"alternativeLabel"],label:["label",i&&"active",a&&"completed",l&&"error",u&&"disabled",d&&"alternativeLabel"],iconContainer:["iconContainer",d&&"alternativeLabel"],labelContainer:["labelContainer"]},ir,r)},cr=E("span",{name:"MuiStepLabel",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,r[n.orientation]]}})(({ownerState:e})=>L({display:"flex",alignItems:"center",[`&.${H.alternativeLabel}`]:{flexDirection:"column"},[`&.${H.disabled}`]:{cursor:"default"}},e.orientation==="vertical"&&{textAlign:"left",padding:"8px 0"})),ur=E("span",{name:"MuiStepLabel",slot:"Label",overridesResolver:(e,r)=>r.label})(({theme:e})=>L({},e.typography.body2,{display:"block",transition:e.transitions.create("color",{duration:e.transitions.duration.shortest}),[`&.${H.active}`]:{color:(e.vars||e).palette.text.primary,fontWeight:500},[`&.${H.completed}`]:{color:(e.vars||e).palette.text.primary,fontWeight:500},[`&.${H.alternativeLabel}`]:{textAlign:"center",marginTop:16},[`&.${H.error}`]:{color:(e.vars||e).palette.error.main}})),dr=E("span",{name:"MuiStepLabel",slot:"IconContainer",overridesResolver:(e,r)=>r.iconContainer})(()=>({flexShrink:0,display:"flex",paddingRight:8,[`&.${H.alternativeLabel}`]:{paddingRight:0}})),pr=E("span",{name:"MuiStepLabel",slot:"LabelContainer",overridesResolver:(e,r)=>r.labelContainer})(({theme:e})=>({width:"100%",color:(e.vars||e).palette.text.secondary})),xt=y.forwardRef(function(r,n){const i=F({props:r,name:"MuiStepLabel"}),{children:a,className:l,componentsProps:u={},error:d=!1,icon:S,optional:h,StepIconComponent:p,StepIconProps:g}=i,f=Y(i,sr),{alternativeLabel:x,orientation:M}=y.useContext(oe),{active:R,disabled:w,completed:I,icon:_}=y.useContext(Se),D=S||_;let P=p;D&&!P&&(P=or);const T=L({},i,{active:R,alternativeLabel:x,completed:I,disabled:w,error:d,orientation:M}),q=lr(T);return s.jsxs(cr,L({className:B(q.root,l),ref:n,ownerState:T},f,{children:[D||P?s.jsx(dr,{className:q.iconContainer,ownerState:T,children:s.jsx(P,L({completed:I,active:R,error:d,icon:D},g))}):null,s.jsxs(pr,{className:q.labelContainer,ownerState:T,children:[a?s.jsx(ur,L({className:q.label,ownerState:T},u.label,{children:a})):null,h]})]}))});xt.muiName="StepLabel";const fr=xt;function hr(e){return A("MuiStepConnector",e)}V("MuiStepConnector",["root","horizontal","vertical","alternativeLabel","active","completed","disabled","line","lineHorizontal","lineVertical"]);const vr=["className"],gr=e=>{const{classes:r,orientation:n,alternativeLabel:i,active:a,completed:l,disabled:u}=e,d={root:["root",n,i&&"alternativeLabel",a&&"active",l&&"completed",u&&"disabled"],line:["line",`line${ht(n)}`]};return G(d,hr,r)},xr=E("div",{name:"MuiStepConnector",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,r[n.orientation],n.alternativeLabel&&r.alternativeLabel,n.completed&&r.completed]}})(({ownerState:e})=>L({flex:"1 1 auto"},e.orientation==="vertical"&&{marginLeft:12},e.alternativeLabel&&{position:"absolute",top:8+4,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"})),Sr=E("span",{name:"MuiStepConnector",slot:"Line",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.line,r[`line${ht(n.orientation)}`]]}})(({ownerState:e,theme:r})=>L({display:"block",borderColor:r.palette.mode==="light"?r.palette.grey[400]:r.palette.grey[600]},e.orientation==="horizontal"&&{borderTopStyle:"solid",borderTopWidth:1},e.orientation==="vertical"&&{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24})),mr=y.forwardRef(function(r,n){const i=F({props:r,name:"MuiStepConnector"}),{className:a}=i,l=Y(i,vr),{alternativeLabel:u,orientation:d="horizontal"}=y.useContext(oe),{active:S,disabled:h,completed:p}=y.useContext(Se),g=L({},i,{alternativeLabel:u,orientation:d,active:S,completed:p,disabled:h}),f=gr(g);return s.jsx(xr,L({className:B(f.root,a),ref:n,ownerState:g},l,{children:s.jsx(Sr,{className:f.line,ownerState:g})}))}),yr=mr;function br(e){return A("MuiStepContent",e)}V("MuiStepContent",["root","last","transition"]);const Cr=["children","className","TransitionComponent","transitionDuration","TransitionProps"],wr=e=>{const{classes:r,last:n}=e;return G({root:["root",n&&"last"],transition:["transition"]},br,r)},Lr=E("div",{name:"MuiStepContent",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,n.last&&r.last]}})(({ownerState:e,theme:r})=>L({marginLeft:12,paddingLeft:8+12,paddingRight:8,borderLeft:`1px solid ${r.palette.mode==="light"?r.palette.grey[400]:r.palette.grey[600]}`},e.last&&{borderLeft:"none"})),_r=E(vt,{name:"MuiStepContent",slot:"Transition",overridesResolver:(e,r)=>r.transition})({}),Mr=y.forwardRef(function(r,n){const i=F({props:r,name:"MuiStepContent"}),{children:a,className:l,TransitionComponent:u=vt,transitionDuration:d="auto",TransitionProps:S}=i,h=Y(i,Cr);y.useContext(oe);const{active:p,last:g,expanded:f}=y.useContext(Se),x=L({},i,{last:g}),M=wr(x);let R=d;return d==="auto"&&!u.muiSupportAuto&&(R=void 0),s.jsx(Lr,L({className:B(M.root,l),ref:n,ownerState:x},h,{children:s.jsx(_r,L({as:u,in:p||f,className:M.transition,ownerState:x,timeout:R,unmountOnExit:!0},S,{children:a}))}))}),Nr=Mr;function Rr(e){return A("MuiStepper",e)}V("MuiStepper",["root","horizontal","vertical","alternativeLabel"]);const Ir=["activeStep","alternativeLabel","children","className","connector","nonLinear","orientation"],jr=e=>{const{orientation:r,alternativeLabel:n,classes:i}=e;return G({root:["root",r,n&&"alternativeLabel"]},Rr,i)},Pr=E("div",{name:"MuiStepper",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,r[n.orientation],n.alternativeLabel&&r.alternativeLabel]}})(({ownerState:e})=>L({display:"flex"},e.orientation==="horizontal"&&{flexDirection:"row",alignItems:"center"},e.orientation==="vertical"&&{flexDirection:"column"},e.alternativeLabel&&{alignItems:"flex-start"})),Tr=s.jsx(yr,{}),Or=y.forwardRef(function(r,n){const i=F({props:r,name:"MuiStepper"}),{activeStep:a=0,alternativeLabel:l=!1,children:u,className:d,connector:S=Tr,nonLinear:h=!1,orientation:p="horizontal"}=i,g=Y(i,Ir),f=L({},i,{alternativeLabel:l,orientation:p}),x=jr(f),M=y.Children.toArray(u).filter(Boolean),R=M.map((I,_)=>y.cloneElement(I,L({index:_,last:_+1===M.length},I.props))),w=y.useMemo(()=>({activeStep:a,alternativeLabel:l,connector:S,nonLinear:h,orientation:p}),[a,l,S,h,p]);return s.jsx(oe.Provider,{value:w,children:s.jsx(Pr,L({ownerState:f,className:B(x.root,d),ref:n},g,{children:R}))})}),Er=Or;var St={};function Dr(e){if(e&&e.__esModule)return e;var r={};if(e!=null){for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var i=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};i.get||i.set?Object.defineProperty(r,n,i):r[n]=e[n]}}return r.default=e,r}var mt=Dr,$={},we,Ye;function qr(){if(Ye)return we;Ye=1;function e(r){return r&&r.__esModule?r:{default:r}}return we=e,we}var he,Be;function kr(){if(Be)return he;Be=1;function e(){return he=e=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(r[a]=i[a])}return r},e.apply(this,arguments)}return he=e,he}var Le,Ge;function $r(){if(Ge)return Le;Ge=1;function e(r,n){if(r==null)return{};var i={},a=Object.keys(r),l,u;for(u=0;u<a.length;u++)l=a[u],!(n.indexOf(l)>=0)&&(i[l]=r[l]);return i}return Le=e,Le}var _e,Qe;function Xr(){if(Qe)return _e;Qe=1;var e=$r();function r(n,i){if(n==null)return{};var a=e(n,i),l,u;if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(n);for(u=0;u<d.length;u++)l=d[u],!(i.indexOf(l)>=0)&&Object.prototype.propertyIsEnumerable.call(n,l)&&(a[l]=n[l])}return a}return _e=r,_e}var Me,Ze;function Wr(){if(Ze)return Me;Ze=1;function e(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}return Me=e,Me}var Ne,Je;function zr(){if(Je)return Ne;Je=1;function e(n,i){for(var a=0;a<i.length;a++){var l=i[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(n,l.key,l)}}function r(n,i,a){return i&&e(n.prototype,i),a&&e(n,a),n}return Ne=r,Ne}var K,Ke;function Hr(){if(Ke)return K;Ke=1;function e(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?e=function(a){return typeof a}:e=function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},e(n)}function r(n){return typeof Symbol=="function"&&e(Symbol.iterator)==="symbol"?K=r=function(a){return e(a)}:K=r=function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":e(a)},r(n)}return K=r,K}var Re,et;function Ur(){if(et)return Re;et=1;function e(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}return Re=e,Re}var Ie,tt;function Ar(){if(tt)return Ie;tt=1;var e=Hr(),r=Ur();function n(i,a){return a&&(e(a)==="object"||typeof a=="function")?a:r(i)}return Ie=n,Ie}var ve,rt;function Vr(){if(rt)return ve;rt=1;function e(r){return ve=e=Object.setPrototypeOf?Object.getPrototypeOf:function(i){return i.__proto__||Object.getPrototypeOf(i)},e(r)}return ve=e,ve}var ge,nt;function Fr(){if(nt)return ge;nt=1;function e(r,n){return ge=e=Object.setPrototypeOf||function(a,l){return a.__proto__=l,a},e(r,n)}return ge=e,ge}var je,ot;function Yr(){if(ot)return je;ot=1;var e=Fr();function r(n,i){if(typeof i!="function"&&i!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(i&&i.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),i&&e(n,i)}return je=r,je}var Pe={},Te,it;function me(){if(it)return Te;it=1;function e(r){return r&&r.__esModule?r:{default:r}}return Te=e,Te}var ee={},at;function Br(){if(at)return ee;at=1;var e=me();Object.defineProperty(ee,"__esModule",{value:!0}),ee.default=void 0;var r=e(y);e(gt());var n=function(l){l.index;var u=l.children;r.default.Children.count(u)},i=n;return ee.default=i,ee}var xe={},te={},st;function yt(){if(st)return te;st=1,Object.defineProperty(te,"__esModule",{value:!0}),te.default=void 0;var e={RESISTANCE_COEF:.6,UNCERTAINTY_THRESHOLD:3};return te.default=e,te}var lt;function Gr(){if(lt)return xe;lt=1;var e=me();Object.defineProperty(xe,"__esModule",{value:!0}),xe.default=i;var r=e(y),n=e(yt());function i(a){var l=a.children,u=a.startIndex,d=a.startX,S=a.pageX,h=a.viewLength,p=a.resistance,g=r.default.Children.count(l)-1,f=u+(d-S)/h,x;return p?f<0?f=Math.exp(f*n.default.RESISTANCE_COEF)-1:f>g&&(f=g+1-Math.exp((g-f)*n.default.RESISTANCE_COEF)):f<0?(f=0,x=(f-u)*h+S):f>g&&(f=g,x=(f-u)*h+S),{index:f,startX:x}}return xe}var re={},ct;function Qr(){if(ct)return re;ct=1;var e=me();Object.defineProperty(re,"__esModule",{value:!0}),re.default=void 0;var r=e(y),n=function(l,u){var d=!1,S=function(M){return M?M.key:"empty"};if(l.children.length&&u.children.length){var h=r.default.Children.map(l.children,S),p=h[l.index];if(p!=null){var g=r.default.Children.map(u.children,S),f=g[u.index];p===f&&(d=!0)}}return d},i=n;return re.default=i,re}var ne={},ut;function Zr(){if(ut)return ne;ut=1,Object.defineProperty(ne,"__esModule",{value:!0}),ne.default=void 0;function e(n,i){var a=n%i;return a<0?a+i:a}var r=e;return ne.default=r,ne}var dt;function Jr(){return dt||(dt=1,function(e){var r=me();Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"checkIndexBounds",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(e,"computeIndex",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(e,"constant",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(e,"getDisplaySameSlide",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(e,"mod",{enumerable:!0,get:function(){return u.default}});var n=r(Br()),i=r(Gr()),a=r(yt()),l=r(Qr()),u=r(Zr())}(Pe)),Pe}var pt;function Kr(){if(pt)return $;pt=1;var e=mt,r=qr();Object.defineProperty($,"__esModule",{value:!0}),$.getDomTreeShapes=I,$.findNativeHandler=D,$.default=$.SwipeableViewsContext=void 0;var n=r(kr()),i=r(Xr()),a=r(Wr()),l=r(zr()),u=r(Ar()),d=r(Vr()),S=r(Yr()),h=e(y);r(_t),r(gt());var p=Jr();function g(c,m,b,t){return c.addEventListener(m,b,t),{remove:function(){c.removeEventListener(m,b,t)}}}var f={container:{direction:"ltr",display:"flex",willChange:"transform"},slide:{width:"100%",WebkitFlexShrink:0,flexShrink:0,overflow:"auto"}},x={root:{x:{overflowX:"hidden"},"x-reverse":{overflowX:"hidden"},y:{overflowY:"hidden"},"y-reverse":{overflowY:"hidden"}},flexDirection:{x:"row","x-reverse":"row-reverse",y:"column","y-reverse":"column-reverse"},transform:{x:function(m){return"translate(".concat(-m,"%, 0)")},"x-reverse":function(m){return"translate(".concat(m,"%, 0)")},y:function(m){return"translate(0, ".concat(-m,"%)")},"y-reverse":function(m){return"translate(0, ".concat(m,"%)")}},length:{x:"width","x-reverse":"width",y:"height","y-reverse":"height"},rotationMatrix:{x:{x:[1,0],y:[0,1]},"x-reverse":{x:[-1,0],y:[0,1]},y:{x:[0,1],y:[1,0]},"y-reverse":{x:[0,-1],y:[1,0]}},scrollPosition:{x:"scrollLeft","x-reverse":"scrollLeft",y:"scrollTop","y-reverse":"scrollTop"},scrollLength:{x:"scrollWidth","x-reverse":"scrollWidth",y:"scrollHeight","y-reverse":"scrollHeight"},clientLength:{x:"clientWidth","x-reverse":"clientWidth",y:"clientHeight","y-reverse":"clientHeight"}};function M(c,m){var b=m.duration,t=m.easeFunction,o=m.delay;return"".concat(c," ").concat(b," ").concat(t," ").concat(o)}function R(c,m){var b=x.rotationMatrix[m];return{pageX:b.x[0]*c.pageX+b.x[1]*c.pageY,pageY:b.y[0]*c.pageX+b.y[1]*c.pageY}}function w(c){return c.touches=[{pageX:c.pageX,pageY:c.pageY}],c}function I(c,m){for(var b=[];c&&c!==m&&c!==document.body&&!c.hasAttribute("data-swipeable");){var t=window.getComputedStyle(c);t.getPropertyValue("position")==="absolute"||t.getPropertyValue("overflow-x")==="hidden"?b=[]:(c.clientWidth>0&&c.scrollWidth>c.clientWidth||c.clientHeight>0&&c.scrollHeight>c.clientHeight)&&b.push({element:c,scrollWidth:c.scrollWidth,scrollHeight:c.scrollHeight,clientWidth:c.clientWidth,clientHeight:c.clientHeight,scrollLeft:c.scrollLeft,scrollTop:c.scrollTop}),c=c.parentNode}return b}var _=null;function D(c){var m=c.domTreeShapes,b=c.pageX,t=c.startX,o=c.axis;return m.some(function(v){var N=b>=t;(o==="x"||o==="y")&&(N=!N);var C=Math.round(v[x.scrollPosition[o]]),O=C>0,k=C+v[x.clientLength[o]]<v[x.scrollLength[o]];return N&&k||!N&&O?(_=v.element,!0):!1})}var P=h.createContext();$.SwipeableViewsContext=P;var T=function(c){(0,S.default)(m,c);function m(b){var t;return(0,a.default)(this,m),t=(0,u.default)(this,(0,d.default)(m).call(this,b)),t.rootNode=null,t.containerNode=null,t.ignoreNextScrollEvents=!1,t.viewLength=0,t.startX=0,t.lastX=0,t.vx=0,t.startY=0,t.isSwiping=void 0,t.started=!1,t.startIndex=0,t.transitionListener=null,t.touchMoveListener=null,t.activeSlide=null,t.indexCurrent=null,t.firstRenderTimeout=null,t.setRootNode=function(o){t.rootNode=o},t.setContainerNode=function(o){t.containerNode=o},t.setActiveSlide=function(o){t.activeSlide=o,t.updateHeight()},t.handleSwipeStart=function(o){var v=t.props.axis,N=R(o.touches[0],v);t.viewLength=t.rootNode.getBoundingClientRect()[x.length[v]],t.startX=N.pageX,t.lastX=N.pageX,t.vx=0,t.startY=N.pageY,t.isSwiping=void 0,t.started=!0;var C=window.getComputedStyle(t.containerNode),O=C.getPropertyValue("-webkit-transform")||C.getPropertyValue("transform");if(O&&O!=="none"){var k=O.split("(")[1].split(")")[0].split(","),X=window.getComputedStyle(t.rootNode),j=R({pageX:parseInt(k[4],10),pageY:parseInt(k[5],10)},v);t.startIndex=-j.pageX/(t.viewLength-parseInt(X.paddingLeft,10)-parseInt(X.paddingRight,10))||0}},t.handleSwipeMove=function(o){if(!t.started){t.handleTouchStart(o);return}if(!(_!==null&&_!==t.rootNode)){var v=t.props,N=v.axis,C=v.children,O=v.ignoreNativeScroll,k=v.onSwitching,X=v.resistance,j=R(o.touches[0],N);if(t.isSwiping===void 0){var Q=Math.abs(j.pageX-t.startX),Z=Math.abs(j.pageY-t.startY),U=Q>Z&&Q>p.constant.UNCERTAINTY_THRESHOLD;if(!X&&(N==="y"||N==="y-reverse")&&(t.indexCurrent===0&&t.startX<j.pageX||t.indexCurrent===h.Children.count(t.props.children)-1&&t.startX>j.pageX)){t.isSwiping=!1;return}if(Q>Z&&o.preventDefault(),U===!0||Z>p.constant.UNCERTAINTY_THRESHOLD){t.isSwiping=U,t.startX=j.pageX;return}}if(t.isSwiping===!0){o.preventDefault(),t.vx=t.vx*.5+(j.pageX-t.lastX)*.5,t.lastX=j.pageX;var ie=(0,p.computeIndex)({children:C,resistance:X,pageX:j.pageX,startIndex:t.startIndex,startX:t.startX,viewLength:t.viewLength}),ae=ie.index,W=ie.startX;if(_===null&&!O){var ye=I(o.target,t.rootNode),se=D({domTreeShapes:ye,startX:t.startX,pageX:j.pageX,axis:N});if(se)return}W?t.startX=W:_===null&&(_=t.rootNode),t.setIndexCurrent(ae);var J=function(){k&&k(ae,"move")};(t.state.displaySameSlide||!t.state.isDragging)&&t.setState({displaySameSlide:!1,isDragging:!0},J),J()}}},t.handleSwipeEnd=function(){if(_=null,!!t.started&&(t.started=!1,t.isSwiping===!0)){var o=t.state.indexLatest,v=t.indexCurrent,N=o-v,C;Math.abs(t.vx)>t.props.threshold?t.vx>0?C=Math.floor(v):C=Math.ceil(v):Math.abs(N)>t.props.hysteresis?C=N>0?Math.floor(v):Math.ceil(v):C=o;var O=h.Children.count(t.props.children)-1;C<0?C=0:C>O&&(C=O),t.setIndexCurrent(C),t.setState({indexLatest:C,isDragging:!1},function(){t.props.onSwitching&&t.props.onSwitching(C,"end"),t.props.onChangeIndex&&C!==o&&t.props.onChangeIndex(C,o,{reason:"swipe"}),v===o&&t.handleTransitionEnd()})}},t.handleTouchStart=function(o){t.props.onTouchStart&&t.props.onTouchStart(o),t.handleSwipeStart(o)},t.handleTouchEnd=function(o){t.props.onTouchEnd&&t.props.onTouchEnd(o),t.handleSwipeEnd(o)},t.handleMouseDown=function(o){t.props.onMouseDown&&t.props.onMouseDown(o),o.persist(),t.handleSwipeStart(w(o))},t.handleMouseUp=function(o){t.props.onMouseUp&&t.props.onMouseUp(o),t.handleSwipeEnd(w(o))},t.handleMouseLeave=function(o){t.props.onMouseLeave&&t.props.onMouseLeave(o),t.started&&t.handleSwipeEnd(w(o))},t.handleMouseMove=function(o){t.props.onMouseMove&&t.props.onMouseMove(o),t.started&&t.handleSwipeMove(w(o))},t.handleScroll=function(o){if(t.props.onScroll&&t.props.onScroll(o),o.target===t.rootNode){if(t.ignoreNextScrollEvents){t.ignoreNextScrollEvents=!1;return}var v=t.state.indexLatest,N=Math.ceil(o.target.scrollLeft/o.target.clientWidth)+v;t.ignoreNextScrollEvents=!0,o.target.scrollLeft=0,t.props.onChangeIndex&&N!==v&&t.props.onChangeIndex(N,v,{reason:"focus"})}},t.updateHeight=function(){if(t.activeSlide!==null){var o=t.activeSlide.children[0];o!==void 0&&o.offsetHeight!==void 0&&t.state.heightLatest!==o.offsetHeight&&t.setState({heightLatest:o.offsetHeight})}},t.state={indexLatest:b.index,isDragging:!1,renderOnlyActive:!b.disableLazyLoading,heightLatest:0,displaySameSlide:!0},t.setIndexCurrent(b.index),t}return(0,l.default)(m,[{key:"componentDidMount",value:function(){var t=this;this.transitionListener=g(this.containerNode,"transitionend",function(o){o.target===t.containerNode&&t.handleTransitionEnd()}),this.touchMoveListener=g(this.rootNode,"touchmove",function(o){t.props.disabled||t.handleSwipeMove(o)},{passive:!1}),this.props.disableLazyLoading||(this.firstRenderTimeout=setTimeout(function(){t.setState({renderOnlyActive:!1})},0)),this.props.action&&this.props.action({updateHeight:this.updateHeight})}},{key:"UNSAFE_componentWillReceiveProps",value:function(t){var o=t.index;typeof o=="number"&&o!==this.props.index&&(this.setIndexCurrent(o),this.setState({displaySameSlide:(0,p.getDisplaySameSlide)(this.props,t),indexLatest:o}))}},{key:"componentWillUnmount",value:function(){this.transitionListener.remove(),this.touchMoveListener.remove(),clearTimeout(this.firstRenderTimeout)}},{key:"getSwipeableViewsContext",value:function(){var t=this;return{slideUpdateHeight:function(){t.updateHeight()}}}},{key:"setIndexCurrent",value:function(t){if(!this.props.animateTransitions&&this.indexCurrent!==t&&this.handleTransitionEnd(),this.indexCurrent=t,this.containerNode){var o=this.props.axis,v=x.transform[o](t*100);this.containerNode.style.WebkitTransform=v,this.containerNode.style.transform=v}}},{key:"handleTransitionEnd",value:function(){this.props.onTransitionEnd&&(this.state.displaySameSlide||this.state.isDragging||this.props.onTransitionEnd())}},{key:"render",value:function(){var t=this,o=this.props;o.action;var v=o.animateHeight,N=o.animateTransitions,C=o.axis,O=o.children,k=o.containerStyle,X=o.disabled;o.disableLazyLoading;var j=o.enableMouseEvents;o.hysteresis,o.ignoreNativeScroll,o.index,o.onChangeIndex,o.onSwitching,o.onTransitionEnd,o.resistance;var Q=o.slideStyle,Z=o.slideClassName,U=o.springConfig,ie=o.style;o.threshold;var ae=(0,i.default)(o,["action","animateHeight","animateTransitions","axis","children","containerStyle","disabled","disableLazyLoading","enableMouseEvents","hysteresis","ignoreNativeScroll","index","onChangeIndex","onSwitching","onTransitionEnd","resistance","slideStyle","slideClassName","springConfig","style","threshold"]),W=this.state,ye=W.displaySameSlide,se=W.heightLatest,J=W.indexLatest,Oe=W.isDragging,Ee=W.renderOnlyActive,bt=X?{}:{onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd},Ct=!X&&j?{onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onMouseLeave:this.handleMouseLeave,onMouseMove:this.handleMouseMove}:{},De=(0,n.default)({},f.slide,Q),le,ce;if(Oe||!N||ye)le="all 0s ease 0s",ce="all 0s ease 0s";else if(le=M("transform",U),ce=M("-webkit-transform",U),se!==0){var qe=", ".concat(M("height",U));le+=qe,ce+=qe}var ue={height:null,WebkitFlexDirection:x.flexDirection[C],flexDirection:x.flexDirection[C],WebkitTransition:ce,transition:le};if(!Ee){var ke=x.transform[C](this.indexCurrent*100);ue.WebkitTransform=ke,ue.transform=ke}return v&&(ue.height=se),h.createElement(P.Provider,{value:this.getSwipeableViewsContext()},h.createElement("div",(0,n.default)({ref:this.setRootNode,style:(0,n.default)({},x.root[C],ie)},ae,bt,Ct,{onScroll:this.handleScroll}),h.createElement("div",{ref:this.setContainerNode,style:(0,n.default)({},ue,f.container,k),className:"react-swipeable-view-container"},h.Children.map(O,function(wt,$e){if(Ee&&$e!==J)return null;var Xe,We=!0;return $e===J&&(We=!1,v&&(Xe=t.setActiveSlide,De.overflowY="hidden")),h.createElement("div",{ref:Xe,style:De,className:Z,"aria-hidden":We,"data-swipeable":"true"},wt)}))))}}]),m}(h.Component);T.displayName="ReactSwipableView",T.propTypes={},T.defaultProps={animateHeight:!1,animateTransitions:!0,axis:"x",disabled:!1,disableLazyLoading:!1,enableMouseEvents:!1,hysteresis:.6,ignoreNativeScroll:!1,index:0,threshold:5,springConfig:{duration:"0.35s",easeFunction:"cubic-bezier(0.15, 0.3, 0.25, 1)",delay:"0s"},resistance:!1};var q=T;return $.default=q,$}(function(e){var r=mt;Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(e,"SwipeableViewsContext",{enumerable:!0,get:function(){return n.SwipeableViewsContext}});var n=r(Kr())})(St);const en=Mt(St);function tn(e){const r=Rt(),n=It(jt),i=Pt(w=>w.breakpoints.down("lg")),a=Tt(),[l,u]=y.useState(!i),d=Ot(),{courseId:S}=d,h=y.useRef(null);if(Et(()=>{r(Xt(S))},[r,d]),y.useEffect(()=>{n&&n.progress.currentStep===0&&r(ze({progress:{currentStep:1}}))},[r,n]),y.useEffect(()=>{u(!i)},[i]),!n)return null;const{currentStep:p}=n.progress;function g(w){w>n.totalSteps||w<0||r(ze({progress:{currentStep:w}}))}function f(){g(p+1)}function x(){g(p-1)}function M(w){g(w+1)}const R=p!==0?p:1;return s.jsx(Dt,{content:s.jsxs("div",{className:"w-full",children:[s.jsx(de,{lgDown:!0,children:s.jsx(Ve,{className:"sticky top-0 z-10",course:n})}),s.jsx(de,{lgUp:!0,children:s.jsxs(He,{className:"flex sticky top-0 z-10 items-center w-full px-16 py-8 border-b-1 shadow-0",square:!0,children:[s.jsx(pe,{to:"/apps/academy/courses",component:Ue,className:"",children:s.jsx(z,{children:a.direction==="ltr"?"heroicons-outline:arrow-sm-left":"heroicons-outline:arrow-sm-right"})}),s.jsx(Ae,{className:"text-13 font-medium tracking-tight mx-10",children:n.title})]})}),s.jsx(en,{index:R-1,enableMouseEvents:!0,onChangeIndex:M,children:n.steps.map((w,I)=>s.jsx("div",{className:"flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64",children:s.jsx(He,{className:"w-full max-w-lg mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden",children:s.jsx("div",{className:"prose prose-sm dark:prose-invert w-full max-w-full",dangerouslySetInnerHTML:{__html:w.content},dir:a.direction})})},I))}),s.jsx(de,{lgDown:!0,children:s.jsx("div",{className:"flex justify-center w-full sticky bottom-0 p-16 pb-32 z-10",children:s.jsxs(qt,{variant:"contained","aria-label":"",className:"rounded-full",color:"secondary",children:[s.jsx(fe,{className:"min-h-56 rounded-full",size:"large",startIcon:s.jsx(z,{children:"heroicons-outline:arrow-narrow-left"}),onClick:x,children:"Prev"}),s.jsx(fe,{className:"pointer-events-none min-h-56",size:"large",children:`${R}/${n.totalSteps}`}),s.jsx(fe,{className:"min-h-56 rounded-full",size:"large",endIcon:s.jsx(z,{children:"heroicons-outline:arrow-narrow-right"}),onClick:f,children:"Next"})]})})}),s.jsx(de,{lgUp:!0,children:s.jsxs(kt,{sx:{backgroundColor:"background.paper"},className:"flex sticky bottom-0 z-10 items-center w-full p-16 border-t-1",children:[s.jsx(pe,{onClick:w=>u(!0),"aria-label":"open left sidebar",size:"large",children:s.jsx(z,{children:"heroicons-outline:view-list"})}),s.jsx(Ae,{className:"mx-8",children:`${R}/${n.totalSteps}`}),s.jsx(Ve,{className:"flex flex-1 mx-8",course:n}),s.jsx(pe,{onClick:x,children:s.jsx(z,{children:"heroicons-outline:arrow-narrow-left"})}),s.jsx(pe,{onClick:f,children:s.jsx(z,{children:"heroicons-outline:arrow-narrow-right"})})]})})]}),leftSidebarOpen:l,leftSidebarOnClose:()=>{u(!1)},leftSidebarWidth:300,leftSidebarContent:s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"p-32",children:[s.jsx(fe,{to:"/apps/academy/courses",component:Ue,className:"mb-24",color:"secondary",variant:"text",startIcon:s.jsx(z,{size:20,children:a.direction==="ltr"?"heroicons-outline:arrow-sm-left":"heroicons-outline:arrow-sm-right"}),children:"Back to courses"}),s.jsx(zt,{course:n})]}),s.jsx($t,{}),s.jsx(Er,{classes:{root:"p-32"},activeStep:R-1,orientation:"vertical",children:n.steps.map((w,I)=>s.jsxs(Gt,{sx:{"& .MuiStepLabel-root, & .MuiStepContent-root":{cursor:"pointer!important"},"& .MuiStepContent-root":{color:"text.secondary",fontSize:13}},onClick:()=>M(w.order),expanded:!0,children:[s.jsx(fr,{className:"font-medium",sx:{"& .MuiSvgIcon-root":{color:"background.default","& .MuiStepIcon-text":{fill:_=>_.palette.text.secondary},"&.Mui-completed":{color:"secondary.main","& .MuiStepIcon-text ":{fill:_=>_.palette.secondary.contrastText}},"&.Mui-active":{color:"secondary.main","& .MuiStepIcon-text ":{fill:_=>_.palette.secondary.contrastText}}}},children:w.title}),s.jsx(Nr,{children:w.subtitle})]},I))})]}),scroll:"content",ref:h})}const sn=Nt("academyApp",Wt)(tn);export{sn as default};
