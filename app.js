import { MovingObejct } from "./base_obeject.js";
import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { canvasShape } from "./canvas.js";
import { addEventListeners, printDebugInfo } from "./helper.js";
import { checkCollision } from "./collision.js";

let pause = false;

const boder = new MovingObejct(
  canvasShape,
  {
    x: canvasShape.width / 2,
    y: canvasShape.height / 2,
  },
  canvasShape,
  "black"
);
const paddleLeft = new Paddle(canvasShape, {
  x: 20,
  y: canvasShape.height / 2,
});
const paddleRight = new Paddle(canvasShape, {
  x: canvasShape.width - 20,
  y: canvasShape.height / 2,
});
const ball = new Ball(canvasShape, {
  x: canvasShape.width / 2,
  y: canvasShape.height / 2,
});

addEventListeners(paddleLeft, paddleRight);

document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === " ") {
    pause = !pause;
  }
});

const render = () => {
  boder.render();
  paddleLeft.render();
  paddleRight.render();
  ball.render();
};

const move = () => {
  paddleLeft.move();
  paddleRight.move();
  ball.move();
};

//  Call the functions
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    move();
    checkCollision(ball, boder, paddleLeft, paddleRight);
    printDebugInfo(ball, boder, paddleLeft, paddleRight);
  }
}, 50);
