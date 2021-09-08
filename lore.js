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

    di.innerHTML = who;
    dt.innerHTML = text;

    dc.style.transform = 'scale(1)';

    currentDialogIndex++;

    window.setTimeout(() => {
        hideDialog();
        callback && callback();
    }, 5000);
};

var hideDialog = () => {
    dc.style.removeProperty('transform');
};