import { renderRectangle, renderVerticalLine } from "./canvas.js";

class BaseObejct {
  constructor(initPosition, shpae, color) {
    this._color = color;
    this._shpae = shpae;

    this.centroid = { x: initPosition.x, y: initPosition.y };
  }

  get boundingBox() {
    return {
      xMin: this.centroid.x - this._shpae.width / 2,
      xMax: this.centroid.x + this._shpae.width / 2,
      yMin: this.centroid.y - this._shpae.height / 2,
      yMax: this.centroid.y + this._shpae.height / 2,
    };
  }
}

class Border extends BaseObejct {
  constructor(initPosition, shpae, color) {
    super(initPosition, shpae, color);
  }

  render() {
    const { xMin, yMin } = this.boundingBox;
    const { width, height } = this._shpae;
    renderRectangle(xMin, yMin, width, height, this._color);
    renderVerticalLine(this.centroid.x, 0, this._shpae.height);
  }
}

class MovingObejct extends BaseObejct {
  constructor(initPosition, shpae, color, baseVelocity, velocity) {
    super(initPosition, shpae, color);

    this._baseVelocity = baseVelocity;
    this.velocity = velocity;
  }

  move() {
    let { x, y } = this.centroid;
    x += this._baseVelocity * this.velocity.x;
    y += this._baseVelocity * this.velocity.y;
    this.centroid = { x, y };
  }
}

export { BaseObejct, Border, MovingObejct };
