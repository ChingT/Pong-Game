const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasShape = { width: canvas.width, height: canvas.height };

const renderCircle = (position, radius, color) => {
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const renderRectangle = (position, shpae, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(
    position.x - shpae.width / 2,
    position.y - shpae.height / 2,
    shpae.width,
    shpae.height
  );
};

const renderMiddleLine = () => {
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvasShape.width / 2, 0);
  ctx.lineTo(canvasShape.width / 2, canvasShape.height);
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2;
  ctx.stroke();
};

export { canvasShape, renderMiddleLine, renderCircle, renderRectangle };
