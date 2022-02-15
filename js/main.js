//setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//ctx = canvas context (aka like the paper for drawing)
// ctx is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min +1)) + min;
    return num;
}

//function to generate random color

function randomRGB() {
    return `rgb(${random(0,255)},${random(0, 255)},${random(0.255)})`;
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
}