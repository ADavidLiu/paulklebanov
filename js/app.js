$(document).ready(function () {
    
    const $DOM = {
        dropdown: {
            header: $(".dropdown__item-header")
        },
        reviews: {
            window: $(window),
            slider: $(".reviews__slider"),
            items: $(".reviews__slider-item")
        },
        popup: {
            popups: $(".popup"),
            popupMain: $(".popup__main"),
            trigger: $("[data-popup-trigger]"),
            btnsClose: $(".popup__close")
        },
        cookies: {
            banner: $(".cookies"),
            btnAccept: $(".cookies__btns button")
        },
        header: {
            header: $(".header"),
            nav: $(".nav"),
            btn: $(".header__btn, .header__close")
        },
        scrollBtns: {
            window: $(window),
            targetSections: $("[data-scroll-target]"),
            navItems: $(".nav__menu li"),
            triggers: $("[data-scroll-to]"),
            btnUp: $(".mobile-scroller__btn")
        }
    }

    $DOM.scrollBtns.btnUp.click(goToTop);
    $DOM.scrollBtns.triggers.click(scrollToTarget);
    $DOM.scrollBtns.window.scroll(scrollHandler);

    function goToTop() {
        $.scrollTo(0, 500);
    }

    function scrollToTarget(e) {
        const $this = $(e.currentTarget);
        $this.addClass("is-active").siblings().removeClass("is-active");
        const target = $this.attr("data-scroll-to");
        const $target = $(`[data-scroll-target="${target}"]`);
        $.scrollTo($target, 500, {
            offset: {
                top: -$(".nav").innerHeight()
            },
            onAfter: () => {
                $this.addClass("is-active").siblings().removeClass("is-active");
                const timeout = setTimeout(() => {
                    $this.addClass("is-active").siblings().removeClass("is-active");
                    clearTimeout(timeout);
                }, 50);
            }
        });
    }

    function checkActiveSection() {
        $DOM.scrollBtns.targetSections.each(function() {
            const $this = $(this);
            const target = $this.attr("data-scroll-target");
            if ($this.visible(true)) {
                $(`[data-scroll-to="${target}"`).addClass("is-active").siblings().removeClass("is-active");
            }
        });
    }

    function scrollHandler() {
        checkActiveSection();
    }

    new TypeIt(".hero__title", {
        strings: ["A Google Advertising Campaign", "A Google Remarketing Campaign", "A YouTube Advertising Campaign", "A Gmail Advertising Campaign", "A Google Shopping Advertising Campaign"],
        speed: 100,
        waitUntilVisible: true,
        breakLines: false,
        loop: true
    }).go();

    $DOM.header.btn.click(toggleNav);
    $DOM.header.nav.scrollToFixed({
        zIndex: 3
    });

    function toggleNav() {
        $DOM.header.header.toggleClass("is-open");
    }

    if (Cookies.get("user-accepted-cookies") === "yes") {
        $DOM.cookies.banner.hide();
    } else {
        $DOM.cookies.btnAccept.click(() => {
            $DOM.cookies.banner.stop().fadeOut("fast");
            Cookies.set("user-accepted-cookies", "yes");
        });
    }

    $DOM.popup.trigger.click(togglePopup);
    $DOM.popup.popups.click(closePopups);
    $DOM.popup.btnsClose.click(closePopups);
    $DOM.popup.popupMain.click(e => { e.stopPropagation(); } );

    function closePopups() {
        $DOM.popup.popups.removeClass("is-active");
    }

    function togglePopup(e) {
        e.preventDefault();
        
        const $this = $(e.currentTarget);
        const target = $this.attr("data-popup-trigger");

        $DOM.popup.popups.removeClass("is-active");
        $(`[data-popup-target='${target}']`).toggleClass("is-active");
    }

    $DOM.dropdown.header.click(toggleContent);

    function toggleContent(e) {
        const $this = $(e.currentTarget);
        $this.parent().toggleClass("is-active");
        $this.next().stop().slideToggle("fast");
    }

    $DOM.reviews.slider.on("init", (e, slick) => {
        checkVisibility();
    });

    $DOM.reviews.slider.on("afterChange", (e, slick, currentSlide) => {
        checkVisibility();
    });

    $DOM.reviews.slider.slick({
        mobileFirst: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "4rem",
        infinite: false,
        autoplay: false,
        arrows: false,
        dots: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "7.5rem",
                    initialSlide: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "7.5rem",
                    initialSlide: 2
                }
            }
        ]
    });

    function checkVisibility() {
        const $currentItem  = $(".reviews__slider-item.slick-current");
        $DOM.reviews.items.removeClass("is-visible");

        if ($DOM.reviews.window.width() >= 768) {
            $currentItem.addClass("is-visible").prev().addClass("is-visible");
        }
        if ($DOM.reviews.window.width() >= 992) {
            $currentItem.addClass("is-visible").prev().addClass("is-visible");
            $currentItem.next().addClass("is-visible");
        }
    }
    
});