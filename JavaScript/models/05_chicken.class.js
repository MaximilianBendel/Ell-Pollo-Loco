class Chicken extends MoveableObject {
    Images_walking = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImg('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png'); // Lädt das Standbild des Huhns
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Huhns
        this.x = 200 + Math.random() * 500; // Setzt eine zufällige x-Position
        this.height = 70;
        this.width = 60;
        this.y = 440 - this.height; // Setzt die y-Position
        this.animate(); // Startet die Animation des Huhns
        this.speed = 0.15 + Math.random() * 0.25; // Setzt eine zufällige Geschwindigkeit
    }

    animate() {
        this.moveLeft(); // Startet die Bewegung nach links
        setInterval(() => {
            let i = this.currentImage % this.Images_walking.length; // Zyklisches Durchlaufen der Bilder
            let path = this.Images_walking[i];
            this.img = this.imageCache[path]; // Setzt das aktuelle Bild
            this.currentImage++;
        }, 1000 / 6); // 6 FPS für Animation
    }
}
