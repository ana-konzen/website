const slideCont = document.querySelector(".slideCont");
const scrollBar = document.querySelector(".scrollBar");
const infoCont = document.querySelector(".project-name");
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

let upCursor = "../../cursors/up.png";
let downCursor = "../../cursors/down.png";

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  scrollBar.appendChild(dot);
}

window.onresize = () => {
  scroll("auto");
};

if (currentSlide === 0) {
  infoCont.classList.add("first");
} else {
  infoCont.classList.remove("first");
}

const dots = document.querySelectorAll(".dot");

dots[currentSlide].classList.add("active");

dots.forEach((dot, index) => {
  dot.onclick = () => {
    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    scroll();
  };
});

if (slides[currentSlide].classList.contains("dark") || slides[currentSlide].classList.contains("image")) {
  document.documentElement.style.setProperty("--info-color", "var(--white)");
  if (slides[currentSlide].classList.contains("dark")) {
    document.documentElement.style.setProperty("--slide-background", "var(--black)");
    document.documentElement.style.setProperty("--text-color", "var(--white)");
    upCursor = "../../cursors/up-white.png";
    downCursor = "../../cursors/down-white.png";
  }
}

document.addEventListener("mousemove", (event) => {
  const mouseY = event.clientY;
  if (mouseY > slideCont.clientHeight - slideCont.clientHeight / 3 && currentSlide < slides.length - 1) {
    slideCont.style.cursor = `url('${downCursor}'), auto`;
    slideCont.onclick = scrollDown;
  } else if (mouseY < slideCont.clientHeight / 3 && currentSlide > 0) {
    slideCont.style.cursor = `url('${upCursor}'), auto`;
    slideCont.onclick = scrollUp;
  } else {
    slideCont.style.cursor = "auto";
    slideCont.onclick = null;
  }
});

window.addEventListener("keydown", (ev) => {
  if (slideCont.classList.contains("scrolling")) return;
  slideCont.classList.add("scrolling");
  if (ev.key === "ArrowDown") {
    scrollDown();
  } else if (ev.key === "ArrowUp") {
    scrollUp();
  }
  setTimeout(() => {
    slideCont.classList.remove("scrolling");
  }, 500);
});

slideCont.addEventListener("wheel", (ev) => {
  if (slideCont.classList.contains("scrolling")) return;
  slideCont.classList.add("scrolling");
  if (ev.deltaY >= 2) {
    scrollDown();
  } else if (ev.deltaY <= -2) {
    scrollUp();
  }
  setTimeout(() => {
    slideCont.classList.remove("scrolling");
  }, 500);
});

function scrollUp() {
  if (currentSlide > 0) {
    dots[currentSlide].classList.remove("active");
    currentSlide--;
  }
  scroll();
}

function scrollDown() {
  if (currentSlide < slides.length - 1) {
    dots[currentSlide].classList.remove("active");
    currentSlide++;
  }
  scroll();
}

function scroll(behavior = "smooth") {
  pauseVideos();
  if (currentSlide === 0) {
    infoCont.classList.add("first");
  } else {
    infoCont.classList.remove("first");
  }
  dots[currentSlide].classList.add("active");
  slideCont.scrollTo({ top: slideCont.clientHeight * currentSlide, behavior: behavior });
  if (slides[currentSlide].classList.contains("dark") || slides[currentSlide].classList.contains("image")) {
    document.documentElement.style.setProperty("--info-color", "var(--white)");
    if (slides[currentSlide].classList.contains("dark")) {
      document.documentElement.style.setProperty("--slide-background", "var(--black)");
      document.documentElement.style.setProperty("--text-color", "var(--white)");
      upCursor = "../../cursors/up-white.png";
      downCursor = "../../cursors/down-white.png";
    }
  } else {
    document.documentElement.style.setProperty("--info-color", "var(--black)");
    document.documentElement.style.setProperty("--slide-background", "var(--white)");
    document.documentElement.style.setProperty("--text-color", "var(--black)");
    upCursor = "../../cursors/up.png";
    downCursor = "../../cursors/down.png";
  }
  if (slides[currentSlide].classList.contains("video")) {
    slides[currentSlide].querySelector("video").play();
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseVideos();
  } else {
    if (slides[currentSlide].classList.contains("video")) {
      slides[currentSlide].querySelector("video").play();
    }
  }
});

function pauseVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}
