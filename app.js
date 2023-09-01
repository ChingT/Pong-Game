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
    this._color = "green";
    this._width = 20;
    this._height = 80;
    this._initX = 10;
    this._initY = 20;
    this._yUpperLimit = 0;
    this._yLowerLimit = CANVAS_HEIGHT - this._height;
    this.baseVelocity = 10;

    this.x = this._initX;
    this.y = this._initY;
    this.velocity = 0;
  }

  render() {
    ctx.fillStyle = this._color;
    ctx.fillRect(this.x, this.y, this._width, this._height);
  }

  move() {
    if (this.outOfUpperWall(this.y + this.velocity)) {
      this.y = this._yUpperLimit;
    } else if (this.outOfLowerWall(this.y + this.velocity)) {
      this.y = this._yLowerLimit;
    } else {
      this.y += this.velocity;
    }
  }

  outOfUpperWall(y) {
    return y < this._yUpperLimit;
  }

  outOfLowerWall(y) {
    return y > this._yLowerLimit;
  }
}

const paddle = new Paddle();

// Ball
class Ball {
  constructor() {
    this._color = "red";
    this._radius = 5;
    this._initX = CANVAS_WIDTH / 2;
    this._initY = CANVAS_HEIGHT / 2;
    this._baseVelocity = 5;

    this.x = this._initX;
    this.y = this._initY;
    this.directionX = 1;
    this.directionY = 1;
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this._radius, 0, 2 * Math.PI);
    ctx.fillStyle = this._color;
    ctx.fill();
  }

  move() {
    if (this.outOfHorizontalWall(this.x)) {
      this.directionX = -this.directionX;
    }
    if (this.outOfVerticalWall(this.y)) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX * this._baseVelocity;
    this.y += this.directionY * this._baseVelocity;
  }

  outOfHorizontalWall(x) {
    return x < this._radius || x > CANVAS_WIDTH - this._radius;
  }
  outOfVerticalWall(y) {
    return y < this._radius || y > CANVAS_HEIGHT - this._radius;
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

const render = () => {
  renderBackground();
  paddle.render();
  ball.render();

  printDebugInfo();
};

// Debug
const printDebugInfo = () => {
  debug_info.innerHTML = `
  <p>Ball (${ball.x}, ${ball.y})<\p>
  <p>Paddle (${paddle.x}, ${paddle.y})<\p>
  `;

  if (paddle.y < paddle._yUpperLimit) {
    outOfWall.innerHTML = `Paddle is out of upper wall!`;
  } else if (paddle.y > paddle._yLowerLimit) {
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
    ball.move();
    paddle.move();
  }
}, 20);
