let canvas;
let ctx;
let character = new Image();




function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = '../img_pollo_locco/img/2_character_pepe/2_walk/W-21.png';
    // X-Achse Y-Achse Breite Höhe
    ctx.drawImage(character, 20, 50, 50, 150);
}

// function fullScreen() {
//     let canvas = document.getElementById('canvas');
//     canvas.classList.add('');
// }
