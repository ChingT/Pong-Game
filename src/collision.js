const checkCollision = (ball, border, paddleLeft, paddleRight) => {
  paddleLeft.manageCollision(touchborder(paddleLeft, border));
  paddleRight.manageCollision(touchborder(paddleRight, border));
  ball.manageCollision(touchPaddle(ball, paddleLeft));
  ball.manageCollision(touchPaddle(ball, paddleRight));

  let collision = touchborder(ball, border);
  ball.manageCollision(collision);
  return collision;
};

const touchborder = (obj, border) => {
  return {
    left:
      obj.boundingBox.xMin <= border.boundingBox.xMin
        ? border.boundingBox.xMin
        : null,
    right:
      obj.boundingBox.xMax >= border.boundingBox.xMax
        ? border.boundingBox.xMax
        : null,
    top:
      obj.boundingBox.yMin <= border.boundingBox.yMin
        ? border.boundingBox.yMin
        : null,
    bottom:
      obj.boundingBox.yMax >= border.boundingBox.yMax
        ? border.boundingBox.yMax
        : null,
  };
};

const touchPaddle = (ball, paddle) => {
  const isOverlap = (minA, maxA, minB, maxB) => minA <= maxB && minB <= maxA;
  const xOverlapped = isOverlap(
    ball.boundingBox.xMin,
    ball.boundingBox.xMax,
    paddle.boundingBox.xMin,
    paddle.boundingBox.xMax
  );
  const yOverlapped = isOverlap(
    ball.boundingBox.yMin,
    ball.boundingBox.yMax,
    paddle.boundingBox.yMin,
    paddle.boundingBox.yMax
  );

  const isInRange = (value, min, max) => value >= min && value <= max;
  const xInRange = isInRange(
    ball.centroid.x,
    paddle.boundingBox.xMin,
    paddle.boundingBox.xMax
  );
  const yInRange = isInRange(
    ball.centroid.y,
    paddle.boundingBox.yMin,
    paddle.boundingBox.yMax
  );

  const horizontal = xOverlapped && yInRange;
  const vertical = yOverlapped && xInRange;

  return {
    left:
      paddle.boundingBox.xMin <= ball.boundingBox.xMin && horizontal
        ? paddle.boundingBox.xMax
        : null,
    right:
      paddle.boundingBox.xMax >= ball.boundingBox.xMax && horizontal
        ? paddle.boundingBox.xMin
        : null,
    top:
      paddle.boundingBox.yMin <= ball.boundingBox.yMin && vertical
        ? paddle.boundingBox.yMax
        : null,
    bottom:
      paddle.boundingBox.yMax >= ball.boundingBox.yMax && vertical
        ? paddle.boundingBox.yMin
        : null,
  };
};

export { checkCollision };
