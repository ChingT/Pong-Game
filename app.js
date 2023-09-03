import { Border } from "./base_obeject.js";
import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { canvasShape } from "./canvas.js";
import { addEventListeners, printDebugInfo } from "./helper.js";
import { checkCollision } from "./collision.js";
import { Player } from "./player.js";

let pause = false;

const border = new Border(
  { x: canvasShape.width / 2, y: canvasShape.height / 2 },
  canvasShape,
  "black"
);
const paddleLeft = new Paddle({ x: 20, y: canvasShape.height / 2 });
const paddleRight = new Paddle({
  x: canvasShape.width - 20,
  y: canvasShape.height / 2,
});
const ball = new Ball({ x: canvasShape.width / 2, y: canvasShape.height / 2 });

const player1 = new Player("player1");
const player2 = new Player("player2");

addEventListeners(paddleLeft, paddleRight);

document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === " ") {
    pause = !pause;
  }
});

const render = () => {
  border.render();
  paddleLeft.render();
  paddleRight.render();
  ball.render();
};

const move = () => {
  ball.move();
  paddleLeft.move();
  paddleRight.move();

  const collision = checkCollision(ball, border, paddleLeft, paddleRight);
  updateScore(collision);
};

const updateScore = (collision) => {
  const { left, right } = collision;
  if (right !== null) {
    player1.score++;
    let element = document.querySelector("#player1-score");
    element.textContent = player1.score;
  }
  if (left !== null) {
    player2.score++;
    let element = document.querySelector("#player2-score");
    element.textContent = player2.score;
  }
};

const showPlayers = () => {
  document.querySelector("#player1-name").textContent = player1.name;
  document.querySelector("#player2-name").textContent = player2.name;
  document.querySelector("#player1-score").textContent = player1.score;
  document.querySelector("#player2-score").textContent = player2.score;
};

showPlayers();
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    move();
    printDebugInfo(ball, border, paddleLeft, paddleRight);
  }
}, 50);
