import { MovingObejct } from "./base_obeject.js";
import { renderRectangle, renderCircle } from "./canvas.js";

class Paddle extends MovingObejct {
  constructor(canvasShape, initPosition) {
    super(
      canvasShape,
      initPosition,
      { width: 20, height: 80 },
      "green",
      { x: 0, y: 0 },
      20
    );
  }

  render() {
    renderRectangle(this.position, this._shpae, this._color);
    renderCircle(this.position, 3, "white");
  }

  correctPosition(collision) {
    const { left, right, top, bottom } = collision;

    if (left !== undefined) {
      this.position.x = left + this._shpae.width / 2;
    }
    if (right !== undefined) {
      this.position.x = right - this._shpae.width / 2;
    }
    if (top !== undefined) {
      this.position.y = top + this._shpae.height / 2;
    }
    if (bottom !== undefined) {
      this.position.y = bottom - this._shpae.height / 2;
    }
  }
}

export { Paddle };
