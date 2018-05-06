// Parallax

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  parallaxElem = document.querySelectorAll(".parallax"),
  parallaxQty = parallaxElem.length;

let parallax = () => {
  if (width >= 700) {
    window.requestAnimationFrame(() => {
      for (let i = 0; i < parallaxQty; i++) {
        let currElem = parallaxElem.eq(i);
        let scrolled = window.scrollTop;
        currElem.style.transform = `translate3d(0, ${scrolled * -0.3}px, 0)`;
      }
    });
  }
};

window.onscroll = parallax();
