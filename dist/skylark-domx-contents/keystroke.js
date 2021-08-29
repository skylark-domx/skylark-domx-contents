/**
 * skylark-domx-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./contents"],function(e,t,n){var i=e.Evented.inherit({init:function(t,n){this.editable=t,this.opts=e.extend({},this.opts,n),this._keystrokeHandlers={},this._initKeystrokeHandlers()}});return i.pluginName="Keystroke",i.prototype.add=function(e,t,n){return e=e.toLowerCase(),e=this.editable.hotkeys.constructor.aliases[e]||e,this._keystrokeHandlers[e]||(this._keystrokeHandlers[e]={}),this._keystrokeHandlers[e][t]=n},i.prototype.respondTo=function(e){var n,i,r,l,a;if(i=null!=(r=this.editable.hotkeys.constructor.keyNameMap[e.which])?r.toLowerCase():void 0)return!!(i in this._keystrokeHandlers&&((l="function"==typeof(n=this._keystrokeHandlers[i])["*"]?n["*"](e):void 0)||this.editable.selection.startNodes().each((a=this,function(n,r){var s,o;if(r.nodeType===Node.ELEMENT_NODE)return s=null!=(o=a._keystrokeHandlers[i])?o[r.tagName.toLowerCase()]:void 0,!0!==(l="function"==typeof s?s(e,t(r)):void 0)&&!1!==l&&void 0})),l))||void 0},i.prototype._initKeystrokeHandlers=function(){var e,n;return this.editable.util.browser.safari&&this.add("enter","*",(n=this,function(e){var i,r;if(e.shiftKey&&!(i=n.editable.selection.blockNodes().last()).is("pre"))return r=t("<br/>"),n.editable.selection.rangeAtEndOf(i)?(n.editable.selection.insertNode(r),n.editable.selection.insertNode(t("<br/>")),n.editable.selection.setRangeBefore(r)):n.editable.selection.insertNode(r),!0})),(this.editable.util.browser.webkit||this.editable.util.browser.msie)&&(e=function(e){return function(n,i){var r;if(e.editable.selection.rangeAtEndOf(i))return r=t("<p/>").append(e.editable.util.phBr).insertAfter(i),e.editable.selection.setRangeAtStartOf(r),!0}}(this),this.add("enter","h1",e),this.add("enter","h2",e),this.add("enter","h3",e),this.add("enter","h4",e),this.add("enter","h5",e),this.add("enter","h6",e)),this.add("backspace","*",function(e){return function(t){var n,i,r;return(i=(r=e.editable.selection.rootNodes().first()).prev()).is("hr")&&e.editable.selection.rangeAtStartOf(r)?(e.editable.selection.save(),i.remove(),e.editable.selection.restore(),!0):((n=e.editable.selection.blockNodes().last()).is("."+e.opts.classPrefix+"resize-handle")&&r.is("."+e.opts.classPrefix+"table")&&(t.preventDefault(),r.remove(),e.editable.selection.setRangeAtEndOf(i)),i.is("."+e.opts.classPrefix+"table")&&!n.is("table")&&e.editable.util.isEmptyNode(n)&&(t.preventDefault(),n.remove(),e.editable.selection.setRangeAtEndOf(i)),e.editable.util.browser.webkit&&e.editable.selection.rangeAtStartOf(n)?(e.editable.selection.save(),e.editable.formatter.cleanNode(n,!0),e.editable.selection.restore(),null):void 0)}}(this)),this.add("enter","div",function(e){return function(n,i){var r;if(i.is("."+e.opts.classPrefix+"table")&&e.editable.selection.blockNodes().last().is("."+e.opts.classPrefix+"resize-handle"))return n.preventDefault(),r=t("<p/>").append(e.editable.util.phBr).insertAfter(i),e.editable.selection.setRangeAtStartOf(r)}}(this)),this.add("enter","li",function(e){return function(n,i){var r,l,a,s;if((r=i.clone()).find("ul, ol").remove(),e.editable.util.isEmptyNode(r)&&i.is(e.editable.selection.blockNodes().last())){if(l=i.parent(),i.next("li").length>0){if(!e.editable.util.isEmptyNode(i))return;l.parent("li").length>0?(a=t("<li/>").append(e.editable.util.phBr).insertAfter(l.parent("li")),s=t("<"+l[0].tagName+"/>").append(i.nextAll("li")),a.append(s)):(a=t("<p/>").append(e.editable.util.phBr).insertAfter(l),s=t("<"+l[0].tagName+"/>").append(i.nextAll("li")),a.after(s))}else l.parent("li").length>0?(a=t("<li/>").insertAfter(l.parent("li")),i.contents().length>0?a.append(i.contents()):a.append(e.editable.util.phBr)):(a=t("<p/>").append(e.editable.util.phBr).insertAfter(l),i.children("ul, ol").length>0&&a.after(i.children("ul, ol")));return i.prev("li").length?i.remove():i.prev("ul").length||i.prev("ol").length?i.remove():l.remove(),e.editable.selection.setRangeAtStartOf(a),!0}}}(this)),this.add("enter","pre",function(e){return function(n,i){var r,l,a;return n.preventDefault(),n.shiftKey?(r=t("<p/>").append(e.editable.util.phBr).insertAfter(i),e.editable.selection.setRangeAtStartOf(r),!0):(l=null,(a=e.editable.selection.range()).deleteContents(),l=!e.editable.util.browser.msie&&e.editable.selection.rangeAtEndOf(i)?document.createTextNode("\n\n"):document.createTextNode("\n"),a.insertNode(l),a.setEnd(l,1),a.collapse(!1),e.editable.selection.range(a),!0)}}(this)),this.add("enter","blockquote",function(e){return function(t,n){var i,r;if((i=e.editable.selection.blockNodes().last()).is("p")&&!i.next().length&&e.editable.util.isEmptyNode(i))return n.after(i),r=document.createRange(),e.editable.selection.setRangeAtStartOf(i,r),!0}}(this)),this.add("backspace","li",function(e){return function(n,i){var r,l,a,s,o,d,c,u,p;return l=i.children("ul, ol"),o=i.prev("li"),l.length>0&&o.length>0&&(p="",d=null,i.contents().each(function(e,n){return(1!==n.nodeType||!/UL|OL/.test(n.nodeName))&&(1===n.nodeType&&/BR/.test(n.nodeName)?void 0:(3===n.nodeType&&n.nodeValue?p+=n.nodeValue:1===n.nodeType&&(p+=t(n).text()),d=t(n)))}),c=e.editable.util.browser.firefox&&!d.next("br").length,d&&1===p.length&&c?(r=t(e.editable.util.phBr).insertAfter(d),d.remove(),e.editable.selection.setRangeBefore(r),!0):!(p.length>0)&&(u=document.createRange(),(s=o.children("ul, ol")).length>0?(a=t("<li/>").append(e.editable.util.phBr).appendTo(s),s.append(l.children("li")),i.remove(),e.editable.selection.setRangeAtEndOf(a,u)):(e.editable.selection.setRangeAtEndOf(o,u),o.append(l),i.remove(),e.editable.selection.range(u)),!0))}}(this)),this.add("backspace","pre",function(e){return function(n,i){var r,l,a;if(e.editable.selection.rangeAtStartOf(i))return l=i.html().replace("\n","<br/>")||e.editable.util.phBr,r=t("<p/>").append(l).insertAfter(i),i.remove(),a=document.createRange(),e.editable.selection.setRangeAtStartOf(r,a),!0}}(this)),this.add("backspace","blockquote",function(e){return function(t,n){var i,r;if(e.editable.selection.rangeAtStartOf(n))return i=n.children().first().unwrap(),r=document.createRange(),e.editable.selection.setRangeAtStartOf(i,r),!0}}(this))},n.Keystroke=i});
//# sourceMappingURL=sourcemaps/keystroke.js.map