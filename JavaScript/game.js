let canvas;
let world;
let keyboard = new Keyboard(); // Initialisiert ein neues Keyboard-Objekt

function init() {
    canvas = document.getElementById('canvas'); // Holt das Canvas-Element aus dem DOM
    world = new World(canvas, keyboard); // Initialisiert die Welt mit Canvas und Keyboard
}

window.addEventListener('keydown', function (e) {
    keyboard.updateKeyState(e.key, true); // Aktualisiert den Tastaturzustand bei Tastendruck
});

window.addEventListener('keyup', function (e) {
    keyboard.updateKeyState(e.key, false); // Aktualisiert den Tastaturzustand bei Loslassen der Taste
});
