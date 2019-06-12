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


    return skylark.attach("domx.contents",contents);

});