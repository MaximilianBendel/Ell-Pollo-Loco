let canvas;
let world;
let keyboard = new Keyboard(); // Initialisiert ein neues Keyboard-Objekt
let Bosslife = false;
let startScreen, WinEndScreen;

function init() {
    startScreen = document.getElementById('startMenuBox');
    WinEndScreen = document.getElementById('WinScreenEnd');
    canvas = document.getElementById('canvas'); // Holt das Canvas-Element aus dem DOM
    WinEndScreen.classList.remove('display-block');
    startScreen.classList.add('display-none');
    canvas.classList.add('display-block');
    
    world = new World(canvas, keyboard); // Initialisiert die Welt mit Canvas und Keyboard
}

function restartGame() {
     // Setze alle relevanten Variablen und Elemente zurück
     world = new World(canvas, keyboard); // Initialisiert die Welt mit Canvas und Keyboard
 
     // Initialisiere das Spiel neu
     init();
}

window.addEventListener('keydown', function (e) {
    keyboard.updateKeyState(e.key, true); // Aktualisiert den Tastaturzustand bei Tastendruck
});

window.addEventListener('keyup', function (e) {
    keyboard.updateKeyState(e.key, false); // Aktualisiert den Tastaturzustand bei Loslassen der Taste
});
