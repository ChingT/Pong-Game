const checkCollision = (ball, border, paddleLeft, paddleRight) => {
  let collision = touchborder(paddleLeft, border);
  paddleLeft.correctPosition(collision);

  collision = touchborder(paddleRight, border);
  paddleRight.correctPosition(collision);

  collision = touchborder(ball, border);
  ball.correctPosition(collision);
  ball.bounce(collision);

  collision = touchPaddle(ball, paddleLeft);
  ball.correctPosition(collision);
  ball.bounce(collision);

  collision = touchPaddle(ball, paddleRight);
  ball.correctPosition(collision);
  ball.bounce(collision);
};

const touchborder = (obj, border) => {
  return {
    left:
      obj.outline.xMin <= border.outline.xMin ? border.outline.xMin : undefined,
    right:
      obj.outline.xMax >= border.outline.xMax ? border.outline.xMax : undefined,
    top:
      obj.outline.yMin <= border.outline.yMin ? border.outline.yMin : undefined,
    bottom:
      obj.outline.yMax >= border.outline.yMax ? border.outline.yMax : undefined,
  };
};

const touchPaddle = (ball, paddle) => {
  const isOverlap = (minA, maxA, minB, maxB) => minA <= maxB && minB <= maxA;
  const xOverlapped = isOverlap(
    ball.outline.xMin,
    ball.outline.xMax,
    paddle.outline.xMin,
    paddle.outline.xMax
  );
  const yOverlapped = isOverlap(
    ball.outline.yMin,
    ball.outline.yMax,
    paddle.outline.yMin,
    paddle.outline.yMax
  );

  const isInRange = (value, min, max) => value >= min && value <= max;
  const xInRange = isInRange(
    ball.position.x,
    paddle.outline.xMin,
    paddle.outline.xMax
  );
  const yInRange = isInRange(
    ball.position.y,
    paddle.outline.yMin,
    paddle.outline.yMax
  );

  const horizontal = xOverlapped && yInRange;
  const vertical = yOverlapped && xInRange;

  return {
    left:
      paddle.outline.xMin <= ball.outline.xMin && horizontal
        ? paddle.outline.xMax
        : undefined,
    right:
      paddle.outline.xMax >= ball.outline.xMax && horizontal
        ? paddle.outline.xMin
        : undefined,
    top:
      paddle.outline.yMin <= ball.outline.yMin && vertical
        ? paddle.outline.yMax
        : undefined,
    bottom:
      paddle.outline.yMax >= ball.outline.yMax && vertical
        ? paddle.outline.yMin
        : undefined,
  };
};

export { checkCollision };
