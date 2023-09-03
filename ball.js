import { MovingObejct } from "./base_obeject.js";
import { renderCircle } from "./canvas.js";

class Ball extends MovingObejct {
  constructor(canvasShape, initPosition) {
    super(
      canvasShape,
      initPosition,
      { width: 5, height: 5 },
      "red",
      { x: 1, y: 1 },
      6
    );
  }

  render() {
    renderCircle(this.position, this._shpae.width, this._color);
  }

  bounce(collision) {
    this.velocity.x *= collision.horizontal ? -1 : 1;
    this.velocity.y *= collision.vertical ? -1 : 1;
  }
}

export { Ball };
