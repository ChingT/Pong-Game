const printDebugInfo = (ball, border, paddleLeft, paddleRight) => {
  const postions = document.querySelector("#debug_info");
  const outOfWall = document.querySelector("#debug_info2");
  postions.innerHTML = `
  <p>border (${border.centroid.x}, ${border.centroid.y})<\p>
  <p>Ball (${Math.round(ball.centroid.x)}, ${Math.round(ball.centroid.y)})<\p>
  <p>paddleLeft (${paddleLeft.centroid.x}, ${paddleLeft.centroid.y})
     paddleRight (${paddleRight.centroid.x}, ${paddleRight.centroid.y})<\p>
  `;

  if (paddleLeft.boundingBox.yMin < border.boundingBox.yMin) {
    outOfWall.textContent = `Paddle is out of upper wall!`;
  } else if (paddleLeft.boundingBox.yMax > border.boundingBox.yMax) {
    outOfWall.textContent = `Paddle is out of lower wall!`;
  } else {
    outOfWall.textContent = "";
  }
};

document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (key === "d") {
    toggleShowDebugInfo();
  }
});

function toggleShowDebugInfo() {
  const postions = document.querySelector("#debug_info");
  const outOfWall = document.querySelector("#debug_info2");
  const toggle = (x) => {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  toggle(postions);
  toggle(outOfWall);
}
export { printDebugInfo };
