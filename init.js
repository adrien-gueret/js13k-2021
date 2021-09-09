const initBg = () => {
  const background = document.getElementById('background');
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

initBg();

window.onresize = () => {
  initBg();
};