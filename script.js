var canvas;
var canvasContext;
var ballX = 50,
    ballY = 40;
var ballSpeedX = 0.5,
    ballSpeedY = 0.5;
const ballSize = 5;
var PADDLE_SIZE_W, PADDLE_SIZE_H;
var paddle1_Y = 50;
var paddle2_Y = 50;

var paddle2Speed = 0.3;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    PADDLE_SIZE_W = canvas.width / 100;
    PADDLE_SIZE_H = canvas.height / 5;

    var framesPerSecond = 150;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', function(evt) {
            var mousePosition = calculateMousePos(event);
            paddle1_Y = mousePosition.y - PADDLE_SIZE_H / 2;
        }

    );
}

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function computerMovement() {
    var paddleCentre = paddle2_Y + PADDLE_SIZE_H / 2;
    // if (ballSpeedY > 0) {
    if (ballY > paddleCentre) {
        paddle2_Y += paddle2Speed;
    } else {
        paddle2_Y -= paddle2Speed;
    }
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballY = canvas.height / 2;
    ballX = canvas.width / 2;
}

function moveEverything() {
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX >= canvas.width - ballSize - PADDLE_SIZE_W) {
        if (ballY >= paddle2_Y && ballY <= paddle2_Y + PADDLE_SIZE_H) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballX <= PADDLE_SIZE_W + ballSize) {
        if (ballY >= paddle1_Y && ballY <= paddle1_Y + PADDLE_SIZE_H) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }

    if (ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY <= ballSize) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    // draw screen color
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    // draw left paddle
    drawRect(0, paddle1_Y, PADDLE_SIZE_W, PADDLE_SIZE_H, 'white');

    // draw right paddle
    drawRect(canvas.width - PADDLE_SIZE_W, paddle2_Y, PADDLE_SIZE_W, PADDLE_SIZE_H, 'white');

    // draw ball
    drawBall(ballX, ballY, 5, 'red');
}

function drawRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawBall(centreX, centreY, radius, color) {
    canvasContext.fillStyle = 'red';
    canvasContext.beginPath();
    canvasContext.arc(centreX, centreY, radius, 0, 2 * Math.PI, true);
    canvasContext.fill();
}