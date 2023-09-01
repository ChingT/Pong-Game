class Paddle {
  constructor(canvasHeight) {
    this._color = "green";
    this._width = 20;
    this._height = 80;
    this._initX = 10;
    this._initY = 20;
    this._yLimit = {
      upper: 0,
      lower: canvasHeight - this._height,
    };

    this.baseVelocity = 10;
    this.x = this._initX;
    this.y = this._initY;
    this.velocity = 0;
  }

  render(ctx) {
    ctx.fillStyle = this._color;
    ctx.fillRect(this.x, this.y, this._width, this._height);
  }

  move() {
    if (this.outOfUpperWall(this.y + this.velocity)) {
      this.y = this._yLimit.upper;
    } else if (this.outOfLowerWall(this.y + this.velocity)) {
      this.y = this._yLimit.lower;
    } else {
      this.y += this.velocity;
    }
  }

  outOfUpperWall(y) {
    return y < this._yLimit.upper;
  }

  outOfLowerWall(y) {
    return y > this._yLimit.lower;
  }
}

export { Paddle };
