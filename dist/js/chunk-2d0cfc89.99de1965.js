(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cfc89"],{"64d9":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"fill-height justify-center",attrs:{id:"login",tag:"section"}},[s("v-row",{attrs:{justify:"center"}},[s("v-col",{attrs:{lg:"11",sm:"8",xl:"7"}},[s("v-card",{staticClass:"elevation-4"},[s("v-row",[s("v-col",{staticClass:"pr-0",attrs:{lg:"5"}},[s("div",{staticClass:"pa-7 pa-sm-12"},[s("img",{attrs:{src:a("4c54")}}),s("h2",{staticClass:"font-weight-bold mt-4 blue-grey--text text--darken-2"},[t._v("Sign Up")]),s("h6",{staticClass:"subtitle-1"},[t._v(" Don't have an account? "),s("a",{attrs:{href:"#/pages/boxedlogin/"}},[t._v("Sign in")])]),s("v-form",{ref:"form",attrs:{"lazy-validation":"",action:"/pages/boxedlogin"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-text-field",{staticClass:"mt-4",attrs:{rules:t.fnameRules,label:"Full Name",required:"",outlined:""},model:{value:t.fname,callback:function(e){t.fname=e},expression:"fname"}}),s("v-text-field",{attrs:{rules:t.emailRules,label:"E-mail",required:"",outlined:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),s("v-text-field",{attrs:{counter:10,rules:t.passwordRules,label:"Password",required:"",outlined:"","append-icon":t.show1?"mdi-eye":"mdi-eye-off",type:t.show1?"text":"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),s("div",{staticClass:"d-block d-sm-flex align-center mb-4 mb-sm-0"},[s("v-checkbox",{attrs:{rules:[function(t){return!!t||"You must agree to continue!"}],label:"I agree to the terms and privacy",required:""},model:{value:t.checkbox,callback:function(e){t.checkbox=e},expression:"checkbox"}})],1),s("v-btn",{staticClass:"mr-4",attrs:{disabled:!t.valid,color:"info",block:"",submit:""},on:{click:t.submit}},[t._v("Sign In")])],1),s("div",{staticClass:"text-center mt-6"},[s("v-chip",{staticClass:"mr-2",attrs:{pill:""}},[s("v-avatar",{attrs:{left:""}},[s("v-btn",{staticClass:"white--text",attrs:{color:"blue lighten-1"}},[s("v-icon",[t._v("mdi-twitter")])],1)],1),t._v("Twitter ")],1),s("v-chip",{attrs:{pill:""}},[s("v-avatar",{attrs:{left:""}},[s("v-btn",{staticClass:"white--text",attrs:{color:"teal lighten-2"}},[s("v-icon",[t._v("mdi-github")])],1)],1),t._v("Github ")],1)],1)],1)]),s("v-col",{staticClass:"info d-none d-md-flex align-center justify-center",attrs:{lg:"7"}},[s("div",{staticClass:"d-none d-sm-block"},[s("div",{staticClass:"d-flex align-center pa-10"},[s("div",[s("h2",{staticClass:"display-1 white--text font-weight-medium"},[t._v("Elegant Design with unlimited features, built with love")]),s("h6",{staticClass:"subtitle-1 mt-4 white--text op-5 font-weight-regular"},[t._v("Wrappixel helps developers to build organized and well-coded admin dashboards full of beautiful and feature rich modules.")]),s("v-btn",{staticClass:"mt-4 text-capitalize",attrs:{"x-large":"",outlined:"",color:"white"}},[t._v("Learn More")])],1)])])])],1)],1)],1)],1)],1)},i=[],l={name:"BoxedLogin",data:function(){return{password:"",show1:!1,passwordRules:[function(t){return!!t||"Password is required"},function(t){return t&&t.length<=10||"Password must be less than 10 characters"}],email:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}],checkbox:!1,fname:"",fnameRules:[function(t){return!!t||"Name is required"},function(t){return t&&t.length<=10||"Name must be less than 10 characters"}]}},methods:{submit:function(){this.$refs.form.validate(),this.$refs.form.validate(!0)&&this.$router.push({path:"/pages/boxedlogin"})}}},n=l,r=a("2877"),o=a("6544"),c=a.n(o),d=a("8212"),u=a("8336"),m=a("b0af"),v=a("ac7c"),f=a("cc20"),h=a("62ad"),b=a("a523"),p=a("4bd4"),g=a("132d"),w=a("0fd9"),x=a("8654"),C=Object(r["a"])(n,s,i,!1,null,null,null);e["default"]=C.exports;c()(C,{VAvatar:d["a"],VBtn:u["a"],VCard:m["a"],VCheckbox:v["a"],VChip:f["a"],VCol:h["a"],VContainer:b["a"],VForm:p["a"],VIcon:g["a"],VRow:w["a"],VTextField:x["a"]})}}]);
//# sourceMappingURL=chunk-2d0cfc89.99de1965.js.map