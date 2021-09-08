class Score {
    constructor(x, y, value) {
        var container = document.createElement('div');
        container.innerHTML = `+${value * scoreMultiplier}`;
        container.className = 'score-delta';

        var delta = ifSmallScreen(18, 35);
        var targetX = x - delta;
        var targetY = y - delta;
        container.style.left = `${targetX}px`;
        container.style.top = `${targetY}px`;

        container.onanimationend = () => container.remove();

        c.appendChild(container);

        score += 10;
    }
}