import{aw as M,ax as E,v as F,r as b,u as S,ay as O,j as e,af as Z,am as he,c3 as $,C as v,d as y,aC as V,E as k,b as h,B as D,_ as p,c8 as Ae,c9 as De,k as N,ca as ze,t as ee,q as R,cb as se,cc as xe,cd as Fe,an as W,bP as q,s as fe,ce as Y,cf as Le,cg as ne,T as C,ch as Me,A as P,ci as Ee,ab as je,D as J,M as I,cj as Oe,b4 as L,J as z,ck as Be,cl as pe,G as Q,ag as Pe,cm as be,H as B,cn as ie,o as ge,P as re,az as te,c6 as Te,aM as ae,L as le,aA as Ve,aB as Ce,co as ve,cp as Re,aF as Ne,cq as qe,aI as $e,a_ as ce,cr as ke,cs as We,ct as Ye,aL as He,cu as we,a6 as ye,bh as Ue,K as oe,al as de,cv as Ge,aO as Ke,w as Je,b5 as Qe,a4 as _e,a5 as Xe,cw as Ze,cx as es,cy as ss,cz as ns,cA as ts,F as as,cB as ls,cC as is,cD as rs}from"./app-dd54c10f.js";import{P as Ie,C as Se,D as cs}from"./react-beautiful-dnd.esm-30d7ebac.js";import{L as os}from"./LinearProgress-782ebc45.js";import"src/i18n";const me={title:""},ds=M().shape({title:E().required("You must enter a title")});function ms(s){const n=F(),[t,o]=b.useState(!1),{control:r,formState:l,handleSubmit:i,reset:f}=S({mode:"onChange",defaultValues:me,resolver:O(ds)}),{isValid:d,dirtyFields:m,errors:j}=l;b.useEffect(()=>{t||f(me)},[t,f]);function u(c){c.stopPropagation(),o(!0)}function g(){o(!1)}function a(c){n(Ae(c)),g()}return e.jsx("div",{children:e.jsx(Z,{className:"w-320 mx-8 sm:mx-12 rounded-xl shadow-0",square:!0,sx:{backgroundColor:c=>he(c.palette.background.default,c.palette.mode==="light"?.03:.25)},children:t?e.jsx($,{onClickAway:g,children:e.jsxs("form",{className:"p-12",onSubmit:i(a),children:[e.jsx(v,{name:"title",control:r,render:({field:c})=>e.jsx(y,{...c,className:"mb-16",required:!0,fullWidth:!0,variant:"filled",label:"List title",autoFocus:!0,InputProps:{endAdornment:e.jsx(V,{position:"end",children:e.jsx(k,{onClick:g,size:"large",children:e.jsx(h,{size:18,children:"heroicons-outline:x"})})})}})}),e.jsx("div",{className:"flex justify-between items-center",children:e.jsx(D,{variant:"contained",color:"secondary",type:"submit",disabled:p.isEmpty(m)||!d,size:"small",children:"Add"})})]})}):e.jsx(D,{onClick:u,classes:{root:"font-medium w-full rounded-lg p-24 justify-start"},startIcon:e.jsx(h,{children:"heroicons-outline:plus-circle"}),sx:{color:"text.secondary"},children:"Add another list"})})})}const ue={title:""},us=M().shape({title:E().required("You must enter a title")});function hs(s){const n=F(),[t,o]=b.useState(!1),{control:r,formState:l,handleSubmit:i,reset:f}=S({mode:"onChange",defaultValues:ue,resolver:O(us)}),{isValid:d,dirtyFields:m,errors:j}=l;b.useEffect(()=>{t||f(ue)},[t,f]);function u(c){c.stopPropagation(),o(!0)}function g(){o(!1)}function a(c){n(De({listId:s.listId,newData:c})).then(()=>{s.onCardAdded()}),g()}return e.jsx("div",{className:"w-full",children:t?e.jsx($,{onClickAway:g,children:e.jsxs("form",{onSubmit:i(a),children:[e.jsx(v,{name:"title",control:r,render:({field:c})=>e.jsx(y,{className:"mb-16",required:!0,fullWidth:!0,variant:"filled",label:"Card title",autoFocus:!0,InputProps:{...c,endAdornment:e.jsx(V,{position:"end",children:e.jsx(k,{onClick:g,size:"large",children:e.jsx(h,{size:18,children:"heroicons-outline:x"})})})}})}),e.jsx("div",{className:"flex justify-between items-center",children:e.jsx(D,{variant:"contained",color:"secondary",type:"submit",disabled:p.isEmpty(m)||!d,size:"small",children:"Add"})})]})}):e.jsx(D,{onClick:u,classes:{root:"font-medium w-full rounded-lg p-24 justify-start"},startIcon:e.jsx(h,{children:"heroicons-outline:plus-circle"}),sx:{color:"text.secondary"},children:"Add another card"})})}function xs(s){const{id:n}=s,t=N(o=>ze(o,n));return t?e.jsx(ee,{title:t.title,children:e.jsx(R,{className:"font-semibold text-12 mx-4 mb-6",label:t.title,size:"small"})},n):null}function fs(s){se(1,arguments);var n=xe(s),t=n.getTime();return t}function _(s){return se(1,arguments),Math.floor(fs(s)/1e3)}function T(s){se(1,arguments);var n=Fe(s);return xe(n*1e3)}function js({dueDate:s}){return s?e.jsx(R,{size:"small",className:W("flex items-center font-semibold text-12 mx-4 mb-6",_(new Date)>s?"bg-red text-white":"bg-green text-white"),sx:{"& .MuiChip-icon":{color:"inherit"}},label:q(T(s),"MMM do yy"),icon:e.jsx(h,{size:16,color:"inherit",children:"heroicons-outline:clock"})}):null}function ps({card:s}){const n=o(s),t=r(s);function o(l){return p.sum(l.checklists.map(i=>p.sum(i.checkItems.map(f=>f.checked?1:0))))}function r(l){return p.sum(l.checklists.map(i=>i.checkItems.length))}return t===0?null:e.jsx(R,{size:"small",className:W("flex items-center font-semibold text-12 mx-4 mb-6",n===t?"bg-green text-white":"bg-grey-500 text-white"),sx:{"& .MuiChip-icon":{color:"inherit"}},icon:e.jsx(h,{size:16,color:"inherit",children:"heroicons-outline:check"}),label:`${n}/${t}`})}const bs=fe(Z)(({theme:s})=>({transitionProperty:"box-shadow",transitionDuration:s.transitions.duration.short,transitionTimingFunction:s.transitions.easing.easeInOut}));function gs(s){const{cardId:n,index:t}=s,o=F(),r=N(Y),l=N(u=>Le(u,n)),i=N(ne),f=j(l),d=p.find(l.attachments,{id:l.attachmentCoverId});function m(u,g){u.preventDefault(),o(Ee(g))}function j(u){return p.sum(u.activities.map(g=>g.type==="comment"?1:0))}return e.jsx(Ie,{draggableId:n,index:t,type:"card",children:(u,g)=>e.jsx("div",{ref:u.innerRef,...u.draggableProps,...u.dragHandleProps,children:e.jsxs(bs,{className:W(g.isDragging?"shadow-lg":"shadow","w-full mb-12 rounded-lg cursor-pointer"),onClick:a=>m(a,l),children:[r.settings.cardCoverImages&&d&&e.jsx("img",{className:"block",src:d.src,alt:"card cover"}),e.jsxs("div",{className:"p-16 pb-0",children:[l.labels.length>0&&e.jsx("div",{className:"flex flex-wrap mb-8 -mx-4",children:l.labels.map(a=>e.jsx(xs,{id:a},a))}),e.jsx(C,{className:"font-medium mb-12",children:l==null?void 0:l.title}),(l.dueDate||l.checklists.length>0)&&e.jsxs("div",{className:"flex items-center mb-12 -mx-4",children:[e.jsx(js,{dueDate:l.dueDate}),e.jsx(ps,{card:l})]})]}),e.jsxs("div",{className:"flex justify-between h-48 px-16",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[l.subscribed&&e.jsx(h,{size:16,color:"action",children:"heroicons-outline:eye"}),l.description!==""&&e.jsx(h,{size:16,color:"action",children:"heroicons-outline:document-text"}),l.attachments&&e.jsxs("span",{className:"flex items-center space-x-2",children:[e.jsx(h,{size:16,color:"action",children:"heroicons-outline:paper-clip"}),e.jsx(C,{className:"",color:"text.secondary",children:l.attachments.length})]}),f>0&&e.jsxs("span",{className:"flex items-center space-x-2",children:[e.jsx(h,{size:16,color:"action",children:"heroicons-outline:chat"}),e.jsx(C,{className:"",color:"text.secondary",children:f})]})]}),e.jsx("div",{className:"flex items-center justify-end space-x-12",children:l.memberIds.length>0&&e.jsx("div",{className:"flex justify-start",children:e.jsx(Me,{max:3,classes:{avatar:"w-24 h-24 text-12"},children:l.memberIds.map(a=>{const c=p.find(i,{id:a});return e.jsx(ee,{title:c.name,children:e.jsx(P,{alt:"member",src:c.avatar},t)},a)})})})})]})]})})})}const Cs=M().shape({title:E().required("You must enter a title")});function vs(s){const{list:n,cardIds:t}=s,o=F(),[r,l]=b.useState(null),[i,f]=b.useState(!1),{control:d,formState:m,handleSubmit:j,reset:u}=S({mode:"onChange",defaultValues:{title:n.title},resolver:O(Cs)}),{isValid:g,dirtyFields:a,errors:c}=m;b.useEffect(()=>{i||u({title:n.title})},[i,u,n.title]),b.useEffect(()=>{i&&r&&l(null)},[r,i]);function x(A){l(A.currentTarget)}function w(){l(null)}function U(A){A.stopPropagation(),f(!0)}function G(){f(!1)}function X(A){o(Be({id:n.id,newData:A})),G()}return e.jsx("div",{...s.handleProps,children:e.jsxs("div",{className:"flex items-center justify-between h-48 sm:h-56 px-12",children:[e.jsx("div",{className:"flex items-center min-w-0",children:i?e.jsx($,{onClickAway:G,children:e.jsx("form",{className:"flex w-full",onSubmit:j(X),children:e.jsx(v,{name:"title",control:d,render:({field:A})=>e.jsx(y,{...A,variant:"outlined",margin:"none",autoFocus:!0,size:"small",InputProps:{endAdornment:e.jsx(V,{position:"end",children:e.jsx(k,{type:"submit",disabled:p.isEmpty(a)||!g,size:"large",children:e.jsx(h,{children:"heroicons-outline:check"})})})}})})})}):e.jsx(C,{className:"text-14 font-medium cursor-pointer",onClick:U,children:n.title})}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(je,{className:"flex items-center justify-center min-w-24 h-24 mx-4 text-sm font-semibold leading-24 rounded-full",sx:{backgroundColor:A=>he(A.palette.background.default,A.palette.mode==="light"?.1:.3),color:"text.secondary"},children:t.length}),e.jsx(k,{"aria-owns":r?"actions-menu":null,"aria-haspopup":"true",onClick:x,variant:"outlined",size:"small",children:e.jsx(h,{size:20,children:"heroicons-outline:dots-vertical"})}),e.jsxs(J,{id:"actions-menu",anchorEl:r,open:!!r,onClose:w,children:[e.jsxs(I,{onClick:()=>{o(Oe(n.id))},children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:trash"})}),e.jsx(z,{primary:"Remove List"})]}),e.jsxs(I,{onClick:U,children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:pencil"})}),e.jsx(z,{primary:"Rename List"})]})]})]})]})})}const Ns=fe(Z)(({theme:s})=>({transitionProperty:"box-shadow",transitionDuration:s.transitions.duration.short,transitionTimingFunction:s.transitions.easing.easeInOut}));function ks(s){const{listId:n,cardIds:t}=s,o=b.useRef(null),r=N(i=>pe(i,n));function l(){o.current.scrollTop=o.current.scrollHeight}return r?e.jsx(Ie,{draggableId:n,index:s.index,type:"list",children:(i,f)=>e.jsx("div",{ref:i.innerRef,...i.draggableProps,children:e.jsxs(Ns,{sx:{backgroundColor:d=>d.palette.mode==="light"?Q(d.palette.background.default,.4):Q(d.palette.background.default,.02)},className:W(f.isDragging?"shadow-lg":"shadow-0","w-256 sm:w-320 mx-8 max-h-full flex flex-col rounded-xl border"),square:!0,children:[e.jsx(vs,{list:r,cardIds:t,className:"border-b-1",handleProps:i.dragHandleProps}),e.jsx(e.Fragment,{children:e.jsx(Pe,{className:"flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto",ref:o,children:e.jsx(Se,{droppableId:n,type:"card",direction:"vertical",children:d=>e.jsxs("div",{ref:d.innerRef,className:"flex flex-col w-full h-full px-12 min-h-1",children:[t.map((m,j)=>e.jsx(gs,{cardId:m,index:j,list:r},m)),d.placeholder]})})})}),e.jsx("div",{className:"p-12",children:e.jsx(hs,{listId:n,onCardAdded:l})})]})})}):null}function ws(s){const n=N(t=>be(t,s.item.idMember));switch(s.item.type){case"comment":return e.jsxs(B,{dense:!0,className:"px-0",children:[e.jsx(P,{alt:n==null?void 0:n.name,src:n==null?void 0:n.avatar,className:"w-32 h-32"}),e.jsxs(ge,{className:"flex flex-col mx-16 p-12",sx:{borderRadius:"5px 20px 20px 5px",border:t=>`1px solid ${t.palette.divider}`},children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(C,{children:n==null?void 0:n.name}),e.jsx(C,{className:"mx-8 text-12",color:"text.secondary",children:ie(T(s.item.time),{addSuffix:!0})})]}),e.jsx(C,{children:s.item.message})]})]});case"attachment":return e.jsxs(B,{dense:!0,className:"px-0",children:[e.jsx(P,{alt:n==null?void 0:n.name,src:n==null?void 0:n.avatar,className:"w-32 h-32"}),e.jsxs("div",{className:"flex items-center mx-16",children:[e.jsxs(C,{children:[n==null?void 0:n.name,","]}),e.jsx(C,{className:"mx-8",children:s.item.message}),e.jsx(C,{className:"text-12",color:"text.secondary",children:ie(T(s.item.time),{addSuffix:!0})})]})]});default:return null}}function ys(s){const[n,t]=b.useState(null);function o(l){t(l.currentTarget)}function r(){t(null)}switch(s.item.type){case"image":return e.jsxs("div",{className:"flex w-full sm:w-1/2 mb-16 px-16",children:[e.jsx("div",{className:"flex items-center justify-center min-w-128 w-128 h-128",children:e.jsx(re,{className:"overflow-hidden shadow",children:e.jsx("img",{className:"block max-h-full max-h-full",src:s.item.src,alt:"attachment"})})}),e.jsxs("div",{className:"flex flex-auto flex-col justify-center items-start min-w-0 px-16",children:[e.jsxs("div",{className:"flex items-center w-full",children:[e.jsx(C,{className:"text-16 font-semibold truncate shrink",children:s.item.name}),s.card.attachmentCoverId===s.item.id&&e.jsx(h,{className:"text-orange-300 mx-4",size:20,children:"heroicons-outline:start"})]}),e.jsx(C,{className:"truncate w-full mb-12",color:"text.secondary",children:q(T(s.item.time),"Pp")}),e.jsx(D,{"aria-owns":n?"actions-menu":null,"aria-haspopup":"true",onClick:o,variant:"outlined",size:"small",endIcon:e.jsx(h,{size:16,children:"heroicons-outline:chevron-down"}),children:"Actions"}),e.jsxs(J,{id:"actions-menu",anchorEl:n,open:!!n,onClose:r,children:[s.card.attachmentCoverId!==s.item.id?e.jsx(I,{onClick:()=>{r(),s.makeCover(s.item.id)},children:"Make Cover"}):e.jsx(I,{onClick:()=>{r(),s.removeCover()},children:"Remove Cover"}),e.jsx(I,{onClick:()=>{r(),s.removeAttachment(s.item.id)},children:"Remove Attachment"})]})]})]},s.item.id);case"link":return e.jsxs("div",{className:"flex w-full sm:w-1/2 mb-16 px-16",children:[e.jsx(re,{className:"min-w-128 w-128 h-128 flex items-center justify-center rounded-4 overflow-hidden shadow",children:e.jsx(C,{className:"font-semibold",children:"LINK"})}),e.jsxs("div",{className:"flex flex-auto flex-col justify-center items-start min-w-0 px-16",children:[e.jsx(C,{className:"text-16 font-semibold truncate w-full",children:s.item.url}),e.jsx(C,{className:"truncate w-full mb-12",color:"text.secondary",children:s.item.time}),e.jsx(D,{"aria-owns":n?"actions-menu":null,"aria-haspopup":"true",onClick:o,variant:"outlined",size:"small",endIcon:e.jsx(h,{size:16,children:"heroicons-outline:chevron-down"}),children:"Actions"}),e.jsx(J,{id:"simple-menu",anchorEl:n,open:!!n,onClose:r,children:e.jsx(I,{onClick:()=>{r(),s.removeAttachment(s.item.id)},children:"Remove Attachment"})})]})]},s.item.id);default:return null}}function Is(s){return s=s||{},p.defaults(s,{id:te.generateGUID(),name:"",checked:!1})}const Ss=M().shape({name:E().required("You must enter a title")});function As(s){const{control:n,formState:t,handleSubmit:o,reset:r}=S({mode:"onChange",defaultValues:{name:s.name},resolver:O(Ss)}),{isValid:l,dirtyFields:i,errors:f}=t;function d(m){s.onListItemAdd(Is(m)),r({name:s.name})}return e.jsx("form",{onSubmit:o(d),children:e.jsxs(B,{className:"px-0",dense:!0,children:[e.jsx("span",{className:"w-40"}),e.jsx(v,{name:"name",control:n,render:({field:m})=>e.jsx(y,{...m,className:"flex flex-1 mx-8",name:"name",variant:"outlined",placeholder:"Add an item"})}),e.jsx(Te,{className:"mx-4","aria-label":"Add",size:"small",color:"secondary",type:"submit",disabled:p.isEmpty(i)||!l,children:e.jsx(h,{children:"heroicons-outline:plus"})})]})})}function Ds(s){const{item:n,onListItemChange:t,index:o}=s,{control:r,watch:l}=S({mode:"onChange",defaultValues:n}),i=l();return b.useEffect(()=>{p.isEqual(n,i)||t(i,o)},[i,o,t,n]),e.jsxs(B,{className:"px-0",dense:!0,children:[e.jsx(v,{name:"checked",control:r,defaultValue:!1,render:({field:{onChange:f,value:d}})=>e.jsx(ae,{tabIndex:-1,checked:d,onChange:m=>f(m.target.checked),disableRipple:!0})}),e.jsx(v,{name:"name",control:r,render:({field:f})=>e.jsx(y,{...f,className:"flex flex-1 mx-8",variant:"outlined"})}),e.jsx(k,{"aria-label":"Delete",onClick:s.onListItemRemove,size:"large",children:e.jsx(h,{children:"heroicons-outline:trash"})})]},n.id)}const zs=M().shape({name:E().required("You must enter a title")}),Fs=b.forwardRef(function(n,t){const[o,r]=b.useState(!1),{control:l,formState:i,handleSubmit:f,reset:d}=S({mode:"onChange",defaultValues:{name:n.name},resolver:O(zs)}),{isValid:m,dirtyFields:j,errors:u}=i;b.useEffect(()=>{o||d({name:n.name})},[o,d,n.name]),b.useImperativeHandle(t,()=>({openForm:g}));function g(x){x.stopPropagation(),r(!0)}function a(){r(!1)}function c(x){n.onNameChange(x.name),a()}return o?e.jsx($,{onClickAway:a,children:e.jsx("form",{onSubmit:f(c),children:e.jsx(v,{name:"name",control:l,render:({field:x})=>e.jsx(y,{...x,variant:"outlined",margin:"dense",autoFocus:!0,InputProps:{endAdornment:e.jsx(V,{position:"end",children:e.jsx(k,{type:"submit",disabled:p.isEmpty(j)||!m,size:"large",children:e.jsx(h,{children:"heroicons-outline:check"})})})}})})})}):e.jsx(C,{className:"text-16 font-semibold cursor-pointer mx-8",onClick:g,children:n.name})});function Ls(s){const{onCheckListChange:n,checklist:t,index:o}=s,[r,l]=b.useState(null),i=b.useRef(),{watch:f,control:d}=S({mode:"onChange",defaultValues:t}),m=f();b.useEffect(()=>{p.isEqual(m,t)||n(m,o)},[m,o,n,t]);function j(c){g(),i.current.openForm(c)}function u(c){l(c.currentTarget)}function g(){l(null)}function a(){return p.sum(m.checkItems.map(c=>c.checked?1:0))}return m?e.jsxs("div",{className:"mb-24",children:[e.jsxs("div",{className:"flex items-center justify-between mt-16 mb-12",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(h,{size:20,children:"heroicons-outline:check-circle"}),e.jsx(v,{name:"name",control:d,defaultValue:"",render:({field:{onChange:c,value:x}})=>e.jsx(Fs,{name:x,onNameChange:w=>c(w),ref:i})})]}),e.jsxs("div",{className:"",children:[e.jsx(k,{"aria-owns":r?"actions-menu":null,"aria-haspopup":"true",onClick:u,variant:"outlined",size:"small",children:e.jsx(h,{size:20,children:"heroicons-outline:dots-vertical"})}),e.jsxs(J,{id:"actions-menu",anchorEl:r,open:!!r,onClose:g,children:[e.jsxs(I,{onClick:s.onRemoveCheckList,children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:trash"})}),e.jsx(z,{primary:"Remove Checklist"})]}),e.jsxs(I,{onClick:j,children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:pencil"})}),e.jsx(z,{primary:"Rename Checklist"})]})]})]})]}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex items-center -mx-6",children:[e.jsx(C,{className:"flex font-semibold mx-6",children:`${a()} / ${m.checkItems.length}`}),e.jsx(os,{className:"flex flex-1 mx-6",variant:"determinate",color:"secondary",value:100*a()/m.checkItems.length})]}),e.jsx(v,{name:"checkItems",control:d,defaultValue:[],render:({field:{onChange:c,value:x}})=>e.jsxs(le,{className:"",children:[x.map((w,U)=>e.jsx(Ds,{item:w,index:U,onListItemChange:(G,X)=>{c(p.setIn(x,`[${X}]`,G))},onListItemRemove:()=>{c(p.reject(x,{id:w.id}))}},w.id)),e.jsx(As,{onListItemAdd:w=>c([...x,w])})]})})]})]}):null}function Ms(s){return s=s||{},p.defaults(s,{id:te.generateGUID(),type:"comment",idMember:null,message:"",time:_(new Date)})}const Es=M().shape({message:E().required("You must enter a comment")}),K={idMember:"baa88231-0ee6-4028-96d5-7f187e0f4cd5",message:""};function Os(s){const n=N(j=>be(j,K.idMember)),{control:t,formState:o,handleSubmit:r,reset:l}=S({mode:"onChange",defaultValues:K,resolver:O(Es)}),{isValid:i,dirtyFields:f,errors:d}=o;function m(j){s.onCommentAdd(Ms({...K,...j})),l(K)}return n?e.jsxs("form",{onSubmit:r(m),className:"flex -mx-8",children:[e.jsx(P,{className:"w-32 h-32 mx-8",alt:n.name,src:n.avatar}),e.jsxs("div",{className:"flex flex-col items-start flex-1 mx-8",children:[e.jsx(v,{name:"message",control:t,render:({field:j})=>{var u;return e.jsx(y,{...j,className:"flex flex-1",fullWidth:!0,error:!!d.message,helperText:(u=d==null?void 0:d.message)==null?void 0:u.message,row:3,variant:"outlined",label:"Add comment",placeholder:"Write a comment..."})}}),e.jsx(D,{className:"mt-16","aria-label":"save",variant:"contained",color:"secondary",type:"submit",size:"small",disabled:p.isEmpty(f)||!i,children:"Save"})]})]}):null}function H(s){return e.jsx(Ve,{open:!!s.state,anchorEl:s.state,onClose:s.onClose,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:e.jsx(e.Fragment,{children:s.children})})}function Bs(s){const[n,t]=b.useState(null),o=s.dueDate?q(T(s.dueDate),"Pp"):q(new Date,"Pp");function r(i){t(i.currentTarget)}function l(){t(null)}return e.jsxs("div",{children:[e.jsx(k,{onClick:r,size:"large",children:e.jsx(h,{children:"heroicons-outline:calendar"})}),e.jsx(H,{state:n,onClose:l,children:e.jsx("div",{className:"p-16 max-w-192",children:s.dueDate?e.jsx(I,{onClick:i=>{s.onRemoveDue(),l()},children:"Remove Due Date"}):e.jsx(e.Fragment,{children:e.jsx(Ce,{value:o,inputFormat:"Pp",onChange:(i,f)=>{s.onDueChange(_(i)),l()},renderInput:i=>e.jsx(y,{label:"Due date",placeholder:"Choose a due date",className:"w-full",...i})})})})})]})}function Ps(s){const n=N(ve),[t,o]=b.useState(null);function r(i){o(i.currentTarget)}function l(){o(null)}return e.jsxs("div",{children:[e.jsx(k,{onClick:r,size:"large",children:e.jsx(h,{children:"heroicons-outline:tag"})}),e.jsx(H,{state:t,onClose:l,children:e.jsx("div",{className:"",children:n.map(i=>e.jsxs(I,{className:"px-8",onClick:f=>{s.onToggleLabel(i.id)},children:[e.jsx(ae,{checked:s.labels.includes(i.id)}),e.jsx(z,{className:"mx-8",children:i.title}),e.jsx(L,{className:"min-w-24",children:e.jsx(h,{children:"heroicons-outline:tag"})})]},i.id))})})]})}function Ts(s){const[n,t]=b.useState(null),o=N(ne);function r(i){t(i.currentTarget)}function l(){t(null)}return e.jsxs("div",{children:[e.jsx(k,{onClick:r,size:"large",children:e.jsx(h,{children:"heroicons-outline:user-circle"})}),e.jsx(H,{state:n,onClose:l,children:e.jsx("div",{className:"",children:o.map(i=>e.jsxs(I,{className:"px-8",onClick:f=>{s.onToggleMember(i.id)},children:[e.jsx(ae,{checked:s.memberIds.includes(i.id)}),e.jsx(P,{className:"w-32 h-32",src:i.avatar}),e.jsx(z,{className:"mx-8",children:i.name})]},i.id))})})]})}function Vs(s){return s=s||{},p.defaults(s,{id:te.generateGUID(),name:"",checkItems:[]})}const Rs=M().shape({name:E().required("You must enter a title")});function qs(s){const[n,t]=b.useState(null),{control:o,formState:r,handleSubmit:l,reset:i}=S({mode:"onChange",defaultValues:{name:s.name},resolver:O(Rs)}),{isValid:f,dirtyFields:d,errors:m}=r;b.useEffect(()=>{n||i({name:s.name})},[n,i,s.name]);function j(a){t(a.currentTarget)}function u(){t(null)}function g(a){s.onAddCheckList(Vs(a)),u()}return e.jsxs("div",{children:[e.jsx(k,{onClick:j,size:"large",children:e.jsx(h,{children:"heroicons-outline:check-circle"})}),e.jsx(H,{state:n,onClose:u,children:e.jsxs("form",{onSubmit:l(g),className:"p-16 flex flex-col items-end",children:[e.jsx(v,{name:"name",control:o,render:({field:a})=>{var c;return e.jsx(y,{...a,label:"Checklist title",error:!!m.name,helperText:(c=m==null?void 0:m.name)==null?void 0:c.message,fullWidth:!0,className:"mb-12",variant:"outlined",required:!0,autoFocus:!0})}}),e.jsx(D,{color:"secondary",type:"submit",disabled:p.isEmpty(d)||!f,variant:"contained",children:"Add"})]})})]})}function $s(s){const[n,t]=b.useState(null);function o(l){t(l.currentTarget)}function r(){t(null)}return e.jsxs("div",{children:[e.jsx(k,{onClick:o,size:"large",children:e.jsx(h,{children:"heroicons-outline:dots-horizontal"})}),e.jsx(H,{state:n,onClose:r,children:e.jsx(I,{onClick:s.onRemoveCard,children:"Remove Card"})})]})}function Ws(s){const n=F(),t=N(Y),o=N(ve),r=N(ne),l=N(Re),i=N(a=>pe(a,l==null?void 0:l.listId)),{register:f,watch:d,control:m,setValue:j}=S({mode:"onChange",defaultValues:l}),u=d(),g=Ne(a=>{n(qe(a))},600);return b.useEffect(()=>{l&&(p.isEqual(l,u)||g(u))},[l,u,g]),b.useEffect(()=>{f("attachmentCoverId")},[f]),l?e.jsx(e.Fragment,{children:e.jsxs($e,{className:"flex flex-col sm:flex-row p-8",children:[e.jsxs("div",{className:"flex flex-auto flex-col py-16 px-0 sm:px-16",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24",children:[e.jsxs("div",{className:"mb-16 sm:mb-0 flex items-center",children:[e.jsx(C,{children:t.title}),e.jsx(h,{size:20,children:"heroicons-outline:chevron-right"}),e.jsx(C,{children:i&&i.title})]}),u.dueDate&&e.jsx(Ce,{value:q(T(u.dueDate),"Pp"),inputFormat:"Pp",onChange:a=>j("dueDate",_(a)),renderInput:a=>e.jsx(y,{label:"Due date",placeholder:"Choose a due date",className:"w-full sm:w-auto",...a})})]}),e.jsx("div",{className:"flex items-center mb-24",children:e.jsx(v,{name:"title",control:m,render:({field:a})=>e.jsx(y,{...a,label:"Title",type:"text",variant:"outlined",fullWidth:!0,required:!0,InputProps:{endAdornment:e.jsx(V,{position:"end",children:l.subscribed&&e.jsx(h,{size:20,color:"action",children:"heroicons-outline:eye"})})}})})}),e.jsx("div",{className:"w-full mb-24",children:e.jsx(v,{name:"description",control:m,render:({field:a})=>e.jsx(y,{...a,label:"Description",multiline:!0,rows:"4",variant:"outlined",fullWidth:!0})})}),u.labels&&u.labels.length>0&&e.jsxs("div",{className:"flex-1 mb-24 mx-8",children:[e.jsxs("div",{className:"flex items-center mt-16 mb-12",children:[e.jsx(h,{size:20,children:"heroicons-outline:tag"}),e.jsx(C,{className:"font-semibold text-16 mx-8",children:"Labels"})]}),e.jsx(ce,{className:"mt-8 mb-16",multiple:!0,freeSolo:!0,options:o,getOptionLabel:a=>a.title,value:u.labels.map(a=>p.find(o,{id:a})),onChange:(a,c)=>{j("labels",c.map(x=>x.id))},renderTags:(a,c)=>a.map((x,w)=>e.jsx(R,{label:x.title,...c({index:w}),className:"m-3"})),renderInput:a=>e.jsx(y,{...a,placeholder:"Select multiple Labels",label:"Labels",variant:"outlined",InputLabelProps:{shrink:!0}})})]}),u.memberIds&&u.memberIds.length>0&&e.jsxs("div",{className:"flex-1 mb-24 mx-8",children:[e.jsxs("div",{className:"flex items-center mt-16 mb-12",children:[e.jsx(h,{size:20,children:"heroicons-outline:users"}),e.jsx(C,{className:"font-semibold text-16 mx-8",children:"Members"})]}),e.jsx(ce,{className:"mt-8 mb-16",multiple:!0,freeSolo:!0,options:r,getOptionLabel:a=>a.name,value:u.memberIds.map(a=>p.find(r,{id:a})),onChange:(a,c)=>{j("memberIds",c.map(x=>x.id))},renderTags:(a,c)=>a.map((x,w)=>e.jsx(R,{label:x.name,...c({index:w}),className:W("m-3",x.class),avatar:e.jsx(ee,{title:x.name,children:e.jsx(P,{src:x.avatar})})})),renderInput:a=>e.jsx(y,{...a,placeholder:"Select multiple Members",label:"Members",variant:"outlined",InputLabelProps:{shrink:!0}})})]}),u.attachments&&u.attachments.length>0&&e.jsxs("div",{className:"mb-24",children:[e.jsxs("div",{className:"flex items-center mt-16 mb-12",children:[e.jsx(h,{size:20,children:"heroicons-outline:paper-clip"}),e.jsx(C,{className:"font-semibold text-16 mx-8",children:"Attachments"})]}),e.jsx("div",{className:"flex flex-col sm:flex-row flex-wrap -mx-16",children:u.attachments.map(a=>e.jsx(ys,{item:a,card:u,makeCover:()=>{j("attachmentCoverId",a.id)},removeCover:()=>{j("attachmentCoverId","")},removeAttachment:()=>{j("attachments",p.reject(u.attachments,{id:a.id}))}},a.id))})]}),u.checklists&&u.checklists.map((a,c)=>e.jsx(Ls,{checklist:a,index:c,onCheckListChange:(x,w)=>{j("checklists",p.setIn(u.checklists,`[${w}]`,x))},onRemoveCheckList:()=>{j("checklists",p.reject(u.checklists,{id:a.id}))}},a.id)),e.jsxs("div",{className:"mb-24",children:[e.jsxs("div",{className:"flex items-center mt-16 mb-12",children:[e.jsx(h,{size:20,children:"heroicons-outline:chat-alt"}),e.jsx(C,{className:"font-semibold text-16 mx-8",children:"Comment"})]}),e.jsx("div",{children:e.jsx(Os,{onCommentAdd:a=>j("activities",[a,...u.activities])})})]}),e.jsx(v,{name:"activities",control:m,defaultValue:[],render:({field:{onChange:a,value:c}})=>e.jsx("div",{children:c.length>0&&e.jsxs("div",{className:"mb-24",children:[e.jsxs("div",{className:"flex items-center mt-16",children:[e.jsx(h,{size:20,children:"heroicons-outline:clipboard-list"}),e.jsx(C,{className:"font-semibold text-16 mx-8",children:"Activity"})]}),e.jsx(le,{className:"",children:c.map(x=>e.jsx(ws,{item:x},x.id))})]})})})]}),e.jsx("div",{className:"flex order-first sm:order-last items-start sticky top-0",children:e.jsxs(je,{className:"flex flex-row sm:flex-col items-center sm:py-8 rounded-12 w-full",sx:{backgroundColor:"background.default"},children:[e.jsx(k,{className:"order-last sm:order-first",color:"inherit",onClick:a=>n(ke()),size:"large",children:e.jsx(h,{children:"heroicons-outline:x"})}),e.jsxs("div",{className:"flex flex-row items-center sm:items-start sm:flex-col flex-1",children:[e.jsx(v,{name:"dueDate",control:m,defaultValue:null,render:({field:{onChange:a,value:c}})=>e.jsx(Bs,{onDueChange:a,onRemoveDue:()=>a(null),dueDate:c})}),e.jsx(v,{name:"labels",control:m,defaultValue:[],render:({field:{onChange:a,value:c}})=>e.jsx(Ps,{onToggleLabel:x=>a(p.xor(c,[x])),labels:c})}),e.jsx(v,{name:"memberIds",control:m,defaultValue:[],render:({field:{onChange:a,value:c}})=>e.jsx(Ts,{onToggleMember:x=>a(p.xor(c,[x])),memberIds:c})}),e.jsx(v,{name:"attachments",control:m,defaultValue:[],render:({field:{onChange:a,value:c}})=>e.jsx(k,{size:"large",children:e.jsx(h,{children:"heroicons-outline:paper-clip"})})}),e.jsx(v,{name:"checklists",control:m,defaultValue:[],render:({field:{onChange:a,value:c}})=>e.jsx(qs,{onAddCheckList:x=>a([...u.checklists,x])})}),e.jsx($s,{onRemoveCard:()=>n(We())})]})]})})]})}):null}function Ys(s){const n=F(),t=N(Ye);return e.jsx(He,{classes:{paper:"max-w-lg w-full m-8 sm:m-24"},onClose:o=>n(ke()),open:t,children:e.jsx(Ws,{})})}function Hs(s){const n=F(),t=N(Y),{watch:o,control:r,reset:l}=S({mode:"onChange",defaultValues:t.settings}),i=o(),f=Ne(d=>{n(we(d))},600);return ye(()=>{p.isEmpty(i)||!(t!=null&&t.settings)||p.isEqual(t.settings,i)||f({settings:i})},[t,i,f]),b.useEffect(()=>{t&&l(t.settings)},[t,l]),p.isEmpty(i)?null:e.jsxs("div",{children:[e.jsx(ge,{sx:{backgroundColor:d=>d.palette.mode==="light"?Q(d.palette.background.default,.4):Q(d.palette.background.default,.02)},className:"border-b-1",children:e.jsxs(Ue,{className:"flex items-center px-4",children:[e.jsx(k,{onClick:()=>s.onSetSidebarOpen(!1),color:"inherit",size:"large",children:e.jsx(h,{children:"heroicons-outline:x"})}),e.jsx(C,{className:"px-4 font-medium text-16",color:"inherit",variant:"subtitle1",children:"Settings"})]})}),e.jsxs(le,{className:"py-24",children:[e.jsxs(B,{children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:photograph"})}),e.jsx(z,{primary:"Card Cover Images"}),e.jsx(oe,{children:e.jsx(v,{name:"cardCoverImages",control:r,render:({field:{onChange:d,value:m}})=>e.jsx(de,{onChange:j=>{d(j.target.checked)},checked:m})})})]}),e.jsxs(B,{children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:eye-off"})}),e.jsx(z,{primary:"Subscribe"}),e.jsx(oe,{children:e.jsx(v,{name:"subscribed",control:r,render:({field:{onChange:d,value:m}})=>e.jsx(de,{onChange:j=>{d(j.target.checked)},checked:m})})})]}),e.jsxs(B,{button:!0,onClick:()=>n(Ge(t.id)),children:[e.jsx(L,{className:"min-w-40",children:e.jsx(h,{children:"heroicons-outline:trash"})}),e.jsx(z,{primary:"Delete Board"})]})]})]})}const Us=M().shape({title:E().required("You must enter a title")});function Gs(s){const n=F(),t=N(Y),[o,r]=b.useState(!1),{control:l,formState:i,handleSubmit:f,reset:d}=S({mode:"onChange",defaultValues:{title:t.title},resolver:O(Us)}),{isValid:m,dirtyFields:j,errors:u}=i;b.useEffect(()=>{o||d({title:t.title})},[o,d,t.title]);function g(x){x.stopPropagation(),r(!0)}function a(){r(!1)}function c(x){n(we(x)),a()}return e.jsx("div",{className:"flex items-center min-w-0",children:o?e.jsx($,{onClickAway:a,children:e.jsx("form",{className:"flex w-full",onSubmit:f(c),children:e.jsx(v,{name:"title",control:l,render:({field:x})=>e.jsx(y,{...x,variant:"filled",margin:"none",autoFocus:!0,hiddenLabel:!0,InputProps:{endAdornment:e.jsx(V,{position:"end",children:e.jsx(k,{type:"submit",disabled:p.isEmpty(j)||!m,size:"large",children:e.jsx(h,{children:"heroicons-outline:check"})})})}})})})}):e.jsxs("div",{className:"flex items-center justify-center space-x-12",children:[e.jsx(C,{className:"text-14  sm:text-24 md:text-32 font-extrabold tracking-tight leading-none cursor-pointer",onClick:g,color:"inherit",children:t.title}),(t==null?void 0:t.settings.subscribed)&&e.jsx(h,{children:"heroicons-outline:eye"})]})})}function Ks(s){return e.jsxs("div",{className:"p-24 sm:p-32 w-full border-b-1 flex flex-col sm:flex-row items-center justify-between container",children:[e.jsx("div",{className:"flex items-center mb-12 sm:mb-0",children:e.jsx(Gs,{})}),e.jsxs("div",{className:"flex items-center justify-end space-x-12",children:[e.jsx(D,{className:"whitespace-nowrap",component:Ke,to:"/apps/scrumboard/boards/",startIcon:e.jsx(h,{size:20,children:"heroicons-outline:view-boards"}),children:"Boards"}),e.jsx(D,{className:"whitespace-nowrap",variant:"contained",color:"secondary",onClick:()=>s.onSetSidebarOpen(!0),startIcon:e.jsx(h,{size:20,children:"heroicons-outline:cog"}),children:"Settings"})]})]})}function Js(s){const n=F(),t=N(Y),o=_e(d=>d.breakpoints.down("lg")),r=Xe(),[l,i]=b.useState(!1);ye(()=>(n(Ze(r.boardId)),n(es(r.boardId)),n(ss(r.boardId)),n(ns(r.boardId)),()=>{n(ts())}),[n,r]);function f(d){const{source:m,destination:j}=d;j&&(m.droppableId===j.droppableId&&m.index===j.index||(d.type==="list"&&n(is(d)),d.type==="card"&&n(rs(d))))}return t?e.jsxs(e.Fragment,{children:[e.jsx(as,{header:e.jsx(Ks,{onSetSidebarOpen:i}),content:e.jsx(e.Fragment,{children:(t==null?void 0:t.lists)&&e.jsx("div",{className:"flex flex-1 overflow-x-auto overflow-y-hidden h-full",children:e.jsx(cs,{onDragEnd:f,children:e.jsx(Se,{droppableId:"list",type:"list",direction:"horizontal",children:d=>e.jsxs("div",{ref:d.innerRef,className:"flex py-16 md:py-24 px-8 md:px-12",children:[t==null?void 0:t.lists.map((m,j)=>e.jsx(ks,{listId:m.id,cardIds:m.cards,index:j},m.id)),d.placeholder,e.jsx(ms,{})]})})})})}),rightSidebarOpen:l,rightSidebarContent:e.jsx(Hs,{onSetSidebarOpen:i}),rightSidebarOnClose:()=>i(!1),scroll:o?"normal":"content",rightSidebarWidth:320}),e.jsx(Ys,{})]}):null}const en=Je("scrumboardApp",ls)(Qe(Js));export{en as default};
