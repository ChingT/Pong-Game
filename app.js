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
class Ball {
  constructor() {
    this.color = "red";
    this.radius = 5;
    this.initX = CANVAS_WIDTH / 2;
    this.initY = CANVAS_HEIGHT / 2;
    this.x = this.initX;
    this.y = this.initY;
    this.directionX = 1;
    this.directionY = 1;
    this.baseVelocity = 5;
  }

  outOfHorizontalWall(x) {
    return x < this.radius || x > CANVAS_WIDTH - this.radius;
  }
  outOfVerticalWall(y) {
    return y < this.radius || y > CANVAS_HEIGHT - this.radius;
  }
}

const ball = new Ball();

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
  ctx.arc(x, y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();
};
const renderPaddle = (x, y) => {
  ctx.fillStyle = paddle.color;
  ctx.fillRect(x, y, paddle.width, paddle.height);
};

const render = () => {
  renderBackground();
  renderPaddle(paddle.x, paddle.y);
  renderBall(ball.x, ball.y);

  printDebugInfo();
};

// Controller functions
const controlBall = () => {
  if (ball.outOfHorizontalWall(ball.x)) {
    ball.directionX = -ball.directionX;
  }
  if (ball.outOfVerticalWall(ball.y)) {
    ball.directionY = -ball.directionY;
  }
  ball.x += ball.directionX * ball.baseVelocity;
  ball.y += ball.directionY * ball.baseVelocity;
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
  <p>Ball (${ball.x}, ${ball.y})<\p>
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
