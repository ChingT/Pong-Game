class Ball {
  constructor(canvasWidth, canvasHeight) {
    this._color = "red";
    this._radius = 5;

    this._init = { x: canvasWidth / 2, y: canvasHeight / 2 };
    this._xLimit = { left: 0, right: canvasWidth };
    this._yLimit = { upper: 0, lower: canvasHeight };

    this._baseVelocity = 5;
    this.position = { x: this._init.x, y: this._init.y };
    this.direction = { x: 1, y: 1 };
  }

  get outline() {
    return {
      left: this.position.x - this._radius,
      right: this.position.x + this._radius,
      top: this.position.y - this._radius,
      buttom: this.position.y + this._radius,
    };
  }

  get outOfHorizontalWall() {
    return (
      this.outline.left < this._xLimit.left ||
      this.outline.right >= this._xLimit.right
    );
  }
  get outOfVerticalWall() {
    return (
      this.outline.top < this._yLimit.upper ||
      this.outline.buttom >= this._yLimit.lower
    );
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this._radius, 0, 2 * Math.PI);
    ctx.fillStyle = this._color;
    ctx.fill();
  }

  move() {
    this.checkBounce();
    this.position.x += this.direction.x * this._baseVelocity;
    this.position.y += this.direction.y * this._baseVelocity;
  }

  checkBounce() {
    this.direction.x *= this.outOfHorizontalWall ? -1 : 1;
    this.direction.y *= this.outOfVerticalWall ? -1 : 1;
  }
}

export { Ball };
