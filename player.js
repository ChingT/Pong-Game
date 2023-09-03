class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

const updateScore = (collision, player1, player2) => {
  const { left, right } = collision;
  if (right !== null) {
    player1.score++;
    let element = document.querySelector("#player1-score");
    element.textContent = player1.score;
  }
  if (left !== null) {
    player2.score++;
    let element = document.querySelector("#player2-score");
    element.textContent = player2.score;
  }
};

const findWinner = (player1, player2, goal) => {
  if (player1.score === goal) {
    return player1;
  } else if (player2.score === goal) {
    return player2;
  }
};

export { Player, updateScore, findWinner };
