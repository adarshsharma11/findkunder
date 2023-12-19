import{j as e,af as S,ag as k,G as h,B as F,a9 as I,b as M,v as T,k as p,ah as E,ai as A,a4 as L,r as l,aj as B,F as D,ab as P,x as o,T as m,e as H,I as R,S as W,M as f,d as Y,ak as $,al as z,_ as G}from"./app-dd54c10f.js";import{a as O,C as Q}from"./CourseProgress-31544bf7.js";import{C as U}from"./CardActions-afecadac.js";import"src/i18n";import"./LinearProgress-782ebc45.js";function _({course:a}){function n(){switch(a.activeStep){case a.totalSteps:return"Completed";case 0:return"Start";default:return"Continue"}}return e.jsxs(S,{className:"flex flex-col h-384 shadow",children:[e.jsx(k,{className:"flex flex-col flex-auto p-24",children:e.jsx(O,{course:a,className:""})}),e.jsx(Q,{className:"",course:a}),e.jsx(U,{className:"items-center justify-end py-16 px-24",sx:{backgroundColor:s=>s.palette.mode==="light"?h(s.palette.background.default,.4):h(s.palette.background.default,.03)},children:e.jsx(F,{to:`/apps/academy/courses/${a.id}/${a.slug}`,component:I,className:"px-16 min-w-128",color:"secondary",variant:"contained",endIcon:e.jsx(M,{className:"",size:20,children:"heroicons-solid:arrow-sm-right"}),children:n()})})]})}function Z(a){const n=T(),s=p(E),g=p(A),y=L(t=>t.breakpoints.down("lg")),[c,j]=l.useState(null),[d,C]=l.useState(""),[r,w]=l.useState("all"),[x,v]=l.useState(!1);l.useEffect(()=>{n(B())},[n]),l.useEffect(()=>{function t(){return d.length===0&&r==="all"&&!x?s:G.filter(s,i=>r!=="all"&&i.category!==r||x&&i.progress.completed>0?!1:i.title.toLowerCase().includes(d.toLowerCase()))}s&&j(t())},[s,x,d,r]);function b(t){w(t.target.value)}function N(t){C(t.target.value)}return e.jsx(D,{header:e.jsxs(P,{className:"relative overflow-hidden flex shrink-0 items-center justify-center px-16 py-32 md:p-64",sx:{backgroundColor:"primary.main",color:t=>t.palette.getContrastText(t.palette.primary.main)},children:[e.jsxs("div",{className:"flex flex-col items-center justify-center  mx-auto w-full",children:[e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1,transition:{delay:0}},children:e.jsx(m,{color:"inherit",className:"text-18 font-semibold",children:"FUSE ACADEMY"})}),e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1,transition:{delay:0}},children:e.jsx(m,{color:"inherit",className:"text-center text-32 sm:text-48 font-extrabold tracking-tight mt-4",children:"What do you want to learn today?"})}),e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1,transition:{delay:.3}},children:e.jsx(m,{color:"inherit",className:"text-16 sm:text-20 mt-16 sm:mt-24 opacity-75 tracking-tight max-w-md text-center",children:"Our courses will step you through the process of a building small applications, or adding new features to existing applications."})})]}),e.jsx("svg",{className:"absolute inset-0 pointer-events-none",viewBox:"0 0 960 540",width:"100%",height:"100%",preserveAspectRatio:"xMidYMax slice",xmlns:"http://www.w3.org/2000/svg",children:e.jsxs("g",{className:"text-gray-700 opacity-25",fill:"none",stroke:"currentColor",strokeWidth:"100",children:[e.jsx("circle",{r:"234",cx:"196",cy:"23"}),e.jsx("circle",{r:"234",cx:"790",cy:"491"})]})})]}),content:e.jsxs("div",{className:"flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40",children:[e.jsxs("div",{className:"flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16",children:[e.jsxs(H,{className:"flex w-full sm:w-136",variant:"outlined",children:[e.jsx(R,{id:"category-select-label",children:"Category"}),e.jsxs(W,{labelId:"category-select-label",id:"category-select",label:"Category",value:r,onChange:b,children:[e.jsx(f,{value:"all",children:e.jsx("em",{children:" All "})}),g.map(t=>e.jsx(f,{value:t.slug,children:t.title},t.id))]})]}),e.jsx(Y,{label:"Search for a course",placeholder:"Enter a keyword...",className:"flex w-full sm:w-256 mx-8",value:d,inputProps:{"aria-label":"Search"},onChange:N,variant:"outlined",InputLabelProps:{shrink:!0}})]}),e.jsx($,{label:"Hide completed",control:e.jsx(z,{onChange:t=>{v(t.target.checked)},checked:x,name:"hideCompleted"})})]}),l.useMemo(()=>{const t={show:{transition:{staggerChildren:.1}}},i={hidden:{opacity:0,y:20},show:{opacity:1,y:0}};return c&&(c.length>0?e.jsx(o.div,{className:"flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40",variants:t,initial:"hidden",animate:"show",children:c.map(u=>e.jsx(o.div,{variants:i,children:e.jsx(_,{course:u})},u.id))}):e.jsx("div",{className:"flex flex-1 items-center justify-center",children:e.jsx(m,{color:"text.secondary",className:"text-24 my-24",children:"No courses found!"})}))},[c])]}),scroll:y?"normal":"page"})}export{Z as default};
