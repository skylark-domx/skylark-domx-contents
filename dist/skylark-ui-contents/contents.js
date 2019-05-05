/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax"],function(t,n,e,a){"use strict";var l=function(){return l};return l.editable=function(t,n){if(void 0===n)return"true"==t.contentEditable;n=n?"true":null,a.attr(t,"contentEditable",n)},l.execCommand=function(t,n){document.execCommand(n,!1,null)},t.attach("ui.contents",l)});
//# sourceMappingURL=sourcemaps/contents.js.map
