// Canvas
const canvas = document.querySelector("canvas");
const ball_postion = document.querySelector("#debug_info");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
let pause = false;

// Paddle
const PADDLE_COLOR = "white";
const PaddleWidth = 20;
const PaddleHeight = 80;
const InitPaddleX = 10;
const InitPaddleY = 20;
const baseVelocityPaddle = 1;
let paddleX = InitPaddleX;
let paddleY = InitPaddleY;
let velocityPaddleY = 0;
const paddleYLimit = [0, CANVAS_HEIGHT - PaddleHeight];
const paddleOutOfUpperWall = (y) => y < paddleYLimit[0];
const paddleOutOfLowerWall = (y) => y >= paddleYLimit[1];

// Ball
const BALL_COLOR = "red";
const RADIUS = 5;
const InitBallX = InitPaddleX + PaddleWidth + RADIUS;
const InitBallY = InitPaddleY + PaddleHeight / 2;
let ballX = InitBallX;
let ballY = InitBallY;
let velocityBallX = 1;
let velocityBallY = 1;
const ballOutOfWallH = (x) => x < RADIUS || x >= CANVAS_WIDTH - RADIUS;
const ballOutOfWallV = (y) => y < RADIUS || y >= CANVAS_HEIGHT - RADIUS;

// EventListener
document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key === "ArrowDown") {
    velocityPaddleY = baseVelocityPaddle;
  } else if (key === "ArrowUp") {
    velocityPaddleY = -baseVelocityPaddle;
  }
});
document.addEventListener("keyup", (event) => {
  const { key } = event;
  if (key === "ArrowDown" || key === "ArrowUp") {
    velocityPaddleY = 0;
  }
});
document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === " ") {
    pause = !pause;
  }
});

// Render functions
const renderBackground = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};
const renderBall = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = BALL_COLOR;
  ctx.fill();
};
const renderPaddle = (x, y) => {
  ctx.fillStyle = PADDLE_COLOR;
  ctx.fillRect(x, y, PaddleWidth, PaddleHeight);
};

const render = () => {
  renderBackground();
  renderPaddle(paddleX, paddleY);
  renderBall(ballX, ballY);

  printPostions();
};

// Controller functions
const controlBall = () => {
  if (ballOutOfWallH(ballX)) {
    velocityBallX = -velocityBallX;
  }
  if (ballOutOfWallV(ballY)) {
    velocityBallY = -velocityBallY;
  }
  ballX += velocityBallX;
  ballY += velocityBallY;
};

const controlPaddle = () => {
  if (paddleOutOfUpperWall(paddleY + velocityPaddleY)) {
    paddleY = paddleYLimit[0];
  } else if (paddleOutOfLowerWall(paddleY + velocityPaddleY)) {
    paddleY = paddleYLimit[1];
  } else {
    paddleY += velocityPaddleY;
  }
};

// Debug
const printPostions = () => {
  debug_info.innerHTML = `
  <p>Ball (${ballX}, ${ballY})<\p>
  <p>Paddle (${paddleX}, ${paddleY})<\p>
  `;
};

//  Call the functions
render();
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    controlBall();
    controlPaddle();
  }
}, 1);
