/**
 * skylark-domx-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-noder","skylark-domx-query","./contents"],function(e,t,n,s){var i=e.Evented.inherit({_range:null,_startNodes:null,_endNodes:null,_containerNode:null,_nodes:null,_blockNodes:null,_rootNodes:null,init:function(t,n){var s=this;this.editable=t,this.opts=e.extend({},this.opts,n),this._selection=document.getSelection(),this.editable.on("selectionchanged",function(e){return console.log("selectionchanged"),s.reset(),s._range=s._selection.getRangeAt(0)}),this.editable.on("blur",function(e){return s.reset()}),this.editable.on("focus",function(e){return s.reset(),s._range=s._selection.getRangeAt(0)})},reset:function(){return this._range=null,this._startNodes=null,this._endNodes=null,this._containerNode=null,this._nodes=null,this._blockNodes=null,this._rootNodes=null},clear:function(){try{this._selection.removeAllRanges(),console.log("clear")}catch(e){e}return this.reset()},range:function(t){var n;return t?(this.clear(),this._selection.addRange(t),this._range=t,n=e.hoster.browser.mozilla||e.hoster.browser.msie,!this.editable.inputManager.focused&&n&&this.editable.body.focus()):!this._range&&this.editable.inputManager.focused&&this._selection.rangeCount&&(this._range=this._selection.getRangeAt(0)),this._range},startNodes:function(){var e;return this._range&&(this._startNodes||(this._startNodes=(e=this,function(){var t;return(t=n(e._range.startContainer).parentsUntil(e.editable.body).get()).unshift(e._range.startContainer),n(t)})())),this._startNodes},endNodes:function(){var e;return this._range&&(this._endNodes||(this._endNodes=this._range.collapsed?this.startNodes():((e=n(this._range.endContainer).parentsUntil(this.editable.body).get()).unshift(this._range.endContainer),n(e)))),this._endNodes},containerNode:function(){return this._range&&(this._containerNode||(this._containerNode=n(this._range.commonAncestorContainer))),this._containerNode},nodes:function(){var t;return this._range&&(this._nodes||(this._nodes=(t=this,function(){var s;return s=[],t.startNodes().first().is(t.endNodes().first())?s=t.startNodes().get():(t.startNodes().each(function(i,r){var o,a,l,d,c,h,u;return a=n(r),t.endNodes().index(a)>-1?s.push(r):a.parent().is(t.editable.body)||(h=t.endNodes().index(a.parent()))>-1?(o=h&&h>-1?t.endNodes().eq(h-1):t.endNodes().last(),u=(l=a.parent().contents()).index(a),d=l.index(o),e.merge(s,l.slice(u,d).get())):(c=(l=a.parent().contents()).index(a),e.merge(s,l.slice(c).get()))}),t.endNodes().each(function(i,r){var o,a,l;return(o=n(r)).parent().is(t.editable.body)||t.startNodes().index(o.parent())>-1?(s.push(r),!1):(l=(a=o.parent().contents()).index(o),e.merge(s,a.slice(0,l+1)))})),n(e.uniq(s))})())),this._nodes},blockNodes:function(){var e;if(this._range)return this._blockNodes||(this._blockNodes=(e=this,function(){return e.nodes().filter(function(t,n){return e.editable.util.isBlockNode(n)})})()),this._blockNodes},rootNodes:function(){var e;if(this._range)return this._rootNodes||(this._rootNodes=(e=this,function(){return e.nodes().filter(function(t,s){var i;return(i=n(s).parent()).is(e.editable.body)||i.is("blockquote")})})()),this._rootNodes},rangeAtEndOf:function(e,s){var i,r,o,a,l,d;if(null==s&&(s=this.range()),s&&s.collapsed)return e=n(e)[0],o=s.endContainer,a=this.editable.util.getNodeLength(o),r=s.endOffset===a-1,l=n(o).contents().last().is("br"),i=s.endOffset===a,!!(r&&l||i)&&(e===o||!!t.contains(e,o)&&(d=!0,n(o).parentsUntil(e).addBack().each(function(e,t){var s,i,r;if(r=(s=n(t).parent().contents().filter(function(){return!(this!==t&&3===this.nodeType&&!this.nodeValue)}).last()).get(0)===t,i=s.is("br")&&s.prev().get(0)===t,!r&&!i)return d=!1,!1}),d))},rangeAtStartOf:function(e,s){var i,r;if(null==s&&(s=this.range()),s&&s.collapsed)return e=n(e)[0],r=s.startContainer,0===s.startOffset&&(e===r||!!t.contains(e,r)&&(i=!0,n(r).parentsUntil(e).addBack().each(function(e,t){if(n(t).parent().contents().filter(function(){return!(this!==t&&3===this.nodeType&&!this.nodeValue)}).first().get(0)!==t)return i=!1}),i))},insertNode:function(e,t){if(null==t&&(t=this.range()),t)return e=n(e)[0],t.insertNode(e),this.setRangeAfter(e,t)},setRangeAfter:function(e,t){if(null==t&&(t=this.range()),null!=t)return e=n(e)[0],t.setEndAfter(e),t.collapse(!1),this.range(t)},setRangeBefore:function(e,t){if(null==t&&(t=this.range()),null!=t)return e=n(e)[0],t.setEndBefore(e),t.collapse(!1),this.range(t)},setRangeAtStartOf:function(e,t){return null==t&&(t=this.range()),e=n(e).get(0),t.setEnd(e,0),t.collapse(!1),this.range(t)},setRangeAtEndOf:function(e,t){var s,i,r,o,a,l,d;if(null==t&&(t=this.range()),e=(i=n(e))[0])return i.is("pre")?(r=i.contents()).length>0?(l=(o=r.last()).text(),a=this.editable.util.getNodeLength(o[0]),"\n"===l.charAt(l.length-1)?t.setEnd(o[0],a-1):t.setEnd(o[0],a)):t.setEnd(e,0):(d=this.editable.util.getNodeLength(e),3!==e.nodeType&&d>0&&((s=n(e).contents().last()).is("br")?d-=1:3!==s[0].nodeType&&this.editable.util.isEmptyNode(s)&&(s.append(this.editable.util.phBr),e=s[0],d=0)),t.setEnd(e,d)),t.collapse(!1),this.range(t)},deleteRangeContents:function(e){var t,n,s,i;return null==e&&(e=this.range()),i=e.cloneRange(),s=e.cloneRange(),i.collapse(!0),s.collapse(!1),n=this.rangeAtStartOf(this.editable.body,i),t=this.rangeAtEndOf(this.editable.body,s),!e.collapsed&&n&&t?(this.editable.body.empty(),e.setStart(this.editable.body[0],0),e.collapse(!0),this.range(e)):e.deleteContents(),e},breakBlockEl:function(e,t){var s;return null==t&&(t=this.range()),s=n(e),t.collapsed?(t.setStartBefore(s.get(0)),t.collapsed?s:s.before(t.extractContents())):s},save:function(e){var t,s,i;if(null==e&&(e=this.range()),!this._selectionSaved)return(s=e.cloneRange()).collapse(!1),i=n("<span/>").addClass(this.opts.classPrefix+"caret-start"),t=n("<span/>").addClass(this.opts.classPrefix+"caret-end"),s.insertNode(t[0]),e.insertNode(i[0]),this.clear(),this._selectionSaved=!0},restore:function(){var e,t,n,s,i,r,o;return!!this._selectionSaved&&(i=this.editable.body.find("."+this.opts.classPrefix+"caret-start"),e=this.editable.body.find("."+this.opts.classPrefix+"caret-end"),i.length&&e.length?(o=(r=i.parent()).contents().index(i),n=(t=e.parent()).contents().index(e),r[0]===t[0]&&(n-=1),(s=document.createRange()).setStart(r.get(0),o),s.setEnd(t.get(0),n),i.remove(),e.remove(),this.range(s)):(i.remove(),e.remove()),this._selectionSaved=!1,s)}});return i.pluginName="Selection",s.Selection=i});
//# sourceMappingURL=sourcemaps/Selection.js.map
