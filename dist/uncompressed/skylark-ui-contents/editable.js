define([
	"./contents"
],function(contents){

	function editable(node,value) {
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


	return contents.editable  = editable;
	
});