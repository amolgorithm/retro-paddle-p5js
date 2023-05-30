var room = 1;
var lives = 5;
var score = 0;
var powerups = ["lifeincrease"];


var Ball = function() {
    this.x = random(30, 370); 
    this.y = random(150, 250);
    this.xSpeed = 3;
    this.ySpeed = 3;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
};

var Paddle = function() {
    this.x = random(10, 240);
    this.y = 300;
};

var ball = new Ball();
var paddle = new Paddle();



var brickW = 15;
var brickH = 10;
var index = 0;
var brickArray = {
    xPos: [],
    yPos: [],
    On: []
};

var setupBricks = function() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            brickArray.On[index] = true;
            brickArray.xPos[index] = 1 + i * 20;
            brickArray.yPos[index] = 10 + 12 * j;
            index++;
        }
    }
};


var triggerPowerups = function() {
    if (round(random(0, 600)) === 3) {
        if (powerups[round(random(0, 0))] === "lifeincrease") {
            lives++;
            fill(0);
            text("Extra life", 200, 200);
        }
    }
};


var gameDifficulty = function() {
    if (score % 20 === 0) {
        ball.ySpeed += 0.05;
    }
};


var drawBricks = function() {
    background(0, 255, 255);
    fill(220, 0, 20);
    
    for (var k = 0; k < index; k++) {
        if (brickArray.On[k] === true) {
            fill(255, 0, 0);
            rect(brickArray.xPos[k], brickArray.yPos[k], brickW, brickH);
            
            

            if ((brickArray.xPos[k] >= ball.x - 15 && brickArray.xPos[k] <= ball.x + 15) && (brickArray.yPos[k] >= ball.y - 15 && brickArray.yPos[k] <= ball.y + 15) && brickArray.On[k] === true) {
                brickArray.On[k] = false;
                ball.ySpeed = ball.ySpeed;
                score++;
            }
  
        }
        
        if (score % 100 === 0) {
            brickArray.On[k] = true;
        }
    }
    
};

var drawBall = function() {
    ball.y += ball.ySpeed;
    ball.x -= ball.xSpeed;
    
    fill(ball.color);
    ellipse(ball.x, ball.y, 30, 30);
    
    // if the ball hits the sides
    if (ball.x <= 0 + 15 || ball.x >= 400 - 15) {
        ball.xSpeed = -ball.xSpeed;
    }
    // if the ball hits the top
    if (ball.y <= 0 + 15) {
        ball.ySpeed = -ball.ySpeed;
    }
    
    //ball hits ground -- Lose a life
    if (ball.y >= 400 - 15) {
        lives--;
        ball.x = random(30, 370); 
        ball.y = random(150, 250);
    }
    
    if (lives <= 0) {
        room = 3;
    }
};

var drawDashboard = function() {
    fill(0);
    textSize(20);
    text("Lives:\n" + lives, 20, 370);
    text("Score:\n" + score, 90, 370);
};

var drawPaddle = function() {
    paddle.x = mouseX;
    
    fill(0, 150, 255);
    rect(paddle.x, 300, 150, 20);
    
    //if ball collides with paddle
    if ((ball.x - 15 >= paddle.x && ball.x + 15 <= paddle.x + 150) && (ball.y + 15 >= paddle.y && ball.y + 15 <= paddle.y + 20)) {
        ball.ySpeed = -ball.ySpeed;
    }
    
    //if paddle colides with sides
    if (paddle.x >= 390 - 150) {
        paddle.x = 390 - 150;
    }
};


var startScreen = function() {
    textAlign(CORNER);
    background(0);
    fill(0, 150, 255);
    textSize(30);
    text("Retro Paddle", 100, 100);
    rect(200, 300, 150, 20);
    fill(0, 200, 0);
    rect(160, 200, 100, 40, 10);
    fill();
    text("play", 180, 228);
};

setupBricks();

var playScreen = function() {
    textAlign(CORNER);
    background(40, 160);
    drawBricks();
    drawBall();
    drawPaddle();
    drawDashboard();
    triggerPowerups();
    gameDifficulty();
};

var gameoverScreen = function() {
    background(0);
    textSize(30);
    textAlign(CENTER);
    text("You Lost!\nYour score was " + score, 200, 80);
    textSize(30);
    fill(0, 200, 0);
    rect(160, 200, 100, 40, 10);
    fill();
    text("play", 200, 228);
    
    fill(0, 150, 255);
    rect((sin(Date.now() / 70)*width/10)+120, 300, 150, 20);
};

var draw = function() {
    
    if (room === 1) {
        startScreen();
    }
    if (room === 2) {
        playScreen();
    }
    if (room === 3) {
        gameoverScreen();
    }
};

var mouseClicked = function() {
    if (room === 1) {
        if (mouseX >= 160 && mouseX <= 260 && mouseY >= 200 && mouseY <= 240) {
            room = 2;
        }
    }
    if (room === 3) {
        if (mouseX >= 160 && mouseX <= 260 && mouseY >= 200 && mouseY <= 240) {
            room = 2;
            
            //set everything back to normal
            ball.x = random(30, 370); 
            ball.y = random(150, 250);
            ball.color = color(random(255), random(255), random(255));
            lives = 5;
            score = 0;
            ball.xSpeed = 3;
            ball.ySpeed = 3;
            setupBricks();
        }
    }
};