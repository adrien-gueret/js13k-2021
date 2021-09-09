const r = (x, y = 1) => Math.floor(Math.random() * (x - y + 1)) + y;
const i = (t) => `./assets/${t}.svg`;

const isSmallScreen = () => !!window.matchMedia(`(max-width: ${smallScreenSize}px),(max-height: ${smallScreenSize}px)`).matches;
const ifSmallScreen = (x,y) => isSmallScreen() ? x : y;

const getItemSize = () => ifSmallScreen(35, 70);
const getUfoSize = () => ifSmallScreen(30, 60);

const getCenter = node => {
    const rec = node.getBoundingClientRect();
    const x = rec.x + rec.width/2;
    const y = rec.y + rec.height/2;
    return { x, y };
}

const reloadGame = () => {
    if (gameOverReadyToLeave) {
        window.location.reload();
    }
};

const showNextDialog = (callback) => {
    const { who, text } = dialogs[currentDialogIndex];

    document.getElementById('dialog-character').innerHTML = who;
    document.getElementById('dialog-text').innerHTML = text;

    document.getElementById('dialogs-container').style.transform = 'scale(1)';

    currentDialogIndex++;

    window.setTimeout(() => {
        hideDialog();
        callback && callback();
    }, 5500);
};

const hideDialog = () => {
    document.getElementById('dialogs-container').style.removeProperty('transform');
};

const collision = (c1, c2) => {
    const d = (c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y);
    return !(d > (c1.r + c2.r)*(c1.r + c2.r));
}

const generateItem = () => {
    new Human();

    const rocketMultiplier = Math.floor(totalHumansKilled/totalHumansToKillBeforeNextLevel);
    const rocketLuck = 25 * rocketMultiplier;

    for (let i = 0, l = Math.floor(rocketLuck / 100); i < l; i++) {
        new Rocket();
    }

    const x = r(100);
    const shouldRenderRocket = x <= rocketLuck%100;

    if (shouldRenderRocket) {
      new Rocket();
    }
};

const start = () => {
    gameIsRunning = true;

    document.body.classList.add('started');
    
    window.setTimeout(() => {
        const loopGenerateItem = () => {
            if (!gameIsRunning) {
                return;
            }
    
            generateItem();
            setTimeout(loopGenerateItem, 3000);
        };

        showNextDialog(() => {
            window.setTimeout(() => {
                loopGenerateItem();

                showNextDialog(() => {
                    mainLoopClock = setInterval(mainLoop, 33);
                });
            }, 500);
        });
    }, 1000);
};

const end = (reason) => {
    window.clearInterval(mainLoopClock);
    gameIsRunning = false;
    gameOver = true;
    allItems.forEach(item => item.remove());
    document.body.classList.add('end');
    document.getElementById('gameover-reason').innerHTML = reason;
    window.setTimeout(() => {
        gameOverReadyToLeave = true;
    }, 2000)
};

const mainLoop = () => {
    score += 0.1;
    
    const rec = document.getElementById('ufo-image').getBoundingClientRect();

    const size = getUfoSize();  

    const x = rec.x + rec.width/2;
    const y = rec.y + rec.height/2;

    const ufoCircle = { x, y, r: size / 2 };

    // Check collisions between UFO and all humans/rockets
    allItems.forEach((item) => {
        var itemCircle = item.getCircle();

        if (!itemCircle) { return; }

        if (collision(ufoCircle, itemCircle)) {
        item.destroy(true);
        }

        const moneys = document.querySelectorAll('.money:not(.absorbed)');

        if (moneys.length === 0) {
            return;
        }

        const ads = document.querySelectorAll('.ad-support:not(.level3)');
      
        // Check collisions between ads supports and floating moneys
        for(let ad of ads) {
            const { x, y } = getCenter(ad);
            const adCircle = { x, y, r: ifSmallScreen(8,16) };
            
            for(let money of moneys) {
                const { x, y } = getCenter(money);
                const moneyCircle = { x, y, r: ifSmallScreen(15,30)};

                if (collision(adCircle, moneyCircle)) {
                    money.classList.add('absorbed');
                    money.ontransitionend = () => money.closest('.item-scale').remove();
                    
                    if (ad.classList.contains('on')) {
                    if (ad.classList.contains('level2')) {
                        ad.classList.add('level3');

                        if (document.querySelectorAll('.ad-support.level3').length === 3) {
                            window.setTimeout(() => {
                                if (!gameOver) {
                                    end(END_REASONS.AD);
                                }
                            }, 500);
                        }
                    } else {
                        ad.classList.add('level2');
                    }
                    } else {
                        ad.classList.add('on');
                        window.setTimeout(() => ad.classList.add('level1'));
                    }
                }
            }
        }
    });

    if (totaLives > 0) {
        document.getElementById('lives').innerHTML = '👽'.repeat(totaLives);
        document.getElementById('score').innerHTML = parseInt(score, 10) * scoreMultiplier;
    } else {
        end(END_REASONS.KILL);
    }  
};