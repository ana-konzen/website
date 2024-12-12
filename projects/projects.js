const slideCont = document.querySelector(".slideCont");
const scrollBar = document.querySelector(".scrollBar");
const infoCont = document.querySelector(".project-name");
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
let isScrolling = false; // to throttle scrolling interactions
let scrollTimeout;
const scrollTimer = 500; // time in ms to throttle scrolling interactions

let upCursor = "../../cursors/up.png";
let downCursor = "../../cursors/down.png";

slides.forEach(() => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  scrollBar.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");
dots[currentSlide].classList.add("active");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => scrollToSlide(index));
});

scrollToSlide(0, "auto");

document.addEventListener(
  "wheel",
  (ev) => {
    ev.preventDefault();
    if (isScrolling) return;
    isScrolling = true;
    if (ev.deltaY > 1) {
      scrollDown();
      console.log(ev.deltaY);
    } else if (ev.deltaY < -1) {
      scrollUp();
      console.log(ev.deltaY);
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, scrollTimer);
  },
  { passive: false }
);

document.addEventListener("mousemove", (event) => {
  updateCursor(event.clientY);
});

window.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowDown") {
    scrollDown();
  } else if (ev.key === "ArrowUp") {
    scrollUp();
  }
});

window.addEventListener("resize", () => {
  scrollToSlide(currentSlide, "auto");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) pauseVideos();
  else if (slides[currentSlide].classList.contains("video")) {
    slides[currentSlide].querySelector("video").play();
  }
});

function pauseVideos() {
  document.querySelectorAll("video").forEach((video) => video.pause());
}

function scrollUp() {
  if (currentSlide > 0) scrollToSlide(currentSlide - 1);
}

function scrollDown() {
  if (currentSlide < slides.length - 1) scrollToSlide(currentSlide + 1);
}

function updateCursor(mouseY) {
  if (mouseY > (slideCont.clientHeight * 2) / 3 && currentSlide < slides.length - 1) {
    slideCont.style.cursor = `url('${downCursor}'), auto`;
    slideCont.onclick = scrollDown;
  } else if (mouseY < slideCont.clientHeight / 3 && currentSlide > 0) {
    slideCont.style.cursor = `url('${upCursor}'), auto`;
    slideCont.onclick = scrollUp;
  } else {
    slideCont.style.cursor = "auto";
    slideCont.onclick = null;
  }
}

function scrollToSlide(index, behavior = "smooth") {
  if (index < 0 || index >= slides.length) return;

  currentSlide = index;
  slideCont.scrollTo({
    top: slideCont.clientHeight * currentSlide,
    behavior: behavior,
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });

  if (slides[currentSlide].classList.contains("dark")) {
    document.documentElement.style.setProperty("--info-color", "var(--white)");
    document.documentElement.style.setProperty("--text-color", "var(--white)");
    document.documentElement.style.setProperty("--slide-background", "var(--black)");
    document.documentElement.style.setProperty("--button-background", "var(--light-gray)");
    upCursor = "../../cursors/up-white.png";
    downCursor = "../../cursors/down-white.png";
  } else {
    document.documentElement.style.setProperty("--info-color", "var(--black)");
    document.documentElement.style.setProperty("--text-color", "var(--black)");
    document.documentElement.style.setProperty("--slide-background", "var(--white)");
    document.documentElement.style.setProperty("--button-background", "var(--dark-gray)");
    upCursor = "../../cursors/up.png";
    downCursor = "../../cursors/down.png";
  }

  pauseVideos();
  if (slides[currentSlide].classList.contains("video")) {
    const slideVideos = slides[currentSlide].querySelectorAll("video");
    slideVideos.forEach((video) => {
      video.play();
    });
  }

  if (currentSlide === 0) {
    infoCont.classList.add("first");
  } else {
    infoCont.classList.remove("first");
  }
}
