(this["webpackJsonpradio-form-demo"]=this["webpackJsonpradio-form-demo"]||[]).push([[0],{176:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),l=a(9),i=a.n(l),o=(a(84),a(20)),r=a(21),c=a(26),h=a(25),u=(a(85),a(15)),m=a(33),p=(a(43),a(44),a(45)),d=!0,y=!0,f=function(t){Object(c.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(o.a)(this,a),(s=e.call(this,t)).state={selectedPlaylist:null,playlists:[],playlistIDs:[],playlistNames:[],playlistIndicators:[]},s.changePlaylist=s.changePlaylist.bind(Object(u.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(u.a)(s)),s}return Object(r.a)(a,[{key:"changePlaylist",value:function(t){this.setState({selectedPlaylist:t})}},{key:"handleSubmit",value:function(t){t.preventDefault();var e=this.state.selectedPlaylist,a=this.state.playlistNames.indexOf(e),s=this.state.playlistIDs[a];console.log("selected playlist ID",s);var n="https://music-in-context.herokuapp.com/ui?".concat("refresh_token=",this.props.refreshToken,"&form_data=",s,"&mode=",this.props.mode);window.location.href=n}},{key:"render",value:function(){var t=this;try{this.props.data.map((function(e){t.state[e.playlistname]=t.state[e.playlistname],d&&(t.state.playlists.push(e),t.state.playlistIDs.push(e.playlistID),t.state.playlistNames.push(e.playlistName),t.state.playlistIndicators.push(!1))})),d=!1,console.log("state after pushing data",this.state);var e=[];e.push(n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("input",{type:"submit",value:"Submit"})));for(var a=function(a){var s=t.state.playlistNames[a];e.push(n.a.createElement(m.b,{name:"playlist",checked:t.state.selectedPlaylist===s,onChange:function(){t.changePlaylist(s)}},s))},s=0;s<this.state.playlists.length;s++)a(s);return e.push(n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("input",{type:"submit",value:"Submit"}))),e}catch(l){console.log("still loading"),y=!0}if(y)return n.a.createElement("div",{className:"chart"},n.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}},n.a.createElement(p,{name:"ball-triangle-path",fadeIn:"none"})),n.a.createElement("div",null,n.a.createElement("h1",null,"Loading user playlists...")))}}]),a}(n.a.Component),v=a(60),b=a(45),g=!0,k=!0,E=function(t){Object(c.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(o.a)(this,a),(s=e.call(this,t)).handleChange=s.handleChange.bind(Object(u.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(u.a)(s)),s.state={playlists:[],playlistIDs:[],playlistNames:[],playlistIndicators:[]},s}return Object(r.a)(a,[{key:"handleChange",value:function(t,e){var a=this.state.playlistNames.indexOf(e),s={};s[e]=!this.state[e],this.setState(Object(v.a)(Object(v.a)({},this.state),s)),this.state.playlistIndicators[a]=s[e]}},{key:"handleSubmit",value:function(t){t.preventDefault();for(var e=[],a=0;a<this.state.playlistIndicators.length;a++)this.state.playlistIndicators[a]&&e.push(this.state.playlistIDs[a]);var s=e.join(","),n="https://music-in-context.herokuapp.com/ui?".concat("refresh_token=",this.props.refreshToken,"&form_data=",s,"&mode=",this.props.mode);window.location.href=n}},{key:"render",value:function(){var t=this;try{this.props.data.map((function(e){t.state[e.playlistname]=t.state[e.playlistname],g&&(t.state.playlists.push(e),t.state.playlistIDs.push(e.playlistID),t.state.playlistNames.push(e.playlistName),t.state.playlistIndicators.push(!1))})),g=!1,console.log("state after pushing data",this.state);for(var e=[],a=function(a){var s=t.state.playlistNames[a];e.push(n.a.createElement(m.a,{toggle:!0,checked:t.state[s],onChange:function(e){return t.handleChange(e,s)}},s))},s=0;s<this.state.playlists.length;s++)a(s);return e.push(n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("input",{type:"submit",value:"Submit"}))),e}catch(l){console.log("still loading"),k=!0}if(k)return n.a.createElement("div",{className:"chart"},n.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}},n.a.createElement(b,{name:"ball-triangle-path",fadeIn:"none"})),n.a.createElement("div",null,n.a.createElement("h1",null,"Loading user playlists...")))}}]),a}(n.a.Component),j=a(45),I=function(t){Object(c.a)(a,t);var e=Object(h.a)(a);function a(){var t;return Object(o.a)(this,a),(t=e.call(this)).state={},t}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var t=this,e=window.location.search,a=new URLSearchParams(e),s={refresh_token:a.get("refresh_token"),mode:a.get("mode")};fetch("https://music-in-context-backend.herokuapp.com/getuserplaylists",{mode:"cors",method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}).then((function(t){return t.json()})).then((function(e){console.log("data from post",e),t.setState({apiData:e.userPlaylists,refreshToken:e.refreshToken,mode:e.mode})}))}},{key:"render",value:function(){return"playlist"===this.state.mode?n.a.createElement("div",{className:"App"},n.a.createElement(f,{mode:this.state.mode,refreshToken:this.state.refreshToken,data:this.state.apiData})):"cluster"===this.state.mode?n.a.createElement("div",{className:"App"},n.a.createElement(E,{mode:this.state.mode,refreshToken:this.state.refreshToken,data:this.state.apiData})):n.a.createElement("div",{className:"loading"},n.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}},n.a.createElement(j,{name:"ball-triangle-path",fadeIn:"none"})),n.a.createElement("div",null,n.a.createElement("h1",null,"Loading user playlists...")))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},79:function(t,e,a){t.exports=a(176)},84:function(t,e,a){},85:function(t,e,a){}},[[79,1,2]]]);
//# sourceMappingURL=main.a50a6dd9.chunk.js.map