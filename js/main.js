//setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('ballCount');
const para1 = document.querySelector('evilCircle1count');
const para2 = document.querySelector('evilCircle2count');
//var img = document.getElementById("pig");

//ctx = canvas context (aka like the paper for drawing)
// ctx is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//function to generate random number

const random = (min, max) => 
    Math.floor(Math.random() * (max - min +1)) + min;


//function to generate random color 

const randomRGB = () => 
    `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

class Shape {

//shape object will have a constructor that our balls and evil circle can inherit from (things that evil ball and regular balls share are inherited here)
    
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}


class Ball extends Shape {

// class childClass extends parentClass https://www.w3schools.com/jsref/jsref_class_extends.asp#:~:text=The%20extends%20keyword%20is%20used,you%20create%20a%20new%20class.
//initialize the properties each ball needs in order to function in our program
    
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        //super() is used to call the Shape constructor passing in the x, y, velX, and velY arguments from above
        this.color = color;
        this.size = size;
        this.exists = true; //boolean used to know if the ball exists or is eaten by the evil circle, initially it is true because it exists at start
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
            // console.log("RIGHT");
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
            // console.log("LEFT");
        }
        if ((this.y + this.size) > height) {
           //this.velY = -(this.velY);
            this.y = 0 + this.size;
            console.log("BOTTOM");
        }
        if ((this.y - this.size) < 0) {
            //this.velY = -(this.velY);
            this.y = canvas.height - this.size; // - this.size so that the bottom of the ball touches the height (bottom) instead of the top touching the bottom and not in view
            console.log("TOP");
        }
        this.x += this.velX;
        this.y += this.velY;
    }
//The first four parts of the function check whether the ball has reached the edge of the canvas.
// If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. 
// 1. is the x-coord greater than width --> ball will go off right edge
// 2. is the x-coord less than 0 --> ball will go off left edge
// 3. is the y-coord greater than height --> ball will go off bottom
// 4. is the y-coord less than 0 --> ball will go off top
// size is subtracted from this calculation because we want the edge of the ball to bounce, not the center point

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists)
            {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                    ball.size = this.size = 20;
                }
            }
        }
    }
}
//updated to only consider balls that exist
//for each ball, we need to check every other ball to see if it has collided with the current ball
//for...of loop to loop thorugh all the balls in the ball[] array
// (!this === ball) is to make sure we aren't comparing a ball against itself
//the next is common code for checking if two circle's areas overlap
//if collision is found, color properties of both circles are set to a new random color

class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        //velX and velY hardcoded to 20
        this.color = color;
        this.size = 10;
        this.score = 0
    }
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.lineWidth = 3;
        }
        //draws the oject instance on the canvas
        // fillStyle and fill are changed to stroke so that it is not filled in but just an outline

        checkBounds() {
            if ((this.x + this.size) >= width) {
                this.x = this.x - this.size;
            }
            if ((this.x - this.size) <= 0) {
                this.x = this.x + this.size;
            }
            if ((this.y + this.size) >= height) {
                this.y = this.y - this.size;
            }
            if ((this.y - this.size) <= 0) {
                this.y = this.y + this.size;
            }
        }

        collisionDetect() {
            for (const ball of balls) {
                if (ball.exists)
                 {
                    const dx = this.x - ball.x;
                    const dy = this.y - ball.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
        
                    if (distance < this.size + ball.size) {
                        ball.exists = false;
                        this.score++;
                    }
                }
            }
        }
}

const balls = [];
let count = 0;
while (balls.length < 25) {
    const size = random(5,10);
    const ball = new Ball(
        //ball position always drawn at least one ball width 
        //away from edge to avoid drawing error
        random(0 + size,width- size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
       // randomRGB(),
       color = 'white',
        size, 
    );

        balls.push(ball);
        //pushes balls until there are 25 balls created onto the array
    }

// const evilCircles = [];
// while (evilCircles.length < 2) {
// const evilCircle = new EvilCircle(
//     random(0, width),
//     random(0, height)
// )
//     //creates a new evilCircle object instance so that the evil circle is in the program
//     evilCircles.push(evilCircle);

// }
let evil1counter = 0;

const evilCircle1 = new EvilCircle(
        random(0, width),
        random(0, height),
        color = 'red',

        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case "ArrowLeft":
                    evilCircle1.x -= evilCircle1.velX;
                    break;
                case "ArrowRight": 
                evilCircle1.x += evilCircle1.velX;
                    break;
                case "ArrowUp":
                    evilCircle1.y -= evilCircle1.velY;
                    break;
                case "ArrowDown":
                    evilCircle1.y += evilCircle1.velY;
                    break;  
            }
                    if ("ArrowLeft" && "ArrowUp") {
                        evilCircle1.x -= evilCircle1.velX;
                        evilCircle1.y -= evilCircle1.velY;
                    } 
                    if("ArrowLeft" && "ArrowDown") {
                        evilCircle1.x -= evilCircle1.velX;
                        evilCircle1.y += evilCircle1.velY;
                    }
                    if ("ArrowRight" && "ArrowUp") {
                        evilCircle1.x += evilCircle1.velX;
                        evilCircle1.y -= evilCircle1.velY;
                    }
                    if ("ArrowRight" && "ArrowDown") {
                        evilCircle1.x += evilCircle1.velX;
                        evilCircle1.y += evilCircle1.velY;
                    }
                }));





    //key codes for arrow keys Left, Up, Right, Down are 37, 38, 39, 40
    //this adds a key down event to the window so that when a key is pressed,
    //the event key is consulted to see which key is pressed and if it is one of the specified keys,
    //the evil circle will move
const evilCircle2 = new EvilCircle(
    random(0, width),
    random(0, height),
    color = 'green',

    window.addEventListener('keydown', (e) => {
        switch(e.key) {
    case "a":
        evilCircle2.x -= evilCircle2.velX;
        break;
    case "d": 
        evilCircle2.x += evilCircle2.velX;
        break;
    case "w":
        evilCircle2.y -= evilCircle2.velY;
        break;
    case "s":
        evilCircle2.y += evilCircle2.velY;
        break;              
     }  
     if ("a" && "w") {
        evilCircle2.x -= evilCircle2.velX;
        evilCircle2.y -= evilCircle2.velY;
    } 
    if("a" && "s") {
        evilCircle2.x -= evilCircle2.velX;
        evilCircle2.y += evilCircle2.velY;
    }
    if ("d" && "w") {
        evilCircle2.x += evilCircle2.velX;
        evilCircle2.y -= evilCircle2.velY;
    }
    if ("d" && "s") {
        evilCircle2.x += evilCircle2.velX;
        evilCircle2.y += evilCircle2.velY;
    }
})

);


const loop = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if(ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
        }
         //these functions are only called if the ball exists
     }
    //  for (const evilCircle of evilCircles) {
    //  evilCircle.draw();
    //  evilCircle.checkBounds(); 
    //  evilCircle.collisionDetect();
    //  }
     //the evil ball instance's draw, checkBounds, and collisionDetection methods are called on every iteration of the loop 
    evilCircle1.draw();
    evilCircle1.checkBounds();
    evilCircle1.collisionDetect();
    evilCircle1count.textContent = "SCORE: "+evilCircle1.score;
    evilCircle2.draw();
    evilCircle2.checkBounds();
    evilCircle2.collisionDetect();
    evilCircle2count.textContent = "SCORE: "+evilCircle2.score;



     let counter = 0;
     for (const ball of balls) {
         if (ball.exists) counter++;

     ballCount.textContent = "Ball Count: "+counter;
     }


    requestAnimationFrame(loop);
};

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