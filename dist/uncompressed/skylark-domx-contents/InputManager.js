define([
  "skylark-langx/langx",
  "skylark-utils-dom/query",
  "./contents"
],function(langx,$,contents){ 
 

  var indexOf = [].indexOf ;

  var InputManager = langx.Evented.inherit({
    init : function(editor,opts) {
      this.editor = editor;
      this.opts = langx.extend({}, this.opts, opts);

      var selectAllKey, submitKey;
      this.throttledValueChanged = this.editor.util.throttle((function(_this) {
        return function(params) {
          return setTimeout(function() {
            return _this.editor.trigger('valuechanged', params);
          }, 10);
        };
      })(this), 300);
      this.throttledSelectionChanged = this.editor.util.throttle((function(_this) {
        return function() {
          return _this.editor.trigger('selectionchanged');
        };
      })(this), 50);
      $(document).on('selectionchange.simditor' + this.editor.id, (function(_this) {
        return function(e) {
          var triggerEvent;
          if (!(_this.focused && !_this.editor.clipboard.pasting)) {
            return;
          }
          triggerEvent = function() {
            if (_this._selectionTimer) {
              clearTimeout(_this._selectionTimer);
              _this._selectionTimer = null;
            }
            if (_this.editor.selection._selection.rangeCount > 0) {
              return _this.throttledSelectionChanged();
            } else {
              return _this._selectionTimer = setTimeout(function() {
                _this._selectionTimer = null;
                if (_this.focused) {
                  return triggerEvent();
                }
              }, 10);
            }
          };
          return triggerEvent();
        };
      })(this));
      this.editor.on('valuechanged', (function(_this) {
        return function() {
          var $rootBlocks;
          _this.lastCaretPosition = null;
          $rootBlocks = _this.editor.body.children().filter(function(i, node) {
            return _this.editor.util.isBlockNode(node);
          });
          if (_this.focused && $rootBlocks.length === 0) {
            _this.editor.selection.save();
            _this.editor.formatter.format();
            _this.editor.selection.restore();
          }
          _this.editor.body.find('hr, pre, .' + _this.opts.classPrefix + 'table').each(function(i, el) {
            var $el, formatted;
            $el = $(el);
            if ($el.parent().is('blockquote') || $el.parent()[0] === _this.editor.body[0]) {
              formatted = false;
              if ($el.next().length === 0) {
                $('<p/>').append(_this.editor.util.phBr).insertAfter($el);
                formatted = true;
              }
              if ($el.prev().length === 0) {
                $('<p/>').append(_this.editor.util.phBr).insertBefore($el);
                formatted = true;
              }
              if (formatted) {
                return _this.throttledValueChanged();
              }
            }
          });
          _this.editor.body.find('pre:empty').append(_this.editor.util.phBr);
          if (!_this.editor.util.support.onselectionchange && _this.focused) {
            return _this.throttledSelectionChanged();
          }
        };
      })(this));
      this.editor.body.on('keydown', langx.proxy(this._onKeyDown, this)).on('keypress', langx.proxy(this._onKeyPress, this)).on('keyup', langx.proxy(this._onKeyUp, this)).on('mouseup', langx.proxy(this._onMouseUp, this)).on('focus', langx.proxy(this._onFocus, this)).on('blur', langx.proxy(this._onBlur, this)).on('drop', langx.proxy(this._onDrop, this)).on('input', langx.proxy(this._onInput, this));
      if (this.editor.util.browser.firefox) {
        this.editor.hotkeys.add('cmd+left', (function(_this) {
          return function(e) {
            e.preventDefault();
            _this.editor.selection._selection.modify('move', 'backward', 'lineboundary');
            return false;
          };
        })(this));
        this.editor.hotkeys.add('cmd+right', (function(_this) {
          return function(e) {
            e.preventDefault();
            _this.editor.selection._selection.modify('move', 'forward', 'lineboundary');
            return false;
          };
        })(this));
        selectAllKey = this.editor.util.os.mac ? 'cmd+a' : 'ctrl+a';
        this.editor.hotkeys.add(selectAllKey, (function(_this) {
          return function(e) {
            var $children, firstBlock, lastBlock, range;
            $children = _this.editor.body.children();
            if (!($children.length > 0)) {
              return;
            }
            firstBlock = $children.first().get(0);
            lastBlock = $children.last().get(0);
            range = document.createRange();
            range.setStart(firstBlock, 0);
            range.setEnd(lastBlock, _this.editor.util.getNodeLength(lastBlock));
            _this.editor.selection.range(range);
            return false;
          };
        })(this));
      }
      submitKey = this.editor.util.os.mac ? 'cmd+enter' : 'ctrl+enter';
      this.editor.hotkeys.add(submitKey, (function(_this) {
        return function(e) {
          _this.editor.el.closest('form').find('button:submit').click();
          return false;
        };
      })(this));
    }

  });

  InputManager.pluginName = 'InputManager';

  InputManager.prototype._modifierKeys = [16, 17, 18, 91, 93, 224];

  InputManager.prototype._arrowKeys = [37, 38, 39, 40];


  InputManager.prototype._onFocus = function(e) {
    if (this.editor.clipboard.pasting) {
      return;
    }
    this.editor.el.addClass('focus').removeClass('error');
    this.focused = true;
    return setTimeout((function(_this) {
      return function() {
        var $blockEl, range;
        range = _this.editor.selection._selection.getRangeAt(0);
        if (range.startContainer === _this.editor.body[0]) {
          if (_this.lastCaretPosition) {
            _this.editor.undoManager.caretPosition(_this.lastCaretPosition);
          } else {
            $blockEl = _this.editor.body.children().first();
            range = document.createRange();
            _this.editor.selection.setRangeAtStartOf($blockEl, range);
            console.log("aaaaaa");
          }
        }
        _this.lastCaretPosition = null;
        _this.editor.trigger('focus');
        if (!_this.editor.util.support.onselectionchange) {
          return _this.throttledSelectionChanged();
        }
      };
    })(this), 0);
  };

  InputManager.prototype._onBlur = function(e) {
    var ref;
    if (this.editor.clipboard.pasting) {
      return;
    }
    this.editor.el.removeClass('focus');
    this.editor.sync();
    this.focused = false;
    this.lastCaretPosition = (ref = this.editor.undoManager.currentState()) != null ? ref.caret : void 0;
    return this.editor.trigger('blur');
  };

  InputManager.prototype._onMouseUp = function(e) {
    if (!this.editor.util.support.onselectionchange) {
      return this.throttledSelectionChanged();
    }
  };

  InputManager.prototype._onKeyDown = function(e) {
    var ref, ref1;
    if (this.editor.trigger(e) === false) {
      return false;
    }
    if (this.editor.hotkeys.respondTo(e)) {
      return;
    }
    if (this.editor.keystroke.respondTo(e)) {
      this.throttledValueChanged();
      return false;
    }
    if ((ref = e.which, indexOf.call(this._modifierKeys, ref) >= 0) || (ref1 = e.which, indexOf.call(this._arrowKeys, ref1) >= 0)) {
      return;
    }
    if (this.editor.util.metaKey(e) && e.which === 86) {
      return;
    }
    if (!this.editor.util.support.oninput) {
      this.throttledValueChanged(['typing']);
    }
    return null;
  };

  InputManager.prototype._onKeyPress = function(e) {
    if (this.editor.trigger(e) === false) {
      return false;
    }
  };

  InputManager.prototype._onKeyUp = function(e) {
    var p, ref;
    if (this.editor.trigger(e) === false) {
      return false;
    }
    if (!this.editor.util.support.onselectionchange && (ref = e.which, indexOf.call(this._arrowKeys, ref) >= 0)) {
      this.throttledValueChanged();
      return;
    }
    if ((e.which === 8 || e.which === 46) && this.editor.util.isEmptyNode(this.editor.body)) {
      this.editor.body.empty();
      p = $('<p/>').append(this.editor.util.phBr).appendTo(this.editor.body);
      this.editor.selection.setRangeAtStartOf(p);
    }
  };

  InputManager.prototype._onDrop = function(e) {
    if (this.editor.trigger(e) === false) {
      return false;
    }
    return this.throttledValueChanged();
  };

  InputManager.prototype._onInput = function(e) {
    return this.throttledValueChanged(['oninput']);
  };

  return contents.InputManager = InputManager;

});
