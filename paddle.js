class Paddle {
  constructor(canvasHeight, initX = 10, initY = 20) {
    this._color = "green";
    this._shpae = { width: 20, height: 80 };
    this._init = { x: initX, y: initY };
    this._yLimit = { upper: 0, lower: canvasHeight - this._shpae.height };

    this._baseVelocity = 20;
    this._position = { x: this._init.x, y: this._init.y };
    this.direction = 0;
  }

  get position() {
    return this._position;
  }
  set position(newPostion) {
    let { x, y } = newPostion;
    y = y < this._yLimit.upper ? this._yLimit.upper : y;
    y = y > this._yLimit.lower ? this._yLimit.lower : y;
    this._position = { x: x, y: y };
  }

  moveY() {
    this.position = {
      x: this.position.x,
      y: this.position.y + this._baseVelocity * this.direction,
    };
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
}

export { Paddle };
