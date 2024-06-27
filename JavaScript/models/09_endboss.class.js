class Endboss extends MoveableObject {

    height = 500;
    width = 300;
    y = -20;

    Images_walking = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'

    ];

    constructor() { 
        super().loadImg('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png'); // Lädt das Standbild des Huhns
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Huhns
        this.x = 2100
        this.animate(); // Startet die Animation des Enboss
    }


    animate() {
        setInterval(() => {
            this.animateImages(this.Images_walking);
        }, 1000 / 2); // 6 FPS für Animation
    }
}