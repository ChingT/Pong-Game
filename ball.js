import { MovingObejct } from "./base_obeject.js";
import { renderCircle } from "./canvas.js";

class Ball extends MovingObejct {
  constructor(
    initPosition,
    shpae = { width: 10, height: 10 },
    color = "red",
    baseVelocity = 5
  ) {
    super(initPosition, shpae, color, baseVelocity, { x: 1, y: 1 });
  }

  render() {
    const { x, y } = this.centroid;
    renderCircle(x, y, this._shpae.width / 2, this._color);
  }

  manageCollision(collision) {
    const { left, right, top, bottom } = collision;
    if (left !== null || right !== null || top !== null || bottom !== null) {
      this._rectifyPosition(left, right, top, bottom);
      this._bounce(left, right, top, bottom);
    }
  }

  _rectifyPosition(left, right, top, bottom) {
    if (left !== null) {
      let dx = left + this._shpae.width / 2 - this.centroid.x;
      let dy = (dx / this.velocity.x) * this.velocity.y;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
    if (right !== null) {
      let dx = right - this._shpae.width / 2 - this.centroid.x;
      let dy = (dx / this.velocity.x) * this.velocity.y;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
    if (top !== null) {
      let dy = top + this._shpae.height / 2 - this.centroid.y;
      let dx = (dy / this.velocity.y) * this.velocity.x;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
    if (bottom !== null) {
      let dy = bottom - this._shpae.height / 2 - this.centroid.y;
      let dx = (dy / this.velocity.y) * this.velocity.x;
      this.centroid = { x: this.centroid.x + dx, y: this.centroid.y + dy };
    }
  }

  _bounce(left, right, top, bottom) {
    this.velocity.x *= left !== null || right !== null ? -1 : 1;
    this.velocity.y *= top !== null || bottom !== null ? -1 : 1;
  }
}

export { Ball };
