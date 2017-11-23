var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,f,g){c!=Array.prototype&&c!=Object.prototype&&(c[f]=g.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var c=0;return function(f){return $jscomp.SYMBOL_PREFIX+(f||"")+c++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(c){var f=0;return $jscomp.iteratorPrototype(function(){return f<c.length?{done:!1,value:c[f++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var f=c[Symbol.iterator];return f?f.call(c):$jscomp.arrayIterator(c)};
$jscomp.polyfill=function(c,f,g,h){if(f){g=$jscomp.global;c=c.split(".");for(h=0;h<c.length-1;h++){var e=c[h];e in g||(g[e]={});g=g[e]}c=c[c.length-1];h=g[c];f=f(h);f!=h&&null!=f&&$jscomp.defineProperty(g,c,{configurable:!0,writable:!0,value:f})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function f(){this.batch_=null}function g(a){return a instanceof e?a:new e(function(b,d){b(a)})}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;f.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};f.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var h=$jscomp.global.setTimeout;f.prototype.asyncExecuteFunction=function(a){h(a,
0)};f.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var d=a[b];delete a[b];try{d()}catch(x){this.asyncThrow_(x)}}}this.batch_=null};f.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(d){b.reject(d)}};e.prototype.createResolveAndReject_=
function(){function a(a){return function(c){d||(d=!0,a.call(b,c))}}var b=this,d=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(d){this.reject_(d);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var k=new f;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var d=this.createResolveAndReject_();try{a.call(b,d.resolve,d.reject)}catch(x){d.reject(x)}};e.prototype.then=function(a,b){function d(b,a){return"function"==typeof b?function(a){try{c(b(a))}catch(l){f(l)}}:a}var c,f,g=new e(function(b,
a){c=b;f=a});this.callWhenSettled_(d(a,c),d(b,f));return g};e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function d(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?k.asyncExecute(d):this.onSettledCallbacks_.push(function(){k.asyncExecute(d)})};e.resolve=g;e.reject=function(a){return new e(function(b,d){d(a)})};e.race=function(a){return new e(function(b,
d){for(var c=$jscomp.makeIterator(a),f=c.next();!f.done;f=c.next())g(f.value).callWhenSettled_(b,d)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?g([]):new e(function(a,c){function f(b){return function(d){e[b]=d;n--;0==n&&a(e)}}var e=[],n=0;do e.push(void 0),n++,g(d.value).callWhenSettled_(f(e.length-1),c),d=b.next();while(!d.done)})};return e},"es6","es3");
(function(){function c(b,a){return Array.prototype.slice.call((a||document).querySelectorAll(b))}function f(b){return c(a.join(","),b).filter(function(b){return!!(b.offsetWidth||b.offsetHeight||b.getClientRects().length)})}function g(){try{return document.activeElement}catch(b){}}function h(b,a,c,e){b&&27===e.which&&(e.preventDefault(),a());if(b&&9===e.which){b=f(c);var d;0<b.length&&(a=b.indexOf(g()),e.shiftKey&&0===a?d=b[b.length-1]:e.shiftKey||a!==b.length-1||(d=b[0]));d&&(d.focus(),e.preventDefault())}}
function e(b){var a;(a=f(b)[0])||(a=document.createElement("div"),a.setAttribute("tabindex","0"),a.style.cssText="outline:none;",b.insertBefore(a,b.firstChild));(b=a)&&b.focus()}var k=function(a,c){return c={exports:{}},a(c,c.exports),c.exports}(function(a){(function(){function b(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function c(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function H(){document.removeEventListener("DOMContentLoaded",
H);a()}):document.attachEvent("onreadystatechange",function I(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",I),a()})}function e(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText=
"max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);
this.a.appendChild(this.b);this.a.appendChild(this.c)}function f(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function g(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function n(a,c){function e(){var a=f;g(a)&&a.a.parentNode&&c(a.g)}var f=
a;b(a.b,e);b(a.c,e);g(a)}function h(a,b){b=b||{};this.family=a;this.style=b.style||"normal";this.weight=b.weight||"normal";this.stretch=b.stretch||"normal"}function l(){if(null===r)if(k()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);r=!!a&&603>parseInt(a[1],10)}else r=!1;return r}function k(){null===C&&(C=!!document.fonts);return C}function y(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(J){}D=
""!==a.style.font}return D}function w(a,b){return[a.style,a.weight,y()?a.stretch:"","100px",b].join(" ")}var E=null,r=null,D=null,C=null;h.prototype.load=function(a,b){var d=this,g=a||"BESbswy",y=0,h=b||3E3,x=(new Date).getTime();return new Promise(function(a,b){if(k()&&!l()){var m=new Promise(function(a,b){function c(){(new Date).getTime()-x>=h?b():document.fonts.load(w(d,'"'+d.family+'"'),g).then(function(b){1<=b.length?a():setTimeout(c,25)},function(){b()})}c()}),p=new Promise(function(a,b){y=
setTimeout(b,h)});Promise.race([p,m]).then(function(){clearTimeout(y);a(d)},function(){b(d)})}else c(function(){function c(){var b;if(b=-1!=t&&-1!=u||-1!=t&&-1!=v||-1!=u&&-1!=v)(b=t!=u&&t!=v&&u!=v)||(null===E&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),E=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=E&&(t==r&&u==r&&v==r||t==z&&u==z&&v==z||t==A&&u==A&&v==A)),b=!b;b&&(q.parentNode&&q.parentNode.removeChild(q),clearTimeout(y),a(d))}function k(){if((new Date).getTime()-
x>=h)q.parentNode&&q.parentNode.removeChild(q),b(d);else{var a=document.hidden;if(!0===a||void 0===a)t=l.a.offsetWidth,u=m.a.offsetWidth,v=p.a.offsetWidth,c();y=setTimeout(k,50)}}var l=new e(g),m=new e(g),p=new e(g),t=-1,u=-1,v=-1,r=-1,z=-1,A=-1,q=document.createElement("div");q.dir="ltr";f(l,w(d,"sans-serif"));f(m,w(d,"serif"));f(p,w(d,"monospace"));q.appendChild(l.a);q.appendChild(m.a);q.appendChild(p.a);document.body.appendChild(q);r=l.a.offsetWidth;z=m.a.offsetWidth;A=p.a.offsetWidth;k();n(l,
function(a){t=a;c()});f(l,w(d,'"'+d.family+'",sans-serif'));n(m,function(a){u=a;c()});f(m,w(d,'"'+d.family+'",serif'));n(p,function(a){v=a;c()});f(p,w(d,'"'+d.family+'",monospace'))})})};a.exports=h})()}),a='a[href] area[href] input:not([disabled]) select:not([disabled]) textarea:not([disabled]) button:not([disabled]) iframe object embed [contenteditable] [tabindex]:not([tabindex^\x3d"-"])'.split(" ");document.documentElement.classList.replace("no-js","has-js");(function(){function a(a){h(!0,function(){k()},
l,a)}function c(a){l.contains(a.target)||e(l)}function k(){document.removeEventListener("keydown",a);document.body.removeEventListener("focus",c,!0);var b=f(l);if(0<b.length){var d=b.indexOf(g());-1!==d&&b[d].blur()}F.focus()}function B(b){"true"===b?(n.setAttribute("aria-hidden",!1),n.hidden=!1,F=g(),e(l),document.addEventListener("keydown",a),document.body.addEventListener("focus",c,!0)):(setTimeout(function(){n.setAttribute("aria-hidden",!1);n.hidden=!0},450),k());m.setAttribute("aria-expanded",
b);document.body.setAttribute("data-menu-expanded",b)}var G=document.querySelector(".c-menu");setTimeout(function(){G.classList.remove("no-transition")},10);var m=document.querySelector(".c-menu__button");m.setAttribute("aria-expanded",!1);var n=document.querySelector(".c-menu__drawer");n.hidden=!0;n.setAttribute("role","dialog");var p=document.createElement("div");document.body.appendChild(p);p.className="c-backdrop";p.setAttribute("tabindex",-1);var l=n,F;m&&(m.addEventListener("click",function(a){var b=
"false"===m.getAttribute("aria-expanded")?"true":"false";B(b);a.preventDefault()}),window.addEventListener("keyup",function(a){27===a.keyCode&&(B(!1),k())}),p.addEventListener("click",function(a){var b="false"===m.getAttribute("aria-expanded")?"true":"false";B(b);a.preventDefault()}))})();(function(){function a(){document.documentElement.classList.add("fonts-loaded");sessionStorage["fonts-loaded"]=!0}var c=[(new k("Source Sans Pro",{weight:"normal",style:"normal"})).load(),(new k("Source Sans Pro",
{weight:"700",style:"normal"})).load(),(new k("Source Serif Pro",{weight:"normal",style:"normal"})).load(),(new k("Source Code Pro",{weight:"normal",style:"normal"})).load()];(function(){Promise.all(c).then(a).catch(function(a){console.error(a)})})()})()})();
//# sourceMappingURL=app.js.map