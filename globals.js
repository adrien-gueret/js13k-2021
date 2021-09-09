const sceneWidth = 1000;
const smallScreenSize = 800;
const humanColors = ['#ffc83d','#bb9167','#613d30','#8e562e','#d8b094','#f7d7c4'];
const scoreMultiplier = 10;
const totalHumansToKillBeforeNextLevel = 6;
const END_REASONS = {
    AD: 'Humans have invaded space with their ads!',
    KILL: 'Your spaceship has been destroyed!',
};
const dialogs = [
    {
        who: '🤑',
        text: 'Displaying ads in space? What a good opportunity to be richer!',
    },
    {
        who: '👽',
        text: 'We can\'t let humans pollute space with their ads... Help us to kill them all!',
    },
    {
        who: '😠',
        text: 'We are under attack! Launch some rockets to counterattack!',
    }
];

let allItems = [];
let isPressed = false;
let gameIsRunning = false;
let score = 0;
let totaLives = 3;
let mainLoopClock = null;
let gameOver = false;
let gameOverReadyToLeave = false;
let totalHumansKilled = 0;
let currentDialogIndex = 0;