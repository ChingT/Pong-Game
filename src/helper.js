const addEventListeners = (paddleLeft, paddleRight) => {
  document.addEventListener("keydown", (event) => {
    let { key } = event;
    key = key.toLowerCase();
    if (key === "q") {
      paddleLeft.velocity.y = -1;
    } else if (key === "a") {
      paddleLeft.velocity.y = 1;
    } else if (key === "p") {
      paddleRight.velocity.y = -1;
    } else if (key === "l") {
      paddleRight.velocity.y = 1;
    }
  });

  document.addEventListener("keyup", (event) => {
    let { key } = event;
    key = key.toLowerCase();
    if (key === "q" || key === "a") {
      paddleLeft.velocity.y = 0;
    } else if (key === "p" || key === "l") {
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
