    // ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});


$(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
         $('.setting-menu').addClass('fixed');
    } else {
         $('.setting-menu').removeClass('fixed');
    }
});

$(document).ready(function () {
	if($('#productLongDescription').height() > 100) {
		// this function is for detecting transition event capabilities in the browser with jQuery - use $.support.transition in your if statements
		$.support.transition = (function() {
			var thisBody = document.body || document.documentElement,
				thisStyle = thisBody.style,
				support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
			return support;
		})();
		
		// setup initial variables
		var $copyWrapper = $('#productLongDescription');
		
		$copyWrapper.each(function() {
		
			$('<div class="btn-reveal text-center mb-5"><span class="more-less"><i class="fa-solid fa-caret-down"></i></span></div>').insertAfter('#productLongDescription');
		
			// add a class to know we're doing stuff here
			var $moreLess = $('.more-less');
		
			// add a class to know we're doing stuff here
			$(this).addClass('initialized');
		
			var copyHeight = parseFloat($(this).css('max-height')),
				$copyInner;
		
			// check to see if the text is long enough to even worry with this mess
			if ($(this).height() < copyHeight) {
				$(this).css({
					'max-height': 'none'
				}); // if so, clear the max-height so their aren't any problems resizing
			} else {
				// add the inner div
				$(this).wrapInner('<div class="copy__inner"></div>');
				$copyInner = $(this).find('.copy__inner');
		
				// add the gradient overlay
				$(this).append('<div class="copy__gradient"></div>');
		
				// add click functionality
				$moreLess.click(function() {
					// setup variables
					var maxHeight;
		
					// if css transitions are supported, we'll use those
					if ($.support.transition) {
						maxHeight = {
							'max-height': $copyInner.outerHeight(true)
						};
					} else { // if not, we'll override max-height so everything shows
						maxHeight = {
							'max-height': 'none'
						};
					}
		
					// if the element has the 'reveal' class, we're setting it back to stock
					if ($copyWrapper.hasClass('reveal')) {
						$copyWrapper.css(maxHeight); // set the max-height to the height of the contents
						$copyWrapper.css('max-height'); // force the stupid browser to repaint
						$copyWrapper.css({
							'max-height': copyHeight,
							'transition': ''
						}); // set the heights back to the default value
					} else {
						$copyWrapper.css(maxHeight);
						$copyWrapper.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
							if (e.target === e.currentTarget) { // to keep multiple events from being fired (because of children elements with transitions)
								$copyWrapper.css({
									'max-height': 'none',
									'transition': 'none'
								}); // set the max-height to none after the transition so page-resizing works
								$copyWrapper.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'); // unbind the transition event so it doesn't fire when we collapse the div again
							}
						});
					}
		
					$copyWrapper.toggleClass("reveal");
				});
			}
		
		});
	}
});


 $(document).ready(function() {
    if($( window ).width() < 768) {
        $(".footer-menu-section .title-footer").click(function() {
            $(this).siblings('.footer-menu-section ul').slideToggle('slow');
            $(this).toggleClass('ws-activearrow').parent().siblings().children().removeClass('ws-activearrow');
        });
    }
});  

// Contact Fixed
$(document).ready(function() {
    $('.contact-fixed').click(function() {
        $('.contact-fixed__list').toggleClass('show');
        $('.contact-fixed__close').toggleClass('show');
        $('.contact-fixed__button').toggleClass('show');
    });
});
// End Contact Fixed