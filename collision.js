const checkCollision = (ball, boder, paddleLeft, paddleRight) => {
  let collision = hasCollision(ball, boder, touched);
  if (collision.h || collision.v) {
    ball.bounce(collision.h, collision.v);
  }
  collision = hasCollision(ball, paddleLeft, overlapped);
  if (collision.h && collision.v) {
    // TODO: fix this!
    ball.bounce(collision.h, false);
  }

  collision = hasCollision(ball, paddleRight, overlapped);
  if (collision.h && collision.v) {
    ball.bounce(collision.h, false);
  }
};

const touched = (aMin, aMax, bMin, bMax) => aMin == bMin || aMax == bMax;
const overlapped = (aMin, aMax, bMin, bMax) => aMin <= bMax && bMin <= aMax;

const hasCollision = (obj1, obj2, checkFn) => {
  const {
    left: left1,
    right: right1,
    top: top1,
    buttom: buttom1,
  } = obj1.outline;
  const {
    left: left2,
    right: right2,
    top: top2,
    buttom: buttom2,
  } = obj2.outline;

  const h = checkFn(left1, right1, left2, right2);
  const v = checkFn(top1, buttom1, top2, buttom2);
  return { h, v };
};

export { checkCollision };
