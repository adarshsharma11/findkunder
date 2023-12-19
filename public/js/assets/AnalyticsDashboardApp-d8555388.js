import{f as S,g as A,a as z,h as R,j as e,T as i,B as k,b as h,s as V,P as j,i as v,k as f,l as O,r as x,m as $,n as F,o as b,p as T,q as y,t as w,w as D,v as W,F as L,_ as P,x as g}from"./app-dd54c10f.js";import{_ as N}from"./react-apexcharts.min-c7dee561.js";import"src/i18n";const C=S("analyticsDashboardApp/widgets/getWidgets",async()=>await(await z.get("/api/dashboards/analytics/widgets")).data),B=A({name:"analyticsDashboardApp/widgets",initialState:null,reducers:{},extraReducers:{[C.fulfilled]:(c,s)=>s.payload}}),p=({analyticsDashboardApp:c})=>c.widgets,E=B.reducer,M=R({widgets:E});function G(c){return e.jsx("div",{className:"flex w-full container",children:e.jsxs("div",{className:"flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0",children:[e.jsxs("div",{className:"flex flex-col flex-auto",children:[e.jsx(i,{className:"text-3xl font-semibold tracking-tight leading-8",children:"Analytics dashboard"}),e.jsx(i,{className:"font-medium tracking-tight",color:"text.secondary",children:"Monitor metrics, check reports and review performance"})]}),e.jsxs("div",{className:"flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12",children:[e.jsx(k,{className:"whitespace-nowrap",startIcon:e.jsx(h,{size:20,children:"heroicons-solid:cog"}),children:"Settings"}),e.jsx(k,{className:"whitespace-nowrap",variant:"contained",color:"secondary",startIcon:e.jsx(h,{size:20,children:"heroicons-solid:save"}),children:"Export"})]})]})})}const U=V(j)(({theme:c})=>({background:c.palette.primary.main,color:c.palette.primary.contrastText}));function q(){const c=v(),s=f(O(c.palette.primary.main)),l=f(p),{series:r,ranges:d}=l==null?void 0:l.visitors,[m,n]=x.useState(0),u=Object.keys(d)[m],o={chart:{animations:{speed:400,animateGradually:{enabled:!1}},fontFamily:"inherit",foreColor:"inherit",width:"100%",height:"100%",type:"area",toolbar:{show:!1},zoom:{enabled:!1}},colors:[s.palette.secondary.light],dataLabels:{enabled:!1},fill:{colors:[s.palette.secondary.dark]},grid:{show:!0,borderColor:s.palette.divider,padding:{top:10,bottom:-40,left:0,right:0},position:"back",xaxis:{lines:{show:!0}}},stroke:{width:2},tooltip:{followCursor:!0,theme:"dark",x:{format:"MMM dd, yyyy"},y:{formatter:t=>`${t}`}},xaxis:{axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{stroke:{color:s.palette.divider,dashArray:0,width:2}},labels:{offsetY:-20,style:{colors:s.palette.text.secondary}},tickAmount:20,tooltip:{enabled:!1},type:"datetime"},yaxis:{axisTicks:{show:!1},axisBorder:{show:!1},min:t=>t-750,max:t=>t+250,tickAmount:5,show:!1}};return e.jsx($,{theme:s,children:e.jsxs(U,{className:"sm:col-span-2 lg:col-span-3 dark flex flex-col flex-auto shadow rounded-2xl overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between mt-40 ml-40 mr-24 sm:mr-40",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx(i,{className:"mr-16 text-2xl md:text-3xl font-semibold tracking-tight leading-7",children:"Visitors Overview"}),e.jsx(i,{className:"font-medium",color:"text.secondary",children:"Number of unique visitors"})]}),e.jsx("div",{className:"mt-12 sm:mt-0 sm:ml-8",children:e.jsx(F,{value:m,onChange:(t,a)=>n(a),indicatorColor:"secondary",textColor:"inherit",variant:"scrollable",scrollButtons:!1,className:"-mx-4 min-h-40",classes:{indicator:"flex justify-center bg-transparent w-full h-full"},TabIndicatorProps:{children:e.jsx(b,{sx:{bgcolor:"text.disabled"},className:"w-full h-full rounded-full opacity-20"})},children:Object.entries(d).map(([t,a])=>e.jsx(T,{className:"text-14 font-semibold min-h-40 min-w-64 mx-4 px-12",disableRipple:!0,label:a},t))})})]}),e.jsx("div",{className:"flex flex-col flex-auto h-320",children:e.jsx(N,{options:o,series:r[u],type:o.chart.type,height:o.chart.height})})]})})}function Y(c){const s=v(),l=f(p),{series:r,amount:d,labels:m}=l==null?void 0:l.conversions,n={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"area",sparkline:{enabled:!0}},colors:[s.palette.secondary.main],fill:{colors:[s.palette.secondary.light],opacity:.5},stroke:{curve:"smooth"},tooltip:{followCursor:!0,theme:"dark"},xaxis:{type:"category",categories:m}};return e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden",children:[e.jsxs("div",{className:"flex items-start justify-between m-24 mb-0",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Conversions"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center mx-24 mt-12",children:[e.jsx(i,{className:"text-7xl font-bold tracking-tighter leading-tight",children:d.toLocaleString("en-US")}),e.jsxs("div",{className:"flex lg:flex-col lg:ml-12",children:[e.jsx(h,{size:20,className:"text-red-500",children:"heroicons-solid:trending-down"}),e.jsxs(i,{className:"flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap",color:"text.secondary",children:[e.jsx("span",{className:"font-medium text-red-500",children:"2%"}),e.jsx("span",{className:"ml-4",children:"below target"})]})]})]}),e.jsx("div",{className:"flex flex-col flex-auto h-80",children:e.jsx(N,{options:n,series:r,type:n.chart.type,height:n.chart.height})})]})}function _(c){const s=v(),l=f(p),{series:r,amount:d,labels:m}=l==null?void 0:l.impressions,n={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"area",sparkline:{enabled:!0}},colors:[s.palette.success.main],fill:{colors:[s.palette.success.light],opacity:.5},stroke:{curve:"smooth"},tooltip:{followCursor:!0,theme:"dark"},xaxis:{type:"category",categories:m}};return e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden",children:[e.jsxs("div",{className:"flex items-start justify-between m-24 mb-0",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Impressions"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center mx-24 mt-12",children:[e.jsx(i,{className:"text-7xl font-bold tracking-tighter leading-tight",children:d.toLocaleString("en-US")}),e.jsxs("div",{className:"flex lg:flex-col lg:ml-12",children:[e.jsx(h,{size:20,className:"text-red-500",children:"heroicons-solid:trending-down"}),e.jsxs(i,{className:"flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap",color:"text.secondary",children:[e.jsx("span",{className:"font-medium text-red-500",children:"4%"}),e.jsx("span",{className:"ml-4",children:"below target"})]})]})]}),e.jsx("div",{className:"flex flex-col flex-auto h-80",children:e.jsx(N,{options:n,series:r,type:n.chart.type,height:n.chart.height})})]})}function H(c){const s=v(),l=f(p),{series:r,amount:d,labels:m}=l==null?void 0:l.visits,n={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"area",sparkline:{enabled:!0}},colors:[s.palette.error.main],fill:{colors:[s.palette.error.light],opacity:.5},stroke:{curve:"smooth"},tooltip:{followCursor:!0,theme:"dark"},xaxis:{type:"category",categories:m}};return e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden",children:[e.jsxs("div",{className:"flex items-start justify-between m-24 mb-0",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Visits"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center mx-24 mt-12",children:[e.jsx(i,{className:"text-7xl font-bold tracking-tighter leading-tight",children:d.toLocaleString("en-US")}),e.jsxs("div",{className:"flex lg:flex-col lg:ml-12",children:[e.jsx(h,{size:20,className:"text-red-500",children:"heroicons-solid:trending-down"}),e.jsxs(i,{className:"flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap",color:"text.secondary",children:[e.jsx("span",{className:"font-medium text-red-500",children:"4%"}),e.jsx("span",{className:"ml-4",children:"below target"})]})]})]}),e.jsx("div",{className:"flex flex-col flex-auto h-80",children:e.jsx(N,{options:n,series:r,type:n.chart.type,height:n.chart.height})})]})}function J(c){const s=v(),l=f(p),{series:r,averageRatio:d,predictedRatio:m,overallScore:n,labels:u}=l==null?void 0:l.visitorsVsPageViews,o={chart:{animations:{enabled:!1},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"area",toolbar:{show:!1},zoom:{enabled:!1}},colors:[s.palette.primary.light,s.palette.primary.light],dataLabels:{enabled:!1},fill:{colors:[s.palette.primary.dark,s.palette.primary.light],opacity:.5},grid:{show:!1,padding:{bottom:-40,left:0,right:0}},legend:{show:!1},stroke:{curve:"smooth",width:2},tooltip:{followCursor:!0,theme:"dark",x:{format:"MMM dd, yyyy"}},xaxis:{axisBorder:{show:!1},labels:{offsetY:-20,rotate:0,style:{colors:s.palette.text.secondary}},tickAmount:3,tooltip:{enabled:!1},type:"datetime"},yaxis:{labels:{style:{colors:s.palette.divider}},max:t=>t+250,min:t=>t-250,show:!1,tickAmount:5}};return e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden",children:[e.jsxs("div",{className:"flex items-start justify-between m-24 mb-0",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Visitors vs. Page Views"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsx("div",{className:"flex items-start mt-24 mx-24",children:e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-42 sm:gap-48",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"font-medium text-secondary leading-5",children:"Overall Score"}),e.jsx(w,{title:"Score is calculated by using the historical ratio between Page Views and Visitors. Best score is 1000, worst score is 0.",children:e.jsx(h,{className:"ml-6",size:16,color:"disabled",children:"heroicons-solid:information-circle"})})]}),e.jsxs("div",{className:"flex items-start mt-8",children:[e.jsx("div",{className:"text-4xl font-bold tracking-tight leading-none",children:n}),e.jsxs("div",{className:"flex items-center ml-8",children:[e.jsx(h,{className:"text-green-500",size:20,children:"heroicons-solid:arrow-circle-up"}),e.jsx(i,{className:"ml-4 text-md font-medium text-green-500",children:"42.9%"})]})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"font-medium text-secondary leading-5",children:"Average Ratio"}),e.jsx(w,{title:"Average Ratio is the average ratio between Page Views and Visitors",children:e.jsx(h,{className:"ml-6",size:16,color:"disabled",children:"heroicons-solid:arrow-circle-up"})})]}),e.jsxs("div",{className:"flex items-start mt-8",children:[e.jsxs("div",{className:"text-4xl font-bold tracking-tight leading-none",children:[d,"%"]}),e.jsxs("div",{className:"flex items-center ml-8",children:[e.jsx(h,{className:"text-red-500",size:20,children:"heroicons-solid:arrow-circle-down"}),e.jsx(i,{className:"ml-4 text-md font-medium text-red-500",children:"13.1%"})]})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"font-medium text-secondary leading-5",children:"Predicted Ratio"}),e.jsx(w,{title:"Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.",children:e.jsx(h,{className:"ml-6",size:16,color:"disabled",children:"heroicons-solid:information-circle"})})]}),e.jsxs("div",{className:"flex items-start mt-8",children:[e.jsxs("div",{className:"text-4xl font-bold tracking-tight leading-none",children:[m,"%"]}),e.jsxs("div",{className:"flex items-center ml-8",children:[e.jsx(h,{className:"text-green-500",size:20,children:"heroicons-solid:arrow-circle-up"}),e.jsx(i,{className:"ml-4 text-md font-medium text-green-500",children:"22.2%"})]})]})]})]})}),e.jsx("div",{className:"flex flex-col flex-auto h-320 mt-12",children:e.jsx(N,{className:"flex-auto w-full h-full",options:o,series:r,type:o.chart.type,height:o.chart.height})})]})}function K(c){const s=f(p),{series:l,labels:r,uniqueVisitors:d}=s==null?void 0:s.newVsReturning,[m,n]=x.useState(!0),u=v(),o={chart:{animations:{speed:400,animateGradually:{enabled:!1}},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"donut",sparkline:{enabled:!0}},colors:["#3182CE","#63B3ED"],labels:r,plotOptions:{pie:{customScale:.9,expandOnClick:!1,donut:{size:"70%"}}},stroke:{colors:[u.palette.background.paper]},series:l,states:{hover:{filter:{type:"none"}},active:{filter:{type:"none"}}},tooltip:{enabled:!0,fillSeriesColor:!1,theme:"dark",custom:({seriesIndex:t,w:a})=>`<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${a.config.colors[t]};"></div>
            <div class="ml-8 text-md leading-none">${a.config.labels[t]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${a.config.series[t]}%</div>
        </div>`}};return x.useEffect(()=>{n(!1)},[]),m?null:e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start justify-between",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"New vs. Returning"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsx("div",{className:"flex flex-col flex-auto mt-24 h-192",children:e.jsx(N,{className:"flex flex-auto items-center justify-center w-full h-full",options:o,series:l,type:o.chart.type,height:o.chart.height})}),e.jsx("div",{className:"mt-32",children:e.jsx("div",{className:"-my-12 divide-y",children:l.map((t,a)=>e.jsxs("div",{className:"grid grid-cols-3 py-12",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(b,{className:"flex-0 w-8 h-8 rounded-full",sx:{backgroundColor:o.colors[a]}}),e.jsx(i,{className:"ml-12 truncate",children:r[a]})]}),e.jsx(i,{className:"font-medium text-right",children:(d*t/100).toLocaleString("en-US")}),e.jsxs(i,{className:"text-right",color:"text.secondary",children:[t,"%"]})]},a))})})]})}const Q=x.memo(K);function X(c){const s=f(p),{series:l,labels:r,uniqueVisitors:d}=s==null?void 0:s.age,[m,n]=x.useState(!0),u=v(),o={chart:{animations:{speed:400,animateGradually:{enabled:!1}},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"donut",sparkline:{enabled:!0}},colors:["#DD6B20","#F6AD55"],labels:r,plotOptions:{pie:{customScale:.9,expandOnClick:!1,donut:{size:"70%"}}},stroke:{colors:[u.palette.background.paper]},series:l,states:{hover:{filter:{type:"none"}},active:{filter:{type:"none"}}},tooltip:{enabled:!0,fillSeriesColor:!1,theme:"dark",custom:({seriesIndex:t,w:a})=>`<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${a.config.colors[t]};"></div>
            <div class="ml-8 text-md leading-none">${a.config.labels[t]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${a.config.series[t]}%</div>
        </div>`}};return x.useEffect(()=>{n(!1)},[]),m?null:e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start justify-between",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Age"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsx("div",{className:"flex flex-col flex-auto mt-24 h-192",children:e.jsx(N,{className:"flex flex-auto items-center justify-center w-full h-full",options:o,series:l,type:o.chart.type,height:o.chart.height})}),e.jsx("div",{className:"mt-32",children:e.jsx("div",{className:"-my-12 divide-y",children:l.map((t,a)=>e.jsxs("div",{className:"grid grid-cols-3 py-12",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(b,{className:"flex-0 w-8 h-8 rounded-full",sx:{backgroundColor:o.colors[a]}}),e.jsx(i,{className:"ml-12 truncate",children:r[a]})]}),e.jsx(i,{className:"font-medium text-right",children:(d*t/100).toLocaleString("en-US")}),e.jsxs(i,{className:"text-right",color:"text.secondary",children:[t,"%"]})]},a))})})]})}const Z=x.memo(X);function I(c){const s=f(p),{series:l,labels:r,uniqueVisitors:d}=s==null?void 0:s.language,[m,n]=x.useState(!0),u=v(),o={chart:{animations:{speed:400,animateGradually:{enabled:!1}},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"donut",sparkline:{enabled:!0}},colors:["#805AD5","#B794F4"],labels:r,plotOptions:{pie:{customScale:.9,expandOnClick:!1,donut:{size:"70%"}}},stroke:{colors:[u.palette.background.paper]},series:l,states:{hover:{filter:{type:"none"}},active:{filter:{type:"none"}}},tooltip:{enabled:!0,fillSeriesColor:!1,theme:"dark",custom:({seriesIndex:t,w:a})=>`<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${a.config.colors[t]};"></div>
            <div class="ml-8 text-md leading-none">${a.config.labels[t]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${a.config.series[t]}%</div>
        </div>`}};return x.useEffect(()=>{n(!1)},[]),m?null:e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start justify-between",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Language"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsx("div",{className:"flex flex-col flex-auto mt-24 h-192",children:e.jsx(N,{className:"flex flex-auto items-center justify-center w-full h-full",options:o,series:l,type:o.chart.type,height:o.chart.height})}),e.jsx("div",{className:"mt-32",children:e.jsx("div",{className:"-my-12 divide-y",children:l.map((t,a)=>e.jsxs("div",{className:"grid grid-cols-3 py-12",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(b,{className:"flex-0 w-8 h-8 rounded-full",sx:{backgroundColor:o.colors[a]}}),e.jsx(i,{className:"ml-12 truncate",children:r[a]})]}),e.jsx(i,{className:"font-medium text-right",children:(d*t/100).toLocaleString("en-US")}),e.jsxs(i,{className:"text-right",color:"text.secondary",children:[t,"%"]})]},a))})})]})}const ee=x.memo(I);function se(c){const s=f(p),{series:l,labels:r,uniqueVisitors:d}=s==null?void 0:s.gender,[m,n]=x.useState(!0),u=v(),o={chart:{animations:{speed:400,animateGradually:{enabled:!1}},fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"donut",sparkline:{enabled:!0}},colors:["#319795","#4FD1C5"],labels:r,plotOptions:{pie:{customScale:.9,expandOnClick:!1,donut:{size:"70%"}}},stroke:{colors:[u.palette.background.paper]},series:l,states:{hover:{filter:{type:"none"}},active:{filter:{type:"none"}}},tooltip:{enabled:!0,fillSeriesColor:!1,theme:"dark",custom:({seriesIndex:t,w:a})=>`<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${a.config.colors[t]};"></div>
            <div class="ml-8 text-md leading-none">${a.config.labels[t]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${a.config.series[t]}%</div>
        </div>`}};return x.useEffect(()=>{n(!1)},[]),m?null:e.jsxs(j,{className:"flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start justify-between",children:[e.jsx(i,{className:"text-lg font-medium tracking-tight leading-6 truncate",children:"Gender"}),e.jsx("div",{className:"ml-8",children:e.jsx(y,{size:"small",className:"font-medium text-sm",label:" 30 days"})})]}),e.jsx("div",{className:"flex flex-col flex-auto mt-24 h-192",children:e.jsx(N,{className:"flex flex-auto items-center justify-center w-full h-full",options:o,series:l,type:o.chart.type,height:o.chart.height})}),e.jsx("div",{className:"mt-32",children:e.jsx("div",{className:"-my-12 divide-y",children:l.map((t,a)=>e.jsxs("div",{className:"grid grid-cols-3 py-12",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(b,{className:"flex-0 w-8 h-8 rounded-full",sx:{backgroundColor:o.colors[a]}}),e.jsx(i,{className:"ml-12 truncate",children:r[a]})]}),e.jsx(i,{className:"font-medium text-right",children:(d*t/100).toLocaleString("en-US")}),e.jsxs(i,{className:"text-right",color:"text.secondary",children:[t,"%"]})]},a))})})]})}const te=x.memo(se);function le(){const c=W(),s=f(p);return x.useEffect(()=>{c(C())},[c]),e.jsx(L,{header:e.jsx(G,{}),content:e.jsx(e.Fragment,{children:x.useMemo(()=>{const l={show:{transition:{staggerChildren:.06}}},r={hidden:{opacity:0,y:20},show:{opacity:1,y:0}};return!P.isEmpty(s)&&e.jsxs(g.div,{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32",variants:l,initial:"hidden",animate:"show",children:[e.jsx(g.div,{variants:r,className:"sm:col-span-2 lg:col-span-3",children:e.jsx(q,{})}),e.jsx(g.div,{variants:r,className:"sm:col-span-2 lg:col-span-1 ",children:e.jsx(Y,{})}),e.jsx(g.div,{variants:r,className:"sm:col-span-2 lg:col-span-1 ",children:e.jsx(_,{})}),e.jsx(g.div,{variants:r,className:"sm:col-span-2 lg:col-span-1 ",children:e.jsx(H,{})}),e.jsx(g.div,{variants:r,className:"sm:col-span-2 lg:col-span-3",children:e.jsx(J,{})}),e.jsxs("div",{className:"w-full mt-16 sm:col-span-3",children:[e.jsx(i,{className:"text-2xl font-semibold tracking-tight leading-6",children:"Your Audience"}),e.jsx(i,{className:"font-medium tracking-tight",color:"text.secondary",children:"Demographic properties of your users"})]}),e.jsxs("div",{className:"sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full",children:[e.jsx(g.div,{variants:r,className:"",children:e.jsx(Q,{})}),e.jsx(g.div,{variants:r,className:"",children:e.jsx(te,{})}),e.jsx(g.div,{variants:r,className:"",children:e.jsx(Z,{})}),e.jsx(g.div,{variants:r,className:"",children:e.jsx(ee,{})})]})]})},[s])})})}const oe=D("analyticsDashboardApp",M)(le);export{oe as default};
