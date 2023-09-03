const checkCollision = (ball, border, paddleLeft, paddleRight) => {
  let collision = touchborder(paddleLeft, border);
  paddleLeft.rectifyPosition(collision);

  collision = touchborder(paddleRight, border);
  paddleRight.rectifyPosition(collision);

  collision = touchborder(ball, border);
  ball.rectifyPosition(collision);
  ball.bounce(collision);

  collision = touchPaddle(ball, paddleLeft);
  ball.rectifyPosition(collision);
  ball.bounce(collision);

  collision = touchPaddle(ball, paddleRight);
  ball.rectifyPosition(collision);
  ball.bounce(collision);
};

const touchborder = (obj, border) => {
  return {
    left:
      obj.boundingBox.xMin <= border.boundingBox.xMin
        ? border.boundingBox.xMin
        : undefined,
    right:
      obj.boundingBox.xMax >= border.boundingBox.xMax
        ? border.boundingBox.xMax
        : undefined,
    top:
      obj.boundingBox.yMin <= border.boundingBox.yMin
        ? border.boundingBox.yMin
        : undefined,
    bottom:
      obj.boundingBox.yMax >= border.boundingBox.yMax
        ? border.boundingBox.yMax
        : undefined,
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
        : undefined,
    right:
      paddle.boundingBox.xMax >= ball.boundingBox.xMax && horizontal
        ? paddle.boundingBox.xMin
        : undefined,
    top:
      paddle.boundingBox.yMin <= ball.boundingBox.yMin && vertical
        ? paddle.boundingBox.yMax
        : undefined,
    bottom:
      paddle.boundingBox.yMax >= ball.boundingBox.yMax && vertical
        ? paddle.boundingBox.yMin
        : undefined,
  };
};

export { checkCollision };
