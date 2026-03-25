let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false;
let count = 0;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

// PLAYER MOVE
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || turnO) return;

    box.innerText = "X";
    box.style.color = "blue"; // 🔵 X
    box.disabled = true;
    count++;

    let result = checkWinner();
    if (result) return;

    if (count === 9) {
      gameDraw();
      return;
    }

    turnO = true;
    setTimeout(computerMove, 500);
  });
});


// 🤖 COMPUTER MOVE
const computerMove = () => {
  let empty = [];

  boxes.forEach((box, i) => {
    if (box.innerText === "") empty.push(i);
  });

  if (empty.length === 0) return;

  let randIdx = empty[Math.floor(Math.random() * empty.length)];
  let box = boxes[randIdx];

  box.innerText = "O";
  box.style.color = "red"; // 🔴 O
  box.disabled = true;
  count++;

  let result = checkWinner();
  if (result) return;

  if (count === 9) {
    gameDraw();
    return;
  }

  turnO = false;
};


// 🏆 CHECK WINNER + HIGHLIGHT
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {

        // ✨ Highlight winning line
        boxes[a].style.backgroundColor = "#00ffcc";
        boxes[b].style.backgroundColor = "#00ffcc";
        boxes[c].style.backgroundColor = "#00ffcc";

        showWinner(pos1);
        return true;
      }
    }
  }
  return false;
};


// 🎉 SHOW WINNER
const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


// 🤝 DRAW
const gameDraw = () => {
  msg.innerText = "Game was a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};


// 🔒 DISABLE
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};


// 🔓 ENABLE + RESET COLORS
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "white";
  });
};


// 🔄 RESET GAME
const resetGame = () => {
  turnO = false;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);