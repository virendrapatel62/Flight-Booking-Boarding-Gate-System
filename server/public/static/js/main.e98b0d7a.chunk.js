(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{116:function(e,t,c){e.exports={SheetImageHintLabel:"SheetSelector_SheetImageHintLabel__39YhQ"}},172:function(e,t,c){},197:function(e,t,c){},236:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),s=c(21),r=c.n(s),o=(c(172),c(173),c(174),c(175),c(43)),i=c(12),l=(c(197),c(1)),j=function(e){var t=e.children;return Object(l.jsxs)("div",{children:[Object(l.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsx)(o.b,{className:"navbar-brand",to:"/",children:"Home"}),Object(l.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(l.jsx)("span",{className:"navbar-toggler-icon"})}),Object(l.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNavDropdown",children:Object(l.jsxs)("ul",{className:"navbar-nav",children:[Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(o.b,{className:"nav-link active","aria-current":"page",to:"/tickets/book",children:"Book Ticket"})}),Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(o.b,{className:"nav-link active","aria-current":"page",to:"/tickets/list",children:"List Tickets"})})]})})]})}),Object(l.jsx)("div",{className:"container-fluid mt-3",children:t})]})},b=c(11),d=c(83),u=c.n(d);u.a.defaults.baseURL="",u.a.interceptors.request.use((function(e){return console.log("Request Interceptor: ".concat(e.method,": ").concat(e.url)),e})),u.a.interceptors.response.use((function(e){return console.log("Response Interceptor:",e&&e.data),e}));var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",c=new Date(e),n=c.toLocaleDateString("US-en",{month:"2-digit",year:"numeric",day:"2-digit"}).split("/"),a=Object(b.a)(n,3),s=a[0],r=a[1],o=a[2];return"".concat(o).concat(t).concat(r).concat(t).concat(s)},O=c(252),m=c(257);var x=function(e){var t=e.open,c=e.title,a=e.onClose,s=e.children,r=function(){return a&&a()};return Object(l.jsx)(n.Fragment,{children:Object(l.jsxs)(O.a,{show:t,onHide:r,children:[Object(l.jsx)(O.a.Header,{closeButton:!0,children:Object(l.jsx)(O.a.Title,{children:c||"Message"})}),Object(l.jsx)(O.a.Body,{children:s}),Object(l.jsx)(O.a.Footer,{children:Object(l.jsx)(m.a,{variant:"dark",onClick:r,children:"Close"})})]})})},f=c(25),g=c(6),v=c(254),p=c(253),k=c(255),S=c(86),N=c(116),w=c(149);function D(e){return new Array(e).fill().map((function(e,t){return t}))}var y=function(e){var t=Object(n.useContext)(B).bookings,c=Object(n.useState)({}),a=Object(b.a)(c,2),s=a[0],r=a[1],o=e.selectedSheets,i=e.setSelectedSheets,j=e.bookedSheetByUser,d=e.showMessage,u=Object(n.useState)(D(30).map((function(e,t){return t>=26?String.fromCharCode(65)+String.fromCharCode(65+t-26):String.fromCharCode(65+t)}))),h=Object(b.a)(u,1)[0],O=Object(n.useState)({leftRow:[],rightRow:[]}),m=Object(b.a)(O,2),x=m[0],p=m[1],k="/sheet.png",y="/bookedsheet.png",C="/check.png";Object(n.useEffect)((function(){r({}),i({})}),[t]),Object(n.useEffect)((function(){if(t.length){console.log({bookings:t});var e=t.reduce((function(e,t){return[].concat(Object(S.a)(e),Object(S.a)(t.sheets))}),[]).map((function(e){return"".concat(e.series).concat(e.number)})).reduce((function(e,t){return e[t]=!0,e}),{});r(e)}}),[t]);var I=function(e){return s[e.name]},E=function(e){return o[e.name]};Object(n.useEffect)((function(){var e=[],t=[];h.forEach((function(c){var n=D(3).map((function(e,t){return{name:"".concat(c).concat(t+1),series:c,number:t+1}})),a=D(3).map((function(e,t){return{name:"".concat(c).concat(t+1+3),series:c,number:t+1+3}}));e.push(n),t.push(a)})),p({leftRow:e,rightRow:t})}),[h]);var L=function(e){if(console.log({sheet:e.name}),console.log(o),o[e.name]){var t=Object(g.a)({},o);return delete t[e.name],void i(t)}var c=Object.keys(o).length;return 6===c?alert("Cant select more then 6"):c+j>=6?d("Message","Already Booked ".concat(j," sheets, You can only select ").concat(6-j)):void i(Object(g.a)(Object(g.a)({},o),{},Object(f.a)({},e.name,e)))},T=function(e,t){return Object(l.jsx)("img",{className:"rounded mx-auto d-block ".concat(t),height:"30px",src:e})};return Object(l.jsxs)("div",{className:"",children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("hr",{}),Object(l.jsx)(R,{}),Object(l.jsx)("hr",{}),Object(l.jsx)("h4",{className:"",children:"Select Sheets"}),Object(l.jsx)("hr",{})]}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"col  rounded",children:x.leftRow.map((function(e,t){return Object(l.jsx)("div",{className:"row",children:e.map((function(e){return Object(l.jsx)(F,{sheet:e})}))},t)}))}),Object(l.jsx)("div",{className:"col-2",children:Object(l.jsx)("div",{className:"row",children:h.map((function(e,t){return Object(l.jsx)("div",{className:"p-2 col-12 text-center",children:T("/down.png",t%3===0?"visible":"invisible")},t)}))})}),Object(l.jsx)("div",{className:"col rounded",children:x.rightRow.map((function(e,t){return Object(l.jsx)("div",{className:"row",children:e.map((function(e){return Object(l.jsx)(F,{sheet:e})}))},t)}))})]})]});function F(e){var t=e.sheet;return Object(l.jsx)(n.Fragment,{children:E(t)?Object(l.jsx)("div",{className:"col p-2 hand",onClick:function(){return L(t)},children:T(C)}):I(t)?Object(l.jsx)("div",{className:"col p-2 blocked",title:"Booked!",children:T(y)}):Object(l.jsx)("div",{className:"col p-2 hand",onClick:function(){return L(t)},children:T(k)})},Object(w.generate)())}function R(){return Object(l.jsxs)(v.a,{className:"row",children:[Object(l.jsx)("div",{className:"col mt-2",children:Object(l.jsx)("p",{style:{verticalAlign:"center"},children:Object(l.jsxs)("span",{className:"".concat(N.SheetImageHintLabel),children:["Selected ",Object(l.jsx)("img",{src:C,alt:"",srcset:""})]})})}),Object(l.jsx)("div",{className:"col mt-2",children:Object(l.jsx)("p",{style:{verticalAlign:"center"},children:Object(l.jsxs)("span",{className:"".concat(N.SheetImageHintLabel),children:["Available ",Object(l.jsx)("img",{src:k,alt:"",srcset:""})]})})}),Object(l.jsx)("div",{className:"col mt-2",children:Object(l.jsx)("p",{style:{verticalAlign:"center"},children:Object(l.jsxs)("span",{className:"".concat(N.SheetImageHintLabel),children:["Booked",Object(l.jsx)("img",{src:y,alt:"",srcset:""})]})})})]})}},C=function(e){var t=Object(n.useContext)(B),c=t.selectedDate,a=t.setSelectedDate,s=t.resetBookings,r=Object(n.useState)({}),o=Object(b.a)(r,2),j=o[0],d=o[1],h=Object(n.useState)(0),O=Object(b.a)(h,2),m=O[0],S=O[1],N=Object(n.useState)({open:!1}),w=Object(b.a)(N,2),D=w[0],C=w[1],I=Object(n.useState)(null),E=Object(b.a)(I,2),L=E[0],T=E[1],F=Object(i.f)(),R=Object(n.useState)({date:c,mobile:""}),A=Object(b.a)(R,2),H=A[0],M=A[1];Object(n.useEffect)((function(){var e=H.mobile,t=H.date;S(0),T(null),t&&e&&e.trim().length>9&&function(e,t){return u.a.get("/api/bookings/".concat(e,"/").concat(new Date(t).toISOString(),"/count")).then((function(e){return e&&e.data}))}(e,t).then((function(e){var t=e.sheetBooked;if(console.log({sheetBooked:t}),S(t),t>=6)return T("Already Booked ".concat(t," Sheets On Selected Date."));T(null)}))}),[H]),Object(n.useEffect)((function(){M(Object(g.a)(Object(g.a)({},H),{},{date:c}))}),[c]);var P=function(e){var t=e.target,c=t.name,n=t.value;if("date"===c)return a(n);M(Object(g.a)(Object(g.a)({},H),{},Object(f.a)({},c,n)))};return Object(l.jsxs)("div",{className:"m-4",id:"form",children:[L&&Object(l.jsx)(v.a,{color:"yellow",children:L}),Object(l.jsx)(x,{open:D.open,title:D.title,onClose:function(){return C({open:!1})},children:D.content}),Object(l.jsxs)(p.a,{onSubmit:function(){F.location.pathname;if(!Object.values(j).length)return window.scrollTo({top:0}),T("Select Sheets");if(!H.mobile.trim())return window.scrollTo({top:0}),T("Enter Phone");var e,t={mobile:H.mobile,date:H.date,sheets:Object.values(j).map((function(e){return{series:e.series,number:e.number}}))};(e=t,u.a.post("/api/bookings",e).then((function(e){return e&&e.data}))).then((function(e){var t=e.booking;d({}),s(),C({open:!0,title:"Ticket Booked",content:Object(l.jsxs)("div",{children:[Object(l.jsxs)("p",{children:["Booking Id: ",t.bookingId]}),Object(l.jsxs)("p",{children:["Mobile Number: ",t.mobile]}),Object(l.jsxs)("p",{children:["Sheets:"," ",t.sheets.map((function(e){return"".concat(e.series).concat(e.number)})).join(", ")]})]})})})).catch((function(e){var t=e.response.data;T(t.error)}))},children:[Object(l.jsxs)(p.a.Field,{children:[Object(l.jsx)("label",{children:"Mobile Number"}),Object(l.jsx)("input",{value:H.mobile,onChange:P,placeholder:"Mobile",type:"number",name:"mobile"})]}),Object(l.jsxs)(p.a.Field,{children:[Object(l.jsx)("label",{children:"Date"}),Object(l.jsx)("input",{placeholder:"Date",type:"date",name:"date",value:H.date,onChange:P})]}),Object(l.jsx)(y,{selectedSheets:j,setSelectedSheets:d,bookedSheetByUser:m,showMessage:function(e,t){C({open:!0,title:e,content:t})}}),Object(l.jsx)("hr",{}),Object(l.jsx)(k.a,{color:"black",type:"submit",children:"Submit"})]})]})},B=a.a.createContext(),I=function(e){console.log(h(new Date));var t=Object(n.useState)(h(new Date)),c=Object(b.a)(t,2),a=c[0],s=c[1],r=Object(n.useState)([]),o=Object(b.a)(r,2),i=o[0],j=o[1],d=function(){(function(e){var t=new URLSearchParams({date:new Date(e).toISOString()}).toString();return u.a.get("/api/bookings?".concat(t)).then((function(e){return e&&e.data}))})(a).then((function(e){var t=e.bookings;j(t)}))},O={bookings:i,selectedDate:a,setSelectedDate:s,resetBookings:d};return Object(n.useEffect)((function(){j([]),console.log("DATE CHANGED>>."),d()}),[a]),Object(l.jsxs)(B.Provider,{value:O,children:[Object(l.jsx)("div",{className:"col-lg-6 col-md-8 mx-auto shadow rounded py-4",children:Object(l.jsx)(C,{})}),"Ticket Booking Page"]})},E=function(e){var t=Object(n.useState)([]),c=Object(b.a)(t,2),a=c[0],s=c[1];return Object(n.useEffect)((function(){u.a.get("/api/bookings/time-optimized-list").then((function(e){return e.data})).then((function(e){s(e)}))}),[]),Object(l.jsx)("div",{children:Object(l.jsxs)("div",{className:"col-lg-7 mx-auto",children:[Object(l.jsx)("h4",{className:"display-6",children:"Bookings "}),Object(l.jsx)("hr",{}),Object(l.jsxs)("table",{className:"table table-bordered table-hover table-striped",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"#"}),Object(l.jsx)("th",{children:"Booking Id"}),Object(l.jsx)("th",{children:"Date"}),Object(l.jsx)("th",{children:"Sheets"}),Object(l.jsx)("th",{children:"Phone"})]})}),Object(l.jsx)("tbody",{children:a.map((function(e,t){return Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:t+1}),Object(l.jsx)("td",{children:e.bookingId}),Object(l.jsx)("td",{children:new Date(e.date).toDateString()}),Object(l.jsx)("td",{children:e.sheets.map((function(e){return"".concat(e.series).concat(e.number)})).join(", ")}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{style:{textDecoration:"none"},href:"tel:".concat(e.mobile),target:"_blank",children:"\ud83d\udcde"})})]},t)}))})]})]})})};var L=function(){return Object(l.jsx)(o.a,{children:Object(l.jsx)(j,{children:Object(l.jsxs)(i.c,{children:[Object(l.jsx)(i.a,{path:["/","/tickets/book"],exact:!0,children:Object(l.jsx)(I,{})}),Object(l.jsx)(i.a,{path:"/tickets/list",exact:!0,children:Object(l.jsx)(E,{})})]})})})},T=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,258)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),s(e),r(e)}))};r.a.render(Object(l.jsx)(n.Fragment,{children:Object(l.jsx)(L,{})}),document.getElementById("root")),T()}},[[236,1,2]]]);
//# sourceMappingURL=main.e98b0d7a.chunk.js.map