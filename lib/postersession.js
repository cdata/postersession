(function(_, window, document, undefined) {
	
	var $ = function() {
		
		return _(document.querySelectorAll.apply(document, arguments)).chain();
	};
	
	
	
	window.posterSession = $;
	
})(_, window, document);