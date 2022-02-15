START: Start the program: Bouncing Balls...based on the example picture of what the end should look like

INIT: Create my variables for the program 
-Balls
-Defined space for balls to be contained in (canvas)

FUNCTION setUpCanvas
    a. width to fill the page
    b. height to fill the page

FUNCTION defineBall
    a. radius size
    b. color
    c. location (x, y)
    d. movement (velocity)
    e. stays within page boundries (bounce off edges?)
    f. has a shaded trail of its recent path

FUNCTION drawBalls
    a. create multiple balls
    b. different colors (random color generator)
    c. different sizes (random size generator)
    d. start at different locations on the page

FUNCTION collisionColorChange
    a. know when two balls' positions are =
    b. at that point ^ both colors are changed   
    c. do they bounce off one another ?  
    d. resets to do the same thing when ball collides again

FUNCTION constantAnimation
    a. page updates position of balls without refreshing
    b. setInterval ?
    

END: End the program