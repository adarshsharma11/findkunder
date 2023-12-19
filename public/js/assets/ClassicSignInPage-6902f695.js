import{aw as w,ax as m,u as b,j as e,P as N,T as i,a9 as c,C as o,d,e as v,ak as y,aM as S,B as l,_ as F,b as n,ay as C}from"./app-dd54c10f.js";import"src/i18n";const P=w().shape({email:m().email("You must enter a valid email").required("You must enter a email"),password:m().required("Please enter your password.").min(8,"Password is too short - must be at least 8 chars.")}),u={email:"",password:"",remember:!0};function T(){const{control:r,formState:x,handleSubmit:h,reset:f}=b({mode:"onChange",defaultValues:u,resolver:C(P)}),{isValid:j,dirtyFields:p,errors:s}=x;function g(){f(u)}return e.jsx("div",{className:"flex flex-col flex-auto items-center sm:justify-center min-w-0",children:e.jsx(N,{className:"w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow",children:e.jsxs("div",{className:"w-full max-w-320 sm:w-320 mx-auto sm:mx-0",children:[e.jsx("img",{className:"w-48",src:"assets/images/logo/logo.svg",alt:"logo"}),e.jsx(i,{className:"mt-32 text-4xl font-extrabold tracking-tight leading-tight",children:"Sign in"}),e.jsxs("div",{className:"flex items-baseline mt-2 font-medium",children:[e.jsx(i,{children:"Don't have an account?"}),e.jsx(c,{className:"ml-4",to:"/sign-up",children:"Sign up"})]}),e.jsxs("form",{name:"loginForm",noValidate:!0,className:"flex flex-col justify-center w-full mt-32",onSubmit:h(g),children:[e.jsx(o,{name:"email",control:r,render:({field:a})=>{var t;return e.jsx(d,{...a,className:"mb-24",label:"Email",autoFocus:!0,type:"email",error:!!s.email,helperText:(t=s==null?void 0:s.email)==null?void 0:t.message,variant:"outlined",required:!0,fullWidth:!0})}}),e.jsx(o,{name:"password",control:r,render:({field:a})=>{var t;return e.jsx(d,{...a,className:"mb-24",label:"Password",type:"password",error:!!s.password,helperText:(t=s==null?void 0:s.password)==null?void 0:t.message,variant:"outlined",required:!0,fullWidth:!0})}}),e.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center sm:justify-between",children:[e.jsx(o,{name:"remember",control:r,render:({field:a})=>e.jsx(v,{children:e.jsx(y,{label:"Remember me",control:e.jsx(S,{size:"small",...a})})})}),e.jsx(c,{className:"text-md font-medium",to:"/pages/auth/forgot-password",children:"Forgot password?"})]}),e.jsx(l,{variant:"contained",color:"secondary",className:" w-full mt-16","aria-label":"Sign in",disabled:F.isEmpty(p)||!j,type:"submit",size:"large",children:"Sign in"}),e.jsxs("div",{className:"flex items-center mt-32",children:[e.jsx("div",{className:"flex-auto mt-px border-t"}),e.jsx(i,{className:"mx-8",color:"text.secondary",children:"Or continue with"}),e.jsx("div",{className:"flex-auto mt-px border-t"})]}),e.jsxs("div",{className:"flex items-center mt-32 space-x-16",children:[e.jsx(l,{variant:"outlined",className:"flex-auto",children:e.jsx(n,{size:20,color:"action",children:"feather:facebook"})}),e.jsx(l,{variant:"outlined",className:"flex-auto",children:e.jsx(n,{size:20,color:"action",children:"feather:twitter"})}),e.jsx(l,{variant:"outlined",className:"flex-auto",children:e.jsx(n,{size:20,color:"action",children:"feather:github"})})]})]})]})})})}export{T as default};
