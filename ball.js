import { MovingObejct } from "./base_obeject.js";
import { renderCircle } from "./canvas.js";

class Ball extends MovingObejct {
  constructor(
    initPosition,
    shpae = { width: 10, height: 10 },
    color = "red",
    baseVelocity = 6
  ) {
    super(initPosition, shpae, color, baseVelocity, { x: 1, y: 1 });
  }

  render() {
    const { x, y } = this.centroid;
    renderCircle(x, y, this._shpae.width / 2, this._color);
  }

  bounce(collision) {
    const { left, right, top, bottom } = collision;
    this.velocity.x *= left !== undefined || right !== undefined ? -1 : 1;
    this.velocity.y *= top !== undefined || bottom !== undefined ? -1 : 1;
  }

  rectifyPosition(collision) {
    const { left, right, top, bottom } = collision;

    if (left !== undefined) {
      let dx = left + this._shpae.width / 2 - this.centroid.x;
      let dy = (dx / this.velocity.x) * this.velocity.y;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
    if (right !== undefined) {
      let dx = right - this._shpae.width / 2 - this.centroid.x;
      let dy = (dx / this.velocity.x) * this.velocity.y;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
    if (top !== undefined) {
      let dy = top + this._shpae.height / 2 - this.centroid.y;
      let dx = (dy / this.velocity.y) * this.velocity.x;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
    if (bottom !== undefined) {
      let dy = bottom - this._shpae.height / 2 - this.centroid.y;
      let dx = (dy / this.velocity.y) * this.velocity.x;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
  }
}

export { Ball };
