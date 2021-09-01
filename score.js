class Score {
    constructor(x, y, value) {
        var container = document.createElement('div');
        container.innerHTML = `+${value * scoreMultiplier}`;
        container.className = 'score-delta';
        container.style.left = `${x - 35}px`;
        container.style.top = `${y - 35}px`;

        container.onanimationend = () => container.remove();

        c.appendChild(container);

        score += 10;
    }
}