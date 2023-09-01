import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import {
  ctx,
  canvasWidth,
  canvasHeight,
  renderBackground,
  renderMiddleLine,
} from "./canvas.js";

let pause = false;

const paddleLeft = new Paddle(canvasHeight);
const paddleRight = new Paddle(canvasHeight, canvasWidth - 30);
const ball = new Ball(canvasWidth, canvasHeight);

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

const render = () => {
  renderBackground();
  paddleLeft.render(ctx);
  paddleRight.render(ctx);
  ball.render(ctx);
  renderMiddleLine();

  printDebugInfo();
};

// Debug
const postions = document.querySelector("#debug_info");
const outOfWall = document.querySelector("#debug_info2");
const printDebugInfo = () => {
  postions.innerHTML = `
  <p>Ball (${ball.position.x}, ${ball.position.y})<\p>
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
