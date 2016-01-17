define("Store",[],function(){var e=window.localStorage,t=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}},n=function(e){return e===void 0||typeof e=="function"?e+"":JSON.stringify(e)},r=function(e,t){return t===void 0?n({value:e}):n({value:e,expire:+(new Date)+t})},i={on:function(e){window.addEventListener("storage",function(t){e(t)})},each:function(t){var n=this;for(var r=0;r<e.length;r++)key=e.key[r],val=n.noexpire(key),val&&t(key,val)},noexpire:function(n){if(n===void 0)return null;var r=(new Date).getTime(),i=t(e.getItem(n));return i?i.expire!==void 0&&r>=i.expire?(this.del(n),null):i.value:null},get:function(e){if(e)return this.noexpire(e);var t={};return this.each(function(e,n){t[e]=n}),t},set:function(t,n,i){if(typeof t=="string")return e.setItem(t,r(n,i)),this;var s=t;for(var o in s)n=s[o],this.set(o,n,i)},del:function(t){return e.removeItem(t),this},cls:function(){return e.clear(),this},has:function(t){return e.hasOwnProperty(t)},size:function(e){var t=JSON.stringify(localStorage).length;return e?e==="KB"?t/1024:e==="MB"?t/1024/1024:t:t}};return i}),define("UITmpl",[],function(){return function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{})__p+='<script id="ui.button" type="text/template">\n<button class="btn btn-{{= data.type }} {{= data.outline ? \'btn-outlined\':\'\'}} {{= data.isblock ? \'btn-block\' : \'\'}}">\n    {{ if(data.icon){ }}<span class="icon {{= data.icon }}"></span>{{ } }}\n    {{= data.title }}\n    {{ if(data.badge!==void 0){ }}\n    <span class="badge badge-{{= data.type}}">{{=data.badge}}</span>\n    {{ } }}\n</button>\n</script>\n\n<script id="ui.header" type="text/template">\n{{ _.each([\'left\', \'right\'], function(posi){ }}\n{{ var type= data[posi].type, text = data[posi].text, icon=data[posi].icon || \'icon-\'+posi+\'-nav\'; }}\n{{ if(type === \'button\'){ }}<button class="btn pull-{{=posi}}">{{= text }}</button>{{ } }}\n{{ if(type === \'icon\'){  }}<a class="icon {{= icon }} pull-{{=posi}}">{{= text }}</a>{{ } }}\n{{ if(type === \'link\'){  }}<button class="btn btn-link btn-nav pull-{{=posi}}">{{= text }}</button>{{ } }}\n{{ }); }}\n\n<div class="title-wrapper {{=data.subtitle ? \'title-ms\' : \'\'}}">\n    <h1 class="title">{{=data.title}}</h1>\n    {{ if(data.subtitle){ }}<h2 class="subtitle">{{=data.subtitle}}</h2>{{ } }}\n</div>\n</script>\n\n<script id="ui.list" type="text/template">\n{{= data.card ? \'<div class="card">\' : \'\' }}\n<ul class="table-view">\n    {{ _.each(data.list, function(item){ }}\n\n    <li class="{{= item.isDivider?\'table-view-divider\':\'table-view-cell\' }}{{= item.collapse ? \' table-view-collapse\' : \'\' }}">\n        {{ if(item.isDivider){ }}{{=item.title}}{{ return; } }}\n        <a class="navigate-right" href="{{= item.hash ? item.hash : \'javascript:\' }}">\n            {{ if(item.badge !== void 0){ }}\n            <span class="badge">{{=item.badge}}</span>\n            {{ } }}\n            {{ if(data.media){ }}\n            {{ if(data.media === \'img\' && item.img){ }}\n            <img class="media-object pull-left" src="{{= item.img }}">\n            {{ }else{ }}\n            <span class="media-object pull-left icon {{= item.icon }}"></span>\n            {{ } }}\n            {{ } }}\n            <div class="media-body">\n                {{=item.title}}\n                <p>{{=item.content}}</p>\n            </div>\n        </a>\n    </li>\n    {{  }); }}\n</ul>\n{{= data.card ? \'</div>\' : \'\' }}\n</script>\n\n<script id="ui.modal" type="text/template">\n{{ if(data.type.indexOf(\'toast\') === -1 ){ }}\n<div class="modal-layout modal-{{=data.type}} {{=data.class}}">\n    {{ if(data.close===true){ }} <span class="icon icon-close"></span> {{ } }}\n    <div class="modal-inner">\n        {{ if(data.type === \'loading\'){ }}\n        <div class="spinner">\n            <div class="double-bounce1"></div>\n            <div class="double-bounce2"></div>\n        </div>\n        {{ }else{ }}\n        <div class="modal-title">\n            {{if(data.type===\'bottom\' && data.btns.yes && data.btns.no){ }}<span class=\'btn modal-btn btn-link modal-btn-no\'>{{=data.btns.no}}</span>{{=data.title}}<span class=\'btn modal-btn btn-link modal-btn-yes\'>{{=data.btns.yes}}</span>\n            {{ }else{ }}  {{=data.title}}  {{ } }}\n        </div>\n        <div class="modal-text">{{=data.content}}</div>\n        {{ } }}\n    </div>\n    {{ var btns = data.btns; if(btns && (data.type!==\'bottom\')){ }}\n    <div class="modal-buttons">\n        {{ if(btns.yes){ }}<span class="modal-button modal-btn modal-btn-yes modal-button-bold">{{= btns.yes}}</span> {{ } }}\n        {{ if(btns.no){ }}<span class="modal-button modal-btn modal-btn-no modal-button-bold">{{= btns.no}}</span> {{ } }}\n        {{ if(btns.cancel){ }}<span class="modal-button modal-btn modal-btn-def modal-button-bold">{{= btns.def}}</span> {{ } }}\n    </div>\n    {{ } }}\n</div>\n{{ }else{ }}\n<div class="modal-toast modal-{{=data.type}}" >\n    {{var type = data.type.match(/toast-(\\w+)/)[1] }}\n    <span class="icon icon-{{= type===\'info\' ? \'info\' : (type===\'error\'?\'close\': \'check\')  }}">{{=data.content}}</span>\n</div>\n{{ } }}\n</script>\n\n<script id="ui.sides" type="text/template">\n<div class="sides-overlay"></div>\n<div class="sides sides-{{= data.position }}"></div>\n</script>\n\n<script id="ui.switch" type="text/template">\n{{ var switchType = /(^\\w+)-?(\\w+)?/.exec(data.type), isSlide = switchType[1]===\'slide\', position = switchType[2];}}\n<div class="switch-container slide-container {{= isSlide ? \'slide-container-\'+position : \'tab-container slide-container-horizontal\'}}">\n    {{ if(isSlide || (!isSlide && position===\'top\')){ }}\n    <div class="switch-pagination {{= isSlide ? \'slide-pagination\' : \'segmented-control\'}}">\n        {{ _.each(data.list, function(item, i){ }}\n            <span  index="{{=i}}" class="switch-pagination-bullet {{= isSlide ? \'slide-pagination-bullet\' : \'control-item\'}} {{= i===0 ? \'active\' : \'\' }}">{{=item.title}}</span>\n        {{ }); }}\n    </div>\n    {{ } }}\n    <div class="switch-wrapper slide-wrapper" index="0">\n        <!--<div class="slide-slide slide-slide-active"></div>\n        <div class="slide-slide slide-slide-next"></div>-->\n        {{_.each(data.list, function(item, i){ }}\n            <div class="switch-item control-content">{{=item.content}}</div>\n        {{ }); }}\n    </div>\n    {{ if(!isSlide && position===\'bottom\'){ }}\n    <nav class="bar bar-tab switch-pagination">\n        {{ _.each(data.list, function(item, i){ }}\n        <a class="tab-item switch-pagination-bullet {{= i===0 ? \'active\' : \'\' }}" href="#" index="{{=i}}">\n            {{ if(item.icon){ }}<span class="icon {{=item.icon}}"></span> {{ } }}\n            <span class="tab-label">{{=item.title}}</span>\n        </a>\n        {{ }); }}\n    </nav>\n    {{ } }}\n</div>\n</script>\n';return __p}}),define("View",["Store","UITmpl"],function(e,t){_.templateSettings={evaluate:/\{\{(.+?)\}\}/g,interpolate:/\{\{=(.+?)\}\}/g,escape:/\{\{\-(.+?)\}\}/g};var n=function(e,t){return _.template(e.replace(/\{\{\s*include\s*(.*?)\s*\}\}/g,function(e,t){var n=document.getElementById(t);return n?n.innerHTML:""}),t)},r=function(e){var n=$(t()).find("script"),r,i,s;return n.prevObject.each(function(t,n){r=n.id,i=$(n).html(),!!r&&e===r&&(s=i)}),s},i=function(e,t){var n=e.prop("attributes"),r=$(t);return $.each(n,function(){this.name==="class"?r.attr(this.name,this.value+" "+r.attr("class")):this.name!=="data-opts"&&this.name!=="data-ui-widget"&&r.attr(this.name,this.value)}),r},s=Class.extend({init:function(e){this.wrapper=$(e.wrapper),this.tmplname=e.tmplname||"",this.tmpl=e.tmpl||"",this.data=e.data||{},this.replace=e.replace||!1,this.events=e.events||{},this.construct(e)},construct:function(e){this.events&&this._parseEvent(e.ctrl||this)},render:function(){var e=this.wrapper,t=this.getHTMLFragment(),n;return e&&(this.replace?(n=i(e,t),e.replaceWith(n),this.wrapper=n):t&&e.html(t)),this.show(),e.length?this:t},show:function(){},update:function(e){e&&(this.data=$.extend({},this.data,e)),this.render()},destory:function(){this.wrapper.empty()},getHTMLFragment:function(e){this.getHTMLTmpl(e);if(!this.tmpl)return;return this.data?n(this.tmpl)(this):n(this.tmpl)},getHTMLTmpl:function(e){if(this.tmpl)return this.tmpl;var t=e==="view"?this.tmpl:r(this.tmplname);return this.tmpl=t,t},onview:function(e,t,n){return this.wrapper.on(e,t,n),this},offview:function(e,t,n){return this.wrapper.off(e,t,n),this},refreshEvent:function(e,t){this._parseEvent(t,e)},_parseEvent:function(e,t){function o(e){var t=/(\w+)+\s+(.+)/.exec(e);return{event:t[1],selector:t[2]}}var n=this.events;if(!n)return;var r,i=$(t);i.length?(i.off(),r=_.bind(i.on,i)):(r=_.bind(this.onview,this),this.offview());for(var s in n)(function(t){var i=o(t),s=n[t];r(i.event,i.selector,function(t){return typeof s=="function"?(s(t,this,e),!1):(e[s](t,this),!1)})})(s)}});return s}),define("Fx",[],function(){var e={linear:[.25,.25,.75,.75],ease:[.25,.1,.25,1],easeIn:[.42,0,1,1],easeOut:[0,0,.58,1],easeInOut:[.42,0,.58,1],easeInQuad:[.55,.085,.68,.53],easeInCubic:[.55,.055,.675,.19],easeInQuart:[.895,.03,.685,.22],easeInQuint:[.755,.05,.855,.06],easeInSine:[.47,0,.745,.715],easeInExpo:[.95,.05,.795,.035],easeInCirc:[.6,.04,.98,.335],easeInBack:[.6,-0.28,.735,.045],easeOutQuad:[.25,.46,.45,.94],easeOutCubic:[.215,.61,.355,1],easeOutQuart:[.165,.84,.44,1],easeOutQuint:[.23,1,.32,1],easeOutSine:[.39,.575,.565,1],easeOutExpo:[.19,1,.22,1],easeOutCirc:[.075,.82,.165,1],easeOutBack:[.175,.885,.32,1.275],easeInOutQuad:[.455,.03,.515,.955],easeInOutCubic:[.645,.045,.355,1],easeInOutQuart:[.77,0,.175,1],easeInOutQuint:[.86,0,.07,1],easeInOutSine:[.445,.05,.55,.95],easeInOutExpo:[1,0,0,1],easeInOutCirc:[.785,.135,.15,.86],easeInOutBack:[.68,-0.55,.265,1.55],custom:[0,.35,.5,1.3],random:[Math.random().toFixed(3),Math.random().toFixed(3),Math.random().toFixed(3),Math.random().toFixed(3)]};$.fn.fx=function(t,n,r,i,s){return r=r||"linear",r=e[r],this.animate(t,n,"cubic-bezier("+r.join(",")+")",i,s),this}}),define("Modal",["View","Fx"],function(e){var t={type:"loading",btns:{yes:"确定",no:"取消"},title:"",content:"","class":"",mask:!0},n=function(){},r=e.extend({init:function(e){e.data=$.extend({},t,e.data),$.extend(e,this),e.tmplname="ui.modal",e.wrapper=e.wrapper||".modal-layout",this._super(e),this.onYes=e.data.onYes||n,this.onNo=e.data.onNo||n,this.mask=e.data.mask},render:function(){var e=$("body"),t=this.getHTMLFragment(),n=this.getModal();return this.getModal().length?n.replaceWith(t):e.append(t),this.show(),this},show:function(){this.reloc(),this.toggleModal(),this.isToast()&&this.autoHide(3e3),this.initEvents()},initEvents:function(){var e=this,t;$(".modal-layout").off().on("click",".modal-btn, .icon-close",function(){t=$(this),t.hasClass("modal-btn-yes")?e._onYes():(t.hasClass("modal-btn-no")||t.hasClass("icon-close"))&&e._onNo()}),$(".modal-overlay").off().click(function(){e._onYes()})},getType:function(){return this.data.type},isToast:function(){return this.getType().indexOf("toast")!==-1},isTopBot:function(){var e=this.getType(),t=e==="top"||e==="bottom";return t?e:t},getModal:function(){return $(this.isToast()?".modal-toast":".modal-layout")},getMask:function(){return $(".modal-overlay")},toggleModal:function(e){e=e||"In";var t=this.isTopBot();t?this["slide"+e+"Modal"](t):this["scale"+e+"Modal"](),this.mask&&this.getMask()[e==="In"?"addClass":"removeClass"]("modal-overlay-visible")},scaleInModal:function(){this.getModal().css({opacity:.8,transform:"scale(1.2)"}).fx({opacity:1,scale:1,perspective:1e3},500,"easeOutCirc")},scaleOutModal:function(){var e=this.getModal();e.fx({opacity:0,scale:.8,perspective:1e3},300,"easeOutCirc",function(){e.remove()})},slideInModal:function(){this.getModal().fx({opacity:1,translate3d:"0,0,0",perspective:1e3},500,"easeOutCirc")},slideOutModal:function(){var e=this.getModal();e.fx({opacity:.5,translate3d:"0,100%,0",perspective:1e3},500,"easeOutCirc",function(){e.remove()})},reloc:function(){var e=this.getModal(),t=this.isTopBot(),n=this.isToast(),r=e.height(),i=e.width(),s={};n?s["margin-left"]=-i/2:t||(s["margin-top"]=-r/2),e.css(s)},remove:function(){this.getModal().remove()},autoHide:function(e){var t=this,n=setTimeout(function(){t.toggleModal("Out"),clearTimeout(n)},e)},_onYes:function(){this.onYes(),this.toggleModal("Out")},_onNo:function(){this.onNo(),this.toggleModal("Out")}}),i={layout:function(e,t,n){var i={};return typeof t=="string"?i.content=t:i=t,new r({data:$.extend({},e,i,{type:n})})},alert:function(e){var t={title:e.title||"警告:",btns:{yes:"OK"}};return this.layout(t,e,"alert").render()},confirm:function(e){var t={title:e.title||"请确认:",btns:{yes:"确定",no:"取消"}};return this.layout(t,e,"confirm").render()},loading:function(){return new r({data:{type:"loading",btns:!1,title:!1,mask:!0}})},center:function(e){var t={title:e.title||"",btns:!1};return this.layout(t,e,"center").render()},top:function(e){var t={title:e.title||"",btns:!1,mask:!1,close:!0};return this.layout(t,e,"top").render()},bottom:function(e){var t={title:e.title||"",btns:{no:"取消",yes:"完成"}};return this.layout(t,e,"bottom").render()},popup:function(e){var t={title:e.title||"","class":"modal-popup",btns:{yes:"OK",no:"取消"}};return this.layout(t,e,"bottom").render()},popover:function(e){var t={title:"",btns:!1};if(!e.bindElem){console.warn("没有定义popover弹出层绑定的元素");return}var n=$(e.bindElem),r=n.offset(),i=this.layout(t,e,"popover").render(),s,o=20,u="tri-bottom",a=i.getModal(),f=a.width(),l=a.height(),s=r.top-l/2-o/2,c=r.left+(r.width-f)/2,h=$("body").width(),p=10;return r.top<l&&(s=r.top+l/2+o,u="tri-top"),console.log(c,h,f,l,s,c,"size"),c<p?(c=p,u+=" tri-left"):c>h-f-p&&(c=h-f-p,u+=" tri-right"),a.addClass(u).css({left:c,top:s}),i},tips:function(e){$.extend(e,{"class":"modal-tips",mask:!1}),i.popover(e)},toast:function(e,t){return t=t||"info",(new r({data:{type:"toast-"+t,content:e,btns:!1,title:!1,mask:!1}})).render()}};return $.extend({},{modal:r},i)}),define("Service",["Modal"],function(e){var t,n={request:function(e,t,n){},response:function(e,t,n){}},r=$.extend({},n),i=function(e,t){r.request=function(t,r,i){n.request(t,r,i);var s=e(t,r,i);if(s===!1)return!1},r.response=function(e,r,i){n.response(e,r,i),t(e,r,i)}};$.ajaxSettings.timeout=6e4,$.ajaxSettings.error=function(t,n){if(n==="timeout")e.toast("信号偏弱，访问超时","error");else if(n==="error"){var r=t.status;e.toast("请求发生错误,状态码:"+r,"error"),r===404||r===500}},$(document).on("ajaxBeforeSend",function(n,i,s){t=e.loading().render();var o=r.request(n,i,s);if(o===!1)return!1}).on("ajaxComplete",function(e,n,i){t.toggleModal("Out"),r.response(e,n,i)});var s=Class.extend({init:function(e){if(e.req||e.res){i(e.req,e.res);return}this.url=e.url,this.params=e.params||{}},save:function(e){return this.ajax($.extend({},this.params,e),{type:"POST"})},fetch:function(e){return this.ajax($.extend({},this.params,e))},jsonp:function(e){return this.ajax($.extend({},this.params,e),{dataType:"jsonp",type:"GET"})},tmpl:function(){return this.ajax({dataType:"html",async:!1})},get:$.get,post:$.post,ajax:function(e,t){var n={},t=t||{};return t.withCredentials&&(n.xhrFields={withCredentials:!0}),$.extend(n,t,{url:this.url,data:$.extend({},this.params,e),dataType:t.dataType||"json"}),$.ajax(n)}});return s}),define("Header",["View"],function(e){var t={left:{type:"icon"},right:{type:"icon",icon:"icon-bars"},title:"",subtitle:""},n=e.extend({init:function(e){e.data=_.extend({},t,e.data),e.tmplname="ui.header",e.wrapper=e.wrapper||e.config.CLASSES.HEADER,$.extend(e,this),this._super(e),this.title=e.title},setTitle:function(e){this.data.title=e,this.update()},events:{"click .icon-left-nav":"goBack"},goBack:function(){History.go(-1);return}});return n}),define("List",["View"],function(e){var t={media:"",card:!1,list:[{img:"",title:"",content:"",badge:""},{img:"",title:"",content:"",badge:"",isDivider:!0,collapse:!0}]};$.fn.nextAll=function(e){var t=this.next(),n=t;while(t.is(e)){n=n.add(t),t=t.next();if(t.length==0)break}return n};var n=e.extend({init:function(e){$.extend(e,this),e.tmplname="ui.list",this._super(e)},events:{"click .table-view-divider.table-view-collapse":"collapseListGroup"},collapseListGroup:function(e,t){$(t).nextAll(".table-view-cell").toggle()}});return n}),define("Sides",["View","Fx"],function(e){var t={position:"left",content:""},n=e.extend({init:function(e){e.data=_.extend({},t,e.data),e.tmplname="ui.sides",e.wrapper=e.wrapper||"#sides",$.extend(e,this),this._super(e)},events:{"click .sides-overlay":"hide"},getSides:function(){return this.wrapper.find(".sides")},getOverlay:function(){return this.wrapper.find(".sides-overlay")},setContent:function(e){this.getSides().html(e?e:this.content)},show:function(){this.getOverlay().css("visibility","visible");var e={};e[this.data.position]=0,this.showed=!0,this.getSides().fx(e,500,"easeOutCirc")},hide:function(){var e=this,t=this.getSides(),n={};n[this.data.position]=-t.width(),this.showed=!1,t.fx(n,500,"easeOutCirc",function(){e.getOverlay().css("visibility","hidden")})}});return n}),define("Swipe",[],function(){function e(e,t){var n={swipeX:0,swipeY:0,swipeTime:20,direction:null};t=$.extend({},n,t);var r={setNull:{startX:null,startY:null,startTime:null,moveX:null,moveY:null,moveTime:null,swipeX:null,swipeY:null,swipeTime:null,direction:null},checkRange:function(e){return Math.abs(e.swipeX)>=t.swipeX&&Math.abs(e.swipeY)>=t.swipeY&&(t.direction?e.direction===t.direction:!0)&&e.swipeTime>=t.swipeTime},getDirection:function(e){return Math.abs(e.degree)>45?e.swipeX<0?"left":"right":e.swipeY<0?"top":"bottom"},getAngle:function(e,t){return Math.atan(t/e)*180/Math.PI}},i=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":"opera"in window?"O":"",s="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,o={vendor:i,has3d:s,set:function(e,t){if(typeof e!="string")return $.extend(this,e),this.auto(),this;this[e]=t},auto:function(){this.swipeX=this.moveX-this.startX,this.swipeY=this.moveY-this.startY,this.swipeTime=this.moveTime-this.startTime,this.degree=r.getAngle(this.swipeY,this.swipeX),this.direction=r.getDirection(this)}},u={startCallback:function(e){e.preventDefault(),$.extend(o,r.setNull);var n=e.touches[0],i={startX:n.pageX,startY:n.pageY,startTime:+(new Date)};o.set(i),t.startCallback?t.startCallback(o):null},moveCallback:function(e){e.preventDefault();var n=e.touches[0],i={moveX:n.pageX,moveY:n.pageY,moveTime:+(new Date)};o.set(i);if(!r.checkRange(o))return;t.moveCallback?t.moveCallback(o):null},endCallback:function(e){e.preventDefault();if(!r.checkRange(o))return;t.endCallback?t.endCallback(o):null}};e.die("touchstart,touchmove,touchend"),e.get(0).addEventListener("touchstart",u.startCallback),e.get(0).addEventListener("touchmove",u.moveCallback),e.get(0).addEventListener("touchend",u.endCallback)}var t={swipeX:30,swipeY:30,direction:null};["swipe","swipeLeft","swipeRight","swipeTop","swipeBottom"].forEach(function(n){var r=/swipe(\w*)/.exec(n)[1].toLowerCase(),i={};if(r==="left"||r==="right")i.swipeX=t.swipeX;else if(r==="top"||r==="bottom")i.swipeY=t.swipeY;$.fn[n]=function(t){return this.each(function(){var n=$.extend({},i,t,{direction:r});e($(this),n)}),this}})}),define("Scroll",["Swipe","Fx"],function(){var e=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":"opera"in window?"O":"",t="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,n=function(e,t){return'<div class="pull-to-refresh-layer"><div class="pull-show-item"><span class="preloader-text">'+e+'</span><span class="preloader"></span></div>'+'<div class="pull-show-item"><span class="pull-to-refresh-text">'+t+'</span><span class="pull-to-refresh-arrow"></span></div>'+"</div>"},r=Class.extend({init:function(e){e.direction=e.direction||"vertical";var t=e.frontText||"松手刷新",r=e.endText||"松手加载",i={$wrapper:$(e.wrapper),$scroll:$(e.className),step:e.step||0,speed:e.speed||1,outer:e.outer===void 0?100:e.outer,isX:e.direction!=="vertical",onScroll:e.onScroll||function(){},endScroll:e.endScroll||function(){},onTop:e.onTop||function(){},onBottom:e.onBottom||function(){}};!i.isX&&Number(i.outer)>0&&(i.outerFront=e.outerFront===!1?"":e.outerFront?e.outerFront:n("正在为您刷新",t),i.outerEnd=e.outerEnd===!1?"":e.outerEnd?e.outerEnd:n("正在拼命加载中...",r)),$.extend(this,i),this.construct()},construct:function(){this.$scroll.addClass("gom-scroll"),this.bindScroll()},bindScroll:function(){var e=this,t=this.$wrapper,n=this.isX?"horizontal":"vertical";console.log(n,"direct"),this.outerFront&&t.prepend('<div class="ui-scroll-front gom-scroll-out">'+this.outerFront+"</div>"),this.outerEnd&&t.prepend('<div class="ui-scroll-end gom-scroll-out">'+this.outerEnd+"</div>");var r={moveCallback:function(t){e._setScrollTrans(t,!0)},endCallback:function(t){e._setScrollTrans(t)}};this.isX?t.addClass("ui-scroll ui-scroll-"+n).swipeLeft(r).swipeRight(r):t.addClass("ui-scroll ui-scroll-"+n).swipeTop(r).swipeBottom(r)},getScrollSize:function(){return this.isX?this.$scroll.width():this.$scroll.height()},getWrapperSize:function(){return this.isX?this.$wrapper.width():this.$wrapper.height()},scrollTo:function(e,t){var n=typeof e,r;e==="top"?r=0:e==="bottom"&&(r=-this.getMaxTrans()),n==="number"&&(r=e),console.log(r,"scrollTo val"),this._scrollFxTo(r,t),console.log(this.getSteps(),"滚动的步长为：")},getSteps:function(){return this.$scroll.data("swipe-steps")},_scrollFxTo:function(e,t){if(this.step){var n=this._getTransStep(e);console.log(n,"步长信息"),e=n.val,this.$scroll.data("swipe-steps",n.stepNum)}this.$scroll.data("swipe-offset",e),this.$scroll.fx(this._scrollCount(e),"normal","linear",t?t:function(){})},_setScrollTrans:function(e,t){var n=this.isX?e.swipeX:e.swipeY,r=this._getTransVal(n,e.swipeTime,t),i=this._scrollCount(r);t?(this.$scroll.css(i),this.onScroll(e)):(this.hold||this._scrollFxTo(r),this.endScroll(e))},showFresh:function(e){e=e||"front",$(".ui-scroll-"+e).addClass("refreshing").removeClass("pull-up"),this.hold=!0},hideFresh:function(e){e=e||"front";var t=this,n=e==="front"?0:-this.getMaxTrans();t.scrollTo(n,function(){$(".ui-scroll-"+e).removeClass("refreshing"),t.hold=!1})},getMaxTrans:function(){return this.getScrollSize()-this.getWrapperSize()},_getTransVal:function(e,t,n){e=n?e:e*this._getRatio(t);var r=this.$scroll.data("swipe-offset")||0;r&&(e+=r);var i=this.getMaxTrans(),s=n?this.outer:0,o=0+s,u=i+s;console.log(this.getScrollSize(),this.getWrapperSize(),e,o,i,u,"滑动内容大小, 容器大小, 滑动距离, 最小范围, 最大位移， 最大范围");var a=Math.abs(e),f=e+"px";return 0<e&&e<=o&&$(".ui-scroll-front").show().addClass("pull-up"),i<a&&a<=u&&(f=a-i+"px",$(".ui-scroll-end").show()),e>o&&(e=o,n||this.onTop()),e<-u&&(e=-u,n||this.onBottom()),e},_getTransStep:function(e){console.log(e,"val");var t=this.step,n=Math.round(e/t);return{stepNum:Math.abs(n),val:t*n}},_holdScroll:function(){this.hold=!0},_getRatio:function(e){var t,n=this.speed*1e3;return e>n?t=1*this.speed:(t=n/e,t=t>20?20:t),console.log(e,t,"swipeRatio"),t},_scrollCount:function(n){var r=this.isX,i=r?n+"px":"0",s=r?"0":n+"px",o={};return o["-"+e+"-transform"]=t?"translate3d("+i+","+s+",0)":"translate("+i+","+s+")",o}});return r}),define("Slide",["View","Store","Fx"],function(e,t){var n={type:"slide-horizontal",swipeX:60,isloop:!0,initIndex:0,list:[]},r=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":"opera"in window?"O":"",i="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,s=e.extend({init:function(e){e.data=_.extend({},n,e.data),e.tmplname="ui.switch",$.extend(e,this),this._super(e)},show:function(){this.swipeContainer(this.data.initIndex)},getRootDom:function(){return this.wrapper.find(".switch-container")},getListDom:function(){return this.wrapper.find(".switch-wrapper")},getIndexData:function(e){return this.data.list[e]},getIndexDom:function(e){return this.getListDom().find(".switch-item").eq(e)},getPaginationDom:function(){return this.wrapper.find(".switch-pagination")},events:{"click .switch-pagination-bullet":function(e,t,n){n.rollback($(t).attr("index"))}},rollback:function(e){var t=this,n=this.getListDom(),r=n.find(".switch-item"),i=this.getPaginationDom(),s=/(^\w+)-?(\w+)?/.exec(this.data.type)[2]!=="vertical",o=s?n.width():n.height(),u=function(){n.fx(t.swipeCount(o*-e)),i.find(".switch-pagination-bullet").eq(e).addClass("active").siblings().removeClass("active")},a=this.getIndexData(e);!a.content&&a.src!==void 0?this.getIndexAsync(e,function(n){t.getIndexDom(e).html(n),u()}):u()},swipeContainer:function(e){var t=this,n=this.getRootDom(),r=this.getListDom(),i=r.find(".switch-item"),s=i.length,t=this,o=this.data.isloop,u=/(^\w+)-?(\w+)?/.exec(this.data.type)[2]!=="vertical",a=u?"swipeX":"swipeY",f=u?["left","right"]:["top","bottom"];this.rollback(e),r.swipe({moveCallback:function(i){var s=i[a]+n.width()*-e;r.css(t.swipeCount(s))},endCallback:function(n){if(Math.abs(n[a])<t.data[a]){t.rollback(e);return}if(n.direction===f[0]){e++;if(e===s){if(!o){t.rollback(e);return}e=0}}else if(n.direction===f[1]){e--;if(e<0){if(!o){t.rollback(e);return}e=s-1}}t.rollback(e),console.log(e,s);return}})},getIndexAsync:function(e,n){var r=this.getIndexData(e),i=r?r.src:null,s=t.get(i),o=function(e){return r.data?_.template(e)(r.data):e};if(i){if(s){n(o(s));return}$.get(i,function(e){var r=o(e);t.set(i,e),n?n(r):null})}},swipeCount:function(e){var t=/(^\w+)-?(\w+)?/.exec(this.data.type)[2]!=="vertical",n=t?e+"px":"0",s=t?"0":e+"px",o={};return o["-"+r+"-transform"]=i?"translate3d("+n+","+s+",0)":"translate("+n+","+s+")",o}});return s}),define("Select",["View","Modal","Scroll","List"],function(e,t,n,r){var i={title:"请选择",yardNo:3,modal:!0},s=e.extend({init:function(e){var t=e.data=_.extend({},i,e.data);t.modal=t.modal===void 0?!0:t.modal,t.className=t.className||"",$.extend(this,e),this.tmpl=this.makeScrollCtn(),this._super(e)},show:function(){var e=this;data=this.data,console.log(this.modal,"thismodal");if(data.modal)t.bottom({title:data.title,content:this.makeScrollCtn(),onYes:function(){var t=e.getSelect();data.onYes?data.onYes(t):null},onNo:function(){data.onNo?data.onNo():null}});else{if(!this.wrapper){console.error("当select没有指向为modal显示时，需要指定wrapper属性作为组件根元素");return}$(this.wrapper).addClass("gom-ui-select").html(this.makeScrollCtn())}this.setScroll(),this.initSelect()},getScrollRoot:function(){return this.data.className?$("."+this.data.className):$(".ui-scroll-select")},initSelect:function(){var e=this.getScrollRoot();for(var t=1;t<=this.data.level;t++)e.find(".ss-cell-"+t).find("li.table-view-cell").eq(0).addClass("active")},makeScrollCtn:function(){var e=this.data.level,t="",n="",r=(this.data.yardNo-1)*33;for(var i=1;i<=e;i++)n=this.setListCont(i),t+='<div class="ui-scroll-select-item ui-scroll-select-'+i+'"><div style="padding: '+r+'px 0;" class="ss-cell ss-cell-'+i+'">'+n+"</div></div>";var s='<div class="ss-cell-yard" style="top: '+r+'px"></div>';return s+'<div class="ui-scroll-select '+this.data.className+'">'+t+"</div>"},setListCont:function(e){var t=this.data.list[e],n=[];for(var i=0;i<t.length;i++)n[i]={},n[i].title=t[i];var s={media:!1,card:!1,list:n};return(new r({data:s})).render()},setScroll:function(){for(var e=1;e<=this.data.level;e++)new n({step:33,speed:.5,outerFront:!1,outerEnd:!1,wrapper:".ui-scroll-select-"+e,className:".ss-cell-"+e,endScroll:function(e){console.log(e,"point");var t=this.getSteps();this.$scroll.find("li.table-view-cell").removeClass("active").eq(t).addClass("active")}})},getSelect:function(){var e=this.getScrollRoot(),t,n=[];for(var r=1;r<=this.data.level;r++)t=$.trim(e.find(".ss-cell-"+r).find("li.table-view-cell.active").text()),n.push(t);return n}});return s}),define("Forms",["View","Select"],function(e,t){var n={type:"primary",outline:!1,icon:void 0,badge:void 0,title:""},r=e.extend({init:function(e){e.data=_.extend({},n,e.data),e.tmplname="ui.button",e.replace=!0,$.extend(e,this),this._super(e)}}),i={content:["Male","Female"]},s=e.extend({init:function(e){e.data=_.extend({},i,e),e.tmpl='<div class="toggle"><div class="toggle-handle"></div></div>',e.wrapper=e.wrapper,e.replace=!0,$.extend(e,this),this._super(e)},show:function(){var e=this.wrapper;e.off().on("click",".toggle-handle",function(){e[(e.hasClass("active")?"remove":"add")+"Class"]("active")}),e.find(".toggle-handle").swipeLeft({endCallback:function(){e.removeClass("active")}}).swipeRight({endCallback:function(){e.addClass("active")}})}}),o=e.extend({init:function(e){var t=e.data;t.position=t.position||"right",$.extend(e,this),this._super(e),this.initRadio()},initRadio:function(){var e=this.wrapper,t=this.data.position;e.addClass("gom-checkbox gom-checkbox-"+t)},events:{"click .item":"selectItem"},selectItem:function(e,t){return $t=$(t),$t[$t.hasClass("active")?"removeClass":"addClass"]("active"),!1},getSelect:function(){return this.wrapper.find(".item.active")}}),u=e.extend({init:function(e){var t=e.data;t.position=t.position||"right",$.extend(e,this),this._super(e),this.initRadio()},initRadio:function(){var e=this.wrapper,t=this.data.position;e.addClass("gom-radio gom-radio-"+t)},events:{"click .item":"selectItem"},selectItem:function(e,t){return $t=$(t),$t[$t.hasClass("active")?"removeClass":"addClass"]("active"),$t.siblings().removeClass("active"),$t.siblings().filter('input[type="hidden"]').val($.trim(this.getSelect().text())),!1},getSelect:function(){return this.wrapper.find(".item.active")}}),a=e.extend({init:function(e){e.data=_.extend({},e),e.tmpl='<div><input type="text" readonly class="input" placeholder="定位或选择" /><span class="icon-area"><i class="iconfont icon-location">定位</i></span></div>',$.extend(e,this),this._super(e)},show:function(){console.log("show")},events:{"click .icon-area":"getCoord","click input":"selectLocation"},getInput:function(){return this.wrapper.find("input")},selectLocation:function(){console.log("selectLocation");var e=[1,2,3];(new t({data:{title:"时间选择器",cascade:!1,level:3,list:{1:["上午","下午"],2:e.concat(_.range(10,13)),3:e.concat(_.range(10,61))},onYes:function(e){}}})).render()},getCoord:function(){console.log("getCoord");var e=this;geo=navigator.geolocation;if(!geo){this.showToast("您的浏览器不支持地理位置");return}geo.getCurrentPosition(function(t){e.location(t.coords,"0b895f63ca21c9e82eb158f46fe7f502",function(t){e.getInput().val(t.province+t.city+t.district),e.onLocation?e.onLocation(t):null})})},location:function(e,t,n){var r="http://restapi.amap.com/v3/geocode/regeo?key="+t+"&location="+e.longitude+","+e.latitude+"&output=json";$.ajax({url:r,dataType:"jsonp",success:function(e){if(e.info==="OK"){var t=e.regeocode.addressComponent;n?n(t):null,console.log(t)}}})}});return{CheckBox:o,Radio:u,Toggle:s,Button:r,InputLocation:a}}),define("UI",["require","Header","List","Modal","Sides","Scroll","Slide","Select","Forms"],function(e){var t={Header:e("Header"),List:e("List"),Modal:e("Modal"),Sides:e("Sides"),Scroll:e("Scroll"),Slide:e("Slide"),Select:e("Select")},n=e("Forms");return $.extend(t,n)}),define("Page",["View","UI"],function(e,t){var n=e.extend({init:function(e){e.wrapper=e.wrapper||"#viewport",this.title=e.title||"",this.widgets=[],this.params=e.params||null,this.seo=e.seo||{title:"",keywords:"",description:""},this.isback=e.isback,this._super(e),this.config=e.config},render:function(){if(!this.tmplname){this.tmpl='<div class="'+(this.config.CLASSES.CONTENT.substring(1)||"gom-content")+'"></div>',this.show();return}this.show()},show:function(){var e=this.isback;this.push(this.getHTMLFragment("view"),e),this.title&&this.setHeader(),this.initWidgetUI()},push:function(e,t){var n=$(this.wrapper?this.wrapper:"#viewport"),r=t?"100%":"0",i=t?"0":"-20%",s=t?"0":"100%",o="translateX("+s+")";t||n.append(e),n.find(".content").length===1&&t&&n.prepend(e);var u=n.find(".content").addClass("gom-content"),a=u.last();u.length>3&&u.eq(0).remove(),typeof t=="boolean"&&(a.prev().animate({translateX:i,translate3d:"0,0,0"},350,"ease-out"),a.css({transform:o}).animate({translateX:r,translate3d:"0,0,0"},350,"ease-out",function(){t?a.remove():null}));return},initWidgetUI:function(){var e,n,r,i,s,o,u=this;$("body").find("[data-ui-widget]").each(function(a,f){e=$(f),n=e.data("ui-widget"),r=e.data("opts"),s=e.find("item"),o=s.length;if(o){i=[];for(var l=0;l<o;l++)i[l]={},i[l].title=s.eq(l).attr("title"),i[l].content=s.eq(l).html();i.list=i}else i={},i.title=e.text();try{u.widgets[a]=new t[n]({wrapper:e,data:$.extend({},i,r)})}catch(c){console.warn(n+"组件定义错误，UI对象上不存在此组件！")}u.widgets[a].render(),e.data("widget",u.widgets[a]),e.removeAttr("data-ui-widget")})},setHeader:function(){$("header.bar .title").text(this.title)},setSeo:function(e){}});return n}),define("Utils",[],function(){var e={version:"1.0.0",isWebApp:/http(s)?:\/\//.test(location.protocol)};return e}),define("Url",[],function(){var e={url:/((http|https):\/\/)?((\w+\.)+\w+)?(:\d+)?((\/\w+)+)?\/?\??((\w+=\w+&?)+)?#?(.+)?/g,kv:/(\w+)=([^&#]+)/g,search:/([^\?]+)?\??((\w+=\w+&?)+)?/,path:/.+((\/\w+)+)?/,history:/[^\?]?\?((\w+)+(\/\w+)*)/},t=function(t){var n=e.history.exec(t);return n?e.history.exec(t)[1]:""},n=function(t){if(!t)return{};var n={},r,i=encodeURI(t).match(e.kv);return!i||!i.length?{}:(i.forEach(function(t){e.kv.lastIndex=0,r=e.kv.exec(t),n[r[1]]=decodeURI(r[2])}),n)},r=function(t,r){if(!t)return r?{}:"";var i=e.search.exec(t)[2];return r?n(i):i},i=function(t,n){if(!t)return n?[]:"";var r=e.path.exec(t)[0];return n?r.split("/"):r},s=function(t,s){e.url.lastIndex=0;var o=e.url.exec(t),u=o[10],a=o[6]||"",f=o[8]||"";return{protocal:o[2],domain:o[3],port:o[5],path:s?a.substring(1).split("/"):a,search:s?n(f):f,hash:u,hashPath:i(u,s),hashsearch:r(u,s)}},o=function(e,t,n){var r="",t=t||"=";n=n||"&";for(var i in e)r+=i+t+e[i]+n;return r.remove("right")},u=function(t,n,r){var i=typeof n=="object"?o(n):n+"="+r;return t.replace(e.search,function(e,t,n){return(t?t:"")+"?"+(n?n+"&":"")+i})};return{get:s,set:u,getParams:n,setParams:o,getHashSearch:r,getHashPath:i,getHTML5Hash:t}}),define("App",["Page","Modal","Url","Store"],function(e,t,n,r){var i=Class.extend({init:function(e,t){this.config=e||{},this.route=t||{},this.model={},this.history=[]},run:function(e){var t=this,r=!!window.history&&!!history.pushState;if(!r)return;History.Adapter.bind(window,"statechange",function(e){var r=History.getState();r.data.hash=r.data.hash||n.getHTML5Hash(r.hash)||"/",t._routeByHash(r.data.hash)}),History.Adapter.trigger(window,"statechange"),e?e():null,this._initHref()},_initHref:function(){var e=this;$("body").off().on("click","a",function(){var t=$(this),n=t.attr("href");if(!n||!!~n.indexOf("#")||!n.indexOf("javascript:"))return;var r=n.substring(1);return History.pushState({hash:r,prevHash:e.getPrevHash()},t.attr("title"),"?"+r),!1}).on("click",".icon-left-nav",function(){return History.go(-1),!1})},getViewTmpl:function(e,t){var n=this,i=+n.config.EXPIRES;if(i>0){var s=r.get(e);if(!!s){t?t(s):null;return}}$.ajax({url:"views/"+e+".html",dataType:"html",success:function(n){i>0&&r.set(e,n,i*60*60*1e3+ +(new Date)),t?t(n):null}})},getPrevHash:function(){return location.search.substring(1)},setPage:function(t){if(!t)return;return t.config=this.config,t.isback=this.isBack(),new e(t)},getCRO:function(e){var t=n.getHashPath(e,!0),r=this.route;if(e==="/")return r[e];var i=r,s=t.length,o=0,u=0;for(;o<s;o++){u=t[o];if(!o){i=i["/"+u];if(i===void 0)return}else i=i["/"+u]||i;i.index===void 0&&(i.index=o);if(o===s-1&&i.hasOwnProperty("/"))return i=i["/"],i;if(i.index===o-1&&i.hasOwnProperty("/:var"))return i=i["/:var"],i.index=o,i.routeParams=u,i}return i.hashs=t,i},setCRO:function(e){},"goto":function(e){var t=typeof e=="string";if(t){var r=n.get(e),i=r.host+r.port===location.host;if(/^(https:)?\/\//.test(e)){if(!i){location.href=e;return}e=n.getHashPath(r.search)}}this[t?"_routeByHash":"_routeByCRO"](e)},_routeByHash:function(e){this._manageHistory(e);var t=this.getCRO(e);console.log(t,"CRO"),this._routeByCRO(t)},_routeByCRO:function(e){var t=this;if(this.isRouteNotFound(e))return;var n=e.ctrl;n&&(e.events=n.events);var r=function(){var r=t.setPage(e);n&&n.init?(r.hashs=e.hashs,n.init(r)):r.render()};if(!e.tmplname){r();return}this.getViewTmpl(e.tmplname,function(t){e.tmpl=t,r()})},_manageHistory:function(e){if(this.getLastHashByLastIndex(1)===e)return;var t=this.history;t.push(e),t.length>10&&t.shift(),console.log(t,"THIS HISTORY")},getLastHashByLastIndex:function(e){var t=this.history;return t[t.length-e]},isBack:function(){var e=this.getLastHashByLastIndex(1),t=this.getLastHashByLastIndex(2),r=n.getHashPath(t,!0),i=n.getHashPath(e,!0),s=_.compact(r).length;return t?_.compact(i).length<s:null},isRouteNotFound:function(e){return e?!1:(this.route["/404"].data={url:location.href},this.goto("404"),!0)}});return i}),function(){var e=!1,t=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){},Class.extend=function(n){function o(){!e&&this.init&&this.init.apply(this,arguments)}var r=this.prototype;e=!0;var i=new this;e=!1;for(var s in n)i[s]=typeof n[s]=="function"&&typeof r[s]=="function"&&t.test(n[s])?function(e,t){return function(){var n=this._super;this._super=r[e];var i=t.apply(this,arguments);return this._super=n,i}}(s,n[s]):n[s];return o.prototype=i,o.prototype.constructor=o,o.extend=arguments.callee,o}}(),$(function(){FastClick.attach(document.body)}),function(){var e,t=$("script[data-gom-path]");e=t.length?t.attr("data-gom-path")||t[0].src.match(/(.+)gom\.js/)[1]:config.GOM_PATH.substring(0,config.GOM_PATH.lastIndexOf("gom")),console.log(e,"GOM_PATH"),requirejs.config({paths:{Gom:e+"gom",App:e+"core/app",UI:e+"ui/ui",Forms:e+"ui/ui.forms",Header:e+"ui/ui.header",List:e+"ui/ui.list",Modal:e+"ui/ui.modal",Sides:e+"ui/ui.sides",Scroll:e+"ui/ui.scroll",Slide:e+"ui/ui.slide",Select:e+"ui/ui.select",View:e+"core/view",Page:e+"core/page",Service:e+"core/service",Store:e+"utils/store",Url:e+"utils/url",Fx:e+"utils/fx",Swipe:e+"utils/swipe",Utils:e+"utils/utils",UITmpl:e+"ui/ui.tmpl"}})}(),define("Gom",["Service","Page","View","UI","Utils","App"],function(e,t,n,r,i,s){var o={Service:e,Page:t,View:n,UI:r,Utils:i,App:s};return o})