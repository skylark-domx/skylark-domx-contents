/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,r){var t=r.define,e=r.require,o="function"==typeof t&&t.amd,s=!o&&"undefined"!=typeof exports;if(!o&&!t){var u={};t=r.define=function(n,r,t){"function"==typeof t?(u[n]={factory:t,deps:r.map(function(r){return function(n,r){if("."!==n[0])return n;var t=r.split("/"),e=n.split("/");t.pop();for(var o=0;o<e.length;o++)"."!=e[o]&&(".."==e[o]?t.pop():t.push(e[o]));return t.join("/")}(r,n)}),resolved:!1,exports:null},e(n)):u[n]={factory:null,resolved:!0,exports:t}},e=r.require=function(n){if(!u.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var t=u[n];if(!t.resolved){var o=[];t.deps.forEach(function(n){o.push(e(n))}),t.exports=t.factory.apply(r,o)||null,t.resolved=!0}return t.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,r){n("skylark-ui-contents/contents",["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax"],function(n,r,t,e){"use strict";var o=function(){return o};return o.execCommand=function(n,r){document.execCommand(r,!1,null)},n.attach("ui.contents",o)}),n("skylark-ui-contents/main",["./contents",""],function(n){return n}),n("skylark-ui-contents",["skylark-ui-contents/main"],function(n){return n})}(t),!o){var i=e("skylark-langx/skylark");s?module.exports=i:r.skylarkjs=i}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-ui-contents.js.map
