import { getObjects, routine } from "./routine.js";
import { renderWinnerMessage } from "./canvas.js";
import { findWinner } from "./player.js";

const [border, paddleLeft, paddleRight, ball, player1, player2] = getObjects();

const startGame = () => {
  const myInterval = setInterval(() => {
    const scoring = routine(
      border,
      paddleLeft,
      paddleRight,
      ball,
      player1,
      player2
    );

    if (scoring) {
      const winner = findWinner(player1, player2, 5);
      if (winner) {
        clearInterval(myInterval);
        renderWinnerMessage(winner);
        player1.reset();
        player2.reset();
      }

      paddleLeft.reset();
      paddleRight.reset();
      ball.reset();
    }
  }, 30);
};

startGame();

document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === "r") {
    startGame();
  }
});
