let canvas;
let world;
let keyboard = new Keyboard(); // Initialisiert ein neues Keyboard-Objekt
let Bosslife = false;
let startScreen, WinEndScreen;

function startGame() {
    canvas = document.getElementById('canvas'); // Holt das Canvas-Element aus dem DOM

    startScreen = document.getElementById('startMenuBox');
    WinEndScreen = document.getElementById('WinScreenEnd');
    WinEndScreen.classList.remove('display-block');
    startScreen.classList.add('display-none');
    canvas.classList.add('display-block');
    initLevel(); // Initialisiert das Level
    init(); // Initialisiert das Spiel
}

function init() {
    canvas = document.getElementById('canvas'); // Holt das Canvas-Element aus dem DOM
    world = new World(canvas, keyboard); // Initialisiert die Welt mit Canvas und Keyboard
    soundManager.playnormalSound('gamemusic'); // Spielt den Hintergrundsound ab
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



