import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import {
  ctx,
  canvasWidth,
  canvasHeight,
  renderBackground,
  renderMiddleLine,
} from "./canvas.js";
import { addEventListeners, printDebugInfo } from "./helper.js";
import { checkCollision } from "./collision.js";

let pause = false;

const paddleLeft = new Paddle(canvasHeight);
const paddleRight = new Paddle(canvasHeight, canvasWidth - 30);
const ball = new Ball(canvasWidth, canvasHeight);

addEventListeners(paddleLeft, paddleRight);

const render = () => {
  renderBackground();
  paddleLeft.render(ctx);
  paddleRight.render(ctx);
  ball.render(ctx);
  renderMiddleLine();

  printDebugInfo(paddleLeft, ball);
};

//  Call the functions
render();
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    ball.move();
    paddleLeft.moveY();
    paddleRight.moveY();
    checkCollision(paddleLeft, paddleRight, ball);
  }
}, 50);
