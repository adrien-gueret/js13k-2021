var dialogs = [
    {
        who: '🤑',
        text: 'Displaying ads in space? What a good opportunity to be richer!',
    },
    {
        who: '👽',
        text: 'We can\'t let humans pollute space with their ads... Help us to kill them all!',
    },
    {
        who: '😠',
        text: 'We are under attack! Launch some rockets to counterattack!',
    }
];

var currentDialogIndex = 0;

var showNextDialog = (callback) => {
    var { who, text } = dialogs[currentDialogIndex];

    document.getElementById('dialog-character').innerHTML = who;
    document.getElementById('dialog-text').innerHTML = text;

    document.getElementById('dialogs-container').style.transform = 'scale(1)';

    currentDialogIndex++;

    window.setTimeout(() => {
        hideDialog();
        callback && callback();
    }, 5500);
};

var hideDialog = () => {
    document.getElementById('dialogs-container').style.removeProperty('transform');
};