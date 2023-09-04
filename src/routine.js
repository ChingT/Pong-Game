import { Border } from "./base_obeject.js";
import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { canvasWidth, canvasHeight } from "./canvas.js";
import { addEventListeners, showPlayers } from "./helper.js";
import { printDebugInfo } from "./debug.js";
import { checkCollision } from "./collision.js";
import { Player, updateScore } from "./player.js";

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

const renderObjects = (border, ball, paddleLeft, paddleRight) => {
  border.render();
  paddleLeft.render();
  paddleRight.render();
  ball.render();
};

const routine = (border, ball, paddleLeft, paddleRight, player1, player2) => {
  renderObjects(border, ball, paddleLeft, paddleRight);

  ball.move();
  paddleLeft.move();
  paddleRight.move();

  const collision = checkCollision(ball, border, paddleLeft, paddleRight);
  const scoringPlayer = updateScore(collision, player1, player2);
  printDebugInfo(ball, border, paddleLeft, paddleRight);

  return scoringPlayer;
};

export { getObjects, renderObjects, routine };
