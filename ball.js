class Ball {
  constructor(canvasWidth, canvasHeight) {
    this._color = "red";
    this._radius = 5;
    this._initX = canvasWidth / 2;
    this._initY = canvasHeight / 2;
    this._xLimit = {
      upper: this._radius,
      lower: canvasWidth - this._radius,
    };
    this._yLimit = {
      upper: this._radius,
      lower: canvasHeight - this._radius,
    };

    this._baseVelocity = 5;
    this.x = this._initX;
    this.y = this._initY;
    this.directionX = 1;
    this.directionY = 1;
  }

  render(ctx) {
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
    return x < this._xLimit.upper || x > this._xLimit.lower;
  }
  outOfVerticalWall(y) {
    return y < this._yLimit.upper || y > this._yLimit.lower;
  }
}

export { Ball };
