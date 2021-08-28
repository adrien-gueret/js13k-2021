var sceneWidth = 1000;
var allItems = [];
var r = (x, y = 1) => Math.floor(Math.random() * (x - y + 1)) + y;
var i = (t,x) => `./assets/${t}${r(x)}.svg`;
var humanEmojiCode = '&#x1F574;';
var humanColors = ['', '&#x1F3FB', '&#x1F3FC', '&#x1F3FD', '&#x1F3FE', '&#x1F3FF'];
var itemSize = 70;
var isPressed = false;
var getCenter = node => {
    var rec = node.getBoundingClientRect();
    var x = rec.x + rec.width/2;
    var y = rec.y + rec.height/2;
    return { x, y };
}