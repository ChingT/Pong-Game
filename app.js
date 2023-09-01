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

const paddle = new Paddle(CANVAS_HEIGHT);
const ball = new Ball(CANVAS_WIDTH, CANVAS_HEIGHT);

// EventListener
document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key === "ArrowDown") {
    paddle.velocity = paddle.baseVelocity;
  } else if (key === "ArrowUp") {
    paddle.velocity = -paddle.baseVelocity;
  }
});
document.addEventListener("keyup", (event) => {
  const { key } = event;
  if (key === "ArrowDown" || key === "ArrowUp") {
    paddle.velocity = 0;
  }
});
document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === " ") {
    pause = !pause;
  }
});

// Render functions
const renderBackground = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const render = () => {
  renderBackground();
  paddle.render(ctx);
  ball.render(ctx);

  printDebugInfo();
};

// Debug
const printDebugInfo = () => {
  postions.innerHTML = `
  <p>Ball (${ball.x}, ${ball.y})<\p>
  <p>Paddle (${paddle.position.x}, ${paddle.position.y})<\p>
  `;

  if (paddle.position.y < paddle._yLimit.upper) {
    outOfWall.textContent = `Paddle is out of upper wall!`;
  } else if (paddle.position.y > paddle._yLimit.lower) {
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
    paddle.move();
  }
}, 20);
