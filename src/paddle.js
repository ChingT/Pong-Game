import { MovingObejct } from "./base_obeject.js";
import { renderRectangle, renderCircle } from "./canvas.js";

class Paddle extends MovingObejct {
  constructor(
    initPosition,
    shpae = { width: 20, height: 80 },
    color = "green",
    baseVelocity = 20
  ) {
    super(initPosition, shpae, color, baseVelocity);

    this.reset();
  }

  reset() {
    this.centroid = this._initPosition;
    this.velocity = { x: 0, y: 0 };
  }

  render() {
    const { xMin, yMin } = this.boundingBox;
    const { width, height } = this._shpae;
    renderRectangle(xMin, yMin, width, height, this._color);
    const { x, y } = this.centroid;
    renderCircle(x, y, 3, "white");
  }

  manageCollision(collision) {
    const { left, right, top, bottom } = collision;
    if (left !== null || right !== null || top !== null || bottom !== null) {
      this._rectifyPosition(left, right, top, bottom);
    }
  }

  _rectifyPosition(left, right, top, bottom) {
    if (left !== null) {
      this.centroid.x = left + this._shpae.width / 2;
    }
    if (right !== null) {
      this.centroid.x = right - this._shpae.width / 2;
    }
    if (top !== null) {
      this.centroid.y = top + this._shpae.height / 2;
    }
    if (bottom !== null) {
      this.centroid.y = bottom - this._shpae.height / 2;
    }
  }
}

export { Paddle };
