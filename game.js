pi.src = i('planet',3);
ui.src = i('ufo',1);

function up() {
    ut.style.transform = 'translateX(350px)';
}

function down() {
    ut.style.removeProperty('transform');
}

document.onkeydown = (e) => {
    if (e.key !== ' ') {
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
    if (!gameIsRunning || e.key !== ' ' || !isPressed) {
      return;
    }

    isPressed = false;
    e.preventDefault();

    down();
};

document.body.ontouchstart = () => {
    if (!gameIsRunning) {
        start();
        return;
    }

    if (isPressed) {
        return;
    }
  
      isPressed = true;
     
      up();
};

document.body.ontouchend = (e) => {
    if (!gameIsRunning || !isPressed) {
        return;
    }
  
    isPressed = false;
    e.preventDefault();
  
      down();
};

onselectstart = () => false;
oncontextmenu = () => false;

  
var generateItem = () => {
    var x = r(100);
    var shouldRenderRocket = x <= 33;

    new Human();

    if (shouldRenderRocket) {
      new Rocket();
    }
};

var collision = (c1, c2) => {
    var d = (c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y);
    return !(d > (c1.r + c2.r)*(c1.r + c2.r));
}

 
var start = () => {
    gameIsRunning = true;

    window.requestAnimationFrame(() => {
        var i = setInterval(initBg, 50);
        c.ontransitionend = () => clearInterval(i);
        document.body.classList.add('started');
    });

    setInterval(() => {
        score += 0.1;
        
        var rec = ui.getBoundingClientRect();
    
        var size = ufoSize * globalScale;  
    
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
                var adCircle = { x, y, r: 16 };
                
                for(let money of moneys) {
                    var { x, y } = getCenter(money);
                    var moneyCircle = { x, y, r: 30 };
    
                    if (collision(adCircle, moneyCircle)) {
                       money.classList.add('absorbed');
                       money.ontransitionend = () => money.closest('.item-scale').remove();
                       
                       if (ad.classList.contains('on')) {
                        if (ad.classList.contains('level2')) {
                            ad.classList.add('level3');
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

        lives.innerHTML = '👽'.repeat(totaLives);
        s.innerHTML = parseInt(score, 10) * scoreMultiplier;
        
    }, 33);
    

    var loopGenerateItem = () => {
        generateItem();
        setTimeout(loopGenerateItem, 3000);
    };
    
    loopGenerateItem();
};
