var THEMEMASCOT = {};
(function ($) {
  "use strict";

  /* ---------------------------------------------------------------------- */
  /* --------------------------- Start Demo Switcher  --------------------- */
  /* ---------------------------------------------------------------------- */
  var showSwitcher = false;
  var $body = $("body");
  var $style_switcher = $("#style-switcher");
  if (!$style_switcher.length && showSwitcher) {
    $.ajax({
      url: "color-switcher/style-switcher.html",
      success: function (data) {
        $body.append(data);
      },
      dataType: "html",
    });
  }
  /* ---------------------------------------------------------------------- */
  /* ----------------------------- En Demo Switcher  ---------------------- */
  /* ---------------------------------------------------------------------- */

  THEMEMASCOT.isRTL = {
    check: function () {
      if ($("html").attr("dir") === "rtl") {
        return true;
      } else {
        return false;
      }
    },
  };

  THEMEMASCOT.isLTR = {
    check: function () {
      if ($("html").attr("dir") !== "rtl") {
        return true;
      } else {
        return false;
      }
    },
  };

  // Testimonial Block Scroll Rotation
  function testimonialBlockScrollRotation() {
    if ($(".testimonial-block").length) {
      var lastScrollTop = 0;
      var rotationAmount = 0;
      var maxRotation = 15; // Maximum rotation in degrees
      var rotationSpeed = 0.5; // How fast it rotates per scroll

      $(window).on("scroll", function () {
        var currentScrollTop = $(window).scrollTop();
        var scrollDifference = currentScrollTop - lastScrollTop;

        // Determine scroll direction and update rotation
        if (scrollDifference > 0) {
          // Scrolling down - rotate clockwise (positive)
          rotationAmount += rotationSpeed;
        } else if (scrollDifference < 0) {
          // Scrolling up - rotate counter-clockwise (negative)
          rotationAmount -= rotationSpeed;
        }

        // Limit rotation to maxRotation degrees
        if (rotationAmount > maxRotation) {
          rotationAmount = maxRotation;
        } else if (rotationAmount < -maxRotation) {
          rotationAmount = -maxRotation;
        }

        // Apply rotation to each testimonial-block inner-box
        // Odd items rotate one way, even items rotate opposite
        $(".testimonial-block").each(function (index) {
          var isOdd = (index + 1) % 2 === 1; // index is 0-based, so +1 for 1-based
          var rotation = isOdd ? rotationAmount : -rotationAmount;

          $(this)
            .find(".inner-box")
            .css({
              transform: "rotate(" + rotation + "deg)",
              transition: "transform 0.1s ease-out",
            });
        });

        lastScrollTop = currentScrollTop;
      });
    }
  }
  testimonialBlockScrollRotation();

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($(".preloader").length) {
      $(".preloader").delay(200).fadeOut(500);
    }
  }
  $(document).ready(function () {
    $(".preloader-loaded").addClass("loaded");
    if ($(".preloader-loaded").hasClass("loaded")) {
      $("#preloader")
        .delay(750)
        .queue(function () {
          $(this).remove();
        });
    }
  });


  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header .navigation li.dropdown").append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
  }

  //Header Nav Hide Show
  (function ($) {
    var desktopMenuHTML = $('.main-header .main-menu .navigation').html();

    /* =======================
      STICKY HEADER MENU
    ======================= */
    var stickyNav = $('.sticky-header .navigation');

    if (stickyNav.length && stickyNav.children().length === 0) {
      stickyNav.append(desktopMenuHTML);
    }

    /* =======================
      MOBILE MENU
    ======================= */
    if ($('.mobile-menu').length) {

      var mobileNav = $('.mobile-menu .navigation');

      if (mobileNav.children().length === 0) {
        mobileNav.append(desktopMenuHTML);
      }

      // Add dropdown buttons
      $('.mobile-menu li').each(function () {
        if ($(this).children('ul').length) {
          $(this).addClass('dropdown');
          if (!$(this).children('.dropdown-btn').length) {
            $(this).append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
          }
        }
      });

      // Dropdown toggle
      $('.mobile-menu').on('click', '.dropdown-btn', function (e) {
        e.preventDefault();
        var parent = $(this).parent('li');
        var submenu = parent.children('ul');

        submenu.slideToggle(300);
        parent.toggleClass('open');
      });

      // Open menu
      $('.mobile-nav-toggler').on('click', function () {
        $('body').addClass('mobile-menu-visible');
      });

      // Close menu
      $('.mobile-menu .close-btn, .mobile-menu .menu-backdrop').on('click', function () {
        $('body').removeClass('mobile-menu-visible');
      });
    }

    /* =======================
      STICKY HEADER SHOW/HIDE
    ======================= */
    function headerStyle() {
      var windowpos = $(window).scrollTop();
      var siteHeader = $('.header-style-one');
      var sticky_header = $('.main-header .sticky-header');
      var scrollLink = $('.scroll-to-top');

      if (windowpos > 100) {
        if (!sticky_header.hasClass('fixed-header')) {
          sticky_header.addClass('fixed-header animated slideInDown');
        }
        scrollLink.fadeIn(300);
      } else {
        sticky_header.removeClass('fixed-header animated slideInDown');
        scrollLink.fadeOut(300);
      }

      if (windowpos > 1) {
        siteHeader.addClass('fixed-header');
      } else {
        siteHeader.removeClass('fixed-header');
      }
    }

    $(window).on('scroll', headerStyle);
    headerStyle();

  })(jQuery);


  //Header Search
  if ($(".search-btn").length) {
    $(".search-btn").on("click", function () {
      $(".main-header").addClass("moblie-search-active");
    });
    $(".close-search, .search-back-drop").on("click", function () {
      $(".main-header").removeClass("moblie-search-active");
    });
  }

  // Backtotop Js
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    var windowOn = $(window); // Define windowOn properly

    windowOn.on("scroll", function () {
      if (windowOn.scrollTop() > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        300
      ); // Removed quotes from 300, since it's a number
    });
  }
  back_to_top();

    // 19. Words Animatoin
    let wordsAnimation = gsap.utils.toArray(".denge-words");
    wordsAnimation.forEach((splitWords) => {
      // Reveal long section titles vertically so off-screen words cannot widen the page.
      const verticalReveal = splitWords.matches(
        ".nart-falcon .h2, .nart-falcon h2"
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitWords,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          toggleActions: "play none none none",
        },
      });

      const textSplitWords = new SplitText(splitWords, { type: "words" });
      gsap.set(splitWords, { perspective: verticalReveal ? "none" : 400 });
      textSplitWords.split({ type: "words" });
      tl.from(textSplitWords.words, {
        duration: .4,
        delay: 0.3,
        opacity: 0,
        rotationX: verticalReveal ? 0 : 10,
        x: verticalReveal ? 0 : 50,
        y: verticalReveal ? 20 : 0,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });

  // Fade Animation Bottom
  let fade_animation = gsap.utils.toArray(".denge-fade");
  fade_animation.forEach((fade) => {
    const ease_value = fade.getAttribute("data-ease");

    gsap.from(fade, {
      scrollTrigger: {
        trigger: fade,
        start: "top 90%",
      },
      delay: 0.5,
      opacity: 0,
      y: 30,
      ease: ease_value,
      duration: .4,
    });
  });
    // 18. Characters Animatoin
    let charsAnimation = gsap.utils.toArray(".denge-chars");
    charsAnimation.forEach((splitChars) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitChars,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          toggleActions: "play none none none",
        },
      });

      const textSplitChars = new SplitText(splitChars, { type: "chars" });
      gsap.set(splitChars, { perspective: 400 });
      textSplitChars.split({ type: "chars" });
      tl.from(textSplitChars.chars, {
        duration: .4,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 100,
        transformOrigin: "0% 50% -50",
        ease: "back",
        stagger: 0.1,
      });
    });

  // Native scrolling keeps branded pages, form focus and anchor targets aligned.
  if($('#smooth-wrapper').length && $('#smooth-content').length && !document.body.classList.contains('nart-falcon')){
    ScrollSmoother.create({
      smooth: 1.35,
      effects: true,
      smoothTouch: .1,
      ignoreMobileResize: true
    })
  }


  document.querySelectorAll('.project-block .image-box').forEach(card => {
    const viewAll = card.querySelector('.hover-box');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    card.addEventListener('mouseenter', () => {
      viewAll.style.opacity = '1';
      viewAll.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    card.addEventListener('mouseleave', () => {
      viewAll.style.opacity = '0';
      viewAll.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    function animate() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      viewAll.style.left = `${currentX}px`;
      viewAll.style.top = `${currentY}px`;

      requestAnimationFrame(animate);
    }

    animate();
  });

  // Project Image Slider
  if ($('.project-image-slider').length) {
    var swiper = new Swiper(".project-image-slider", {
      slidesPerView: 2,
      spaceBetween: 30,
      speed: 600,
      loop: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 2,
        },
      },
    });
  }


  if ($('.client-slider').length > 0) {
    const brandSlider2 = new Swiper(".client-slider", {
      spaceBetween: 25,
      speed: 2000,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1399: {
          slidesPerView: 6,
        },
        1199: {
          slidesPerView: 4,
        },
        991: {
          slidesPerView: 3,
        },
        575: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }


  if ($('.banner-client-slider').length > 0) {
    const brandSlider2 = new Swiper(".banner-client-slider", {
      spaceBetween: 25,
      speed: 2000,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1399: {
          slidesPerView: 5,
        },
        1199: {
          slidesPerView: 4,
        },
        991: {
          slidesPerView: 3,
        },
        575: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }


  if ($('.testimonial-slider-h1').length > 0) {
    const brandSlider2 = new Swiper(".testimonial-slider-h1", {
      spaceBetween: 20,
      speed: 2000,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1400: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }


  if ($('.testimonial-slider-h4').length > 0) {
    const brandSlider2 = new Swiper(".testimonial-slider-h4", {
      spaceBetween: 20,
      speed: 2000,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1400: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
      pagination: {
        el: ".testimonial-slider-pagination",
        clickable: true,
      },
    });
  }


  if ($('.testimonial-slider-h3').length > 0) {
    const brandSlider2 = new Swiper(".testimonial-slider-h3", {
      spaceBetween: 20,
      speed: 2000,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1400: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }

  var swiper = new Swiper(".testimonial-slider-h2", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonial-slider-pagination",
      clickable: true,
    },
  });

  // 21. Image Reveal Animation  used
  let imgs_reveal = document.querySelectorAll(".img-reveal");

  imgs_reveal.forEach((container) => {
    let image = container.querySelector("img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "restart none none reset",
      },
    });

    tl.set(container, { autoAlpha: 1 });
    tl.from(container, 1.5, {
      xPercent: -100,
      ease: Power2.out,
    });
    tl.from(image, 1.5, {
      xPercent: 100,
      scale: 1.3,
      delay: -1.5,
      ease: Power2.out,
    });
  });
  


  // Section Title Animation
  if ($(".char-animation").length > 0) {
    let char_come = gsap.utils.toArray(".char-animation");
    char_come.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
      gsap.set(splitTextLine, { perspective: 300 });
      itemSplitted.split({ type: "chars, words" });
      tl.from(itemSplitted.chars, {
        duration: 1,
        delay: 0.5,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });
    });
  }

  //>> Award Block Items Hover Start <<//
  const awardBlockItem5 = document.querySelectorAll(".award-block-item-2");

  function followImageCursor(event, awardBlockItem5) {
    const contentBox = awardBlockItem5.getBoundingClientRect();
    const dx = event.clientX - contentBox.left;
    const dy = event.clientY - contentBox.top;

    const targetImage = serviceListStyle1.querySelector(".hover-image"); // Use a class instead of children[2]

    if (targetImage) {
      targetImage.style.transform = `translate(${dx}px, ${dy}px) rotate(15deg)`;
    }
  }

  // Optional: Throttle function to improve performance
  function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  awardBlockItem5.forEach((item) => {
    item.addEventListener(
      "mousemove",
      throttle((event) => {
        followImageCursor(event, item);
      }, 16)
    ); // ~60fps (1000ms/60 = ~16ms)
  });

  //>> ServiceBlock Hover Start <<//
  const serviceBlockItems6 = document.querySelectorAll(".service-block-items-6");

  function followImageCursor(event, serviceBlockItems6) {
    const contentBox = serviceBlockItems6.getBoundingClientRect();
    const dx = event.clientX - contentBox.left;
    const dy = event.clientY - contentBox.top;

    const targetImage = serviceListStyle1.querySelector(".hover-image"); // Use a class instead of children[2]

    if (targetImage) {
      targetImage.style.transform = `translate(${dx}px, ${dy}px) rotate(15deg)`;
    }
  }

  // Optional: Throttle function to improve performance
  function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  serviceBlockItems6.forEach((item) => {
    item.addEventListener(
      "mousemove",
      throttle((event) => {
        followImageCursor(event, item);
      }, 16)
    ); // ~60fps (1000ms/60 = ~16ms)
  });

  //>> Hotel Activity Start <<//
  const awardActivityItems = document.querySelectorAll(".award-activity-items");

  function followImageCursor(event, awardActivityItems) {
    const contentBox = awardActivityItems.getBoundingClientRect();
    const dx = event.clientX - contentBox.left;
    const dy = event.clientY - contentBox.top;

    const targetImage = awardActivityItems.querySelector(".hover-image"); // Use a class instead of children[2]

    if (targetImage) {
      targetImage.style.transform = `translate(${dx}px, ${dy}px) rotate(15deg)`;
    }
  }

  // Optional: Throttle function to improve performance
  function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  awardActivityItems.forEach((item) => {
    item.addEventListener(
      "mousemove",
      throttle((event) => {
        followImageCursor(event, item);
      }, 16)
    ); // ~60fps (1000ms/60 = ~16ms)
  });

  // Home layout 3 Image Banner CUstom Script
  $(function () {
    var $images = $(".banner-gallery .image");
    var activeIndex = Math.floor($images.length / 2);
    $images.eq(activeIndex).addClass("active");
    $images.on("mouseenter", function () {
      $images.eq(activeIndex).removeClass("active");
      activeIndex = $images.index(this);
      $(this).addClass("active");
    });
  });

  // home layout 4 service Script Code
  $(function () {
    var $services = $(".service-block-four .inner-block");
    var $image = $("#serviceImage");
    $services.on("mouseenter", function () {
      $services.removeClass("active");
      $(this).addClass("active");
      $image.attr("src", $(this).data("img"));
    });
  });

  // Home layout 6 custome script
    const items = document.querySelectorAll('.project-block-seven');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  function show_secondary_price(pricing_tables) {
    pricing_tables.addClass("show-secondary-price");
    var pricing_btn = pricing_tables.find(".btn");
    var secondary_btn_url = pricing_btn.data("secondary-link");
    pricing_btn.attr("href", secondary_btn_url);
  }
  function hide_secondary_price(pricing_tables) {
    pricing_tables.removeClass("show-secondary-price");
    var pricing_btn = pricing_tables.find(".btn");
    var normal_btn_url = pricing_btn.data("normal-link");
    pricing_btn.attr("href", normal_btn_url);
  }

  //smart btn
  var TM_Pricing_Switcher_Smart = function ($scope) {
    var pricing_smart_switcher = $(".tm-pricing-smart-switcher, .tm-pricing-plan-switcher");
    if (pricing_smart_switcher.length > 0) {
      pricing_smart_switcher.find("[data-pricing-trigger]").on("click", function (e) {
        var $self = $(e.target);
        $self.toggleClass("secondary-active");
        var pricing_tables = $self.parents("section").find(".tm-pricing-table");

        if ($self.hasClass("secondary-active")) {
          show_secondary_price(pricing_tables);
        } else {
          hide_secondary_price(pricing_tables);
        }
      });
    }
  };

  //round, flat btn
  var TM_Pricing_Switcher_Btn = function ($scope) {
    var pricing_btn_switcher = $(".tm-pricing-smart-switcher-button");
    if (pricing_btn_switcher.length > 0) {
      pricing_btn_switcher.find("[data-pricing-trigger]").on("click", function (e) {
        var target_id = $(this).data("show");
        var $self = $(e.target);
        pricing_btn_switcher.find("[data-pricing-trigger]").removeClass("active");
        $(this).addClass("active");
        var pricing_tables = $self.parents("section").find(".tm-pricing-table");

        if (target_id == "year") {
          show_secondary_price(pricing_tables);
        } else {
          hide_secondary_price(pricing_tables);
        }
      });
    }
  };


  // Team Award Content Active
  if ($(".work-block .inner-box").length) {
    $(".work-block .inner-box").on("mouseenter", function () {
      $(this).addClass("active");
      $(".inner-box").removeClass("active");
    });
    $(".work-block .inner-box").on("mouseleave", function () {
      $(this).addClass("active");
    });
  }

  // if ($(".service-block .inner-block").length) {
  //   const $boxes = $(".service-block .inner-block");

  //   if ($boxes.length) {
  //     // Click logic - toggle collapse/expand
  //     $boxes.on("click", function () {
  //       var $clickedBox = $(this);
  //       var isActive = $clickedBox.hasClass("active");

  //       // If the clicked box is already active, collapse it
  //       if (isActive) {
  //         $clickedBox.removeClass("active");
  //         $clickedBox.find(".content-box").slideUp().removeClass("active");
  //       } else {
  //         // Otherwise, collapse all and expand the clicked one
  //         $boxes.removeClass("active");
  //         $(".service-block .content-box").slideUp().removeClass("active");

  //         $clickedBox.addClass("active");
  //         $clickedBox.find(".content-box").slideDown().addClass("active");
  //       }
  //     });

  //     // Activate the first box on load (after handler is attached)
  //     const $firstBox = $boxes.first();
  //     $firstBox.trigger("click");
  //   }
  // }


  if ($(".product-details .bxslider").length) {
    $(".product-details .bxslider").bxSlider({
      nextSelector: ".product-details #slider-next",
      prevSelector: ".product-details #slider-prev",
      nextText: '<i class="fa fa-angle-right"></i>',
      prevText: '<i class="fa fa-angle-left"></i>',
      mode: "fade",
      auto: "true",
      speed: "700",
      pagerCustom: ".product-details .slider-pager .thumb-box",
    });
  }

  //Distance Range Slider
  if ($(".distance-range-slider").length) {
    $(".distance-range-slider").slider({
      range: true,
      min: 0,
      max: 2000,
      values: [0, 1500],
      slide: function (event, ui) {
        $("input.range-amount").val(ui.values[0] + " - " + ui.values[1]);
      },
    });
    $("input.range-amount").val($(".distance-range-slider").slider("values", 0) + " - " + $(".distance-range-slider").slider("values", 1));
  }

  $(".quantity-box .add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".quantity-box .sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
    }
  });

  //service-carousel One
  if ($('.testimonial-swiper').length) {
    var swiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 500,
      loop: true,
      autoplay: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        }
      },
      
      navigation: {
        nextEl: ".array-prev",
        prevEl: ".array-next",
      },
    });
  }

  //Price Range Slider
  if ($(".price-range-slider").length) {
    $(".price-range-slider").slider({
      range: true,
      min: 10,
      max: 99,
      values: [10, 60],
      slide: function (event, ui) {
        $("input.property-amount").val(ui.values[0] + " - " + ui.values[1]);
      },
    });

    $("input.property-amount").val($(".price-range-slider").slider("values", 0) + " - $" + $(".price-range-slider").slider("values", 1));
  }

  //Accordion Box
  if ($(".accordion-box").length) {
    $(".accordion-box").on("click", ".acc-btn", function () {
      var outerBox = $(this).parents(".accordion-box");
      var target = $(this).parents(".accordion");

      if ($(this).hasClass("active") !== true) {
        $(outerBox).find(".accordion .acc-btn").removeClass("active ");
      }

      if ($(this).next(".acc-content").is(":visible")) {
        return false;
      } else {
        $(this).addClass("active");
        $(outerBox).children(".accordion").removeClass("active-block");
        $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
        target.addClass("active-block");
        $(this).next(".acc-content").slideDown(300);
      }
    });
  }

  //Jquery Knob animation  // Pie Chart Animation
  if ($(".dial").length) {
    $(".dial").appear(
      function () {
        var elm = $(this);
        var color = elm.attr("data-fgColor");
        var perc = elm.attr("value");

        elm.knob({
          value: 0,
          min: 0,
          max: 100,
          skin: "tron",
          readOnly: true,
          thickness: 0.15,
          dynamicDraw: true,
          displayInput: false,
        });

        $({ value: 0 }).animate(
          { value: perc },
          {
            duration: 2000,
            easing: "swing",
            progress: function () {
              elm.val(Math.ceil(this.value)).trigger("change");
            },
          }
        );

        //circular progress bar color
        $(this).append(function () {
          // elm.parent().parent().find('.circular-bar-content').css('color',color);
          //elm.parent().parent().find('.circular-bar-content .txt').text(perc);
        });
      },
      { accY: 20 }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            {
              countNum: n,
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            }
          );
        }
      },
      { accY: 0 }
    );
  }

  //Dropdown Button
  $(".pricing-tabs .tab-buttons .yearly").on("click", function () {
    $(".round").addClass("boll-right");
  });

  //Dropdown Button
  $(".pricing-tabs .tab-buttons .monthly").on("click", function () {
    $(".round").removeClass("boll-right");
  });

  //Tabs Box
  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn");
        $(this).addClass("active-btn");
        target.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0);
        target.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab animated fadeIn");
        $(target).fadeIn(300);
        $(target).addClass("active-tab animated fadeIn");
      }
    });
  }

  //Progress Bar
  if ($(".progress-line").length) {
    $(".progress-line").appear(
      function () {
        var el = $(this);
        var percent = el.data("width");
        $(el).css("width", percent + "%");
      },
      { accY: 0 }
    );
  }

  //LightBox / Fancybox
  if ($(".lightbox-image").length) {
    $(".lightbox-image").fancybox({
      openEffect: "fade",
      closeEffect: "fade",
      helpers: {
        media: {},
      },
    });
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate({
        scrollTop: $(target).offset().top,
      });
    });
  }

  // Aos Animation
  AOS.init();

  // Elements Animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  // count Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      },
      {
        accY: -50,
      }
    );
  }

  // Four Item Swiper
  if ($(".properties-h1_swiper").length) {
    var swiper = new Swiper(".properties-h1_swiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: true,
      speed: 1000,
      //centeredSlides: true,
      navigation: {
        nextEl: ".four-item_button-next",
        prevEl: ".four-item_button-prev",
      },
      breakpoints: {
        1500: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 2,
        },
        970: {
          slidesPerView: 1,
        },
        650: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }

  //Image Reveal Animation
  if ($(".reveal").length) {
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });
      tl.set(container, { autoAlpha: 1 });
      tl.from(container, 1.5, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out,
      });
    });
  }

  document.querySelectorAll(".scroll-text").forEach((section) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 100%",
        end: "bottom top",
        scrub: 1,
        markers: false,
      },
    });
    tl.from(section.querySelector(".text1"), { xPercent: 20 }).from(section.querySelector(".text2"), { xPercent: -20 }, 0);
    tl.from(section.querySelector(".scroll-anim-top"), { yPercent: 10 }, 0).from(section.querySelector(".scroll-anim-bottom"), { yPercent: -10 }, 0);
  });

  //Bg Parallax
  if ($(".bg-parallax").length) {
    gsap.to(".bg-parallax", {
      backgroundPosition: "70% 75%",
      ease: "ease1",
      scrollTrigger: {
        trigger: ".bg-parallax",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Select2 Dropdown
  $(".custom-select").select2({
    minimumResultsForSearch: 7,
  });

  //Gallery Filters
  if ($(".filter-list").length) {
    $(".filter-list").mixItUp({});
  }

  //Custom Data Attributes
  if ($("[data-tm-bg-color]").length) {
    $("[data-tm-bg-color]").each(function () {
      $(this).css("cssText", "background-color: " + $(this).data("tm-bg-color") + " !important;");
    });
  }

  if ($(".scroll-to-fixed-parent").length) {
    var scroll_childs = $(".scroll-to-fixed-child");
    for (var i = 0, length = scroll_childs.length; i < length; i++) {
      var scroll_child = $(scroll_childs[i]);
      scroll_child.scrollToFixed({
        marginTop: $("header").outerHeight(true) + 10,
        zIndex: 2,
        spacerClass: "d-none",
        removeOffsets: true,
        limit: function () {
          var parent = this.parents(".scroll-to-fixed-parent");
          return parent.offset().top + parent.outerHeight(true) - this.outerHeight(true) - 20;
        },
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* ----------- Activate Menu Item on Reaching Different Sections ---------- */
  /* ---------------------------------------------------------------------- */
  var $onepage_nav = $(".onepage-nav");
  var $sections = $("section");
  var $window = $(window);
  function TM_activateMenuItemOnReach() {
    if ($onepage_nav.length > 0) {
      var cur_pos = $window.scrollTop() + 2;
      var nav_height = $onepage_nav.outerHeight();
      $sections.each(function () {
        var top = $(this).offset().top - nav_height - 80,
          bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          $onepage_nav.find("a").parent().removeClass("current").removeClass("active");
          $sections.removeClass("current").removeClass("active");
          $onepage_nav
            .find('a[href="#' + $(this).attr("id") + '"]')
            .parent()
            .addClass("current")
            .addClass("active");
        }

        if (cur_pos <= nav_height && cur_pos >= 0) {
          $onepage_nav.find("a").parent().removeClass("current").removeClass("active");
          $onepage_nav.find('a[href="#header"]').parent().addClass("current").addClass("active");
        }
      });
    }
  }

  /* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

  $(window).on("scroll", function () {
    TM_activateMenuItemOnReach();
  });

  /* ==========================================================================
   When document is loading, do
   ========================================================================== */

  $(window).on("load", function () {
    handlePreloader();
    TM_Pricing_Switcher_Smart();
    TM_Pricing_Switcher_Btn();
  });
})(window.jQuery);
