import{a as o,j as n,F as t}from"./jsx-runtime-45b8ed70.js";import{s}from"./index-49f43349.js";import{u as r}from"./index-c00c2ae7.js";const i="/assets/logo-a060e086.svg",a="/assets/logo-dark-825d9d19.svg",d=s("img",{'[data-color-mode="dark"] &':{display:"none"}}),h=s("img",{display:"none",'[data-color-mode="dark"] &':{display:"block"}}),p=()=>o("div",{children:[n(d,{src:i}),n(h,{src:a})]}),y=s("div",{display:"flex",alignItems:"center",justifyContent:"center",mt:16}),F=s("div",{textAlign:"center",my:12,text:"2xl",color:"$gray11"});function c(e){const l=Object.assign({nav:"nav",ol:"ol",li:"li",a:"a",p:"p",code:"code",blockquote:"blockquote",ul:"ul",div:"div",span:"span",h2:"h2",pre:"pre",script:"script"},r(),e.components);return o(t,{children:[n(l.nav,{className:"toc",children:n(l.ol,{className:"toc-level toc-level-1",children:n(l.li,{className:"toc-item toc-item-h2",children:n(l.a,{className:"toc-link toc-link-h2",href:"#installation",children:"Installation"})})})}),`
`,n(y,{children:n(p,{})}),`
`,n(F,{children:"Build and document components quickly"}),`
`,o(l.p,{children:["Fwoosh is a front-end notebook inspired by ",n(l.a,{href:"https://storybook.js.org/",children:"Storybook"}),"."]}),`
`,o(l.p,{children:["A front-end notebook is composed of ",n(l.code,{children:"stories"})," and documentation."]}),`
`,o(l.blockquote,{children:[`
`,o(l.p,{children:[n(l.code,{children:"story"})," - A contained interactive example"]}),`
`]}),`
`,n(l.p,{children:"Fwoosh has multiple ways to view and interact with your stories:"}),`
`,o(l.ul,{children:[`
`,o(l.li,{children:[n(l.code,{children:"/workbench"})," - Focus on individual stories. Good for development"]}),`
`,o(l.li,{children:[n(l.code,{children:"/docs"})," - Stories are composed into documentation. You can also author content-only pages as MDX"]}),`
`,o(l.li,{children:[n(l.code,{children:"/canvas"})," - Top level view of all documentation and stories. See the full picture in a spatial interface"]}),`
`]}),`
`,o(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"2","data-level-id":"installation",children:[n(l.a,{"data-link-icon":!0,href:"#installation",children:o(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),n(l.h2,{id:"installation",children:"Installation"})]}),`
`,n(l.p,{children:"To get started first install fwoosh:"}),`
`,o(l.pre,{children:[o(l.code,{className:"language-sh syntax-light",style:{background:"#ffffff"},children:[n(l.span,{style:{color:"#953800"},children:"npm"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0A3069"},children:"i"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0550AE"},children:"--save-dev"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0A3069"},children:"fwoosh"}),`
`,n(l.span,{style:{color:"#6E7781"},children:"# or"}),`
`,n(l.span,{style:{color:"#953800"},children:"yarn"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0A3069"},children:"add"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0550AE"},children:"-D"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0A3069"},children:"fwoosh"}),`
`]}),o(l.code,{className:"language-sh syntax-light syntax-dark",style:{background:"#0d1117"},children:[n(l.span,{style:{color:"#FFA657"},children:"npm"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#A5D6FF"},children:"i"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#79C0FF"},children:"--save-dev"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#A5D6FF"},children:"fwoosh"}),`
`,n(l.span,{style:{color:"#8B949E"},children:"# or"}),`
`,n(l.span,{style:{color:"#FFA657"},children:"yarn"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#A5D6FF"},children:"add"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#79C0FF"},children:"-D"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#A5D6FF"},children:"fwoosh"}),`
`]})]}),`
`,o(l.p,{children:["Then create a ",n(l.code,{children:"fwoosh.config.mjs"})," file in the root of your project:"]}),`
`,o(l.pre,{children:[o(l.code,{className:"language-ts syntax-light",style:{background:"#ffffff"},children:[n(l.span,{style:{color:"#CF222E"},children:"import"}),n(l.span,{style:{color:"#24292F"},children:" { FwooshConfig } "}),n(l.span,{style:{color:"#CF222E"},children:"from"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),n(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,n(l.span,{style:{color:"#CF222E"},children:"export"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#CF222E"},children:"const"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#0550AE"},children:"config"}),n(l.span,{style:{color:"#CF222E"},children:":"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#953800"},children:"FwooshConfig"}),n(l.span,{style:{color:"#24292F"},children:" "}),n(l.span,{style:{color:"#CF222E"},children:"="}),n(l.span,{style:{color:"#24292F"},children:" {"}),`
`,n(l.span,{style:{color:"#24292F"},children:"  title: "}),n(l.span,{style:{color:"#0A3069"},children:'"My Design System"'}),n(l.span,{style:{color:"#24292F"},children:","}),`
`,n(l.span,{style:{color:"#24292F"},children:"};"}),`
`]}),o(l.code,{className:"language-ts syntax-light syntax-dark",style:{background:"#0d1117"},children:[n(l.span,{style:{color:"#FF7B72"},children:"import"}),n(l.span,{style:{color:"#C9D1D9"},children:" { FwooshConfig } "}),n(l.span,{style:{color:"#FF7B72"},children:"from"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),n(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,n(l.span,{style:{color:"#FF7B72"},children:"export"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#FF7B72"},children:"const"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#79C0FF"},children:"config"}),n(l.span,{style:{color:"#FF7B72"},children:":"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#FFA657"},children:"FwooshConfig"}),n(l.span,{style:{color:"#C9D1D9"},children:" "}),n(l.span,{style:{color:"#FF7B72"},children:"="}),n(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,n(l.span,{style:{color:"#C9D1D9"},children:"  title: "}),n(l.span,{style:{color:"#A5D6FF"},children:'"My Design System"'}),n(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,n(l.span,{style:{color:"#C9D1D9"},children:"};"}),`
`]})]}),n(l.script,{id:"html-metadata",type:"application/json",children:'{"meta":{}}'})]})}function D(e={}){const{wrapper:l}=Object.assign({},r(),e.components);return l?n(l,Object.assign({},e,{children:n(c,e)})):c(e)}export{D as default};
