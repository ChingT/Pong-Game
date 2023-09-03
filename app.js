import { getObjects, routine } from "./routine.js";
import { renderWinnerMessage } from "./canvas.js";

const startGame = () => {
  const [border, paddleLeft, paddleRight, ball, player1, player2] =
    getObjects();

  const myInterval = setInterval(() => {
    const winner = routine(
      border,
      paddleLeft,
      paddleRight,
      ball,
      player1,
      player2
    );

    if (winner) {
      clearInterval(myInterval);
      renderWinnerMessage(winner);
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
