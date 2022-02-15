//setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//ctx = canvas context (aka like the paper for drawing)
// ctx is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

//function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {

//initialize the properties each ball needs in order to function in our program
    
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

//the horizontal and vertical coordinates where the ball starts on the screen
//each ball is given a horizontal and vertical velocity
//ball color
//ball size = radius in pixels

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
//ctx is like the paper and here we are commanding our pen to draw something on it
//beginPath shows that we want to draw a shape
//fillStyle defines what we want to fill the shape with (our ball color)
//arc() is how it knows what shape to draw
// first the x and y properties showing the position at the center of the shape 
// then the size property = radius of arc
//the last two numbers, 0 and 2 * pi specify the degrees we want this shape drawn around the arc
// 2 * pi is 360 degrees so a full circle (1 * pi would be a semi circle)
// and fill tells it to finish the path and fill the area it takes up with the color specified in fillStyle()

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    }
//The first four parts of the function check whether the ball has reached the edge of the canvas.
// If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. 
// 1. is the x-coord greater than width --> ball will go off right edge
// 2. is the x-coord less than 0 --> ball will go off left edge
// 3. is the y-coord greater than height --> ball will go off top
// 4. is the y-coord less than 0 --> ball will go off bottom
// size is subtracted from this calculation because we want the edge of the ball to bounce, not the center point

collisionDetect() {
    for (const ball of balls) {
        if (!(this === ball)) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
                ball.color = this.color = randomRGB();
            }
        }
    }
}

}

const balls = [];

while (balls.length < 25) {
    const size = random(10,20);
    const ball = new Ball(
        //ball position always drawn at least one ball width 
        //away from edge to avoid drawing error
        random(0 + size,width- size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
        randomRGB(),
        size 
    );

        balls.push(ball);
        //pushes balls until there are 25 balls created onto the array
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    requestAnimationFrame(loop);
} 

loop();

//animation loops are typical: serves to update the info in the program
//and render the resulting view on each frame of the animation
// ctx.fillStyle sets the canvas fill color to semi-transparent black
// ctx.fillRect draws a rectangle of the color across the whole width and height of canvas
// this serves to cover up the previous frame's drawing before the next one is drawn
// otherwise all the frames would show through and there would be snakes of color instead of balls
//the color being semi-transparent allows for a few of the previous frames to show through
//this produces small tails but does not keep the whole path
//changing transparency to 1 (not transparent) would make the balls no longer have tails
//Loops through all the balls in the balls array, and runs each ball's draw() and update() function to draw
// each one on the screen, then do the necessary updates to position and velocity in time for the next frame.
// requestAnimationFrame(loop) and loop(); calls the function and then it keeps calling itself
//this runs the function a set number of times per second to create a smooth animation