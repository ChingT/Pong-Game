import { Border } from "./base_obeject.js";
import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { canvasShape } from "./canvas.js";
import { addEventListeners, printDebugInfo } from "./helper.js";
import { checkCollision } from "./collision.js";

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

  checkCollision(ball, border, paddleLeft, paddleRight);
};

//  Call the functions
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    move();
    printDebugInfo(ball, border, paddleLeft, paddleRight);
  }
}, 50);
