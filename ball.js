import { MovingObejct } from "./base_obeject.js";
import { renderCircle } from "./canvas.js";

class Ball extends MovingObejct {
  constructor(initPosition) {
    super(initPosition, { width: 10, height: 10 }, "red", { x: 1, y: 1 }, 6);
  }

  render() {
    renderCircle(this.position, this._shpae.width / 2, this._color);
  }

  bounce(collision) {
    const { left, right, top, bottom } = collision;
    this.velocity.x *= left !== undefined || right !== undefined ? -1 : 1;
    this.velocity.y *= top !== undefined || bottom !== undefined ? -1 : 1;
  }

  correctPosition(collision) {
    const { left, right, top, bottom } = collision;

    if (left !== undefined) {
      let dx = left + this._shpae.width / 2 - this.position.x;
      let dy = (dx / this.velocity.x) * this.velocity.y;
      this.position = { x: this.position.x + dx, y: this.position.y + dy };
    }
    if (right !== undefined) {
      let dx = right - this._shpae.width / 2 - this.position.x;
      let dy = (dx / this.velocity.x) * this.velocity.y;
      this.position = { x: this.position.x + dx, y: this.position.y + dy };
    }
    if (top !== undefined) {
      let dy = top + this._shpae.height / 2 - this.position.y;
      let dx = (dy / this.velocity.y) * this.velocity.x;
      this.position = { x: this.position.x + dx, y: this.position.y + dy };
    }
    if (bottom !== undefined) {
      let dy = bottom - this._shpae.height / 2 - this.position.y;
      let dx = (dy / this.velocity.y) * this.velocity.x;
      this.position = { x: this.position.x + dx, y: this.position.y + dy };
    }
  }
}

export { Ball };
