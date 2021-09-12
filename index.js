const arrNum = [];
let scores = 0;
let timer = 1;

const screen = document.getElementById("screen-playing");
const newGame = document.getElementById("new");
const scoresEle = document.getElementById("scores");
const start = document.getElementById("start");

const countdown = document.getElementById("countdown");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

const overwrite = document.getElementById("overwrite");

newGame.addEventListener("click", () => {
  location.reload();
});

function createFrameNum() {
  for (let i = 100; i > 0; i--) {
    arrNum.push(i);
  }
}

function shuffleArr(array) {
  var currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function randomColor(element) {
  let random = Math.floor(Math.random() * 10);
  if (element) {
    if (random == 1) element.style.color = "#ea7030";
    if (random == 2) element.style.color = "#e02e40";
    if (random == 3) element.style.color = "#ad1b7c";
    if (random == 4) element.style.color = "#ff011d";
    if (random == 5) element.style.color = "#4867aa";
    if (random == 6) element.style.color = "#df3e40";
    if (random == 7) element.style.color = "#989898";
    if (random == 8) element.style.color = "#d1d1d1";
    if (random == 9) element.style.color = "#373c3f";
    if (random == 0) element.style.color = "#59563b";
  }
}

function checkCorrect(num, arr, node, scores) {
  let index = arr.length - 1;

  if (num == arr[index]) {
    node.classList.add("is-check");
    arr.pop();

    updateScores(num, scores);
  }
}

function updateScores(num, scores) {
  scores = num * 10;

  scoresEle.innerText = scores;
}

function createNodeNum(screen, num) {
  var node = document.createElement("BUTTON");
  var span = document.createElement("SPAN");

  node.classList.add("num-child");
  node.classList.add("style-child");

  var text = document.createTextNode(num);
  node.appendChild(span).appendChild(text);
  screen.appendChild(node);

  randomColor(span);

  node.addEventListener("click", () => {
    checkCorrect(num, arrNum, node, scores);
  });
}

function createScreen() {
  shuffleArr([...arrNum]).forEach((num) => {
    createNodeNum(screen, num.toString());
  });
}

function formatTime(str) {
  if (str.length == 1) return `0${str}`;
}

function formatTimer(timer, minute, second) {
  let mi = Math.floor(timer / 60),
    se = timer - mi * 60;
  console.log(mi, se);
  minute.innerText = mi.toString();
  second.innerText = se.toString();
}

start.addEventListener("click", () => {
  minute.innerText = "2";
  second.innerText = "00";

  start.classList.add("btn-disable");
  countdown.classList.remove("hide");

  let clock = setInterval(() => {
    timer--;
    formatTimer(timer, minute, second);

    if (timer == 0) {
      clearInterval(clock);
      overwrite.classList.remove("hide");
    }
  }, 1000);
});

createFrameNum();
createScreen();
