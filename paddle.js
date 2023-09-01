class Paddle {
  constructor(canvasHeight, initX = 10, initY = 20) {
    this._color = "green";
    this._shpae = { width: 20, height: 80 };
    this._init = { x: initX, y: initY };
    this._yLimit = { upper: 0, lower: canvasHeight - this._shpae.height };

    this.baseVelocity = 10;
    this.position = { x: this._init.x, y: this._init.y };
    this.velocity = 0;
  }

  render(ctx) {
    ctx.fillStyle = this._color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this._shpae.width,
      this._shpae.height
    );
  }

  move() {
    if (this.outOfUpperWall(this.position.y + this.velocity)) {
      this.position.y = this._yLimit.upper;
    } else if (this.outOfLowerWall(this.position.y + this.velocity)) {
      this.position.y = this._yLimit.lower;
    } else {
      this.position.y += this.velocity;
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
