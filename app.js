// Canvas
const canvas = document.querySelector("canvas");
const postions = document.querySelector("#debug_info");
const outOfWall = document.querySelector("#debug_info2");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
let pause = false;

// Paddle
class Paddle {
  constructor() {
    this.width = 20;
    this.height = 80;
    this.initX = 10;
    this.initY = 20;

    this.color = "green";
    this.baseVelocity = 10;

    this.x = this.initX;
    this.y = this.initY;
    this.velocity = 0;
    this.yUpperLimit = 0;
    this.yLowerLimit = CANVAS_HEIGHT - this.height;
  }

  outOfUpperWall(y) {
    return y < this.yUpperLimit;
  }

  outOfLowerWall(y) {
    return y > this.yLowerLimit;
  }
}

const paddle = new Paddle();

// Ball
const BALL_COLOR = "red";
const RADIUS = 5;
const InitBallX = CANVAS_WIDTH / 2;
const InitBallY = CANVAS_HEIGHT / 2;
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
    paddle.velocity = paddle.baseVelocity;
  } else if (key === "ArrowUp") {
    paddle.velocity = -paddle.baseVelocity;
  }
});
document.addEventListener("keyup", (event) => {
  const { key } = event;
  if (key === "ArrowDown" || key === "ArrowUp") {
    paddle.velocity = 0;
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
  ctx.fillStyle = paddle.color;
  ctx.fillRect(x, y, paddle.width, paddle.height);
};

const render = () => {
  renderBackground();
  renderPaddle(paddle.x, paddle.y);
  renderBall(ballX, ballY);

  printDebugInfo();
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
  if (paddle.outOfUpperWall(paddle.y + paddle.velocity)) {
    paddle.y = paddle.yUpperLimit;
  } else if (paddle.outOfLowerWall(paddle.y + paddle.velocity)) {
    paddle.y = paddle.yLowerLimit;
  } else {
    paddle.y += paddle.velocity;
  }
};

// Debug
const printDebugInfo = () => {
  debug_info.innerHTML = `
  <p>Ball (${ballX}, ${ballY})<\p>
  <p>Paddle (${paddle.x}, ${paddle.y})<\p>
  `;

  if (paddle.y < paddle.yUpperLimit) {
    outOfWall.innerHTML = `Paddle is out of upper wall!`;
  } else if (paddle.y > paddle.yLowerLimit) {
    outOfWall.innerHTML = `Paddle is out of lower wall!`;
  } else {
    outOfWall.innerHTML = "";
  }
};

//  Call the functions
render();
const myInterval = setInterval(() => {
  if (!pause) {
    render();
    controlBall();
    controlPaddle();
  }
}, 20);
