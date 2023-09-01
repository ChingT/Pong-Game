const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const renderBackground = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const renderMiddleLine = () => {
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
};

export { ctx, canvasWidth, canvasHeight, renderBackground, renderMiddleLine };
