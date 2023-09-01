const addEventListeners = (paddleLeft, paddleRight) => {
  document.addEventListener("keydown", (event) => {
    const { key } = event;
    if (key === "ArrowDown") {
      paddleLeft.direction = 1;
    } else if (key === "ArrowUp") {
      paddleLeft.direction = -1;
    } else if (key === "2") {
      paddleRight.direction = 1;
    } else if (key === "8") {
      paddleRight.direction = -1;
    }
  });

  document.addEventListener("keyup", (event) => {
    const { key } = event;
    if (key === "ArrowDown" || key === "ArrowUp") {
      paddleLeft.direction = 0;
    } else if (key === "2" || key === "8") {
      paddleRight.direction = 0;
    }
  });
};

// Debug
const printDebugInfo = (paddleLeft, ball) => {
  const postions = document.querySelector("#debug_info");
  const outOfWall = document.querySelector("#debug_info2");
  postions.innerHTML = `
  <p>Ball (${ball.position.x}, ${ball.position.y})<\p>
  <p>Paddle (${paddleLeft.position.x}, ${paddleLeft.position.y})<\p>
  `;

  if (paddleLeft.position.y < paddleLeft._yLimit.upper) {
    outOfWall.textContent = `Paddle is out of upper wall!`;
  } else if (paddleLeft.position.y > paddleLeft._yLimit.lower) {
    outOfWall.textContent = `Paddle is out of lower wall!`;
  } else {
    outOfWall.textContent = "";
  }
};

export { addEventListeners, printDebugInfo };
