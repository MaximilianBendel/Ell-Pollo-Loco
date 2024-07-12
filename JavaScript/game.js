let canvas;
let world;
let keyboard = new Keyboard(); // Initialisiert ein neues Keyboard-Objekt
let Bosslife = false;
let startScreen, WinEndScreen;
let GamePlays = false;
let showMobileButtonsStatus = false;

function startGame() {
    canvas = document.getElementById('canvas'); // Holt das Canvas-Element aus dem DOM
    startScreen = document.getElementById('startMenuBox');
    WinEndScreen = document.getElementById('WinScreenEnd');
    WinEndScreen.classList.remove('display-block');
    startScreen.classList.add('display-none');
    canvas.classList.add('display-block');
    initLevel(); // Initialisiert das Level
    init(); // Initialisiert das Spiel
    GamePlays = true;
    showMobileButtonsStatus = true;
    controlMobileButtons();
    mobileEventListener();
}

function init() {
    canvas = document.getElementById('canvas'); // Holt das Canvas-Element aus dem DOM
    world = new World(canvas, keyboard); // Initialisiert die Welt mit Canvas und Keyboard
}

function restartGame() {
    location.reload();
}

window.addEventListener('keydown', function (e) {
    keyboard.updateKeyState(e.key, true); // Aktualisiert den Tastaturzustand bei Tastendruck
});

window.addEventListener('keyup', function (e) {
    keyboard.updateKeyState(e.key, false); // Aktualisiert den Tastaturzustand bei Loslassen der Taste
});

function openKeyboardMenu() {
    document.getElementById('startMenuBox').classList.add('display-none');
    document.getElementById('keyboardMenu').style.display = 'block';
}

function closeKeyboardMenu() {
    document.getElementById('startMenuBox').classList.remove('display-none');
    document.getElementById('keyboardMenu').style.display = 'none';
}

function checkOrientation() {
    const rotateMessage = document.getElementById('rotateDeviceMessage');
    if (window.innerWidth <= 720 && window.innerHeight > window.innerWidth) {
        rotateMessage.style.display = 'flex';
        document.getElementById('startMenuBox').classList.add('display-none');
    } else if (GamePlays) {
        rotateMessage.style.display = 'none';
        document.getElementById('startMenuBox').classList.add('display-none');
    } else {
        rotateMessage.style.display = 'none';
        document.getElementById('startMenuBox').classList.remove('display-none');
    }
}

function showMobileButtons() {
    if (showMobileButtonsStatus && window.innerHeight < window.innerWidth) {
        document.getElementById('leftButton').style.display = 'block';
        document.getElementById('rightButton').style.display = 'block';
        document.getElementById('jumpButton').style.display = 'block';
        document.getElementById('throwButton').style.display = 'block';
    }
}

function hideMobileButtons() {
    if (window.innerHeight >= 1025  || !showMobileButtonsStatus) {
        document.getElementById('leftButton').style.display = 'none';
        document.getElementById('rightButton').style.display = 'none';
        document.getElementById('jumpButton').style.display = 'none';
        document.getElementById('throwButton').style.display = 'none';
    }
}

function controlMobileButtons() {
    setInterval(() => {
        showMobileButtons();
        hideMobileButtons();
    }, 100);
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

function mobileEventListener() {
    // Event-Listener für mobile Buttons hinzufügen
    document.getElementById('leftButton').addEventListener('touchstart', () => keyboard.updateButtonState('LEFT', true));
    document.getElementById('leftButton').addEventListener('touchend', () => keyboard.updateButtonState('LEFT', false));
    document.getElementById('rightButton').addEventListener('touchstart', () => keyboard.updateButtonState('RIGHT', true));
    document.getElementById('rightButton').addEventListener('touchend', () => keyboard.updateButtonState('RIGHT', false));
    document.getElementById('jumpButton').addEventListener('touchstart', () => keyboard.updateButtonState('JUMP', true));
    document.getElementById('jumpButton').addEventListener('touchend', () => keyboard.updateButtonState('JUMP', false));
    document.getElementById('throwButton').addEventListener('touchstart', () => keyboard.updateButtonState('THROW', true));
    document.getElementById('throwButton').addEventListener('touchend', () => keyboard.updateButtonState('THROW', false));
}