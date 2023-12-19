import{aw as j,ax as i,d3 as w,c5 as v,u as y,j as e,o as m,ch as b,A as o,P as N,T as d,a9 as C,C as l,d as n,e as T,ak as S,aM as k,d4 as P,B as F,_ as q,ay as A}from"./app-dd54c10f.js";import"src/i18n";const W=j().shape({name:i().required("You must enter your name"),email:i().email("You must enter a valid email").required("You must enter a email"),password:i().required("Please enter your password.").min(8,"Password is too short - should be 8 chars minimum."),passwordConfirm:i().oneOf([w("password"),null],"Passwords must match"),acceptTermsConditions:v().oneOf([!0],"The terms and conditions must be accepted.")}),c={name:"",email:"",password:"",passwordConfirm:"",acceptTermsConditions:!1};function z(){const{control:r,formState:u,handleSubmit:x,reset:h}=y({mode:"onChange",defaultValues:c,resolver:A(W)}),{isValid:p,dirtyFields:g,errors:s}=u;function f(){h(c)}return e.jsxs("div",{className:"flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0",children:[e.jsxs(m,{className:"relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden",sx:{backgroundColor:"primary.main"},children:[e.jsx("svg",{className:"absolute inset-0 pointer-events-none",viewBox:"0 0 960 540",width:"100%",height:"100%",preserveAspectRatio:"xMidYMax slice",xmlns:"http://www.w3.org/2000/svg",children:e.jsxs(m,{component:"g",sx:{color:"primary.light"},className:"opacity-20",fill:"none",stroke:"currentColor",strokeWidth:"100",children:[e.jsx("circle",{r:"234",cx:"196",cy:"23"}),e.jsx("circle",{r:"234",cx:"790",cy:"491"})]})}),e.jsxs(m,{component:"svg",className:"absolute -top-64 -right-64 opacity-20",sx:{color:"primary.light"},viewBox:"0 0 220 192",width:"220px",height:"192px",fill:"none",children:[e.jsx("defs",{children:e.jsx("pattern",{id:"837c3e70-6c3a-44e6-8854-cc48c737b659",x:"0",y:"0",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:e.jsx("rect",{x:"0",y:"0",width:"4",height:"4",fill:"currentColor"})})}),e.jsx("rect",{width:"220",height:"192",fill:"url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"})]}),e.jsxs("div",{className:"z-10 relative w-full max-w-2xl",children:[e.jsxs("div",{className:"text-7xl font-bold leading-none text-gray-100",children:[e.jsx("div",{children:"Welcome to"}),e.jsx("div",{children:"our community"})]}),e.jsx("div",{className:"mt-24 text-lg tracking-tight leading-6 text-gray-400",children:"Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today."}),e.jsxs("div",{className:"flex items-center mt-32",children:[e.jsxs(b,{sx:{"& .MuiAvatar-root":{borderColor:"primary.main"}},children:[e.jsx(o,{src:"assets/images/avatars/female-18.jpg"}),e.jsx(o,{src:"assets/images/avatars/female-11.jpg"}),e.jsx(o,{src:"assets/images/avatars/male-09.jpg"}),e.jsx(o,{src:"assets/images/avatars/male-16.jpg"})]}),e.jsx("div",{className:"ml-16 font-medium tracking-tight text-gray-400",children:"More than 17k people joined us, it's your turn"})]})]})]}),e.jsx(N,{className:"h-full sm:h-auto md:flex md:items-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none rtl:border-r-1 ltr:border-l-1",children:e.jsxs("div",{className:"w-full max-w-320 sm:w-320 mx-auto sm:mx-0",children:[e.jsx("img",{className:"w-48",src:"assets/images/logo/logo.svg",alt:"logo"}),e.jsx(d,{className:"mt-32 text-4xl font-extrabold tracking-tight leading-tight",children:"Sign up"}),e.jsxs("div",{className:"flex items-baseline mt-2 font-medium",children:[e.jsx(d,{children:"Already have an account?"}),e.jsx(C,{className:"ml-4",to:"/sign-in",children:"Sign in"})]}),e.jsxs("form",{name:"registerForm",noValidate:!0,className:"flex flex-col justify-center w-full mt-32",onSubmit:x(f),children:[e.jsx(l,{name:"name",control:r,render:({field:t})=>{var a;return e.jsx(n,{...t,className:"mb-24",label:"Name",autoFocus:!0,type:"name",error:!!s.name,helperText:(a=s==null?void 0:s.name)==null?void 0:a.message,variant:"outlined",required:!0,fullWidth:!0})}}),e.jsx(l,{name:"email",control:r,render:({field:t})=>{var a;return e.jsx(n,{...t,className:"mb-24",label:"Email",type:"email",error:!!s.email,helperText:(a=s==null?void 0:s.email)==null?void 0:a.message,variant:"outlined",required:!0,fullWidth:!0})}}),e.jsx(l,{name:"password",control:r,render:({field:t})=>{var a;return e.jsx(n,{...t,className:"mb-24",label:"Password",type:"password",error:!!s.password,helperText:(a=s==null?void 0:s.password)==null?void 0:a.message,variant:"outlined",required:!0,fullWidth:!0})}}),e.jsx(l,{name:"passwordConfirm",control:r,render:({field:t})=>{var a;return e.jsx(n,{...t,className:"mb-24",label:"Password (Confirm)",type:"password",error:!!s.passwordConfirm,helperText:(a=s==null?void 0:s.passwordConfirm)==null?void 0:a.message,variant:"outlined",required:!0,fullWidth:!0})}}),e.jsx(l,{name:"acceptTermsConditions",control:r,render:({field:t})=>{var a;return e.jsxs(T,{className:"items-center",error:!!s.acceptTermsConditions,children:[e.jsx(S,{label:"I agree to the Terms of Service and Privacy Policy",control:e.jsx(k,{size:"small",...t})}),e.jsx(P,{children:(a=s==null?void 0:s.acceptTermsConditions)==null?void 0:a.message})]})}}),e.jsx(F,{variant:"contained",color:"secondary",className:" w-full mt-24","aria-label":"Register",disabled:q.isEmpty(g)||!p,type:"submit",size:"large",children:"Create your free account"})]})]})})]})}export{z as default};
