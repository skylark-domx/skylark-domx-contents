define([
    "./dom",
    "./langx",
    "./noder",
    "./datax"
], function(dom, langx, noder,datax) {
    "use strict";

    var contents = function() {
        return contents;
    };

    var commands =  [
    	"bold", // toggle 
    	"insertImage",
    	"insertorderedlist",
    	"insertunorderedlist",
    	"italic", // toggle
    	"justifyLeft",
    	"justifyCenter",
    	"justifyFull",
    	"justifyRight",
    	"strikeThrough",
    	"underline",
    	"undo"
    ];

	contents.editable = function(node,value) {
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
		
	};

    contents.execCommand = function(node,command) {
   	    document.execCommand(command, false, null);
    };

    return dom.contents =contents;

});