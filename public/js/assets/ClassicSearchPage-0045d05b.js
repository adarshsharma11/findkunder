import{r as i,j as e,F as o,P as x,aE as d,b as h,x as l,T as a,bo as m,bp as p}from"./app-dd54c10f.js";import{e as u,P as f}from"./exampleSearchResponse-c12b057f.js";import"src/i18n";import"./LastPage-462a455b.js";function y(){const[t,c]=i.useState([]);i.useEffect(()=>{setTimeout(()=>{c(u)},100)},[]);const n={show:{transition:{staggerChildren:.05}}},r={hidden:{opacity:0,y:40},show:{opacity:1,y:0}};return e.jsx(o,{header:e.jsx("div",{className:"flex flex-1 items-center p-24 sm:p-32 w-full max-w-md",children:e.jsxs(x,{className:"flex items-center h-44 w-full px-16 rounded-16 shadow",children:[e.jsx(d,{placeholder:"Search...",disableUnderline:!0,fullWidth:!0,inputProps:{"aria-label":"Search"}}),e.jsx(h,{color:"action",children:"heroicons-outline:search"})]})}),content:e.jsxs("div",{className:"flex flex-col flex-auto h-full p-24 pt-0 sm:p-32 sm:pt-0 w-full max-w-md",children:[e.jsx("div",{className:"flex flex-1 flex-col",children:t.length>0&&e.jsxs(l.div,{variants:n,initial:"hidden",animate:"show",children:[e.jsx(l.div,{variants:r,children:e.jsxs(a,{color:"text.secondary",className:"text-13 mb-24",children:[t.length," results"]})}),t.map(s=>e.jsxs(l.div,{variants:r,className:"mb-28",children:[e.jsx(a,{className:"text-18 cursor-pointer",sx:{color:m[800]},children:s.title}),e.jsx(a,{sx:{color:p[800]},children:s.url}),e.jsx(a,{className:"text-13",children:s.excerpt})]},s.id))]})}),e.jsx("div",{className:"flex justify-center mt-48",children:e.jsx(f,{count:10,color:"secondary"})})]})})}export{y as default};
