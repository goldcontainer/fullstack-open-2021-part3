(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),r=n(15),a=n.n(r),i=n(6),u=n(3),s=n(0),l=function(e){var t=e.key,n=e.person,c=e.toggleDelete;return Object(s.jsxs)("li",{children:[n.name," ",n.number," ",Object(s.jsx)("button",{onClick:function(){return c(n)},children:"delete"})]},t)},d=function(e){var t=e.filter,n=e.persons,c=e.filteredPersons,o=e.toggleDelete;return Object(s.jsx)("div",{className:"persons",children:""===t?null===n||void 0===n?void 0:n.map((function(e){return Object(s.jsx)(l,{person:e,toggleDelete:o},e.name)})):null===c||void 0===c?void 0:c.map((function(e){return Object(s.jsx)(l,{person:e,toggleDelete:o},e.name)}))})},b=function(e){var t=e.message,n=e.messageType;return null===t?null:Object(s.jsx)("div",{className:n,children:t})},j=function(e){var t=e.onSubmit,n=e.newName,c=e.handleNameChange,o=e.newNumber,r=e.handleNumberChange;return Object(s.jsxs)("form",{onSubmit:t,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:n,onChange:c})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:o,onChange:r})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},f=n(4),m=n.n(f),h="http://localhost:3001/api/persons",O={getAll:function(){return m.a.get(h).then((function(e){return e.data}))},create:function(e){return m.a.post(h,e)},update:function(e,t){return m.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},deletePerson:function(e){return m.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))}},p=function(e){return Object(s.jsx)("h2",{children:e.text})},g=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],r=Object(c.useState)(""),a=Object(u.a)(r,2),l=a[0],f=a[1],m=Object(c.useState)(""),h=Object(u.a)(m,2),g=h[0],v=h[1],x=Object(c.useState)(""),w=Object(u.a)(x,2),N=w[0],C=w[1],S=Object(c.useState)(null),k=Object(u.a)(S,2),D=k[0],y=k[1],T=Object(c.useState)(null),E=Object(u.a)(T,2),P=E[0],A=E[1],I=Object(c.useState)(""),J=Object(u.a)(I,2),L=J[0],B=J[1];Object(c.useEffect)((function(){O.getAll().then((function(e){o(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)(p,{text:"Phonebook"}),Object(s.jsx)(b,{message:P,messageType:L}),Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:N,onChange:function(e){C(e.target.value);var t=n.filter((function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase())}));y(t)}})]}),Object(s.jsx)(p,{text:"Add a New Contact"}),Object(s.jsx)(j,{onSubmit:function(e){e.preventDefault();var t={name:l,number:g},c=n.find((function(e){return e.name===l}));if(void 0!==c){if(window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"))){var r=Object(i.a)(Object(i.a)({},c),{},{number:t.number});O.update(c.id,r).then((function(e){o(n.map((function(e){return e.id!==c.id?e:r})))})).catch((function(e){A("".concat(t.name," does not exist in phonebook")),B("error"),setTimeout((function(){A(null),B("")}),5e3)})),A("Changed ".concat(t.name,"'s number")),B("notification"),setTimeout((function(){A(null),B("")}),5e3)}}else O.create(t).then((function(e){o(n.concat(e.data)),A("Added ".concat(t.name)),B("notification"),f(""),v(""),setTimeout((function(){A(null),B("")}),5e3)})).catch((function(e){console.log("WE IN HERE!"),console.log(e.response.data.toString()),A(e.response.error),B("error"),f(""),v(""),setTimeout((function(){A(null)}),5e3)}))},newName:l,handleNameChange:function(e){f(e.target.value)},newNumber:g,handleNumberChange:function(e){v(e.target.value)}}),Object(s.jsx)(p,{text:"Numbers"}),Object(s.jsx)(d,{persons:n,filter:N,filteredPersons:D,toggleDelete:function(e){if(window.confirm("Delete ".concat(e.name,"?"))){var t=n.find((function(t){return t.id===e.id}));O.deletePerson(t.id),o(n.filter((function(t){return t.id!==e.id})))}}})]})};n(39);a.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(g,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.fc95fe9d.chunk.js.map