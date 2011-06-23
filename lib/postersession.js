(function(_, window, document, undefined) {
    
    var $ = function() {
        
        return _(document.querySelectorAll.apply(document, arguments)).chain();
    };

    $.one = function() {

        return document.querySelector.apply(document, arguments);
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

    $.addEventListener = function(event, handler, captures) {
        
        var self = this;

        if(self.addEventListener) {
            
            self.addEventListener(event, handler, captures);
        } else {
            
            self.attachEvent('on' + event, handler);
        }
    };

    $.removeEventListener = function(event, handler, captures) {

        var self = this;

        if(self.removeEventListener) {

            self.removeEventListener(event, handler, captures);
        } else {

            self.detachEvent('on' + event, handler);
        }
    };

    $.addClass = function(className) {

        var self = this;

        if('classList' in self) {

            self.classList.add(className);
        } else {

            self.className += ' ' + className;
        }
    };

    $.removeClass = function(className) {

        if('classList' in self) {

            self.classList.remove(className);
        } else {

            var newClassList;

            while(newClassList = self.classList.replace(new RegExp('\s*' + className + '\s*', ''))) self.classList = newClassList;
        }
    };
    
    
    $.addEventListener.call(
        window,
        'DOMContentLoaded',
        function() {

            var body = $.one('body'),
                stack = $.one('body > ol'),
                slides = $('body > ol > li'),
                currentSlide = slides.value()[0],
                hud = document.createElement('nav'),
                smallNav = document.createElement('ol');

            stack.style.width = slides.value().length * window.outerWidth + 'px';

            $.addEventListener.call(

                window,
                'resize',
                function() {

                    $('body > ol > li').forEach(
                        function(li, index) {

                            stack.style.left = -1 * currentSlide.offsetLeft + 'px';
                            li.style.width = window.outerWidth + 'px';
                            li.style.height = window.outerHeight + 'px';
                        }
                    );
                }
            );

            body.appendChild(hud);
            hud.appendChild(smallNav);

            $('body > ol > li').forEach(
                function(li, index) {

                    var navElement = document.createElement('li'),
                        navLink = document.createElement('a'),
                        clickTimer;

                    li.style.width = window.outerWidth + 'px';
                    li.style.height = window.outerHeight + 'px';

                    smallNav.appendChild(navElement);
                    navElement.appendChild(navLink);
                    navLink.textContent = index;

                    $.addEventListener.call(
                        navLink,
                        'click',
                        function(event) {

                            stack.style.left = -1 * li.offsetLeft + 'px';
                        }
                    );

                    $.addEventListener.call(
                        li, 
                        'click',
                        function(event) {

                            if(event.target.tagName != "A") {
                                var previous = li.previousElementSibling,
                                    next = li.nextElementSibling;

                                if(clickTimer) {

                                    clearTimeout(clickTimer);
                                    clickTimer = null;

                                    if(previous) {

                                        currentSlide = previous;
                                        stack.style.left = -1 * previous.offsetLeft + 'px';
                                    }
                                } else {

                                    clickTimer = setTimeout(
                                        function() {

                                            clickTimer = null;

                                            if(next) {

                                                currentSlide = next;
                                                stack.style.left = -1 * next.offsetLeft + 'px';
                                            }
                                        },
                                        350
                                    );
                                }
                            }
                        }
                    );

                    // Wrap children in 'inner'
                    
                    var inner = document.createElement('div'),
                        children = li.childNodes.length;

                    $.addClass.call(inner, 'inner');

                    while(li.firstChild) {

                        inner.appendChild(li.firstChild);
                    }

                    li.appendChild(inner);

                    // Fix anchor targets
                    
                    $('body > ol > li a').forEach(

                        function(a, index) {

                            a.target = "_blank";
                        }
                    );
                }
            );
        }
    );

    window.posterSession = $;
    
})(_, window, document);
