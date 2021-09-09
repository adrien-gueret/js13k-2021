pi.src = i('planet');
ui.src = i('ufo');

function up() {
    var target = ifSmallScreen(175,350);
    ut.style.transform = `translateX(${target}px)`;
}

function down() {
    ut.style.removeProperty('transform');
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

var generateItem = () => {
    new Human();

    var rocketMultiplier = Math.floor(totalHumansKilled/totalHumansToKillBeforeNextLevel);
    var rocketLuck = 25 * rocketMultiplier;

    //console.log({ rocketLuck, totalRockets: Math.floor(rocketLuck / 100), bonusRocket: rocketLuck%100 });

    for (let i = 0, l = Math.floor(rocketLuck / 100); i < l; i++) {
        new Rocket();
    }

    var x = r(100);
    var shouldRenderRocket = x <= rocketLuck%100;

    if (shouldRenderRocket) {
      new Rocket();
    }
};

var collision = (c1, c2) => {
    var d = (c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y);
    return !(d > (c1.r + c2.r)*(c1.r + c2.r));
}

var mainLoop = () => {
    score += 0.1;
    
    var rec = ui.getBoundingClientRect();

    var size = getUfoSize() * globalScale;  

    var x = rec.x + rec.width/2;
    var y = rec.y + rec.height/2;

    var ufoC = { x, y, r: size / 2 };

    allItems.forEach((item) => {
      var c = item.getCircle();

      if (!c) { return; }

      if (collision(ufoC, c)) {
        item.destroy(true);
      }

      const moneys = document.querySelectorAll('.money:not(.absorbed)');

      if (moneys.length === 0) {
          return;
      }

      const ads = document.querySelectorAll('.ad-support:not(.level3)');
      
        for(let ad of ads) {
            var { x, y } = getCenter(ad);
            var adCircle = { x, y, r: ifSmallScreen(8,16) };
            
            for(let money of moneys) {
                var { x, y } = getCenter(money);
                var moneyCircle = { x, y, r: ifSmallScreen(15,30)};

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
        lives.innerHTML = '👽'.repeat(totaLives);
        s.innerHTML = parseInt(score, 10) * scoreMultiplier;
    } else {
        end(END_REASONS.KILL);
    }  
};
 
var start = () => {
    gameIsRunning = true;

    document.body.classList.add('started');
    
    window.setTimeout(() => {
        var loopGenerateItem = () => {
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
