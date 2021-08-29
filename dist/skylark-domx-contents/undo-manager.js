/**
 * skylark-domx-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./contents"],function(t,e,i){var n=t.Evented.inherit({init:function(e,i){var n,s,o;this.editable=e,this.opts=t.extend({},this.opts,i),this._stack=[],this.editable.util.os.mac?(s="cmd+z",n="shift+cmd+z"):this.editable.util.os.win?(s="ctrl+z",n="ctrl+y"):(s="ctrl+z",n="shift+ctrl+z"),this.editable.hotkeys.add(s,(o=this,function(t){return t.preventDefault(),o.undo(),!1})),this.editable.hotkeys.add(n,function(t){return function(e){return e.preventDefault(),t.redo(),!1}}(this)),this.throttledPushState=this.editable.util.throttle(function(t){return function(){return t._pushUndoState()}}(this),2e3),this.editable.on("valuechanged",function(t){return function(e,i){if("undo"!==i&&"redo"!==i)return t.throttledPushState()}}(this)),this.editable.on("selectionchanged",function(t){return function(e){return t.resetCaretPosition(),t.update()}}(this)),this.editable.on("focus",function(t){return function(e){if(0===t._stack.length)return t._pushUndoState()}}(this)),this.editable.on("blur",function(t){return function(e){return t.resetCaretPosition()}}(this))}});return n.pluginName="UndoManager",n.prototype._index=-1,n.prototype._capacity=20,n.prototype._startPosition=null,n.prototype._endPosition=null,n.prototype.resetCaretPosition=function(){return this._startPosition=null,this._endPosition=null},n.prototype.startPosition=function(){return this.editable.selection._range&&(this._startPosition||(this._startPosition=this._getPosition("start"))),this._startPosition},n.prototype.endPosition=function(){var t;return this.editable.selection._range&&(this._endPosition||(this._endPosition=(t=this,function(){return t.editable.selection.range().collapsed?t._startPosition:t._getPosition("end")})())),this._endPosition},n.prototype._pushUndoState=function(){if(!1!==this.editable.trigger("pushundostate")&&this.caretPosition().start)return this._index+=1,this._stack.length=this._index,this._stack.push({html:this.editable.body.html(),caret:this.caretPosition()}),this._stack.length>this._capacity?(this._stack.shift(),this._index-=1):void 0},n.prototype.currentState=function(){return this._stack.length&&this._index>-1?this._stack[this._index]:null},n.prototype.undo=function(){var t;if(!(this._index<1||this._stack.length<2))return this._index-=1,t=this._stack[this._index],this.editable.body.get(0).innerHTML=t.html,this.caretPosition(t.caret),this.editable.body.find(".selected").removeClass("selected"),this.editable.sync(),this.editable.trigger("valuechanged",["undo"])},n.prototype.redo=function(){var t;if(!(this._index<0||this._stack.length<this._index+2))return this._index+=1,t=this._stack[this._index],this.editable.body.get(0).innerHTML=t.html,this.caretPosition(t.caret),this.editable.body.find(".selected").removeClass("selected"),this.editable.sync(),this.editable.trigger("valuechanged",["redo"])},n.prototype.update=function(){var t;if(t=this.currentState())return t.html=this.editable.body.html(),t.caret=this.caretPosition()},n.prototype._getNodeOffset=function(i,n){var s,o,r;return s=t.isNumber(n)?e(i):e(i).parent(),r=0,o=!1,s.contents().each(function(t,e){return i!==e&&(n!==t||0!==t)&&(e.nodeType===Node.TEXT_NODE?!o&&e.nodeValue.length>0&&(r+=1,o=!0):(r+=1,o=!1),n-1!==t&&null)}),r},n.prototype._getPosition=function(t){var i,n,s,o,r,a,d;if(null==t&&(t="start"),o=this.editable.selection.range()[t+"Offset"],(n=(i=this.editable.selection[t+"Nodes"]()).first()[0]).nodeType===Node.TEXT_NODE){for(a=n.previousSibling;a&&a.nodeType===Node.TEXT_NODE;)n=a,o+=this.editable.util.getNodeLength(a),a=a.previousSibling;(s=i.get())[0]=n,i=e(s)}else o=this._getNodeOffset(n,o);return r=[o],i.each((d=this,function(t,e){return r.unshift(d._getNodeOffset(e))})),r},n.prototype._getNodeByPosition=function(t){var i,n,s,o,r,a,d,h;for(a=this.editable.body[0],s=o=0,r=(h=t.slice(0,t.length-1)).length;o<r;s=++o){if((d=h[s])>(n=a.childNodes).length-1){if(s!==t.length-2||!e(a).is(":empty")){a=null;break}i=document.createTextNode(""),a.appendChild(i),n=a.childNodes}a=n[d]}return a},n.prototype.caretPosition=function(t){var e,i,n,s,o;if(t){if(!t.start)return;return s=this._getNodeByPosition(t.start),o=t.start[t.start.length-1],t.collapsed?(e=s,i=o):(e=this._getNodeByPosition(t.end),i=t.start[t.start.length-1]),s&&e?((n=document.createRange()).setStart(s,o),n.setEnd(e,i),this.editable.selection.range(n)):void("undefined"!=typeof console&&null!==console&&"function"==typeof console.warn&&console.warn("simditor: invalid caret state"))}return n=this.editable.selection.range(),t=this.editable.inputManager.focused&&null!=n?{start:this.startPosition(),end:this.endPosition(),collapsed:n.collapsed}:{}},i.UndoManager=n});
//# sourceMappingURL=sourcemaps/undo-manager.js.map
