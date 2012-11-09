/*global jQuery */
/*! 
* IsOnScreen.js 0.1 <jtrujillo@goindex.com>
* returns true if any portion of the element is visible in the viewport (considering element’s position and dimension, compared to dimension and scroll position of window).
*
* Date: Thu Nov 08 18:46:00 2012 -0600
*/

(function( $ ){

    $.fn.onScreen = function(callbackFnk){
        

        return this.each(function() {
            
            // Store the object
            var $this = $(this); 
            var prevState_show = false;

            var onScreenCheck = function () {
                var win = $(window);
                 
                var viewport = {
                    top : win.scrollTop(),
                    left : win.scrollLeft()
                };
                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();
                 
                var bounds = $this.offset();
                bounds.right = bounds.left + $this.outerWidth();
                bounds.bottom = bounds.top + $this.outerHeight();
                 
                return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            };

            var launchCallback = function() {
                var track = onScreenCheck();
                if((track && !prevState_show) || (!track && prevState_show)) {
                    // now we are calling our own callback function
                    if(typeof callbackFnk == 'function'){
                        callbackFnk.call($this,track);
                    }
                }
                prevState_show = track;
            };

            launchCallback();

            $(window).scroll(launchCallback);
        
        });
         
    };

})( jQuery );