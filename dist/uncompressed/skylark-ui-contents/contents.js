define([
    "skylark-langx/skylark",
    "skylark-langx/langx",
    "skylark-utils-dom/noder",
    "skylark-utils-dom/datax"
], function(skylark, langx, noder,datax) {
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


    contents.execCommand = function(node,command) {
   	    document.execCommand(command, false, null);
    };

    return skylark.attach("ui.contents",contents);

});