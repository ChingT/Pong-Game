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

const renderWinnerMessage = (winner) => {
  renderRectangle(0, 0, canvasWidth, canvasHeight, "rgba(125, 125, 125, 0.5)");

  ctx.fillStyle = "orange";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${winner.name} wins!`, canvasWidth / 2, canvasHeight / 2 - 25);
  ctx.fillText(`Press r to restart.`, canvasWidth / 2, canvasHeight / 2 + 25);
};

export {
  canvasWidth,
  canvasHeight,
  renderVerticalLine,
  renderCircle,
  renderRectangle,
  renderWinnerMessage,
};
