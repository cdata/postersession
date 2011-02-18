(function(_, window, document, undefined) {
    
    var $ = function() {
        
        return _(document.querySelectorAll.apply(document, arguments)).chain();
    };
    
    $.log = function(out) {
        
        try {
            
            console.log(out);
        } catch(e) {}
    };
    
    $.error = function(out) {
        
        try {
        
            console.error(out);
        } catch(e) {
            
            $.log(out);
        }
    };
    
    $.inspect = function(object) {
       
        try {
            
            console.info(object);
        } catch(e) {
            
            $.log(out);
        }
    };
    
    window.posterSession = $;
    
})(_, window, document);