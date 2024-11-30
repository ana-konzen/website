const blue = "#2B3C7E";
const yellow = "#EEBE46";
const red = "#AF3034";
const green = "#036848";
const lightblue = "#6CA8D9";

const cellHeight = parseInt(getComputedStyle(document.body).getPropertyValue("--cell-height"));
const minWidth = cellHeight * 2;
const maxWidth = minWidth + 100;

const palette = [blue, yellow, red, green, lightblue];

const logoCont = document.getElementById("logoCont");

const letters = ["m", "a", "l", "b", "a"];

const cells = [];
const cellAngles = [];

const minAng = 40 * (Math.PI / 180);
const maxX = 400;
const maxY = 400;

createCells();

const cellElts = document.querySelectorAll(".cell");
const mask = document.getElementById("mask");

changeColor();
setPositions();

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function createCells() {
  letters.forEach((letter) => {
    const newCell = document.createElement("div");
    // newCell.style.zIndex = 5 - index;
    newCell.classList.add("cell");
    const letterCont = document.createElement("div");
    letterCont.textContent = letter;
    letterCont.classList.add("letter");
    newCell.appendChild(letterCont);
    logoCont.appendChild(newCell);
  });
}

function setPositions() {
  mask.innerHTML = "";
  let cellX = 0;
  let cellY = Math.random() * maxY;

  cellElts.forEach((cell, index) => {
    let width = randomInt(minWidth, maxWidth);
    let ang = randomNum(-Math.PI / 2, Math.PI / 2);
    let dx = Math.cos(ang) * (width - cellHeight);
    let dy = Math.sin(ang) * (width - cellHeight);

    const prevAng = index > 0 ? cellAngles[index - 1] : 0;
    const maxTries = 10000;
    let counter = 0;

    while (
      cellX + dx > maxX ||
      cellX + dx < 0 ||
      cellY + dy > maxY ||
      cellY + dy < 0 ||
      Math.abs(ang - prevAng) > Math.PI - minAng
    ) {
      width = randomInt(minWidth, maxWidth);
      ang = randomNum(-Math.PI / 2, Math.PI / 2);
      dx = Math.cos(ang) * (width - cellHeight);
      dy = Math.sin(ang) * (width - cellHeight);
      counter++;
      if (counter > maxTries) break;
    }

    cellAngles.push(ang);

    styleCell(cell, width, ang, cellX, cellY);
    setMask(width, ang, cellX, cellY);

    cellX += dx;
    cellY += dy;
  });
}

function styleCell(cell, width, ang, x, y) {
  cell.style.width = `${width}px`;
  cell.style.left = `${x}px`;
  cell.style.top = `${y}px`;
  cell.style.transform = `rotate(${ang}rad)`;
  cell.firstChild.style.transform = `rotate(${-ang}rad)`;
}

function setMask(width, ang, x, y) {
  mask.innerHTML += `<rect fill="black" x="${x}" y="${y}" width="${width}" height="${cellHeight}" transform="rotate(${
    ang * (180 / Math.PI)
  } ${x + cellHeight / 2} ${y + cellHeight / 2})"  rx="${cellHeight / 2}" />`;
}

function changeColor() {
  let previousColor = null;
  cellElts.forEach((cell) => {
    const color = getRandomColor(previousColor);
    cell.style.backgroundColor = color;
    cell.firstChild.style.color = getRandomColor(color);
    previousColor = color;
  });
}

function getRandomColor(color) {
  const excludeColors = [];
  excludeColors.push(color);
  if (color === blue) {
    excludeColors.push(red);
  } else if (color === red) {
    excludeColors.push(green, blue);
  } else if (color === green) {
    excludeColors.push(red);
  }
  const filteredColors = palette.filter((color) => !excludeColors.includes(color));
  return filteredColors[Math.floor(Math.random() * filteredColors.length)];
}
