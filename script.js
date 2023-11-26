let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
    playerState = e.target.value;
})

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

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
// map to match sprite sheet
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 4,
    }
];
animationStates.forEach((state, index) => {
    // could this be simplified to go directly into an array?
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

// animation loop
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // used to cycle horizontally
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate); // end with this to create the animation loop to run animate over and over
}

animate();

    // can pass drawImage 3, 5, or 9 arguments
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

// Old code to cycle frames horizontally
// if (gameFrame % staggerFrames === 0){
//     if (frameX < 6) frameX++;
//     else frameX = 0;
// }