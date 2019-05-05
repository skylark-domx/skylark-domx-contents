/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,t){var e=t.define,r=t.require,o="function"==typeof e&&e.amd,i=!o&&"undefined"!=typeof exports;if(!o&&!e){var u={};e=t.define=function(n,t,e){"function"==typeof e?(u[n]={factory:e,deps:t.map(function(t){return function(n,t){if("."!==n[0])return n;var e=t.split("/"),r=n.split("/");e.pop();for(var o=0;o<r.length;o++)"."!=r[o]&&(".."==r[o]?e.pop():e.push(r[o]));return e.join("/")}(t,n)}),resolved:!1,exports:null},r(n)):u[n]={factory:null,resolved:!0,exports:e}},r=t.require=function(n){if(!u.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var e=u[n];if(!e.resolved){var o=[];e.deps.forEach(function(n){o.push(r(n))}),e.exports=e.factory.apply(t,o)||null,e.resolved=!0}return e.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,t){n("skylark-ui-contents/contents",["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax"],function(n,t,e,r){"use strict";var o=function(){return o};return o.editable=function(n,t){if(void 0===t)return"true"==n.contentEditable;t=t?"true":null,r.attr(n,"contentEditable",t)},o.execCommand=function(n,t){document.execCommand(t,!1,null)},n.attach("ui.contents",o)}),n("skylark-ui-contents/main",["./contents"],function(n){return n}),n("skylark-ui-contents",["skylark-ui-contents/main"],function(n){return n})}(e),!o){var a=r("skylark-langx/skylark");i?module.exports=a:t.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-ui-contents.js.map
