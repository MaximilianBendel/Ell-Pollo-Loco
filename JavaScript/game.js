let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', function (e) {
    keyboard.updateKeyState(e.key, true);
});

window.addEventListener('keyup', function (e) {
    keyboard.updateKeyState(e.key, false);
});