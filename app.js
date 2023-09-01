import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";

// Canvas
const canvas = document.querySelector("canvas");
const postions = document.querySelector("#debug_info");
const outOfWall = document.querySelector("#debug_info2");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
let pause = false;

const paddleLeft = new Paddle(CANVAS_HEIGHT);
const paddleRight = new Paddle(CANVAS_HEIGHT, CANVAS_WIDTH - 30);
const ball = new Ball(CANVAS_WIDTH, CANVAS_HEIGHT);

// EventListener
document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key === "ArrowDown") {
    paddleLeft.direction = 1;
  } else if (key === "ArrowUp") {
    paddleLeft.direction = -1;
  } else if (key === "2") {
    paddleRight.direction = 1;
  } else if (key === "8") {
    paddleRight.direction = -1;
  }
});
document.addEventListener("keyup", (event) => {
  const { key } = event;
  if (key === "ArrowDown" || key === "ArrowUp") {
    paddleLeft.direction = 0;
  } else if (key === "2" || key === "8") {
    paddleRight.direction = 0;
  }
});

// Render functions
const renderBackground = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};
const renderMiddleLine = () => {
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH / 2, 0);
  ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
};

const render = () => {
  renderBackground();
  paddleLeft.render(ctx);
  paddleRight.render(ctx);
  ball.render(ctx);
  renderMiddleLine();

  printDebugInfo();
};

// Debug
const printDebugInfo = () => {
  postions.innerHTML = `
  <p>Ball (${ball.x}, ${ball.y})<\p>
  <p>Paddle (${paddleLeft.position.x}, ${paddleLeft.position.y})<\p>
  `;

  if (paddleLeft.position.y < paddleLeft._yLimit.upper) {
    outOfWall.textContent = `Paddle is out of upper wall!`;
  } else if (paddleLeft.position.y > paddleLeft._yLimit.lower) {
    outOfWall.textContent = `Paddle is out of lower wall!`;
  } else {
    outOfWall.textContent = "";
  }
};

//  Call the functions
render();
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    ball.move();
    paddleLeft.moveY();
    paddleRight.moveY();
  }
}, 50);
