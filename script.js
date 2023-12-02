// import {SplitTextJS} from "./index"
function valueSetters() {
  gsap.set("#nav a", { y: "-100%", opacity: 0 });
  gsap.set("#home .parent .child", { y: "100%" });
  gsap.set("#home .row img", { opacity: 0 });

  document.querySelectorAll("#Visual>g>g>path", "#Visual>g>g>polyline").forEach(function (e) {
    var character = e;
    console.log({ character, e });
    character.style.strokeDasharray = character.getTotalLength() + "px";
    character.style.strokeOffset = character.getTotalLength() + "px";
  });
}
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    //create two spans
    let spanParent = document.createElement("span");
    let spanChild = document.createElement("span");

    spanParent.classList.add("parent");
    spanChild.classList.add("child");

    //span parent gets child n child gets eleme details
    spanChild.innerHTML = elem.innerHTML;
    spanParent.appendChild(spanChild);

    // elem replace its value with parent span
    elem.innerHTML = "";
    elem.appendChild(spanParent);
  });
}

function loaderAnimation() {
  var t1 = gsap.timeline();

  t1.from("#loader .child span", {
    delay: -0.4,
    x: 100,
    duration: 1.4,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      delay: 1,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      top: 0,
      height: "100%",
      duration: 1,
      delay: -0.6,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "0%",
      duration: 1,
      delay: -0.3,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomepage();
      },
    });
}
function animateSvg() {
  gsap.to("#Visual>g>g>path", {
    strokeOffset: 0,
    strokeDasharray: 0,
    duration: 2,
    expo: Expo.easeInOut,
    delay: 5,
  });
}
function animateHomepage() {
  var t1 = gsap.timeline();
  t1.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  })
    .to("#home .parent .child", {
      y: 0,
      stagger: 0.1,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
    })
    .to("#home .row img", {
      opacity: 0,
      ease: Expo.easeInOut,
      onComplete: function () {
        // animateSvg();
        // textAnimation();
      },
    });
}

function locoInitialize() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 1,
  });
}
function cardHoverEffect() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showingImage;
    cnt.addEventListener("mousemove", function (dets) {
      console.log("this", document.querySelector("#cursor"));
      document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
      showingImage = dets.target;
      console.log({ showingImage });
      document.querySelector("#cursor").children[
        showingImage.dataset.index
      ].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
      showingImage.style.filter = "grayscale(1)";

      document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function (dets) {
      console.log("chala ra", showingImage, dets);
      document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#" + "f2f2f2";
    });
  });
}
function alsiAnimation(titles, t1) {
  titles.forEach((title) => {
    // const splitTitle = new SplitType(title);
    // console.log({ splitTitle });
    t1.from(
      title,
      {
        opacity: 0,
        y: 70,
        rotateX: -90,
        stagger: 0.02,
        duration: 3,
      },
      "<"
    ).to(
      title,
      {
        opacity: 1,
        y: -70,
        rotateX: 90,
        stagger: 0.02,
        duration: 2,
        ease: Power3,
      },
      "<3"
    );
  });
}
function textAnimation() {
  const titles = gsap.utils.toArray("p");
  const t1 = gsap.timeline({ repeat: -1 });

  alsiAnimation(titles, t1);
  // t1.eventCallback("onComplete", function () {
  //   console.log("chalo");//on complete last element to be shown;
  //   const lastElement = titles.slice(-1);
  //   const t2 = gsap.timeline();
  //   // t2.to(lastElement, {
  //   //   y: 0,
  //   //   rotateX: 0,
  //   //   opacity: 1,
  //   //   duration: 1,
  //   //   ease: Power1,
  //   //   size: 1,
  //   //   // stagger: 0.2,
  //   // });
  // });
}
const lerp = (x, y, a) => x * (1 - a) + y * a;
var circle = document.querySelector(".circlePointer");
var frames = document.querySelectorAll(".frame");
frames.forEach((frame) => {
  frame.addEventListener("mousemove", function (dets) {
    var dimensions = frame.getBoundingClientRect();
    console.log({ dimensions });
    var xstart = dimensions.x;
    var xend = dimensions.x + dimensions.width;

    var zerone = gsap.utils.mapRange(xstart, xend, 0, 1, dets.clientX);
    lerp(-50, 50, zerone);
    gsap.to(circle, { scale: 5 });
    gsap.to(frame.children, {
      color: "#fff",
      duration: 0.3,
      y: "-5vw", //upar ki aur
    });

    gsap.to(frame.children, {
      x: lerp(-50, 50, zerone),
      duration: 0.3,
    });
  });

  frame.addEventListener("mouseleave", function (dets) {
    gsap.to(circle, { scale: 1 });
    gsap.to(".frame span", { color: "#000", duration: 0.3, y: 0 });
    gsap.to(".frame span", {
      x: 0,
      duration: 0.3,
    });
  });
});
window.addEventListener("mousemove", function (dets) {
  circle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
  console.log("dets.clientX}px,${dets.clientY}px", dets.clientX, dets.clientY, circle.style.transform);

  gsap.to(circle, { x: dets.clientX, y: dets.clientY, duration: 0.2, ease: Expo });
});

// function imgFullAnimation() {
//   var imgSection = document.querySelector("#img-div");
//   imgSection.addEventListener("mouseenter", function() {
//     gsap.to(".imgToZoom", {
//       width: "100vw",
//       height: "100vh",
//       duration: 2,
//       ease: Power2,
//     });
//   });
// }

revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
cardHoverEffect();
textAnimation();
// imgFullAnimation();

// animateSvg();
