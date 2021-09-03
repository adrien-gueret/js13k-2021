var sceneWidth = 1000;
var allItems = [];
var r = (x, y = 1) => Math.floor(Math.random() * (x - y + 1)) + y;
var i = (t,x) => `./assets/${t}${r(x)}.svg`;
var humanEmojiCode = '&#x1F574;';
var humanColors = ['', '&#x1F3FB', '&#x1F3FC', '&#x1F3FD', '&#x1F3FE', '&#x1F3FF'];
var itemSize = 70;
var ufoSize = 60;
var isPressed = false;
var globalScale = 1;
var gameIsRunning = false;
var score = 0;
var scoreMultiplier = 10;
var totaLives = 3;
var mainLoopClock = null;
var gameOver = false;
var gameOverReadyToLeave = false;
var getCenter = node => {
    var rec = node.getBoundingClientRect();
    var x = rec.x + rec.width/2;
    var y = rec.y + rec.height/2;
    return { x, y };
}

var END_REASONS = {
    AD: 'Humans have invaded space with their ads!',
    KILL: 'Your spaceship has been destroyed!',
};

var end = (reason) => {
    window.clearInterval(mainLoopClock);
    gameIsRunning = false;
    gameOver = true;
    allItems.forEach(item => item.remove());
    document.body.classList.add('end');
    gor.innerHTML = reason;
    window.setTimeout(() => {
        gameOverReadyToLeave = true;
    }, 2000)
};

var reloadGame = () => {
    if (gameOverReadyToLeave) {
        window.location.reload();
    }
};