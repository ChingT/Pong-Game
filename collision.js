const checkCollision = (ball, boder, paddleLeft, paddleRight) => {
  let collision = touchBoder(ball, boder);
  ball.bounce(collision);

  collision = touchPaddle(ball, paddleLeft);
  ball.bounce(collision);

  collision = touchPaddle(ball, paddleRight);
  ball.bounce(collision);
};

const touchBoder = (ball, boder) => {
  const touched = (aMin, aMax, bMin, bMax) => aMin <= bMin || aMax >= bMax;

  return {
    horizontal: touched(
      ball.outline.xMin,
      ball.outline.xMax,
      boder.outline.xMin,
      boder.outline.xMax
    ),
    vertical: touched(
      ball.outline.yMin,
      ball.outline.yMax,
      boder.outline.yMin,
      boder.outline.yMax
    ),
  };
};

const touchPaddle = (ball, paddle) => {
  const overlapped = (aMin, aMax, bMin, bMax) => aMin <= bMax && bMin <= aMax;
  const xOverlapped = overlapped(
    ball.outline.xMin,
    ball.outline.xMax,
    paddle.outline.xMin,
    paddle.outline.xMax
  );
  const yOverlapped = overlapped(
    ball.outline.yMin,
    ball.outline.yMax,
    paddle.outline.yMin,
    paddle.outline.yMax
  );

  const inRange = (a, bMin, bMax) => bMin <= a && a <= bMax;
  const xInRange = inRange(
    ball.position.x,
    paddle.outline.xMin,
    paddle.outline.xMax
  );
  const yInRange = inRange(
    ball.position.y,
    paddle.outline.yMin,
    paddle.outline.yMax
  );

  return {
    horizontal: xOverlapped && yInRange,
    vertical: yOverlapped && xInRange,
  };
};

export { checkCollision };
