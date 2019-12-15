/**
 * skylark-domx-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./contents"],function(e,t,i){var a=e.Evented.inherit({});return a.pluginName="Clipboard",a.prototype.opts={pasteImage:!1,cleanPaste:!1},a.prototype.init=function(t,i){var a;this.editable=t,this.opts=e.extend({},this.opts,i),this.opts.pasteImage&&"string"!=typeof this.opts.pasteImage&&(this.opts.pasteImage="inline"),this.editable.body.on("paste",(a=this,function(e){var t;if(!a.pasting&&!a._pasteBin)return!1!==a.editable.trigger(e)&&(t=a.editable.selection.deleteRangeContents(),a.editable.body.html()?t.collapsed||t.collapse(!0):(a.editable.formatter.format(),a.editable.selection.setRangeAtStartOf(a.editable.body.find("p:first"))),!a._processPasteByClipboardApi(e)&&(a.editable.inputManager.throttledValueChanged.clear(),a.editable.inputManager.throttledSelectionChanged.clear(),a.editable.undoManager.throttledPushState.clear(),a.editable.selection.reset(),a.editable.undoManager.resetCaretPosition(),a.pasting=!0,a._getPasteContent(function(e){return a._processPasteContent(e),a._pasteInBlockEl=null,a._pastePlainText=null,a.pasting=!1})))}))},a.prototype._processPasteByClipboardApi=function(e){var t,i,a,n;if(!this.editable.util.browser.edge&&e.originalEvent.clipboardData&&e.originalEvent.clipboardData.items&&e.originalEvent.clipboardData.items.length>0&&(i=e.originalEvent.clipboardData.items[0],/^image\//.test(i.type))){if(null==(t=i.getAsFile())||!this.opts.pasteImage)return;if(t.name||(t.name="Clipboard Image.png"),!1===this.editable.triggerHandler("pasting",[t]))return;return(n={})[this.opts.pasteImage]=!0,null!=(a=this.editable.uploader)&&a.upload(t,n),!0}},a.prototype._getPasteContent=function(e){var i,a;return this._pasteBin=t('<div contenteditable="true" />').addClass(this.opts.classPrefix+"paste-bin").attr("tabIndex","-1").appendTo(this.editable.$el),i={html:this.editable.body.html(),caret:this.editable.undoManager.caretPosition()},this._pasteBin.focus(),setTimeout((a=this,function(){var n;return a.editable.body.get(0).innerHTML=i.html,a.editable.undoManager.caretPosition(i.caret),a.editable.body.focus(),a.editable.selection.reset(),a.editable.selection.range(),a._pasteInBlockEl=a.editable.selection.blockNodes().last(),a._pastePlainText=a.opts.cleanPaste||a._pasteInBlockEl.is("pre, table"),a._pastePlainText?n=a.editable.formatter.clearHtml(a._pasteBin.html(),!0):((n=t("<div/>").append(a._pasteBin.contents())).find("style").remove(),n.find("table colgroup").remove(),a._cleanPasteFontSize(n),a.editable.formatter.format(n),a.editable.formatter.decorate(n),a.editable.formatter.beautify(n.children()),n=n.contents()),a._pasteBin.remove(),a._pasteBin=null,e(n)}),0)},a.prototype._processPasteContent=function(e){var i,a,n,s,l,o,r,d,p,c,b,h,g,f,u,m,v,y,_,I,E,P,C,x,B,k;if(!1!==this.editable.triggerHandler("pasting",[e])&&(i=this._pasteInBlockEl,e)){if(this._pastePlainText)if(i.is("table")){for(c=(v=e.split("\n")).pop(),d=0,b=v.length;d<b;d++)m=v[d],this.editable.selection.insertNode(document.createTextNode(m)),this.editable.selection.insertNode(t("<br/>"));this.editable.selection.insertNode(document.createTextNode(c))}else for(p=0,h=(P=(e=t("<div/>").text(e)).contents()).length;p<h;p++)_=P[p],this.editable.selection.insertNode(t(_)[0]);else if(i.is(this.editable.body))for(y=0,g=e.length;y<g;y++)_=e[y],this.editable.selection.insertNode(_);else{if(e.length<1)return;if(1===e.length)if(e.is("p")){if(s=e.contents(),i.is("h1, h2, h3, h4, h5")&&s.length&&s.css("font-size",""),1===s.length&&s.is("img")){if(/^data:image/.test((a=s).attr("src"))){if(!this.opts.pasteImage)return;return(n=this.editable.util.dataURLtoBlob(a.attr("src"))).name="Clipboard Image.png",(B={})[this.opts.pasteImage]=!0,void(null!=(C=this.editable.uploader)&&C.upload(n,B))}if(new RegExp("^blob:"+location.origin+"/").test(a.attr("src"))){if(!this.opts.pasteImage)return;return(B={})[this.opts.pasteImage]=!0,l=this.editable.util.dataURLtoBlob,k=this.editable.uploader,(o=new Image).onload=function(){var e;(e=document.createElement("canvas")).width=o.naturalWidth,e.height=o.naturalHeight,e.getContext("2d").drawImage(o,0,0),(n=l(e.toDataURL("image/png"))).name="Clipboard Image.png",null!==k&&k.upload(n,B)},void(o.src=a.attr("src"))}if(a.is('img[src^="webkit-fake-url://"]'))return}for(I=0,f=s.length;I<f;I++)_=s[I],this.editable.selection.insertNode(_)}else if(i.is("p")&&this.editable.util.isEmptyNode(i))i.replaceWith(e),this.editable.selection.setRangeAtEndOf(e);else if(e.is("ul, ol"))if(1===e.find("li").length)for(E=0,u=(x=(e=t("<div/>").text(e.text())).contents()).length;E<u;E++)_=x[E],this.editable.selection.insertNode(t(_)[0]);else i.is("li")?(i.parent().after(e),this.editable.selection.setRangeAtEndOf(e)):(i.after(e),this.editable.selection.setRangeAtEndOf(e));else i.after(e),this.editable.selection.setRangeAtEndOf(e);else i.is("li")&&(i=i.parent()),this.editable.selection.rangeAtStartOf(i)?r="before":this.editable.selection.rangeAtEndOf(i)?r="after":(this.editable.selection.breakBlockEl(i),r="before"),i[r](e),this.editable.selection.setRangeAtEndOf(e.last())}return this.editable.inputManager.throttledValueChanged()}},a.prototype._cleanPasteFontSize=function(i){var a,n;if((a=t(i)).length>0)return n=["1.5em","1.25em","0.75em","0.5em"],a.find('[style*="font-size"]').map(function(i,a){var s;if(s=t(a),e.inArray(s.css("font-size"),n)<0)return s.css("font-size","")})},i.Clipboard=a});
//# sourceMappingURL=sourcemaps/Clipboard.js.map
