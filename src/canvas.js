const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const renderCircle = (x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const renderRectangle = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const renderVerticalLine = (x, y1, y2, color = "darkgrey") => {
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
};

const renderMessage = (lines) => {
  renderRectangle(0, 0, canvasWidth, canvasHeight, "rgba(125, 125, 125, 0.5)");

  ctx.fillStyle = "orange";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  const x = canvasWidth / 2;
  const y = canvasHeight / 2;
  const lineHeight = 50;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i - lines.length / 2) * lineHeight);
  }
};

const renderWelcomeMessage = (goal) => {
  const lines = [
    "To control paddle up & down:",
    "Player 1 - Q & A",
    "Player 2 - P & L",
    "",
    `Whoever gets ${goal} points wins!`,
    "",
    "Press ENTER to start",
  ];
  renderMessage(lines);
};

const renderScoringMessage = (player) => {
  const lines = [`${player.name} got a point!`, "", "Press SPACE to continue"];
  renderMessage(lines);
};

const renderWinnerMessage = (winner) => {
  const lines = [`${winner.name} won!`, "", `Press ENTER to restart.`];
  renderMessage(lines);
};

export {
  canvasWidth,
  canvasHeight,
  renderVerticalLine,
  renderCircle,
  renderRectangle,
  renderWelcomeMessage,
  renderScoringMessage,
  renderWinnerMessage,
};
