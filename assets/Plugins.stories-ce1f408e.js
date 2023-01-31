import{j as e,a as n,F as c}from"./jsx-runtime-45b8ed70.js";import{L as t}from"./index-ca829aa2.js";import{u as s}from"./index-c00c2ae7.js";import"./useParams-21d99adc.js";import"./index-2769b282.js";import"./index-49f43349.js";function r(o){const l=Object.assign({nav:"nav",ol:"ol",li:"li",a:"a",h1:"h1",p:"p",ul:"ul",code:"code",div:"div",span:"span",h2:"h2",pre:"pre",h3:"h3",script:"script"},s(),o.components);return n(c,{children:[e(l.nav,{className:"toc",children:n(l.ol,{className:"toc-level toc-level-1",children:[e(l.li,{className:"toc-item toc-item-h2",children:e(l.a,{className:"toc-link toc-link-h2",href:"#configuration",children:"Configuration"})}),n(l.li,{className:"toc-item toc-item-h2",children:[e(l.a,{className:"toc-link toc-link-h2",href:"#parameters",children:"Parameters"}),e(l.ol,{className:"toc-level toc-level-2",children:e(l.li,{className:"toc-item toc-item-h3",children:e(l.a,{className:"toc-link toc-link-h3",href:"#disable-a-plugin",children:"Disable a plugin"})})})]})]})}),`
`,e(l.h1,{id:"plugins",children:"Plugins"}),`
`,e(l.p,{children:"Plugins are a way to extend the functionality of your fwoosh application."}),`
`,e(l.p,{children:"There are four types of plugins:"}),`
`,n(l.ul,{children:[`
`,e(l.li,{children:"Renderer - Add the ability to render stories for a specific framework"}),`
`,n(l.li,{children:["Panel - Add a tool panel to the ",e(l.code,{children:"/workbench"})," view"]}),`
`,n(l.li,{children:["Tool - Add a toolbar tool to the ",e(l.code,{children:"/workbench"})," view"]}),`
`,n(l.li,{children:["Decorators - Common wrappers for stories (",e(t,{to:"Features/Decorators",children:"Read more"}),")"]}),`
`]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"2","data-level-id":"configuration",children:[e(l.a,{"data-link-icon":!0,href:"#configuration",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h2,{id:"configuration",children:"Configuration"})]}),`
`,n(l.p,{children:["Plugins are configured in the ",e(l.code,{children:"fwoosh.config.ts"})," file."]}),`
`,n(l.pre,{children:[n(l.code,{className:"language-ts syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"config"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#953800"},children:"FwooshConfig"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  plugins: ["}),`
`,e(l.span,{style:{color:"#24292F"},children:"    "}),e(l.span,{style:{color:"#6E7781"},children:"// Just list the name of the plugin to use it"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    "}),e(l.span,{style:{color:"#0A3069"},children:'"@fwoosh/panel-story-description"'}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"    "}),e(l.span,{style:{color:"#6E7781"},children:"// Or provide an array with the name and options"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    ["}),e(l.span,{style:{color:"#0A3069"},children:'"@fwoosh/panel-story-description"'}),e(l.span,{style:{color:"#24292F"},children:", { title: "}),e(l.span,{style:{color:"#0A3069"},children:'"Comment"'}),e(l.span,{style:{color:"#24292F"},children:" }],"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  ],"}),`
`,e(l.span,{style:{color:"#24292F"},children:"};"}),`
`]}),n(l.code,{className:"language-ts syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"config"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FFA657"},children:"FwooshConfig"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  plugins: ["}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    "}),e(l.span,{style:{color:"#8B949E"},children:"// Just list the name of the plugin to use it"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    "}),e(l.span,{style:{color:"#A5D6FF"},children:'"@fwoosh/panel-story-description"'}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    "}),e(l.span,{style:{color:"#8B949E"},children:"// Or provide an array with the name and options"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    ["}),e(l.span,{style:{color:"#A5D6FF"},children:'"@fwoosh/panel-story-description"'}),e(l.span,{style:{color:"#C9D1D9"},children:", { title: "}),e(l.span,{style:{color:"#A5D6FF"},children:'"Comment"'}),e(l.span,{style:{color:"#C9D1D9"},children:" }],"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  ],"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"};"}),`
`]})]}),`
`,e(l.p,{children:`You can also import the plugins directly and use them in your config.
This provides a better auto-complete experience in your editor.`}),`
`,n(l.pre,{children:[n(l.code,{className:"language-ts syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"import"}),e(l.span,{style:{color:"#24292F"},children:" StoryDescriptionPanel "}),e(l.span,{style:{color:"#CF222E"},children:"from"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0A3069"},children:'"@fwoosh/panel-story-description"'}),e(l.span,{style:{color:"#24292F"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"config"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#953800"},children:"FwooshConfig"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  plugins: ["}),`
`,e(l.span,{style:{color:"#24292F"},children:"    "}),e(l.span,{style:{color:"#CF222E"},children:"new"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"StoryDescriptionPanel"}),e(l.span,{style:{color:"#24292F"},children:"({"}),`
`,e(l.span,{style:{color:"#24292F"},children:"      title: "}),e(l.span,{style:{color:"#0A3069"},children:'"Comment"'}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"    }),"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  ],"}),`
`,e(l.span,{style:{color:"#24292F"},children:"};"}),`
`]}),n(l.code,{className:"language-ts syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"import"}),e(l.span,{style:{color:"#C9D1D9"},children:" StoryDescriptionPanel "}),e(l.span,{style:{color:"#FF7B72"},children:"from"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#A5D6FF"},children:'"@fwoosh/panel-story-description"'}),e(l.span,{style:{color:"#C9D1D9"},children:";"}),`
`,`
`,e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"config"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FFA657"},children:"FwooshConfig"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  plugins: ["}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    "}),e(l.span,{style:{color:"#FF7B72"},children:"new"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"StoryDescriptionPanel"}),e(l.span,{style:{color:"#C9D1D9"},children:"({"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"      title: "}),e(l.span,{style:{color:"#A5D6FF"},children:'"Comment"'}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    }),"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  ],"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"};"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"2","data-level-id":"parameters",children:[e(l.a,{"data-link-icon":!0,href:"#parameters",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h2,{id:"parameters",children:"Parameters"})]}),`
`,e(l.p,{children:"Plugins can also be configured using parameters."}),`
`,n(l.p,{children:["Parameters can be configured in a story file's ",e(l.code,{children:"meta"}),` object.
This will set the parameter for all stories in the file.`]}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#0550AE"},children:"meta"}),e(l.span,{style:{color:"#CF222E"},children:":"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#953800"},children:"StoryMeta"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  parameters: {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"    PLUGIN: "}),e(l.span,{style:{color:"#0A3069"},children:'"OPTION"'}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"  },"}),`
`,e(l.span,{style:{color:"#24292F"},children:"};"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#79C0FF"},children:"meta"}),e(l.span,{style:{color:"#FF7B72"},children:":"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FFA657"},children:"StoryMeta"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  parameters: {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"    PLUGIN: "}),e(l.span,{style:{color:"#A5D6FF"},children:'"OPTION"'}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  },"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"};"}),`
`]})]}),`
`,e(l.p,{children:`or directly on a story.
This will set the parameter for that specific story.`}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"BasicStory"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" () "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {};"}),`
`,`
`,e(l.span,{style:{color:"#24292F"},children:"BasicStory.parameters "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  PLUGIN: "}),e(l.span,{style:{color:"#0A3069"},children:'"OPTION"'}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"};"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"BasicStory"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" () "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {};"}),`
`,`
`,e(l.span,{style:{color:"#C9D1D9"},children:"BasicStory.parameters "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  PLUGIN: "}),e(l.span,{style:{color:"#A5D6FF"},children:'"OPTION"'}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"};"}),`
`]})]}),`
`,n(l.div,{"data-link-group":!0,style:{position:"relative"},"data-level":"3","data-level-id":"disable-a-plugin",children:[e(l.a,{"data-link-icon":!0,href:"#disable-a-plugin",children:n(l.span,{className:"visually-hidden",children:["Link to the '","[object Object]","' section"]})}),e(l.h3,{id:"disable-a-plugin",children:"Disable a plugin"})]}),`
`,n(l.p,{children:["To disable a plugin, set the parameter to ",e(l.code,{children:"false"}),"."]}),`
`,n(l.pre,{children:[n(l.code,{className:"language-tsx syntax-light",style:{background:"#ffffff"},children:[e(l.span,{style:{color:"#CF222E"},children:"export"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"const"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#8250DF"},children:"BasicStory"}),e(l.span,{style:{color:"#24292F"},children:" "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" () "}),e(l.span,{style:{color:"#CF222E"},children:"=>"}),e(l.span,{style:{color:"#24292F"},children:" {};"}),`
`,`
`,e(l.span,{style:{color:"#24292F"},children:"BasicStory.parameters "}),e(l.span,{style:{color:"#CF222E"},children:"="}),e(l.span,{style:{color:"#24292F"},children:" {"}),`
`,e(l.span,{style:{color:"#24292F"},children:"  PLUGIN: "}),e(l.span,{style:{color:"#0550AE"},children:"false"}),e(l.span,{style:{color:"#24292F"},children:","}),`
`,e(l.span,{style:{color:"#24292F"},children:"};"}),`
`]}),n(l.code,{className:"language-tsx syntax-light syntax-dark",style:{background:"#0d1117"},children:[e(l.span,{style:{color:"#FF7B72"},children:"export"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"const"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#D2A8FF"},children:"BasicStory"}),e(l.span,{style:{color:"#C9D1D9"},children:" "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" () "}),e(l.span,{style:{color:"#FF7B72"},children:"=>"}),e(l.span,{style:{color:"#C9D1D9"},children:" {};"}),`
`,`
`,e(l.span,{style:{color:"#C9D1D9"},children:"BasicStory.parameters "}),e(l.span,{style:{color:"#FF7B72"},children:"="}),e(l.span,{style:{color:"#C9D1D9"},children:" {"}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"  PLUGIN: "}),e(l.span,{style:{color:"#79C0FF"},children:"false"}),e(l.span,{style:{color:"#C9D1D9"},children:","}),`
`,e(l.span,{style:{color:"#C9D1D9"},children:"};"}),`
`]})]}),e(l.script,{id:"html-metadata",type:"application/json",children:'{"meta":{"title":"Plugins"}}'})]})}function F(o={}){const{wrapper:l}=Object.assign({},s(),o.components);return l?e(l,Object.assign({},o,{children:e(r,o)})):r(o)}export{F as default};
