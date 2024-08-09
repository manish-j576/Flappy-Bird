

// set up the board
let board;
let boardWidth=360;
let boardHeight=640;
let context;


// bird

let birdWidth=34;
let birdHeight=24;
let birdX=boardWidth/8;
let birdY=boardHeight/2;
let birdImg;



let bird={
    y:birdY,
    x:birdX,
    width:birdWidth,
    height:birdHeight
}

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;


let topPipeImg;
let bottomPipeImg;

let velocityX = 2;
let velocityY = 0;
let gravity = 0.4;


let gameOver = false;
let score = 0;


window.onload= function (){
    board=document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d")

    // context.fillStyle="green"
    // context.fillRect(birdX,birdY,birdWidth,birdHeight)

    birdImg = new Image();
    birdImg.src = "./images/flappybird.png"
    birdImg.onload = function (){
        console.log("hello world")
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg=new Image();
    topPipeImg.src ="./images/toppipe.png";


    bottomPipeImg = new Image();
    bottomPipeImg.src="./images/bottompipe.png"
     

    requestAnimationFrame(update);
    // setInterval(placePipes, 1500); //every 1.5 seconds
    // document.addEventListener("keydown", moveBird);
}


// function update(){
//     requestAnimationFrame(update);

//     context.clearRect(0,0,board.width,board.height);


//     velocityY +=gravity;


// }



