; (function ($) {
    'use strict';

    /*=================================
     JS Index Here
    ==================================*/
    /*
      00. Popup Sidemenu
      01. Service Slider
      02. FAQ 
    */
    /*=================================
        JS Index End
    ==================================*/

    $(window).on('elementor/frontend/init', function () {


        /*----------  Global Js ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope, $) {
            $.fn.vsTab = function (options) {
                var opt = $.extend(
                    {
                        sliderTab: false,
                        tabButton: "button",
                        indicator: false,
                    },
                    options
                );

                $(this).each(function () {
                    var $menu = $(this);
                    var $button = $menu.find(opt.tabButton);

                    // On Click Button Class Remove and indecator postion set
                    $button.on("click", function (e) {
                        e.preventDefault();
                        var cBtn = $(this);
                        cBtn.addClass("active").siblings().removeClass("active");
                        if (opt.sliderTab) {
                            $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
                        }
                    });

                    // Work With slider
                    if (opt.sliderTab) {
                        var slider = $menu.data("asnavfor"); // select slider

                        // Select All button and set attribute
                        var i = 0;
                        $button.each(function () {
                            var slideBtn = $(this);
                            slideBtn.attr("data-slide-go-to", i);
                            i++;

                            // Active Slide On load > Actived Button
                            if (slideBtn.hasClass("active")) {
                                $(slider).slick("slickGoTo", slideBtn.data("slide-go-to"));
                            }

                            // Change Indicator On slide Change
                            $(slider).on(
                                "beforeChange",
                                function (travolo, slick, currentSlide, nextSlide) {
                                    $menu
                                        .find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]')
                                        .addClass("active")
                                        .siblings()
                                        .removeClass("active");
                                }
                            );
                        });
                    }
                });
            };
        });

        /*---------- 00. Popup Sidemenu ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/travolooffcanvas.default', function ($scope) {
            function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
                // Sidebar Popup
                $($sideMunuOpen).on("click", function (e) {
                    e.preventDefault();
                    $($sideMenu).addClass($toggleCls);
                });
                $($sideMenu).on("click", function (e) {
                    e.stopPropagation();
                    $($sideMenu).removeClass($toggleCls);
                });
                var sideMenuChild = $sideMenu + " > div";
                $(sideMenuChild).on("click", function (e) {
                    e.stopPropagation();
                    $($sideMenu).addClass($toggleCls);
                });
                $($sideMenuCls).on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $($sideMenu).removeClass($toggleCls);
                });
            }

            popupSideMenu(
                ".sidemenu-wrapper",
                ".sideMenuToggler",
                ".sideMenuCls",
                "show"
            );
        });

        /*----------- 01. Testimonial Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/travolotestimonialsliders.default', function ($scope) {
            let $slickcarousels = $scope.find('.testimonial-carousel');

            $slickcarousels.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: false,
                fade: true,
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                    }
                }, {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });

            // Call On Load
            if ($(".vs-slider-tab").length) {
                $(".vs-slider-tab").vsTab({
                    sliderTab: true,
                    tabButton: ".tab-btn",
                });
            }

        });


        /*----------- 02. Testimonial Two ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/travolotestimonialtwo.default', function ($scope) {
            let $slickcarouselstwo = $scope.find('.testimonial-slider2');
            $slickcarouselstwo.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: false,
                fade: false,
                speed: 1000,
                slidesToShow: $slickcarouselstwo.data('slide-to-show'),
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });

        });

        // Product Hot Deal Slider
        elementorFrontend.hooks.addAction('frontend/element_ready/travolocounterbox.default', function ($scope) {
            $.fn.countdown = function () {
                $(this).each(function () {
                    var $counter = $(this),
                        countDownDate = new Date($counter.data("end-date")).getTime(), // Set the date we're counting down toz
                        exprireCls = "expired";

                    // Finding Function
                    function s$(element) {
                        return $counter.find(element);
                    }

                    // Update the count down every 1 second
                    var counter = setInterval(function () {
                        // Get today's date and time
                        var now = new Date().getTime();

                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;

                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor(
                            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                        );
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        // if low than 10 add zero
                        function addZero(element) {
                            return element < 10 ? "0" + element : element;
                        }

                        // If the count down is over, write some text
                        if (distance < 0) {
                            clearInterval(counter);
                            $counter.addClass(exprireCls);
                            $counter.find(".message").css("display", "block");
                        } else {
                            // Output the result in elements
                            s$(".day").html(addZero(days));
                            s$(".hour").html(addZero(hours));
                            s$(".minute").html(addZero(minutes));
                            s$(".seconds").html(addZero(seconds));
                        }
                    }, 1000);
                });
            };

            if ($(".countdown-active").length) {
                $(".countdown-active").countdown();
            }
            /* magnificPopup video view */
            $(".popup-video").magnificPopup({
                type: "iframe",
            });


        });


        /*----------- Hero One Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/travoloheroone.default', function ($scope) {

            let $heroconten_tone = $scope.find('.travolo-hero-one-slider');
            $heroconten_tone.not('.slick-initialized').slick({
                loop: $heroconten_tone.data('slick-autoplay'),
                dots: false,
                infinite: false,
                arrows: false,
                autoplay: false,
                autoplaySpeed: 6000,
                fade: true,
                speed: 1000,
                centerMode: false,
                slidesToShow: 1,
                focusOnSelect: false,
                slidesToScroll: 1,
            });

            // Call On Load
            if ($(".vs-slider-tab").length) {
                $(".vs-slider-tab").vsTab({
                    sliderTab: true,
                    tabButton: ".tab-btn",
                });
            }

        });

        /*----------- Hero Two Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/travoloherotwo.default', function ($scope) {

            let $heroslider2 = $scope.find('.hero-slider2');
            $heroslider2.not('.slick-initialized').slick({
                loop: true,
                dots: false,
                infinite: true,
                arrows: true,
                prevArrow: '<button type="button" class="icon-btn prev-btn slick-prev"><i class="fas fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="icon-btn next-btn slick-next"><i class="fas fa-chevron-right"></i></button>',
                autoplay: $heroslider2.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: true,
                speed: 1000,
                centerMode: false,
                slidesToShow: 1,
                focusOnSelect: false,
                slidesToScroll: 1,
            });


        });


        /*----------- Hero Three Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/travoloherothree.default', function ($scope) {

            $('[data-slick-next]').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault()
                    $($(this).data('slick-next')).slick('slickNext');
                })
            })

            $('[data-slick-prev]').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault()
                    $($(this).data('slick-prev')).slick('slickPrev');
                })
            })
            
            let $heroslider3 = $scope.find('.hero-slider3');
            $heroslider3.not('.slick-initialized').slick({
                loop: true,
                dots: false,
                infinite: true,
                arrows: false,
                prevArrow: '<button type="button" class="icon-btn prev-btn slick-prev"><i class="fas fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="icon-btn next-btn slick-next"><i class="fas fa-chevron-right"></i></button>',
                autoplay: $heroslider3.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: true,
                speed: 1000,
                centerMode: false,
                slidesToShow: 1,
                focusOnSelect: false,
                slidesToScroll: 1,
            });


        });

        elementorFrontend.hooks.addAction('frontend/element_ready/travolovideobox.default', function ($scope) {
            /* magnificPopup video view */
            $(".popup-video").magnificPopup({
                type: "iframe",
            });
        });



        elementorFrontend.hooks.addAction('frontend/element_ready/travolodestinations.default', function ($scope) {
            // Function For Custom Arrow Btn
            $('[data-slick-next]').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault()
                    $($(this).data('slick-next')).slick('slickNext');
                })
            })

            $('[data-slick-prev]').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault()
                    $($(this).data('slick-prev')).slick('slickPrev');
                })
            })

            let $destination = $scope.find('.destinationSlide');
            $destination.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: $destination.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: false,
                slidesToShow: $destination.data('slide-to-show'),
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });
        });

        // blog post slider
        elementorFrontend.hooks.addAction('frontend/element_ready/travoloblogpost.default', function ($scope) {

            let $carousel = $scope.find('.blog-carousel');
            $carousel.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: $carousel.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: false,
                slidesToShow: $carousel.data('slide-to-show'),
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });
        });


    });
}(jQuery));