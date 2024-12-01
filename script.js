const projects = [
  "malba",
  "brushed",
  "replica",
  "artifact",
  "toy cars",
  "reclaiming klein",
  "dungeon mystery",
  "reframing cordel",
  "flash art magazine",
];

const projectList = document.querySelector("#project-list");

const projectImage = document.querySelector("#project-image");

let GIFInterval = setInterval(getRandomGIF, 5000);

projects.forEach((project) => {
  const projectItem = document.createElement("div");
  projectItem.innerHTML = `<a href="./projects/${project.toLowerCase().split(" ").join("-")}">${project}</a>`;
  if (project === "brushed" || project === "dungeon mystery") {
    projectItem.innerHTML = `<a href="">${project}</a>`;
  }
  projectItem.classList.add("project-item");
  projectItem.classList.add(project.toLowerCase().split(" ").join("-"));
  projectList.appendChild(projectItem);
});

getRandomGIF();

const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((item) => {
  item.onmouseover = () => {
    document.querySelector(".project-item.active")?.classList.remove("active");
    item.classList.add("active");
    clearInterval(GIFInterval);
    const folderName = item.textContent.toLowerCase().split(" ").join("-");
    projectImage.style.backgroundImage = `url(./images/${folderName}/hero.gif)`;
  };
  item.onmouseout = () => {
    GIFInterval = setInterval(getRandomGIF, 5000);
  };
});

function getRandomGIF() {
  const randomProject = projects[Math.floor(Math.random() * projects.length)];
  const folderName = randomProject.toLowerCase().split(" ").join("-");
  projectImage.style.backgroundImage = `url(./images/${folderName}/hero.gif)`;
  document.querySelector(".project-item.active")?.classList.remove("active");
  document.querySelector(`.${folderName}`).classList.add("active");
}
