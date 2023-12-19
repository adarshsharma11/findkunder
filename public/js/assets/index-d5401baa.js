import{f as a,g as n,az as y,a as s,y as p,h as g}from"./app-dd54c10f.js";const h=a("eCommerceApp/product/getProduct",async e=>{const r=await(await s.get(`/api/ecommerce/products/${e}`)).data;return r===void 0?null:r}),A=a("eCommerceApp/product/removeProduct",async(e,{dispatch:t,getState:r})=>{const{id:c}=r().eCommerceApp.product;return await s.delete(`/api/ecommerce/products/${c}`),c}),f=a("eCommerceApp/product/saveProduct",async(e,{dispatch:t,getState:r})=>{const{id:c}=r().eCommerceApp;return await(await s.put(`/api/ecommerce/products/${c}`,e)).data}),l=n({name:"eCommerceApp/product",initialState:null,reducers:{resetProduct:()=>null,newProduct:{reducer:(e,t)=>t.payload,prepare:e=>({payload:{id:y.generateGUID(),name:"",handle:"",description:"",categories:[],tags:[],images:[],priceTaxExcl:0,priceTaxIncl:0,taxRate:0,comparedPrice:0,quantity:0,sku:"",width:"",height:"",depth:"",weight:"",extraShippingFee:0,active:!0}})}},extraReducers:{[h.fulfilled]:(e,t)=>t.payload,[f.fulfilled]:(e,t)=>t.payload,[A.fulfilled]:(e,t)=>null}}),{newProduct:b,resetProduct:q}=l.actions,E=({eCommerceApp:e})=>e.product,x=l.reducer,S=a("eCommerceApp/order/getOrder",async e=>{const r=await(await s.get(`/api/ecommerce/orders/${e}`)).data;return r===void 0?null:r}),P=a("eCommerceApp/order/saveOrder",async e=>await(await s.put("/api/ecommerce/orders",e)).data),u=n({name:"eCommerceApp/order",initialState:null,reducers:{resetOrder:()=>null},extraReducers:{[S.fulfilled]:(e,t)=>t.payload,[P.fulfilled]:(e,t)=>t.payload}}),{resetOrder:F}=u.actions,M=({eCommerceApp:e})=>e.order,w=u.reducer,C=a("eCommerceApp/orders/getOrders",async()=>await(await s.get("/api/ecommerce/orders")).data),v=a("eCommerceApp/orders/removeOrders",async(e,{dispatch:t,getState:r})=>(await s.delete("/api/ecommerce/orders",{data:e}),e)),o=p({}),{selectAll:U,selectById:j}=o.getSelectors(e=>e.eCommerceApp.orders),i=n({name:"eCommerceApp/orders",initialState:o.getInitialState({searchText:""}),reducers:{setOrdersSearchText:{reducer:(e,t)=>{e.searchText=t.payload},prepare:e=>({payload:e.target.value||""})}},extraReducers:{[C.fulfilled]:o.setAll,[v.fulfilled]:(e,t)=>o.removeMany(e,t.payload)}}),{setOrdersSearchText:z}=i.actions,D=({eCommerceApp:e})=>e.orders.searchText,O=i.reducer,T=a("eCommerceApp/products/getProducts",async()=>await(await s.get("/api/ecommerce/products")).data),I=a("eCommerceApp/products",async(e,{dispatch:t,getState:r})=>(await s.delete("/api/ecommerce/products",{data:e}),e)),d=p({}),{selectAll:G,selectById:H}=d.getSelectors(e=>e.eCommerceApp.products),m=n({name:"eCommerceApp/products",initialState:d.getInitialState({searchText:""}),reducers:{setProductsSearchText:{reducer:(e,t)=>{e.searchText=t.payload},prepare:e=>({payload:e.target.value||""})}},extraReducers:{[T.fulfilled]:d.setAll,[I.fulfilled]:(e,t)=>d.removeMany(e,t.payload)}}),{setProductsSearchText:J}=m.actions,K=({eCommerceApp:e})=>e.products.searchText,R=m.reducer,L=g({products:R,product:x,orders:O,order:w});export{E as a,q as b,L as c,K as d,J as e,I as f,h as g,G as h,T as i,M as j,F as k,S as l,D as m,b as n,z as o,v as p,U as q,A as r,f as s,C as t};
