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
}

export { Paddle };
