(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{107:function(e,t,a){e.exports=a(143)},112:function(e,t,a){},113:function(e,t,a){},133:function(e,t,a){},142:function(e,t,a){},143:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),l=a.n(o),i=(a(112),a(113),a(49)),c=a(50),s=a(59),u=a(51),d=a(43),m=a(60),p=a(90),h=a(52),f=a.n(h),v=(a(133),a(14)),g=function(){return{type:"TOGGLE_MSG"}},E=function(e){return{type:"SET_THRESHOLD",payload:e}},b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleRejection=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e.type,a=e.size;"video/*".includes(t)?a>1e7&&alert("File size is too large. Maximum file size is 10mb"):alert("Please ensure that the file is a video")},a.handleOnDrop=function(e,t){if(t&&t.length>0)console.log(t),a.handleRejection(t[0]);else{var n=e[0].name;a.props.videoList.includes(n)||a.props.addVideo(n);var r=new FormData;r.append("file",e[0]),f.a.post("/upload",r).then(a.props.toggleMSG()).catch((function(e){return console.warn(e)}))}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,{onDrop:this.handleOnDrop,accept:"video/*",multiple:!1,maxSize:1e7},(function(e){var t=e.getRootProps,a=e.getInputProps;return r.a.createElement("section",{className:"DropZoneOuter"},r.a.createElement("div",Object.assign({className:"DropZoneInner"},t()),r.a.createElement("input",a()),r.a.createElement("p",null,"Drag 'n' drop some files here, or click to select files")))}))}}]),t}(r.a.Component);var O=Object(v.b)((function(e){return{videoList:e.videoList.videoList}}),{addVideo:function(e){return{type:"ADD_VIDEO",newItem:e}},toggleMSG:g})(b),y=a(88),S=a.n(y),j=(a(142),a(89)),I=a.n(j),T=function(e){var t=e.url;return t?r.a.createElement("div",{className:"VideoPlayerInner"},r.a.createElement(S.a,{className:"react-player",url:t,width:"100%",height:"100%",controls:"true"})):r.a.createElement("img",{src:I.a,style:{width:"500px",height:"280px"}})},L=a(190),R=a(198),C=a(179),N=a(182),D=a(186),w=Object(C.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}}));var M=function(){var e=Object(v.d)((function(e){return e.videoList})),t=Object(v.c)(),a=e.videoList,n=w();return r.a.createElement("div",null,r.a.createElement(N.a,{className:n.formControl},r.a.createElement(L.a,{displayEmpty:!0,onChange:function(e){var a="/get_video/"+e.target.value;t(function(e){return{type:"SET_URL",payload:e}}(a)),t({type:"SET_FILENAME",payload:e.target.value})},className:n.selectEmpty,value:e.fileName},r.a.createElement(R.a,{value:"",disabled:!0},"Select Video"),a.map((function(e){return r.a.createElement(R.a,{value:e},e)}))),r.a.createElement(D.a,null,"Select Video")))},_=a(25),G=Object(C.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}}));var k=function(){var e=G(),t=Object(v.c)();return r.a.createElement("div",null,r.a.createElement(N.a,{className:e.formControl},r.a.createElement(L.a,{displayEmpty:!0,onChange:function(e){var a=e.target.value;t(function(e){return{type:"SET_STI",payload:e}}(a))},className:e.selectEmpty},r.a.createElement(R.a,{value:"",disabled:!0},"Select STI"),Object.entries({copyPixel:"Copy Pixels",histDiff:"Histogram Difference",IBMdiff:"IBM Difference"}).map((function(e){var t=Object(_.a)(e,2),a=t[0],n=t[1];return r.a.createElement(R.a,{value:a},n)}))),r.a.createElement(D.a,null,"Select STI")))},B=a(56),x=a(17),V=a(187),z=a(197),H=a(184),U=a(194),A=Object(C.a)({root:{width:250,margin:8,fontSize:12},input:{width:42}});function P(){var e=A(),t=Object(v.c)(),a=Object(v.d)((function(e){return e.radio})).threshold,n=r.a.useState(255),o=Object(_.a)(n,2),l=o[0],i=o[1],c=r.a.useState({checkedB:!0}),s=Object(_.a)(c,2),u=s[0],d=s[1];return r.a.createElement("div",{className:e.root},"Threshold Level",r.a.createElement(U.a,{checked:a,onChange:function(e){d(Object(x.a)({},u,Object(B.a)({},e.target.name,e.target.checked))),t({type:"TOGGLE_THRESHOLD"})},name:"checkedB",color:"primary"}),a&&r.a.createElement(V.a,{container:!0,spacing:1,alignItems:"center"},r.a.createElement(V.a,{item:!0,xs:!0},r.a.createElement("div",{className:e.level},r.a.createElement(z.a,{value:"number"===typeof l?l:0,onChange:function(e,a){i(a),t(E(a))},"aria-labelledby":"input-slider",step:1,min:0,max:255}))),r.a.createElement(V.a,{item:!0},r.a.createElement(H.a,{className:e.input,value:l,margin:"dense",onChange:function(e){i(""===e.target.value?"":Number(e.target.value)),e.target.value<0?t(E(0)):e.target.value>255?t(E(255)):t(E(e.target.value))},onBlur:function(){l<0?i(0):l>255&&i(255)},inputProps:{step:1,min:0,max:255,type:"number","aria-labelledby":"input-slider"}}))))}var F=a(192),W=a(199),J=a(196),Z=Object(C.a)((function(e){return{radio:{fontSize:13}}}));var $=function(){var e=Z(),t=Object(v.c)();return r.a.createElement(N.a,{component:"fieldset"},r.a.createElement(W.a,{onChange:function(e){var a=e.target.value;t({type:"SET_STI_RADIO",payload:a})},row:!0,"aria-label":"position",name:"position",defaultValue:"col"},Object.entries({col:"Column",row:"Row"}).map((function(t){var a=Object(_.a)(t,2),n=a[0],o=a[1];return r.a.createElement(J.a,{value:n,control:r.a.createElement(F.a,{color:"primary"}),label:o,labelPlacement:"end",classes:{label:e.radio}})}))))},q=Object(C.a)((function(e){return{radio:{fontSize:13}}}));var K=function(){var e=q(),t=Object(v.c)();return r.a.createElement(N.a,{component:"fieldset1"},r.a.createElement(W.a,{onChange:function(e){var a=e.target.value;t({type:"SET_IBM_RADIO",payload:a})},row:!0,"aria-label":"position",name:"s",defaultValue:"rbg"},Object.entries({rbg:"RGB",chr:"Chromaticity"}).map((function(t){var a=Object(_.a)(t,2),n=a[0],o=a[1];return r.a.createElement(J.a,{value:n,control:r.a.createElement(F.a,{color:"primary"}),label:o,labelPlacement:"end",classes:{label:e.radio}})}))))},Q=a(188),X=a(189),Y=a(185),ee=a(195),te=a(191),ae=a(5),ne=["histDiff","IBMdiff"],re=["IBMdiff"],oe=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleClick=function(e){if(e.preventDefault(),void 0==a.props.fileName||void 0==a.props.typeSTI)alert("Select Video and STI First");else{var t="/sti_feed/"+e.currentTarget.value+"/"+a.props.typeSTI+"/"+a.props.STIRadio+"/"+ +a.props.thresholdToggle+"/"+a.props.thresholdLevel+"/"+a.props.IBMRadio;f.a.get(t).then((function(e){return console.log(e)})),a.setState({sti:t})}},a.handleClose=function(e,t){"clickaway"!==t&&a.props.toggleMSG()},a.state={sti:void 0,vertical:"top",horizontal:"left"},a.handleClick.bind(Object(d.a)(a)),a.handleClose.bind(Object(d.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.vertical,n=t.horizontal;return r.a.createElement(Q.a,{className:e.root},r.a.createElement(V.a,{container:!0,spacing:2,alignItems:"flex-start",justify:"center"},r.a.createElement(V.a,{item:!0},r.a.createElement(Y.a,{className:e.paper},r.a.createElement(T,{url:this.props.URL}),r.a.createElement("img",{className:e.img,src:this.state.sti}))),r.a.createElement(V.a,{item:!0},r.a.createElement(Y.a,{className:e.paper},r.a.createElement(M,null),r.a.createElement(k,null),ne.includes(this.props.typeSTI)&&r.a.createElement(P,null),re.includes(this.props.typeSTI)&&r.a.createElement(K,null),r.a.createElement($,null),r.a.createElement(O,{URLCallback:this.updateURLCallback}),r.a.createElement(ee.a,{open:this.props.open,autoHideDuration:2e3,anchorOrigin:{vertical:a,horizontal:n},onClose:this.handleClose},r.a.createElement(te.a,{onClose:this.handleClose,severity:"success"},"Successfully Uploaded Video"))),r.a.createElement(X.a,{className:e.button,variant:"contained",color:"primary",onClick:this.handleClick,value:this.props.fileName},"GENERATE STI"))))}}]),t}(r.a.Component);var le={toggleMSG:g},ie=Object(ae.a)((function(e){return{root:{margin:25},paper:{padding:e.spacing(2),margin:"auto",maxWidth:500},img:{margin:"auto"},button:{margin:10}}}))(Object(v.b)((function(e){return{URL:e.videoList.URL,fileName:e.videoList.fileName,open:e.videoList.toggleMSG,typeSTI:e.selection.typeSTI,STIRadio:e.radio.STIRadio,thresholdLevel:e.selection.threshold,IBMRadio:e.radio.IBMRadio,thresholdToggle:e.radio.threshold}}),le)(oe));var ce=function(){return r.a.createElement("div",{style:{backgroundColor:"#f5f5f5",width:"100%",height:"100%",position:"fixed"}},r.a.createElement(ie,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var se=a(37),ue=a(91),de={videoList:[],URL:void 0,fileName:void 0,toggleMSG:!1},me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_VIDEO":return Object(x.a)({},e,{videoList:[].concat(Object(ue.a)(e.videoList),[t.newItem])});case"SET_URL":return Object(x.a)({},e,{URL:t.payload});case"SET_FILENAME":return Object(x.a)({},e,{fileName:t.payload});case"TOGGLE_MSG":return Object(x.a)({},e,{toggleMSG:!e.toggleMSG});default:return e}},pe={typeSTI:void 0,threshold:255},he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_STI":return Object(x.a)({},e,{typeSTI:t.payload});case"SET_THRESHOLD":return Object(x.a)({},e,{threshold:t.payload});default:return e}},fe={STIRadio:"col",IBMRadio:"rbg",threshold:!0},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_STI_RADIO":return Object(x.a)({},e,{STIRadio:t.payload});case"SET_IBM_RADIO":return Object(x.a)({},e,{IBMRadio:t.payload});case"TOGGLE_THRESHOLD":return Object(x.a)({},e,{threshold:!e.threshold});default:return e}},ge=Object(se.b)({videoList:me,selection:he,radio:ve}),Ee=Object(se.c)(ge);l.a.render(r.a.createElement(v.a,{store:Ee},r.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},89:function(e,t,a){e.exports=a.p+"static/media/NoSignal.9aa58b1d.gif"}},[[107,1,2]]]);
//# sourceMappingURL=main.362b1b40.chunk.js.map