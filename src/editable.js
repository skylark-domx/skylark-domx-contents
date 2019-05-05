define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"./contents",
	"./hotkeys",
	"./Util",
	"./InputManager", 
	"./Selection", 
	"./UndoManager", 
	"./Keystroke",
	"./Formatter", 
	"./Indentation", 
	"./Clipboard"
],function(langx, $, contents,hotkeys,Util,InputManager,Selection,UndoManager,Keystroke,Formatter,Indentation,Clipboard){
  var Editor = langx.Evented.inherit({
    init : function(el,opts) {
    	this.el = el;
    	this.textarea = $(opts.textarea);
    	this.body = $(opts.body);

    	var pluginOpts = {
    		classPrefix : opts.classPrefix
    	};

      this.util = new Util(this,pluginOpts);

      if (hotkeys) {
        this.hotkeys = hotkeys({
          el: this.body
        });
      } else {
        throw new Error('simditor: simple-hotkeys is required.');
        return;
      }
      this.inputManager = new InputManager(this,pluginOpts);
      this.selection = new Selection(this,pluginOpts);
      this.undoManager = new UndoManager(this,pluginOpts);
      this.keystroke = new Keystroke(this,pluginOpts);
      this.formatter = new Formatter(this,pluginOpts);
      this.indentation = new Indentation(this,pluginOpts);
      this.clipboard = new Clipboard(this,pluginOpts);

		if (this.util.os.mac) {
		  this.el.addClass(opts.classPrefix + 'mac');
		} else if (this.util.os.linux) {
		  this.el.addClass(opts.classPrefix + 'linux');
		}
		if (this.util.os.mobile) {
		  this.el.addClass(opts.classPrefix + 'mobile');
		}

      if (this.util.browser.mozilla) {
        this.util.reflow();
        try {
          document.execCommand('enableObjectResizing', false, false);
          return document.execCommand('enableInlineTableEditing', false, false);
        } catch (_error) {
          e = _error;
        }
      }

    },

	setValue : function(val) {
		this.textarea.val(val);
		this.body.get(0).innerHTML = val;
		this.formatter.format();
		this.formatter.decorate();
		this.util.reflow(this.body);
		this.inputManager.lastCaretPosition = null;
	},

	getValue : function() {
		return this.sync();
	},

	sync : function() {
		var children, cloneBody, emptyP, firstP, lastP, val;
		cloneBody = this.body.clone();
		this.formatter.undecorate(cloneBody);
		this.formatter.format(cloneBody);
		this.formatter.autolink(cloneBody);
		children = cloneBody.children();
		lastP = children.last('p');
		firstP = children.first('p');
		while (lastP.is('p') && this.util.isEmptyNode(lastP)) {
		  emptyP = lastP;
		  lastP = lastP.prev('p');
		  emptyP.remove();
		}
		while (firstP.is('p') && this.util.isEmptyNode(firstP)) {
		  emptyP = firstP;
		  firstP = lastP.next('p');
		  emptyP.remove();
		}
		cloneBody.find('img.uploading').remove();
		val = langx.trim(cloneBody.html());
		this.textarea.val(val);
		return val;
	},

	focus : function() {
		var $blockEl, range;
		if (!(this.body.is(':visible') && this.body.is('[contenteditable]'))) {
		  this.el.find('textarea:visible').focus();
		  return;
		}
		if (this.inputManager.lastCaretPosition) {
		  this.undoManager.caretPosition(this.inputManager.lastCaretPosition);
		  return this.inputManager.lastCaretPosition = null;
		} else {
		  $blockEl = this.body.children().last();
		  if (!$blockEl.is('p')) {
		    $blockEl = $('<p/>').append(this.util.phBr).appendTo(this.body);
		  }
		  range = document.createRange();
		  return this.selection.setRangeAtEndOf($blockEl, range);
		}
	},

	blur : function() {
		if (this.body.is(':visible') && this.body.is('[contenteditable]')) {
		  return this.body.blur();
		} else {
		  return this.body.find('textarea:visible').blur();
		}
	}


  });


	function editable(el,opts) {

		/*	
		if (value === undefined) {
   			return node.contentEditable == "true"
		} else {
			if (!value) {
				value = null;
			} else {
				value = "true";
			}
			datax.attr(node,"contentEditable",value);
		}
		*/
		return new Editor(el,opts);
		
	};


	return contents.editable  = editable;
	
});