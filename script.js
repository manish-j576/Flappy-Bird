let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// logic of the game
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "./images/flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./images/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./images/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
  document.addEventListener("keydown", moveBird);
  document.addEventListener("click", moveBird);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  // bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); //bird velocity will be the velocity after minimizing the gravity and also bird can't go above the board
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
  }

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  //   removing the pipes out of canvas otherwise there will be memory issue
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90);
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }

  //   will randomy arrange the pipe between the 1/2 and the 3/4th of the pipe length
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (
    e.type == "click" ||
    e.code == "Space" ||
    e.code == "ArrowUp" ||
    e.code == "KeyX"
  ) {
    //jump
    velocityY = -6;

    //reset game
    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      gameOver = false;
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y
  ); //a's bottom left corner passes b's top left corner
}
