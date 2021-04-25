(this.webpackJsonpretail=this.webpackJsonpretail||[]).push([[0],{46:function(e,t,n){},47:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(18),c=n.n(r),i=(n(46),n(5)),o=n(6),l=n(8),h=n(7),u=(n(47),n(81)),j=n(83),d=n(82),m=n(26),b=n.n(m),O=n(40),g=n(38),p=n(4),f=n(11),x=n(79),v=n(14),y=n.n(v),N=new(function(){function e(){Object(i.a)(this,e)}return Object(o.a)(e,[{key:"login",value:function(e){return y.a.post("/api/login",{username:e}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e){return y.a.post("/api/register",{username:e})}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}},{key:"authHeader",value:function(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}}]),e}()),k=n(2),S=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={isOpen:!1,currentUser:void 0,showAdminBoard:!1},a.toggle=a.toggle.bind(Object(p.a)(a)),a.logOut=a.logOut.bind(Object(p.a)(a)),a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=N.getCurrentUser();e&&this.setState({currentUser:e,showAdminBoard:e.roles.includes("ROLE_ADMIN")})}},{key:"logOut",value:function(){N.logout()}},{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this.state,t=e.currentUser;e.showAdminBoard;return Object(k.jsxs)(f.f,{color:"dark",dark:!0,expand:"md",className:"mb-5",children:[Object(k.jsx)(f.g,{tag:x.a,to:"/",children:"Example.com"}),Object(k.jsx)(f.h,{onClick:this.toggle}),Object(k.jsx)(f.a,{isOpen:this.state.isOpen,navbar:!0,children:Object(k.jsx)(f.c,{className:"ml-auto",navbar:!0,children:t?Object(k.jsx)(f.d,{children:Object(k.jsx)(f.e,{href:"/login",onClick:this.logOut,children:"Logout"})}):Object(k.jsx)(f.d,{children:Object(k.jsx)(f.e,{href:"/login",children:"Login"})})})})]})}}]),n}(a.Component),C=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(k.jsxs)("footer",{className:"container my-5",children:[Object(k.jsx)("hr",{}),Object(k.jsx)("ul",{className:"nav justify-content-center",children:Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsxs)("a",{href:"/",className:"nav-link text-muted",children:["Example.com \xa9 ",(new Date).getFullYear()," "]})})})]})}}]),n}(a.Component),U=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={currentUser:N.getCurrentUser(),profile:void 0,debts:[],credits:[],transactions:[],isLoading:!0},a.remove=a.remove.bind(Object(p.a)(a)),a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),fetch("/api/profile",{headers:N.authHeader()}).then((function(e){return e.json()})).then((function(t){return e.setState({profile:t})})),fetch("/api/debts",{headers:N.authHeader()}).then((function(e){return e.json()})).then((function(t){return e.setState({debts:t})})),fetch("/api/credits",{headers:N.authHeader()}).then((function(e){return e.json()})).then((function(t){return e.setState({credits:t})})),fetch("/api/transactions",{headers:N.authHeader()}).then((function(e){return e.json()})).then((function(t){return e.setState({transactions:t,isLoading:!1})}))}},{key:"remove",value:function(){var e=Object(g.a)(b.a.mark((function e(t){var n=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/transaction/".concat(t),{method:"DELETE",headers:N.authHeader()}).then((function(){var e=Object(O.a)(n.state.groups).filter((function(e){return e.id!==t}));n.setState({transactions:e})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.currentUser,n=e.profile,a=e.debts,s=e.credits,r=e.transactions;if(e.isLoading)return Object(k.jsx)("p",{children:"Loading..."});var c=r.map((function(e){return Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{style:{whiteSpace:"nowrap"},children:e.user.username}),Object(k.jsx)("td",{children:e.type}),Object(k.jsx)("td",{children:e.amount}),Object(k.jsx)("td",{children:e.createdBy}),Object(k.jsx)("td",{className:"text-right",children:e.lastModifiedDate})]},e.id)})),i=a.map((function(e){return Object(k.jsxs)("p",{className:"text-danger",children:["Owning ",e.amount," to ",e.creditor.username,"."]})})),o=s.map((function(e){return Object(k.jsxs)("p",{className:"text-success",children:["Owning ",e.amount," from ",e.debitor.username,"."]})}));return Object(k.jsxs)("div",{children:[Object(k.jsx)(S,{}),Object(k.jsxs)(f.b,{children:[Object(k.jsxs)("header",{className:"jumbotron",children:[Object(k.jsxs)("h3",{children:["Hello, ",Object(k.jsx)("strong",{children:t.username}),"!"]}),Object(k.jsxs)("p",{className:"text-primary",children:["Your Balance is ",n.balance]}),i,o,Object(k.jsx)(x.a,{className:"btn btn-primary",to:"/topup",children:"Top Up"}),Object(k.jsxs)("p",{className:"mt-3",children:[Object(k.jsx)("strong",{children:"Token:"})," ",t.accessToken.substring(0,20)," ..."," ",t.accessToken.substr(t.accessToken.length-20)]}),Object(k.jsx)("strong",{children:"Authorities:"}),Object(k.jsx)("ul",{children:t.roles&&t.roles.map((function(e,t){return Object(k.jsx)("li",{children:e},t)}))})]}),Object(k.jsx)(x.a,{className:"btn btn-primary float-right",to:"/pay",children:"Pay"}),Object(k.jsx)("h3",{children:"Transactions"}),Object(k.jsxs)(f.i,{children:[Object(k.jsx)("thead",{children:Object(k.jsxs)("tr",{children:[Object(k.jsx)("th",{children:"Owner"}),Object(k.jsx)("th",{children:"Type"}),Object(k.jsx)("th",{children:"Amount"}),Object(k.jsx)("th",{children:"Created By"}),Object(k.jsx)("th",{className:"text-right",children:"Transaction Date"})]})}),Object(k.jsx)("tbody",{children:c})]})]}),Object(k.jsx)(C,{})]})}}]),n}(a.Component),A=n(15),w=n.n(A),T=n(13),B=n.n(T),L=n(16),D=n.n(L),F=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},M=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleLogin=a.handleLogin.bind(Object(p.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(p.a)(a)),a.state={username:"",loading:!1,message:""},a}return Object(o.a)(n,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?N.login(this.state.username).then((function(){t.props.history.push("/home"),window.location.reload()}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:n})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{children:[Object(k.jsx)(S,{}),Object(k.jsx)("div",{className:"Container",children:Object(k.jsxs)(w.a,{onSubmit:this.handleLogin,ref:function(t){e.form=t},className:"p-3",children:[Object(k.jsx)("h1",{className:"h3 my-5 text-muted",children:"Login"}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.message})}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"username",children:"Username"}),Object(k.jsx)(B.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[F]})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(k.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(k.jsx)("span",{children:"Login"})]})}),Object(k.jsx)(D.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}}),Object(k.jsx)("a",{href:"/register",children:"Register"})]})}),Object(k.jsx)(C,{})]})}}]),n}(a.Component),P=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},H=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleRegister=a.handleRegister.bind(Object(p.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(p.a)(a)),a.state={username:"",loading:!1,message:"",errorMessage:""},a}return Object(o.a)(n,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"handleRegister",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",errorMessage:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?N.register(this.state.username).then((function(){t.setState({loading:!1,message:"User Registered Successfully!"})}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,errorMessage:n})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{children:[Object(k.jsx)(S,{}),Object(k.jsx)("div",{className:"Container",children:Object(k.jsxs)(w.a,{onSubmit:this.handleRegister,ref:function(t){e.form=t},className:"p-3",children:[Object(k.jsx)("h1",{className:"h3 my-5 text-muted",children:"Register"}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:"alert alert-success",role:"alert",children:this.state.message})}),this.state.errorMessage&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.errorMessage})}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"username",children:"Username"}),Object(k.jsx)(B.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[P]})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(k.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(k.jsx)("span",{children:"Register"})]})}),Object(k.jsx)(D.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})}),Object(k.jsx)(C,{})]})}}]),n}(a.Component),R=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},E=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onSubmit=a.onSubmit.bind(Object(p.a)(a)),a.onChangeAmount=a.onChangeAmount.bind(Object(p.a)(a)),a.state={amount:0,loading:!1,message:""},a}return Object(o.a)(n,[{key:"onChangeAmount",value:function(e){this.setState({amount:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;if(e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length){var n={headers:N.authHeader()};y.a.post("/api/transaction/topup",{amount:this.state.amount},n).then((function(){t.props.history.push("/home"),window.location.reload()}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:n})}))}else this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{children:[Object(k.jsx)(S,{}),Object(k.jsx)("div",{className:"Container",children:Object(k.jsxs)(w.a,{onSubmit:this.onSubmit,ref:function(t){e.form=t},className:"p-3",children:[Object(k.jsx)("h1",{className:"h3 my-5 text-muted",children:"Top Up"}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.message})}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"amount",children:"Amount"}),Object(k.jsx)(B.a,{type:"number",min:"0",step:".01",className:"form-control",name:"amount",value:this.state.amount,onChange:this.onChangeAmount,validations:[R]})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(k.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(k.jsx)("span",{children:"Topup"})]})}),Object(k.jsx)(D.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})}),Object(k.jsx)(C,{})]})}}]),n}(a.Component),I=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},J=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onSubmit=a.onSubmit.bind(Object(p.a)(a)),a.onChangePayee=a.onChangePayee.bind(Object(p.a)(a)),a.onChangeAmount=a.onChangeAmount.bind(Object(p.a)(a)),a.state={payee:"",amount:0,loading:!1,message:""},a}return Object(o.a)(n,[{key:"onChangePayee",value:function(e){this.setState({payee:e.target.value})}},{key:"onChangeAmount",value:function(e){this.setState({amount:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;if(e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length){var n={headers:N.authHeader()};y.a.post("/api/transaction/pay",{payee:this.state.payee,amount:this.state.amount},n).then((function(){t.props.history.push("/home"),window.location.reload()}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:n})}))}else this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{children:[Object(k.jsx)(S,{}),Object(k.jsx)("div",{className:"Container",children:Object(k.jsxs)(w.a,{onSubmit:this.onSubmit,ref:function(t){e.form=t},className:"p-3",children:[Object(k.jsx)("h1",{className:"h3 my-5 text-muted",children:"Pay"}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.message})}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"payee",children:"Payee"}),Object(k.jsx)(B.a,{type:"text",className:"form-control",name:"payee",value:this.state.payee,onChange:this.onChangePayee,validations:[I]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"amount",children:"Amount"}),Object(k.jsx)(B.a,{type:"number",min:"0",step:".01",className:"form-control",name:"amount",value:this.state.amount,onChange:this.onChangeAmount,validations:[I]})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(k.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(k.jsx)("span",{children:"Pay"})]})}),Object(k.jsx)(D.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})}),Object(k.jsx)(C,{})]})}}]),n}(a.Component),_=n(22),q=n(41),Y=n(80),z=function(e){var t=e.component,n=Object(q.a)(e,["component"]),a=N.getCurrentUser();return Object(k.jsx)(d.a,Object(_.a)(Object(_.a)({},n),{},{render:function(e){return a?Object(k.jsx)(t,Object(_.a)({},e)):Object(k.jsx)(Y.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},G=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(k.jsx)(u.a,{children:Object(k.jsxs)(j.a,{children:[Object(k.jsx)(d.a,{path:["/","/login"],exact:!0,component:M}),Object(k.jsx)(d.a,{path:"/register",exact:!0,component:H}),Object(k.jsx)(z,{path:"/home",exact:!0,component:U}),Object(k.jsx)(z,{path:"/topup",exact:!0,component:E}),Object(k.jsx)(z,{path:"/pay",exact:!0,component:J})]})})}}]),n}(a.Component),K=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,84)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),r(e),c(e)}))};n(76);c.a.render(Object(k.jsx)(s.a.StrictMode,{children:Object(k.jsx)(G,{})}),document.getElementById("root")),K()}},[[77,1,2]]]);
//# sourceMappingURL=main.0cadd9e2.chunk.js.map