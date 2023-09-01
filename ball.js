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

  get outOfHorizontalWall() {
    return (
      this.outline.left <= this.limits.xMin ||
      this.outline.right >= this.limits.xMax
    );
  }
  get outOfVerticalWall() {
    return (
      this.outline.top <= this.limits.yMin ||
      this.outline.buttom >= this.limits.yMax
    );
  }

  render() {
    renderCircle(this.position, this._shpae.width, this._color);
  }

  bounce(horizontal = false, vertical = false) {
    this.velocity.x *= horizontal ? -1 : 1;
    this.velocity.y *= vertical ? -1 : 1;
  }
}

export { Ball };
