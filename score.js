class Score {
    constructor(x, y, value) {
        var container = document.createElement('div');
        container.innerHTML = `+${value * scoreMultiplier}`;
        container.className = 'score-delta';

        var targetX = x - 35;
        var targetY = y - 35;
        container.style.left = `${targetX}px`;
        container.style.top = `${targetY}px`;

        container.onanimationend = () => container.remove();

        c.appendChild(container);

        score += 10;
    }
}