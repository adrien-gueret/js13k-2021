function up() {
    var target = ifSmallScreen(175,350);
    document.getElementById('ufo').style.transform = `translateX(${target}px)`;
}

function down() {
    document.getElementById('ufo').style.removeProperty('transform');
}

document.onkeydown = (e) => {
    if (e.key !== ' ') {
        return;
    }

    if (gameOver) {
        reloadGame();
        return;
    }

    if (!gameIsRunning) {
        start();
        return;
    }

    if (isPressed) {
      return;
    }

    isPressed = true;
    e.preventDefault();

    up();
};

document.onkeyup = (e) => {
    if (gameOver || !gameIsRunning || e.key !== ' ' || !isPressed) {
      return;
    }

    isPressed = false;
    e.preventDefault();

    down();
};

document.body.ontouchstart = () => {
    if (gameOver) {
        reloadGame();
        return;
    }

    if (isPressed) {
        return;
    }

    if (!gameIsRunning) {
        start();
        return;
    }
  
      isPressed = true;
     
      up();
};

document.body.ontouchend = (e) => {
    if (gameOver || !gameIsRunning || !isPressed) {
        return;
    }
  
    isPressed = false;
    e.preventDefault();
  
      down();
};

onselectstart = () => false;
oncontextmenu = () => false;
