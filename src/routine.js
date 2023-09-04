import { Border } from "./base_obeject.js";
import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { canvasWidth, canvasHeight } from "./canvas.js";
import { addEventListeners, showPlayers, printDebugInfo } from "./helper.js";
import { checkCollision } from "./collision.js";
import { Player, updateScore } from "./player.js";

let pause = false;
document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === " ") {
    pause = !pause;
  }
});

const getObjects = () => {
  const border = new Border(
    { x: canvasWidth / 2, y: canvasHeight / 2 },
    { width: canvasWidth, height: canvasHeight },
    "black"
  );
  const ball = new Ball({ x: canvasWidth / 2, y: canvasHeight / 2 });
  const paddleLeft = new Paddle({ x: 20, y: canvasHeight / 2 });
  const paddleRight = new Paddle({ x: canvasWidth - 20, y: canvasHeight / 2 });
  addEventListeners(paddleLeft, paddleRight);

  const player1 = new Player("player1");
  const player2 = new Player("player2");
  showPlayers(player1, player2);

  return { border, ball, paddleLeft, paddleRight, player1, player2 };
};

const routine = (border, ball, paddleLeft, paddleRight, player1, player2) => {
  if (!pause) {
    border.render();
    paddleLeft.render();
    paddleRight.render();
    ball.render();

    ball.move();
    paddleLeft.move();
    paddleRight.move();

    const collision = checkCollision(ball, border, paddleLeft, paddleRight);
    const scoring = updateScore(collision, player1, player2);
    printDebugInfo(ball, border, paddleLeft, paddleRight);

    return scoring;
  }
};

export { getObjects, routine };
