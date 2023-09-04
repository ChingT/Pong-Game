class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  reset() {
    this.score = 0;
  }
}

const updateScore = (collision, player1, player2) => {
  const { left, right } = collision;
  if (right !== null) {
    player1.score++;
    showScore(player1.score, player2.score);
    return player1;
  }
  if (left !== null) {
    player2.score++;
    showScore(player1.score, player2.score);
    return player2;
  }
};

const showScore = (score1, score2) => {
  let element = document.querySelector("#player1-score");
  element.textContent = score1;

  element = document.querySelector("#player2-score");
  element.textContent = score2;
};

const findWinner = (scoringPlayer, goal) => {
  return scoringPlayer.score >= goal ? scoringPlayer : null;
};

export { Player, updateScore, findWinner, showScore };
