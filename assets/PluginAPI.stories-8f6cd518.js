import{j as e,a as n,F as c}from"./jsx-runtime-45b8ed70.js";import{u as s}from"./index-c00c2ae7.js";function r(o){const l=Object.assign({nav:"nav",ol:"ol",li:"li",a:"a",h1:"h1",p:"p",div:"div",span:"span",h2:"h2",h3:"h3",code:"code",pre:"pre",strong:"strong",h4:"h4",script:"script"},s(),o.components);return n(c,{children:[e(l.nav,{className:"toc",children:e(l.ol,{className:"toc-level toc-level-1",children:n(l.li,{className:"toc-item toc-item-h2",children:[e(l.a,{className:"toc-link toc-link-h2",href:"#hooks",children:"Hooks"}),n(l.ol,{className:"toc-level toc-level-2",children:[e(l.li,{className:"toc-item toc-item-h3",children:e(l.a,{className:"toc-link toc-link-h3",href:"#renderstory",children:"renderStory"})}),e(l.li,{className:"toc-item toc-item-h3",children:e(l.a,{className:"toc-link toc-link-h3",href:"#generatedocs",children:"generateDocs"})}),e(l.li,{className:"toc-item toc-item-h3",children:e(l.a,{className:"toc-link toc-link-h3",href:"#registertoolbarcontrol",children:"registerToolbarControl"})}),n(l.li,{className:"toc-item toc-item-h3",children:[e(l.a,{className:"toc-link toc-link-h3",href:"#registerpanel",children:"registerPanel"}),e(l.ol,{className:"toc-level toc-level-3",children:e(l.li,{className:"toc-item toc-item-h4",children:e(l.a,{className:"toc-link toc-link-h4",href:"#hidewithoutparams",children:"hideWithoutParams"})})})]}),e(l.li,{className:"toc-item toc-item-h3",children:e(l.a,{className:"toc-link toc-link-h3",href:"#modifyviteconfig",children:"modifyViteConfig"})})]})]})})}),e(l.h1,{id:"plugin-api",children:"Plugin API"}),`
`,e(l.p,{children:`Plugins provide most of the functionality in fwoosh.
Creating plugins is an easy way to customize the website output by fwoosh.`}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"2","data-level-id":"hooks",children:[e(l.a,{"data-link-icon":!0,href:"#hooks",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h2,{id:"hooks",children:"Hooks"})]}),`
`,e(l.p,{children:`Plugins in fwoosh are created via the hooks API.
Each one of these hooks can be "tapped" to modify the functionality in fwoosh.`}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"3","data-level-id":"renderstory",children:[e(l.a,{"data-link-icon":!0,href:"#renderstory",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h3,{id:"renderstory",children:e(l.code,{children:"renderStory"})})]}),`
`,e(l.p,{children:`This hooks is what powers the main experience in fwoosh.
It is responsible for returning a function that is used to
render a story.`}),`
`,e(l.p,{children:`It should return the contents of a virtual file that implements
rendering a story.`}),`
`,e(l.p,{children:"Here is a simplified examples of what a react plugin might look like:"}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { createRequire } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"module"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"class"}),e(l.span,{style:{color:"#953800"},children:" ReactPlugin "}),e(l.span,{style:{color:"#CF222E"},children:"implements"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Plugin"}),e(l.span,{style:{color:"#953800"},children:" {"}),`
`,e(l.span,{style:{color:"#953800"},children:"  name "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"react"'}),e(l.span,{style:{color:"#953800"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#953800"},children:"  "}),e(l.span,{style:{color:"#8250DF"},children:"apply"}),e(l.span,{style:{color:"#953800"},children:"(fwoosh"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#953800"},children:" Fwoosh) "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    fwoosh.hooks.renderStory."}),e(l.span,{style:{color:"#8250DF"},children:"tap"}),e(l.span,{style:{color:"#24292F"},children:"("}),`
`,e(l.span,{style:{color:"#24292F"},children:"      "}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      () "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:"`"}),`
`,e(l.span,{style:{color:"#0A3069"},children:'        import React, { Suspense } from "react";'}),`
`,e(l.span,{style:{color:"#0A3069"},children:'        import ReactDOM from "react-dom";'}),`
`,e(l.span,{style:{color:"#0A3069"},children:'        import { stories } from "@fwoosh/app/stories";'}),`
`,e(l.span,{style:{color:"#0A3069"},children:'        import { Spinner } from "@fwoosh/components";'}),`
`,e(l.span,{style:{color:"#0A3069"},children:"        "}),`
`,e(l.span,{style:{color:"#0A3069"},children:"        export function render(el, slug) {"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"          if (!el) {"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"            return;"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"          }"}),`
`,`
`,e(l.span,{style:{color:"#0A3069"},children:"          const Component = stories[slug].component"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"          "}),`
`,e(l.span,{style:{color:"#0A3069"},children:"          try {"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"            ReactDOM.render("}),`
`,e(l.span,{style:{color:"#0A3069"},children:"              <Suspense fallback={<Spinner delay={300} />}>"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"                <Component />"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"              </Suspense>"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"              el"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"            );"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"          } catch (e) {"}),`
`,e(l.span,{style:{color:"#0A3069"},children:'            console.log("error", e);'}),`
`,e(l.span,{style:{color:"#0A3069"},children:"          }"}),`
`,e(l.span,{style:{color:"#0A3069"},children:"        }   "}),`
`,e(l.span,{style:{color:"#0A3069"},children:"      `"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    );"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  }"}),`
`,e(l.span,{style:{color:"#953800"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { createRequire } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"module"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"class"}),e(l.span,{style:{color:"#FFA657"},children:" ReactPlugin "}),e(l.span,{style:{color:"#FF7B72"},children:"implements"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Plugin"}),e(l.span,{style:{color:"#FFA657"},children:" {"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"  name "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"react"'}),e(l.span,{style:{color:"#FFA657"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FFA657"},children:"  "}),e(l.span,{style:{color:"#D2A8FF"},children:"apply"}),e(l.span,{style:{color:"#FFA657"},children:"(fwoosh"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#FFA657"},children:" Fwoosh) "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    fwoosh.hooks.renderStory."}),e(l.span,{style:{color:"#D2A8FF"},children:"tap"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      "}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      () "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:"`"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:'        import React, { Suspense } from "react";'}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:'        import ReactDOM from "react-dom";'}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:'        import { stories } from "@fwoosh/app/stories";'}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:'        import { Spinner } from "@fwoosh/components";'}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"        "}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"        export function render(el, slug) {"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          if (!el) {"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"            return;"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          }"}),`
`,`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          const Component = stories[slug].component"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          "}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          try {"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"            ReactDOM.render("}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"              <Suspense fallback={<Spinner delay={300} />}>"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"                <Component />"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"              </Suspense>"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"              el"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"            );"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          } catch (e) {"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:'            console.log("error", e);'}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"          }"}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"        }   "}),`
`,e(l.span,{style:{color:"#A5D6FF"},children:"      `"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    );"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  }"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"}"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"3","data-level-id":"generatedocs",children:[e(l.a,{"data-link-icon":!0,href:"#generatedocs",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h3,{id:"generatedocs",children:e(l.code,{children:"generateDocs"})})]}),`
`,e(l.p,{children:`This hook registers a function for documentation generation.
Given a file path it should return docs for all the components
in that file. That information is then consumed throughout the app.`}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { createRequire } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"module"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"class"}),e(l.span,{style:{color:"#953800"},children:" ReactPlugin "}),e(l.span,{style:{color:"#CF222E"},children:"implements"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Plugin"}),e(l.span,{style:{color:"#953800"},children:" {"}),`
`,e(l.span,{style:{color:"#953800"},children:"  name "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"react"'}),e(l.span,{style:{color:"#953800"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#953800"},children:"  "}),e(l.span,{style:{color:"#8250DF"},children:"apply"}),e(l.span,{style:{color:"#953800"},children:"(fwoosh"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#953800"},children:" Fwoosh) "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    fwoosh.hooks.generateDocs."}),e(l.span,{style:{color:"#8250DF"},children:"tap"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name, ("}),e(l.span,{style:{color:"#953800"},children:"filepath"}),e(l.span,{style:{color:"#24292F"},children:") "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"generateDocs"}),e(l.span,{style:{color:"#24292F"},children:"(filepath);"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    });"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  }"}),`
`,e(l.span,{style:{color:"#953800"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { createRequire } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"module"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"class"}),e(l.span,{style:{color:"#FFA657"},children:" ReactPlugin "}),e(l.span,{style:{color:"#FF7B72"},children:"implements"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Plugin"}),e(l.span,{style:{color:"#FFA657"},children:" {"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"  name "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"react"'}),e(l.span,{style:{color:"#FFA657"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FFA657"},children:"  "}),e(l.span,{style:{color:"#D2A8FF"},children:"apply"}),e(l.span,{style:{color:"#FFA657"},children:"(fwoosh"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#FFA657"},children:" Fwoosh) "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    fwoosh.hooks.generateDocs."}),e(l.span,{style:{color:"#D2A8FF"},children:"tap"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name, ("}),e(l.span,{style:{color:"#FFA657"},children:"filepath"}),e(l.span,{style:{color:"#C9D1D9"},children:") "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"generateDocs"}),e(l.span,{style:{color:"#C9D1D9"},children:"(filepath);"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    });"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  }"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"}"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"3","data-level-id":"registertoolbarcontrol",children:[e(l.a,{"data-link-icon":!0,href:"#registertoolbarcontrol",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h3,{id:"registertoolbarcontrol",children:e(l.code,{children:"registerToolbarControl"})})]}),`
`,e(l.p,{children:"This hooks registers a tool in the top toolbar of the workbench."}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { createRequire } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"module"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"class"}),e(l.span,{style:{color:"#953800"},children:" MaximizePlugin "}),e(l.span,{style:{color:"#CF222E"},children:"implements"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Plugin"}),e(l.span,{style:{color:"#953800"},children:" {"}),`
`,e(l.span,{style:{color:"#953800"},children:"  name "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"maximize"'}),e(l.span,{style:{color:"#953800"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#953800"},children:"  "}),e(l.span,{style:{color:"#8250DF"},children:"apply"}),e(l.span,{style:{color:"#953800"},children:"(fwoosh"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#953800"},children:" Fwoosh) "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    fwoosh.hooks.registerToolbarControl."}),e(l.span,{style:{color:"#8250DF"},children:"tap"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name, ("}),e(l.span,{style:{color:"#953800"},children:"controls"}),e(l.span,{style:{color:"#24292F"},children:") "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" ["}),e(l.span,{style:{color:"#CF222E"},children:"..."}),e(l.span,{style:{color:"#24292F"},children:"controls, require."}),e(l.span,{style:{color:"#8250DF"},children:"resolve"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0A3069"},children:'"./toolbar"'}),e(l.span,{style:{color:"#24292F"},children:")];"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    });"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  }"}),`
`,e(l.span,{style:{color:"#953800"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { createRequire } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"module"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"class"}),e(l.span,{style:{color:"#FFA657"},children:" MaximizePlugin "}),e(l.span,{style:{color:"#FF7B72"},children:"implements"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Plugin"}),e(l.span,{style:{color:"#FFA657"},children:" {"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"  name "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"maximize"'}),e(l.span,{style:{color:"#FFA657"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FFA657"},children:"  "}),e(l.span,{style:{color:"#D2A8FF"},children:"apply"}),e(l.span,{style:{color:"#FFA657"},children:"(fwoosh"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#FFA657"},children:" Fwoosh) "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    fwoosh.hooks.registerToolbarControl."}),e(l.span,{style:{color:"#D2A8FF"},children:"tap"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name, ("}),e(l.span,{style:{color:"#FFA657"},children:"controls"}),e(l.span,{style:{color:"#C9D1D9"},children:") "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" ["}),e(l.span,{style:{color:"#FF7B72"},children:"..."}),e(l.span,{style:{color:"#C9D1D9"},children:"controls, require."}),e(l.span,{style:{color:"#D2A8FF"},children:"resolve"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#A5D6FF"},children:'"./toolbar"'}),e(l.span,{style:{color:"#C9D1D9"},children:")];"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    });"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  }"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"}"}),`
`]})]}),`
`,e(l.p,{children:`The file should export a react component that acts as the toolbar control.
Here is a simple plugin that maximizes the page when clicked.`}),`
`,e(l.p,{children:n(l.strong,{children:[e(l.code,{children:"toolbar.tsx"}),":"]})}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" React "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"react"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { IconButton, Toolbar } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"@fwoosh/components"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"function"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"MaximizeControl"}),e(l.span,{style:{color:"#953800"},children:"() "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" ("}),`
`,e(l.span,{style:{color:"#24292F"},children:"    <"}),e(l.span,{style:{color:"#116329"},children:"Toolbar.Button"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"asChild"}),e(l.span,{style:{color:"#CF222E"},children:"={"}),e(l.span,{style:{color:"#0550AE"},children:"true"}),e(l.span,{style:{color:"#CF222E"},children:"}"}),e(l.span,{style:{color:"#24292F"},children:">"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      <"}),e(l.span,{style:{color:"#116329"},children:"IconButton"}),`
`,e(l.span,{style:{color:"#24292F"},children:"        "}),e(l.span,{style:{color:"#0550AE"},children:"aria-label"}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#0A3069"},children:'"Maximize story"'}),`
`,e(l.span,{style:{color:"#24292F"},children:"        "}),e(l.span,{style:{color:"#0550AE"},children:"title"}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#0A3069"},children:'"Maximize"'}),`
`,e(l.span,{style:{color:"#24292F"},children:"        "}),e(l.span,{style:{color:"#0550AE"},children:"onClick"}),e(l.span,{style:{color:"#CF222E"},children:"={"}),e(l.span,{style:{color:"#24292F"},children:"() "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" window."}),e(l.span,{style:{color:"#8250DF"},children:"fullscreen"}),e(l.span,{style:{color:"#24292F"},children:"()"}),e(l.span,{style:{color:"#CF222E"},children:"}"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      >"}),`
`,e(l.span,{style:{color:"#24292F"},children:"        <"}),e(l.span,{style:{color:"#116329"},children:"Maximize"}),e(l.span,{style:{color:"#24292F"},children:" />"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      </"}),e(l.span,{style:{color:"#116329"},children:"IconButton"}),e(l.span,{style:{color:"#24292F"},children:">"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    </"}),e(l.span,{style:{color:"#116329"},children:"Toolbar.Button"}),e(l.span,{style:{color:"#24292F"},children:">"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  );"}),`
`,e(l.span,{style:{color:"#24292F"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" React "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"react"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { IconButton, Toolbar } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"@fwoosh/components"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"function"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"MaximizeControl"}),e(l.span,{style:{color:"#FFA657"},children:"() "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" ("}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    <"}),e(l.span,{style:{color:"#7EE787"},children:"Toolbar.Button"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"asChild"}),e(l.span,{style:{color:"#FF7B72"},children:"={"}),e(l.span,{style:{color:"#79C0FF"},children:"true"}),e(l.span,{style:{color:"#FF7B72"},children:"}"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      <"}),e(l.span,{style:{color:"#7EE787"},children:"IconButton"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        "}),e(l.span,{style:{color:"#79C0FF"},children:"aria-label"}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#A5D6FF"},children:'"Maximize story"'}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        "}),e(l.span,{style:{color:"#79C0FF"},children:"title"}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#A5D6FF"},children:'"Maximize"'}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        "}),e(l.span,{style:{color:"#79C0FF"},children:"onClick"}),e(l.span,{style:{color:"#FF7B72"},children:"={"}),e(l.span,{style:{color:"#C9D1D9"},children:"() "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" window."}),e(l.span,{style:{color:"#D2A8FF"},children:"fullscreen"}),e(l.span,{style:{color:"#C9D1D9"},children:"()"}),e(l.span,{style:{color:"#FF7B72"},children:"}"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      >"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        <"}),e(l.span,{style:{color:"#7EE787"},children:"Maximize"}),e(l.span,{style:{color:"#C9D1D9"},children:" />"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      </"}),e(l.span,{style:{color:"#7EE787"},children:"IconButton"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    </"}),e(l.span,{style:{color:"#7EE787"},children:"Toolbar.Button"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  );"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"}"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"3","data-level-id":"registerpanel",children:[e(l.a,{"data-link-icon":!0,href:"#registerpanel",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h3,{id:"registerpanel",children:e(l.code,{children:"registerPanel"})})]}),`
`,e(l.p,{children:`This hooks registers a panel in the workbench.
Panels are great for showing detailed information or controls for a particular story.`}),`
`,e(l.p,{children:`It should add a path + title to the array.
The title is used for the text of the Tab trigger.`}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { createRequire } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"module"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"class"}),e(l.span,{style:{color:"#953800"},children:" DescriptionPanelPlugin "}),e(l.span,{style:{color:"#CF222E"},children:"implements"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Plugin"}),e(l.span,{style:{color:"#953800"},children:" {"}),`
`,e(l.span,{style:{color:"#953800"},children:"  name "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"description-panel"'}),e(l.span,{style:{color:"#953800"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#953800"},children:"  "}),e(l.span,{style:{color:"#8250DF"},children:"apply"}),e(l.span,{style:{color:"#953800"},children:"(fwoosh"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#953800"},children:" Fwoosh) "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    fwoosh.hooks.registerPanel."}),e(l.span,{style:{color:"#8250DF"},children:"tap"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name, ("}),e(l.span,{style:{color:"#953800"},children:"panels"}),e(l.span,{style:{color:"#24292F"},children:") "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" ["}),`
`,e(l.span,{style:{color:"#24292F"},children:"        "}),e(l.span,{style:{color:"#CF222E"},children:"..."}),e(l.span,{style:{color:"#24292F"},children:"panels,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"        {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          name: "}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".options.title,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          paramKey: "}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          filepath: require."}),e(l.span,{style:{color:"#8250DF"},children:"resolve"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0A3069"},children:'"./panel"'}),e(l.span,{style:{color:"#24292F"},children:"),"}),`
`,e(l.span,{style:{color:"#24292F"},children:"        },"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      ];"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    });"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  }"}),`
`,e(l.span,{style:{color:"#953800"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { createRequire } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"module"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"class"}),e(l.span,{style:{color:"#FFA657"},children:" DescriptionPanelPlugin "}),e(l.span,{style:{color:"#FF7B72"},children:"implements"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Plugin"}),e(l.span,{style:{color:"#FFA657"},children:" {"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"  name "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"description-panel"'}),e(l.span,{style:{color:"#FFA657"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FFA657"},children:"  "}),e(l.span,{style:{color:"#D2A8FF"},children:"apply"}),e(l.span,{style:{color:"#FFA657"},children:"(fwoosh"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#FFA657"},children:" Fwoosh) "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    fwoosh.hooks.registerPanel."}),e(l.span,{style:{color:"#D2A8FF"},children:"tap"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name, ("}),e(l.span,{style:{color:"#FFA657"},children:"panels"}),e(l.span,{style:{color:"#C9D1D9"},children:") "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" ["}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        "}),e(l.span,{style:{color:"#FF7B72"},children:"..."}),e(l.span,{style:{color:"#C9D1D9"},children:"panels,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          name: "}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".options.title,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          paramKey: "}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          filepath: require."}),e(l.span,{style:{color:"#D2A8FF"},children:"resolve"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#A5D6FF"},children:'"./panel"'}),e(l.span,{style:{color:"#C9D1D9"},children:"),"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        },"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      ];"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    });"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  }"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"}"}),`
`]})]}),`
`,e(l.p,{children:`The file should export a react component that renders the panel.
Here is a simplified version of the plugin that display's each stories comment as a panel.`}),`
`,e(l.p,{children:n(l.strong,{children:[e(l.code,{children:"panel.tsx"}),":"]})}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" React "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"react"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { StyledMarkdown, styled, components } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"@fwoosh/components"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { useParams } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"react-router-dom"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { stories } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"@fwoosh/app/stories"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Panel"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"styled"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0A3069"},children:'"div"'}),e(l.span,{style:{color:"#24292F"},children:", {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  height: "}),e(l.span,{style:{color:"#0A3069"},children:'"100%"'}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"  width: "}),e(l.span,{style:{color:"#0A3069"},children:'"100%"'}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"  px: "}),e(l.span,{style:{color:"#0550AE"},children:"4"}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"});"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"function"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"DescriptionPanel"}),e(l.span,{style:{color:"#953800"},children:"() "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"params"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"useParams"}),e(l.span,{style:{color:"#24292F"},children:"<{ "}),e(l.span,{style:{color:"#953800"},children:"storyId"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"string"}),e(l.span,{style:{color:"#24292F"},children:" }>();"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"story"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" Object."}),e(l.span,{style:{color:"#8250DF"},children:"values"}),e(l.span,{style:{color:"#24292F"},children:"(stories)."}),e(l.span,{style:{color:"#8250DF"},children:"find"}),e(l.span,{style:{color:"#24292F"},children:"(("}),e(l.span,{style:{color:"#953800"},children:"s"}),e(l.span,{style:{color:"#24292F"},children:") "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" s.slug "}),e(l.span,{style:{color:"#CF222E"},children:"==="}),e(l.span,{style:{color:"#24292F"},children:" params.storyId);"}),`
`,`
`,e(l.span,{style:{color:"#24292F"},children:"  "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" ("}),`
`,e(l.span,{style:{color:"#24292F"},children:"    <"}),e(l.span,{style:{color:"#116329"},children:"Panel"}),e(l.span,{style:{color:"#24292F"},children:">"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      <"}),e(l.span,{style:{color:"#116329"},children:"StyledMarkdown"}),e(l.span,{style:{color:"#24292F"},children:">"}),e(l.span,{style:{color:"#CF222E"},children:"{"}),e(l.span,{style:{color:"#24292F"},children:"story.comment"}),e(l.span,{style:{color:"#CF222E"},children:"}"}),e(l.span,{style:{color:"#24292F"},children:"</"}),e(l.span,{style:{color:"#116329"},children:"StyledMarkdown"}),e(l.span,{style:{color:"#24292F"},children:">"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    </"}),e(l.span,{style:{color:"#116329"},children:"Panel"}),e(l.span,{style:{color:"#24292F"},children:">"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  );"}),`
`,e(l.span,{style:{color:"#24292F"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" React "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"react"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { StyledMarkdown, styled, components } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"@fwoosh/components"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { useParams } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"react-router-dom"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { stories } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"@fwoosh/app/stories"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Panel"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"styled"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#A5D6FF"},children:'"div"'}),e(l.span,{style:{color:"#C9D1D9"},children:", {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  height: "}),e(l.span,{style:{color:"#A5D6FF"},children:'"100%"'}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  width: "}),e(l.span,{style:{color:"#A5D6FF"},children:'"100%"'}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  px: "}),e(l.span,{style:{color:"#79C0FF"},children:"4"}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"});"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"function"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"DescriptionPanel"}),e(l.span,{style:{color:"#FFA657"},children:"() "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"params"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"useParams"}),e(l.span,{style:{color:"#C9D1D9"},children:"<{ "}),e(l.span,{style:{color:"#FFA657"},children:"storyId"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"string"}),e(l.span,{style:{color:"#C9D1D9"},children:" }>();"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"story"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" Object."}),e(l.span,{style:{color:"#D2A8FF"},children:"values"}),e(l.span,{style:{color:"#C9D1D9"},children:"(stories)."}),e(l.span,{style:{color:"#D2A8FF"},children:"find"}),e(l.span,{style:{color:"#C9D1D9"},children:"(("}),e(l.span,{style:{color:"#FFA657"},children:"s"}),e(l.span,{style:{color:"#C9D1D9"},children:") "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" s.slug "}),e(l.span,{style:{color:"#FF7B72"},children:"==="}),e(l.span,{style:{color:"#C9D1D9"},children:" params.storyId);"}),`
`,`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" ("}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    <"}),e(l.span,{style:{color:"#7EE787"},children:"Panel"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      <"}),e(l.span,{style:{color:"#7EE787"},children:"StyledMarkdown"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),e(l.span,{style:{color:"#FF7B72"},children:"{"}),e(l.span,{style:{color:"#C9D1D9"},children:"story.comment"}),e(l.span,{style:{color:"#FF7B72"},children:"}"}),e(l.span,{style:{color:"#C9D1D9"},children:"</"}),e(l.span,{style:{color:"#7EE787"},children:"StyledMarkdown"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    </"}),e(l.span,{style:{color:"#7EE787"},children:"Panel"}),e(l.span,{style:{color:"#C9D1D9"},children:">"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  );"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"}"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"4","data-level-id":"hidewithoutparams",children:[e(l.a,{"data-link-icon":!0,href:"#hidewithoutparams",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h4,{id:"hidewithoutparams",children:e(l.code,{children:"hideWithoutParams"})})]}),`
`,e(l.p,{children:"You can configure a panel to only show when a story has parameters."}),`
`,n(l.p,{children:["Now the following panel will only be shown when the story has a ",e(l.code,{children:"description"})," parameter."]}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { createRequire } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"module"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"class"}),e(l.span,{style:{color:"#953800"},children:" DescriptionPlugin "}),e(l.span,{style:{color:"#CF222E"},children:"implements"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Plugin"}),e(l.span,{style:{color:"#953800"},children:" {"}),`
`,e(l.span,{style:{color:"#953800"},children:"  name "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"description"'}),e(l.span,{style:{color:"#953800"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#953800"},children:"  "}),e(l.span,{style:{color:"#8250DF"},children:"apply"}),e(l.span,{style:{color:"#953800"},children:"(fwoosh"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#953800"},children:" Fwoosh) "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    fwoosh.hooks.registerPanel."}),e(l.span,{style:{color:"#8250DF"},children:"tap"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name, ("}),e(l.span,{style:{color:"#953800"},children:"panels"}),e(l.span,{style:{color:"#24292F"},children:") "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" ["}),`
`,e(l.span,{style:{color:"#24292F"},children:"        "}),e(l.span,{style:{color:"#CF222E"},children:"..."}),e(l.span,{style:{color:"#24292F"},children:"panels,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"        {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          name: "}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".options.title,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          filepath: require."}),e(l.span,{style:{color:"#8250DF"},children:"resolve"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0A3069"},children:'"./panel"'}),e(l.span,{style:{color:"#24292F"},children:"),"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          paramKey: "}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name,"}),`
`,e(l.span,{style:{color:"#24292F"},children:"          hideWithoutParams: "}),e(l.span,{style:{color:"#0550AE"},children:"true"}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"        },"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      ];"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    });"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  }"}),`
`,e(l.span,{style:{color:"#953800"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { createRequire } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"module"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"class"}),e(l.span,{style:{color:"#FFA657"},children:" DescriptionPlugin "}),e(l.span,{style:{color:"#FF7B72"},children:"implements"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Plugin"}),e(l.span,{style:{color:"#FFA657"},children:" {"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"  name "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"description"'}),e(l.span,{style:{color:"#FFA657"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FFA657"},children:"  "}),e(l.span,{style:{color:"#D2A8FF"},children:"apply"}),e(l.span,{style:{color:"#FFA657"},children:"(fwoosh"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#FFA657"},children:" Fwoosh) "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    fwoosh.hooks.registerPanel."}),e(l.span,{style:{color:"#D2A8FF"},children:"tap"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name, ("}),e(l.span,{style:{color:"#FFA657"},children:"panels"}),e(l.span,{style:{color:"#C9D1D9"},children:") "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" ["}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        "}),e(l.span,{style:{color:"#FF7B72"},children:"..."}),e(l.span,{style:{color:"#C9D1D9"},children:"panels,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          name: "}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".options.title,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          filepath: require."}),e(l.span,{style:{color:"#D2A8FF"},children:"resolve"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#A5D6FF"},children:'"./panel"'}),e(l.span,{style:{color:"#C9D1D9"},children:"),"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          paramKey: "}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name,"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"          hideWithoutParams: "}),e(l.span,{style:{color:"#79C0FF"},children:"true"}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"        },"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      ];"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    });"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  }"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"}"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"3","data-level-id":"modifyviteconfig",children:[e(l.a,{"data-link-icon":!0,href:"#modifyviteconfig",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h3,{id:"modifyviteconfig",children:e(l.code,{children:"modifyViteConfig"})})]}),`
`,e(l.p,{children:"Modify the Vite configuration used to load your fwoosh instance."}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"fwoosh"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" { createRequire } "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"module"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"default"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"class"}),e(l.span,{style:{color:"#953800"},children:" DescriptionPanelPlugin "}),e(l.span,{style:{color:"#CF222E"},children:"implements"}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"Plugin"}),e(l.span,{style:{color:"#953800"},children:" {"}),`
`,e(l.span,{style:{color:"#953800"},children:"  name "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#953800"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"description-panel"'}),e(l.span,{style:{color:"#953800"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#953800"},children:"  "}),e(l.span,{style:{color:"#8250DF"},children:"apply"}),e(l.span,{style:{color:"#953800"},children:"(fwoosh"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#953800"},children:" Fwoosh) "}),e(l.span,{style:{color:"#24292F"},children:"{"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    fwoosh.hooks.modifyViteConfig."}),e(l.span,{style:{color:"#8250DF"},children:"tap"}),e(l.span,{style:{color:"#24292F"},children:"("}),e(l.span,{style:{color:"#0550AE"},children:"this"}),e(l.span,{style:{color:"#24292F"},children:".name, ("}),e(l.span,{style:{color:"#953800"},children:"config"}),e(l.span,{style:{color:"#24292F"},children:") "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      config.plugins."}),e(l.span,{style:{color:"#8250DF"},children:"push"}),e(l.span,{style:{color:"#24292F"},children:"({});"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      "}),e(l.span,{style:{color:"#CF222E"},children:"return"}),e(l.span,{style:{color:"#24292F"},children:" config;"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    });"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  }"}),`
`,e(l.span,{style:{color:"#953800"},children:"}"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { Plugin, Fwoosh } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"fwoosh"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" { createRequire } "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"module"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"default"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"class"}),e(l.span,{style:{color:"#FFA657"},children:" DescriptionPanelPlugin "}),e(l.span,{style:{color:"#FF7B72"},children:"implements"}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"Plugin"}),e(l.span,{style:{color:"#FFA657"},children:" {"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"  name "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#FFA657"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"description-panel"'}),e(l.span,{style:{color:"#FFA657"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FFA657"},children:"  "}),e(l.span,{style:{color:"#D2A8FF"},children:"apply"}),e(l.span,{style:{color:"#FFA657"},children:"(fwoosh"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#FFA657"},children:" Fwoosh) "}),e(l.span,{style:{color:"#C9D1D9"},children:"{"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    fwoosh.hooks.modifyViteConfig."}),e(l.span,{style:{color:"#D2A8FF"},children:"tap"}),e(l.span,{style:{color:"#C9D1D9"},children:"("}),e(l.span,{style:{color:"#79C0FF"},children:"this"}),e(l.span,{style:{color:"#C9D1D9"},children:".name, ("}),e(l.span,{style:{color:"#FFA657"},children:"config"}),e(l.span,{style:{color:"#C9D1D9"},children:") "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      config.plugins."}),e(l.span,{style:{color:"#D2A8FF"},children:"push"}),e(l.span,{style:{color:"#C9D1D9"},children:"({});"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      "}),e(l.span,{style:{color:"#FF7B72"},children:"return"}),e(l.span,{style:{color:"#C9D1D9"},children:" config;"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    });"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  }"}),`
`,e(l.span,{style:{color:"#FFA657"},children:"}"}),`
`]})]}),e(l.script,{id:"html-metadata",type:"application/json",children:'{"meta":{"title":"Plugin API"}}'})]})}function a(o={}){const{wrapper:l}=Object.assign({},s(),o.components);return l?e(l,Object.assign({},o,{children:e(r,o)})):r(o)}export{a as default};
