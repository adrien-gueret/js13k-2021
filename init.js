var initScale = () => {
    if (innerWidth < sceneWidth) {
        globalScale = innerWidth/sceneWidth;
        
        var cw = parseInt(getComputedStyle(c).width, 10);
        var lw = parseInt(getComputedStyle(l).width, 10);
        var d = lw - cw;

        if (d > 0) {
            l.style.transform = `translateX(-${d/2}px)`;
        } else {
            l.style.removeProperty('transform');
        }
    } else {
        globalScale = 1;
        l.style.removeProperty('transform');
    }
    document.body.style.setProperty('--global-scale', globalScale);
};

var initBg = () => {
    background.width = innerWidth;
    background.height = innerHeight;

    var context = background.getContext('2d'),
    stars = 600,
    colorrange = [0,60,240];

    for (var i = 0; i < stars; i++) {
      var x = Math.random() * background.offsetWidth;
      y = Math.random() * background.offsetHeight,
      radius = Math.random() * 1.2,
      hue = colorrange[r(colorrange.length) - 1],
      sat = r(100, 50);
      context.beginPath();
      context.arc(x, y, radius, 0, 360);
      context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
      context.fill();
    }
};

initScale();
initBg();

window.onresize = () => {
    initScale();
    initBg();
};