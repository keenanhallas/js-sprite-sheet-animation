const canvas = document.getElementById("canvas-1");
// Returns a drawing context containing all canvas 2D drawing methods - You can also pass "webgl" or another context identifier to getContext
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
// bring in whole sprite sheet to animate with JS
playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

// animation loop
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //clear canvas each frame
    //ctx.fillRect(50, 50, 100, 100);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    // can pass 3, 5, or 9 arguments
    // 1. source image
    // 2. x starting point from left
    // 3. y starting point from top
    //
    // 4. image width (will stretch image)
    // 5. image height (will stretch image)
    //
    // OR
    // 1. image
    // 2. source x
    // 3. source y
    // 4. source width
    // 5. source height
    // 6. destination x
    // 7. destination y
    // 8. destination width
    // 9. destination height
    // last 4 are equivalent to arguments 2-5 above
    if (gameFrame % staggerFrames === 0){
        if (frameX < 6) frameX++;
        else frameX = 0;
    }

    gameFrame++;
    requestAnimationFrame(animate); // end with this to create the animation loop to run animate over and over
}

animate();