(function ($) {
    'use strict';

    setTimeout(function() {
        gsap.registerPlugin(ScrollTrigger);


        // animation1 - only if element exists
        if (document.querySelector('.tm-gsap-move-animation1')) {
            var tm_gsap_animation1 = gsap.timeline({
                scrollTrigger: {
                    animation: tm_gsap_animation1,
                    trigger: '.tm-gsap-move-animation1',
                    start: "top 95%",
                    end: "top -50%",
                    scrub: 4,
                    toggleActions: "play reverse play reverse",
                    markers: false
                }
            });
            tm_gsap_animation1.from(".tm-gsap-move-animation1", { xPercent: 50, });
        }


        // animation2 - only if element exists
        if (document.querySelector('.tm-gsap-move-animation2')) {
            var tm_gsap_animation2 = gsap.timeline({
                scrollTrigger: {
                    animation: tm_gsap_animation2,
                    trigger: '.tm-gsap-move-animation2',
                    start: "top 150%",
                    end: "top -50%",
                    scrub: 3,
                    toggleActions: "play reverse play reverse",
                    markers: false
                }
            });
            tm_gsap_animation2.from(".tm-gsap-move-animation2", { xPercent: 50, yPercent: -10, scale: .3 }, "<=.5");
        }
        // animation3 - only if element exists
        if (document.querySelector('.tm-gsap-move-animation3')) {
            var tm_gsap_animation3 = gsap.timeline({
                scrollTrigger: {
                    animation: tm_gsap_animation3,
                    trigger: '.tm-gsap-move-animation3',
                    start: "top 150%",
                    end: "top -50%",
                    scrub: 3,
                    toggleActions: "play reverse play reverse",
                    markers: false
                }
            });
            tm_gsap_animation3.from(".tm-gsap-move-animation3", { xPercent: 70, yPercent: -50, scale: .3, rotate: -20, opacity: 0.3 }, "<=.5");
        }
    }, 2300);



    //>> Banner Pinned Image Start <<//
    if (document.querySelectorAll(".pinned-3").length > 0) {
        const isMobile = window.matchMedia("(max-width: 1399px)").matches;
        if (isMobile) return;
        const tl = gsap.timeline({
            ease: "none",
            scrollTrigger: {
                trigger: ".pinned-3",
                pin: true,
                pinSpacing: false,
                scrub: 2.1,
                start: "top top",
                endTrigger: ".banner-section-3__video__wrapper",
                end: "bottom bottom",
                markers: false
            }
        });
        tl.to(".pinned-3 #myImage", {
            scale: 1,
            width: "100vw",
            height: "100vh",
            right: "auto",
            xPercent: "-34",
            transformOrigin: "center center",
            ease: "power11.out"
        });
    }



    gsap.utils.toArray('.tm-gsap-animate-left').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  x: "-=150"}, {opacity: 1, x: 0, duration: .4, immediateRender: false})
    });
    gsap.utils.toArray('.tm-gsap-animate-right').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  x: "+=150"}, {opacity: 1, x: 0, duration: .4, immediateRender: false})
    });
    gsap.utils.toArray('.tm-gsap-animate-top').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  y: "+=150"}, {opacity: 1, y: 0, duration: .4, immediateRender: false})
    });
    gsap.utils.toArray('.tm-gsap-animate-bottom').forEach((el, index) => {
        let tlcta = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 2,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        tlcta
        .set(el, {transformOrigin: 'center center'})
        .from(el, { opacity: 1,  y: "-=150"}, {opacity: 1, y: 0, duration: .4, immediateRender: false})
    });

    gsap.utils.toArray('.tm-gsap-animate-circle').forEach((el, index) => {
        let arspin = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 1,
                start: "top 85%",
                end: "top 0%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        arspin
        .set(el, {transformOrigin: 'center center'})
        .fromTo(el, { rotate: 0}, { rotate: 180, duration: .4, immediateRender: false})
    });


    gsap.utils.toArray(".tm-gsap-img-parallax").forEach(function(container) {
      let image = container.querySelector("img");

      // Only animate if image exists
      if (image) {
          let tl = gsap.timeline({
              scrollTrigger: {
                  trigger: container,
                  scrub: .5,
              },
          });
          tl.from(image, {
              yPercent: -30,
              ease: "none",
          }).to(image, {
              yPercent: 30,
              ease: "none",
          });
      }
    });

    // Panel pin section (Agntix-style pin spacer effect)
    // Used for elements with class .tm-panel-pin inside a .tm-panel-pin-area
    (function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        let mm = gsap.matchMedia();
        mm.add("(min-width: 1199px)", () => {
            let tl = gsap.timeline();
            let panels = document.querySelectorAll('.tm-panel-pin');
            if (!panels.length) return;

            panels.forEach((section) => {
                tl.to(section, {
                    scrollTrigger: {
                        trigger: section,
                        pin: section,
                        scrub: 1,
                        start: 'top 10%',
                        end: "bottom 99%",
                        endTrigger: '.tm-panel-pin-area',
                        pinSpacing: false,
                        markers: false,
                    },
                });
            });
        });
    })();

    // Funfact-style horizontal pinned panel animation (Agntix-style)
    // Used for horizontally scrolling panels inside .tm-project-panel-wrap
    (function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        let pp = gsap.matchMedia();
        pp.add("(min-width: 1200px)", () => {
            if ($('.tm-project-panel-wrap').length) {
                let sections = gsap.utils.toArray(".tm-project-panel");
                if (!sections.length) return;

                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        start: "top 70px",
                        trigger: ".tm-project-panel-wrap",
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + document.querySelector(".tm-project-panel-wrap").offsetWidth
                    }
                });
            }
        });
    })();


    // tm-enable-bg-move-effect
    (function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const ht_elm = gsap.utils.toArray(".tm-gsap-bg-width-move-effect");
        if (ht_elm.length == 0) return;
        ScrollTrigger.matchMedia({
        "(min-width: 992px)": function () {
            ht_elm.forEach((box, i) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                trigger: box,
                start: "top 80%",
                end: "+=700px",
                scrub: 1,
                },
                defaults: {
                ease: "none",
                },
            });
            tl.fromTo(
                box,
                {
                clipPath: "inset(0% 17%)",
                },
                {
                clipPath: "inset(0% 0%)",
                duration: 3,
                }
            );
            });
        },
        });
    })();
})(jQuery);
