const randomizeButton = document.getElementById("position");
const colorButton = document.getElementById("colorful");
const blackButton = document.getElementById("black");
const backgroundOptions = document.getElementById("backgroundOptions");
const backgroundImage = document.getElementById("backgroundImage");

const imgPaths = [
  "berni-cropped.jpeg",
  "diego.jpeg",
  "frida.jpeg",
  "lam.jpeg",
  "portinari.jpeg",
  "tarsila.jpg",
];

imgPaths.forEach((path) => {
  const imgBtn = document.createElement("button");
  imgBtn.style.backgroundImage = `url(./backgrounds/${path})`;
  imgBtn.style.backgroundSize = "cover";
  imgBtn.classList.add("backgroundOption");
  backgroundOptions.appendChild(imgBtn);
  imgBtn.addEventListener("click", () => {
    backgroundImage.src = `./backgrounds/${path}`;
    backgroundImage.style.display = "block";
    cellElts.forEach((cell) => {
      cell.style.backgroundColor = "transparent";
      cell.firstChild.style.color = "white";
    });
  });
});

randomizeButton.addEventListener("click", () => {
  setPositions();
});

colorButton.addEventListener("click", () => {
  changeColor();
  backgroundImage.style.display = "none";
});

blackButton.addEventListener("click", () => {
  cellElts.forEach((cell) => {
    cell.style.backgroundColor = "black";
    cell.firstChild.style.color = "white";
  });
  backgroundImage.style.display = "none";
});
