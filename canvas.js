const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasShape = { width: canvas.width, height: canvas.height };

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

const renderVerticalLine = (x, y1, y2, color = "gray") => {
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
};

export { canvasShape, renderVerticalLine, renderCircle, renderRectangle };
