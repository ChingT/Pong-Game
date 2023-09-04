const addEventListeners = (paddleLeft, paddleRight) => {
  document.addEventListener("keydown", (event) => {
    const { key } = event;
    if (key === "ArrowDown") {
      paddleLeft.velocity.y = 1;
    } else if (key === "ArrowUp") {
      paddleLeft.velocity.y = -1;
    } else if (key === "2") {
      paddleRight.velocity.y = 1;
    } else if (key === "8") {
      paddleRight.velocity.y = -1;
    }
  });

  document.addEventListener("keyup", (event) => {
    const { key } = event;
    if (key === "ArrowDown" || key === "ArrowUp") {
      paddleLeft.velocity.y = 0;
    } else if (key === "2" || key === "8") {
      paddleRight.velocity.y = 0;
    }
  });
};

const showPlayers = (player1, player2) => {
  document.querySelector("#player1-name").textContent = player1.name;
  document.querySelector("#player2-name").textContent = player2.name;
  document.querySelector("#player1-score").textContent = player1.score;
  document.querySelector("#player2-score").textContent = player2.score;
};

export { addEventListeners, showPlayers };
