(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-453fc98c"],{"18d3":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-dialog",{attrs:{"max-width":"900px"},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[o("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:t.addItem}},i),[t._v("Agregar "+t._s(t.singular))])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("v-card",[o("v-card-title",{staticClass:"pa-4 orange"}),o("v-card-title",[o("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),o("v-card-text",[o("v-container",[o("v-row",[o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-select",{attrs:{outlined:"",items:t.op_tipo,"item-text":function(t){return t},"item-value":"item",label:"Tipo","persistent-hint":"","no-data-text":"No se tiene registros",rules:t.selectRules},model:{value:t.producto.tags_tipo,callback:function(e){t.$set(t.producto,"tags_tipo",e)},expression:"producto.tags_tipo"}})],1),o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-text-field",{attrs:{outlined:"",type:"text",label:"Variedad"},model:{value:t.producto.tags_var,callback:function(e){t.$set(t.producto,"tags_var",e)},expression:"producto.tags_var"}})],1)],1),o("v-row",[o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-text-field",{ref:"nom_",attrs:{outlined:"",rules:t.textoRules,label:"Nombre",counter:120},on:{keypress:function(e){return t.isText(e,120,"des_")}},model:{value:t.producto.nombre,callback:function(e){t.$set(t.producto,"nombre",e)},expression:"producto.nombre"}})],1),o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-text-field",{ref:"des_",attrs:{outlined:"",rules:t.textoRules,label:"Descripción",counter:120},on:{keypress:function(e){return t.isText(e,120,"des_")}},model:{value:t.producto.descripcion,callback:function(e){t.$set(t.producto,"descripcion",e)},expression:"producto.descripcion"}})],1)],1),o("v-row",[o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-select",{attrs:{outlined:"",items:t.op_calidad,"item-text":function(t){return t},"item-value":"item",label:"Calidad","persistent-hint":"","no-data-text":"No se tiene registros",rules:t.selectRules},model:{value:t.producto.calidad,callback:function(e){t.$set(t.producto,"calidad",e)},expression:"producto.calidad"}})],1),o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-text-field",{attrs:{outlined:"",type:"text",label:"Unidad de medida"},model:{value:t.producto.unidad,callback:function(e){t.$set(t.producto,"unidad",e)},expression:"producto.unidad"}})],1)],1),o("v-row",[o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-text-field",{attrs:{outlined:"","prepend-inner-icon":"mdi-cash-multiple",type:"text",label:"Precio (S/)"},model:{value:t.producto.precio,callback:function(e){t.$set(t.producto,"precio",e)},expression:"producto.precio"}}),o("v-text-field",{attrs:{outlined:"",label:"Descuento (%)"},model:{value:t.producto.descuento,callback:function(e){t.$set(t.producto,"descuento",e)},expression:"producto.descuento"}})],1),o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-checkbox",{attrs:{label:"Temporada: "+t.producto.temporada.toString()},model:{value:t.producto.temporada,callback:function(e){t.$set(t.producto,"temporada",e)},expression:"producto.temporada"}}),o("v-radio-group",{attrs:{row:""},model:{value:t.producto.tags_cs,callback:function(e){t.$set(t.producto,"tags_cs",e)},expression:"producto.tags_cs"}},[o("v-radio",{attrs:{label:"Sin pepa",value:"Sin pepa"}}),o("v-radio",{attrs:{label:"Con pepa",value:"Con pepa"}})],1)],1)],1),o("v-row",[o("v-col",{attrs:{cols:"6",sm:"6",md:"6"}},[o("v-text-field",{attrs:{outlined:"",label:"Link Foto"},model:{value:t.producto.foto,callback:function(e){t.$set(t.producto,"foto",e)},expression:"producto.foto"}})],1)],1),o("v-row",[o("v-col",{attrs:{cols:"12",sm:"12",md:"12"}})],1)],1)],1),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancelar")]),o("v-btn",{attrs:{disabled:!t.valid,color:"blue darken-1",text:""},on:{click:t.save}},[t._v(t._s(t.action_form))])],1)],1)],1)],1)},a=[],n=o("5530"),s=o("bc3a"),r=o.n(s),c=o("2f62"),l={name:"addProducto",data:function(){return{singular:"producto",action:"nothing",campoEstado:!1,op_tipo:["Frutas","Vegetales","Quesos","Tuberculos","Artesanias"],op_cs:["Sin Pepa","Con pepa"],op_calidad:["1ra","2da","3ra","4ta","5ta","6ta"],op_temporada:["No es temporada","Temporada"],dialog:!1,POST_anticipo:"cli/anticipo/",producto:{nombre:"calabaza",precio:"s/. 10 ",descripcion:"Calabaza fresca",tags_tipo:"Verdura",tags_var:"amarilla",tags_cs:"",calidad:"2da",temporada:"Si",fecha:"12-15-2021",foto:"https://www.comercializadoradelcampo.com/tiendaonline/imagenes/producto_7.png",descuento:"s/. 0",calificacion:4.5,npersonas:5,usuario_id:2,unidad:"caja"},EST_FECHA:new Date,editedIndex:-1,valid:!0,error:!1,msg_error:"",errores:[],selectRules:[function(t){return!!t||"Este dato es requerido"}],textoRules:[function(t){return!!t||"Este dato es requerido"}],cantidadRules:[function(t){return!t||/^[+]?\d+([,.]\d+)?$/.test(t)||/^([0-9])*$/.test(t)||"Ingrese una cantidad válida"}]}},computed:{formTitle:function(){return"Agregar"===this.action?"Agregar "+this.singular:"Editar "+this.singular},action_form:function(){return"Agregar"===this.action?"Agregar":"Editar"}},watch:{dialog:function(t){t||this.close()}},created:function(){},methods:Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(c["d"])("auth",["current_id"])),Object(c["c"])("auth",["listarProductos"])),Object(c["b"])(["refrescarEstadoCuentaxCliente"])),{},{isText:function(t,e,o){if(null!=this.$refs[o].value){var i=this.$refs[o].value.length,a=this.$refs[o].value,n=String.fromCharCode(t.keyCode);i>=e&&t.preventDefault(),/^[\s]+$/.test(n)&&(0==i||/^[\s]+$/.test(a[i-1]))&&t.preventDefault()}},isPositive:function(t){var e=String.fromCharCode(t.keyCode);/^[-]+$/.test(e)&&t.preventDefault()},from_indicadores:function(){"ad"===this.$route.params.ad&&this.addItem()},addItem:function(){var t=this;t.action="Agregar",t.campoEstado=!1,t.limpiar(),t.dialog=!0},editItem:function(t){var e=this;e.action="Editar",e.campoEstado=!0,e.editedIndex=e.lista.indexOf(t),e.producto=Object.assign({},t),e.dialog=!0},close:function(){this.dialog=!1},limpiar:function(){var t=this;t.EST_FECHA=new Date},listar:function(){var t=this;r.a.get("https://capacitacion-docente.herokuapp.com/products/").then((function(e){console.log("datadata "+e.data.data),t.productfilter=e.data.data,console.log("entro okii")})).catch((function(t){console.log(t.response.data)}))},save:function(){if(this.$refs.form.validate(),this.$refs.form.validate(!0)){this.errores=[];var t=this;"Editar"===t.action?r.a.put("PARA - EDITAR"+t.producto.EST_COD+"/",this.producto).then((function(e){console.log(e),t.close(),t.listarProductos(),t.limpiar()})).catch((function(t){console.log(t.response.data)})):r.a.post("https://capacitacion-docente.herokuapp.com/products/add/",this.producto).then((function(e){console.log(e),t.close(),t.listar(),t.limpiar()})).catch((function(t){console.log(t)}))}}})},u=l,d=o("2877"),p=o("6544"),h=o.n(p),f=o("8336"),m=o("b0af"),v=o("99d9"),g=o("ac7c"),b=o("62ad"),x=o("a523"),C=o("169a"),k=o("4bd4"),S=(o("b0c0"),o("2c64"),o("ba87")),_=o("9d26"),I=o("c37a"),$=o("7e2b"),V=o("a9ad"),y=o("4e82"),w=o("5311"),O=o("7560"),A=o("fe09"),j=o("80d2"),E=o("58df"),D=o("d9f7"),T=Object(E["a"])($["a"],V["a"],w["a"],Object(y["a"])("radioGroup"),O["a"]),R=T.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses),this.groupClasses)},computedColor:function(){return A["a"].options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return I["a"].options.computed.computedId.call(this)},hasLabel:I["a"].options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly:function(){return this.readonly||!!this.radioGroup&&this.radioGroup.isReadonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return A["a"].options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(t){return A["a"].options.methods.genInput.call(this,"radio",t)},genLabel:function(){return this.hasLabel?this.$createElement(S["a"],{on:{click:A["b"]},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(j["s"])(this,"label")||this.label):null},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(_["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Object(n["a"])({name:this.computedName,value:this.value},this.attrs$)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(t){var e={staticClass:"v-radio",class:this.classes,on:Object(D["c"])({click:this.onChange},this.listeners$)};return t("div",e,[this.genRadio(),this.genLabel()])}}),F=(o("a9e3"),o("ec29"),o("3d86"),o("604c")),G=o("8547"),B=Object(E["a"])(G["a"],F["a"],I["a"]),L=B.extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},I["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},I["a"].options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var t=I["a"].options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel:function(){var t=I["a"].options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:F["a"].options.methods.onClick}}),P=o("0fd9"),N=o("b974"),z=o("2fa4"),K=o("8654"),M=Object(d["a"])(u,i,a,!1,null,null,null);e["default"]=M.exports;h()(M,{VBtn:f["a"],VCard:m["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VCheckbox:g["a"],VCol:b["a"],VContainer:x["a"],VDialog:C["a"],VForm:k["a"],VRadio:R,VRadioGroup:L,VRow:P["a"],VSelect:N["a"],VSpacer:z["a"],VTextField:K["a"]})},"2c64":function(t,e,o){},"3d86":function(t,e,o){},"6ca7":function(t,e,o){},ac7c:function(t,e,o){"use strict";var i=o("5530"),a=(o("d3b7"),o("25f0"),o("6ca7"),o("ec29"),o("9d26")),n=o("c37a"),s=o("fe09");e["a"]=s["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(i["a"])(Object(i["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},ec29:function(t,e,o){},fe09:function(t,e,o){"use strict";o.d(e,"b",(function(){return r}));o("d3b7"),o("25f0"),o("4de4");var i=o("c37a"),a=o("5311"),n=o("8547"),s=o("58df");function r(t){t.preventDefault()}e["a"]=Object(s["a"])(i["a"],a["a"],n["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,o=this.internalValue;return this.isMultiple?!!Array.isArray(o)&&o.some((function(o){return t.valueComparator(o,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,o):Boolean(o):this.valueComparator(o,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=i["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:r},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,o=this.internalValue;if(this.isMultiple){Array.isArray(o)||(o=[]);var i=o.length;o=o.filter((function(o){return!t.valueComparator(o,e)})),o.length===i&&o.push(e)}else o=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(o,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(o,e)?null:e:!o;this.validate(!0,o),this.internalValue=o,this.hasColor=o}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-453fc98c.74fcff9d.js.map