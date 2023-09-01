class Ball {
  constructor(canvasWidth, canvasHeight) {
    this._color = "red";
    this._radius = 5;

    this._init = { x: canvasWidth / 2, y: canvasHeight / 2 };
    this._xLimit = { upper: this._radius, lower: canvasWidth - this._radius };
    this._yLimit = { upper: this._radius, lower: canvasHeight - this._radius };

    this._baseVelocity = 5;
    this.position = { x: this._init.x, y: this._init.y };
    this.direction = { x: 1, y: 1 };
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this._radius, 0, 2 * Math.PI);
    ctx.fillStyle = this._color;
    ctx.fill();
  }

  move() {
    if (this.outOfHorizontalWall(this.position.x)) {
      this.direction.x = -this.direction.x;
    }
    if (this.outOfVerticalWall(this.position.y)) {
      this.direction.y = -this.direction.y;
    }
    this.position.x += this.direction.x * this._baseVelocity;
    this.position.y += this.direction.y * this._baseVelocity;
  }

  outOfHorizontalWall(x) {
    return x < this._xLimit.upper || x > this._xLimit.lower;
  }
  outOfVerticalWall(y) {
    return y < this._yLimit.upper || y > this._yLimit.lower;
  }
}

export { Ball };
