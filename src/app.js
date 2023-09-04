import { getObjects, renderObjects, routine } from "./routine.js";
import {
  renderWelcomeMessage,
  renderScoringMessage,
  renderWinnerMessage,
} from "./canvas.js";
import { findWinner, showScore } from "./player.js";

let myInterval;
const startGame = () => {
  resetAll();

  myInterval = setInterval(() => {
    if (!pause) {
      document.removeEventListener("keypress", handlePause);

      const scoringPlayer = routine(
        border,
        ball,
        paddleLeft,
        paddleRight,
        player1,
        player2
      );

      if (scoringPlayer) {
        const winner = findWinner(scoringPlayer, 2);
        if (winner) {
          clearInterval(myInterval);
          renderWinnerMessage(winner);
          document.addEventListener("keypress", handleStart);
        } else {
          pause = true;
          document.addEventListener("keypress", handlePause);
          renderScoringMessage(scoringPlayer);
          resetObjects();
        }
      }
    }
  }, 30);
};

const handleStart = (event) => {
  const { key } = event;
  if (key === "Enter") {
    resetAll();
    clearInterval(myInterval);
    startGame();
    document.removeEventListener("keypress", handleStart);
  }
};

let pause = false;
const handlePause = (event) => {
  const { key } = event;
  if (key === " ") {
    pause = false;
  }
};

const { border, ball, paddleLeft, paddleRight, player1, player2 } =
  getObjects();
const resetObjects = () => {
  ball.reset();
  paddleLeft.reset();
  paddleRight.reset();
};
const resetAll = () => {
  resetObjects();
  player1.reset();
  player2.reset();
  showScore(player1.score, player2.score);
};

renderObjects(border, ball, paddleLeft, paddleRight);
renderWelcomeMessage();
document.addEventListener("keypress", handleStart);
