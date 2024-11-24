function locoMotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loadingAnimation() {
    var tl = gsap.timeline()
    tl.from("#page1", {
        opacity: 0,
        duration: 0.3,
        delay: 0.2
    })
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2)",
        borderRadius: "50px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0
    })
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.1,
        stagger: 0.2
    })
}

function navAnimation() {
    var nav = document.querySelector("nav")

    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline()

        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5
        })
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1

        })
        tl.to(".nav-part2 h5 span", {
            y: 0,
            // duration:0.3,
            stagger: {
                amount: 0.5
            }
        })
    })
    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline()
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })
}

function page2Animation() {
    let rightelem = document.querySelectorAll(".right-elem");
    let rightelemimg = document.querySelectorAll(".right-elem img");


    rightelem.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })

        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 70,
                y: dets.y - elem.getBoundingClientRect().y - 150
            })
        })
    })
}


function page3Animation() {
    let page3Center = document.querySelector(".icon");
    let page3Video = document.querySelector(".page3 video");

    page3Center.addEventListener("click", function () {
        page3Video.play();
        gsap.to(page3Video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })

    page3Video.addEventListener("click", function () {
        page3Video.pause();
        gsap.to(page3Video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        })
    })
}

function page6Animation() {
    let page6Right = document.querySelector(".page6-right");
    let page6Video = document.querySelector(".page6-right video");
    let page6IMG = document.querySelector(".page6-right img");
    page6Right.addEventListener("mouseenter", function () {
        page6IMG.style.opacity = 0;
        page6Video.style.opacity = 1;
        page6Video.play()
    })

    page6Right.addEventListener("mouseleave", function () {
        page6Video.load();
    })
}

function page7Animation() {
    let page7Right = document.querySelector(".page7-right");
    let page7Video = document.querySelector(".page7-right video");
    let page7IMG = document.querySelector(".page7-right img");
    page7Right.addEventListener("mouseenter", function () {
        page7IMG.style.opacity = 0;
        page7Video.style.opacity = 1;
        page7Video.play()
    })

    page7Right.addEventListener("mouseleave", function () {
        page7Video.load();
    })
}

function scrollTriger() {
    gsap.from("#page11-box2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#page11-box2",
            scroller: "#main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}



loadingAnimation();
locoMotiveAnimation();
navAnimation();
page2Animation();
page3Animation();
page6Animation();
page7Animation();
scrollTriger();