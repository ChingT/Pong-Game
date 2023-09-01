class Ball {
  constructor(canvasWidth, canvasHeight) {
    this._color = "red";
    this._radius = 5;

    this._init = { x: canvasWidth / 2, y: canvasHeight / 2 };
    this._xLimit = { left: this._radius, right: canvasWidth - this._radius };
    this._yLimit = { upper: this._radius, lower: canvasHeight - this._radius };

    this._baseVelocity = 5;
    this.position = { x: this._init.x, y: this._init.y };
    this.direction = { x: 1, y: 1 };
  }

  get outOfHorizontalWall() {
    return (
      this.position.x < this._xLimit.left ||
      this.position.x >= this._xLimit.right
    );
  }
  get outOfVerticalWall() {
    return (
      this.position.y < this._yLimit.upper ||
      this.position.y >= this._yLimit.lower
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
