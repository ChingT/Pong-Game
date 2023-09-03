import { MovingObejct } from "./base_obeject.js";
import { renderRectangle, renderCircle } from "./canvas.js";

class Paddle extends MovingObejct {
  constructor(
    initPosition,
    shpae = { width: 20, height: 80 },
    color = "green",
    baseVelocity = 20
  ) {
    super(initPosition, shpae, color, baseVelocity, { x: 0, y: 0 });
  }

  render() {
    const { xMin, yMin } = this.boundingBox;
    const { width, height } = this._shpae;
    renderRectangle(xMin, yMin, width, height, this._color);
    const { x, y } = this.centroid;
    renderCircle(x, y, 3, "white");
  }

  rectifyPosition(collision) {
    const { left, right, top, bottom } = collision;

    if (left !== undefined) {
      this.centroid.x = left + this._shpae.width / 2;
    }
    if (right !== undefined) {
      this.centroid.x = right - this._shpae.width / 2;
    }
    if (top !== undefined) {
      this.centroid.y = top + this._shpae.height / 2;
    }
    if (bottom !== undefined) {
      this.centroid.y = bottom - this._shpae.height / 2;
    }
  }
}

export { Paddle };
