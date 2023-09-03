const addEventListeners = (paddleLeft, paddleRight) => {
  document.addEventListener("keydown", (event) => {
    const { key } = event;
    if (key === "ArrowDown") {
      paddleLeft.velocity.y = 1;
    } else if (key === "ArrowUp") {
      paddleLeft.velocity.y = -1;
    } else if (key === "2") {
      paddleRight.velocity.y = 1;
    } else if (key === "8") {
      paddleRight.velocity.y = -1;
    }
  });

  document.addEventListener("keyup", (event) => {
    const { key } = event;
    if (key === "ArrowDown" || key === "ArrowUp") {
      paddleLeft.velocity.y = 0;
    } else if (key === "2" || key === "8") {
      paddleRight.velocity.y = 0;
    }
  });
};

// Debug
const printDebugInfo = (ball, border, paddleLeft, paddleRight) => {
  const postions = document.querySelector("#debug_info");
  const outOfWall = document.querySelector("#debug_info2");
  postions.innerHTML = `
  <p>border (${border.position.x}, ${border.position.y})<\p>
  <p>Ball (${ball.position.x}, ${ball.position.y})<\p>
  <p>paddleLeft (${paddleLeft.position.x}, ${paddleLeft.position.y})
     paddleRight (${paddleRight.position.x}, ${paddleRight.position.y})<\p>
  `;

  if (paddleLeft.position.y < paddleLeft.limits.yMin) {
    outOfWall.textContent = `Paddle is out of upper wall!`;
  } else if (paddleLeft.position.y > paddleLeft.limits.yMax) {
    outOfWall.textContent = `Paddle is out of lower wall!`;
  } else {
    outOfWall.textContent = "";
  }
};

export { addEventListeners, printDebugInfo };
