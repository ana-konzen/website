const btbVideo = document.querySelector("#btb");
const talkVideo = document.querySelector("#talk");

btbVideo.addEventListener("click", () => {
  btbVideo.muted = !btbVideo.muted;
  talkVideo.muted = true;
  console.log("clicked");
});

talkVideo.addEventListener("click", () => {
  talkVideo.muted = !talkVideo.muted;
  btbVideo.muted = true;
});
