import { renderRectangle, renderMiddleLine } from "./canvas.js";

class BaseObejct {
  constructor(canvasShape, initPosition, shpae, color) {
    this._color = color;
    this._initPosition = initPosition;
    this._shpae = shpae;

    this._position = { x: this._initPosition.x, y: this._initPosition.y }; // Center position of the object
    this.limits = {
      xMin: this._shpae.width / 2,
      xMax: canvasShape.width - this._shpae.width / 2,
      yMin: this._shpae.height / 2,
      yMax: canvasShape.height - this._shpae.height / 2,
    };
  }

  get outline() {
    return {
      xMin: this.position.x - this._shpae.width / 2,
      xMax: this.position.x + this._shpae.width / 2,
      yMin: this.position.y - this._shpae.height / 2,
      yMax: this.position.y + this._shpae.height / 2,
    };
  }

  get position() {
    return this._position;
  }
  set position(newPostion) {
    let { x, y } = newPostion;
    x = x <= this.limits.xMin ? this.limits.xMin : x;
    x = x >= this.limits.xMax ? this.limits.xMax : x;
    y = y <= this.limits.yMin ? this.limits.yMin : y;
    y = y >= this.limits.yMax ? this.limits.yMax : y;
    this._position = { x: x, y: y };
  }

  render() {
    renderRectangle(this.position, this._shpae, this._color);
    renderMiddleLine();
  }
}

class MovingObejct extends BaseObejct {
  constructor(canvasShape, initPosition, shpae, color, velocity, baseVelocity) {
    super(canvasShape, initPosition, shpae, color);

    this.velocity = velocity;
    this._baseVelocity = baseVelocity;
  }

  move() {
    let { x, y } = this.position;
    x = this.position.x + this._baseVelocity * this.velocity.x;
    y = this.position.y + this._baseVelocity * this.velocity.y;
    this.position = { x, y };
  }
}

export { BaseObejct, MovingObejct };
