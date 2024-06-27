class Character extends MoveableObject {
    Images_walking = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;
    world;
    speed = 5;
    direction = 'right';
    walking_sound = new Audio('Audio/walking.mp3');

    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png'); // Lädt das Standbild des Charakters
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Charakters
        this.x = 0;
        this.height = 200;
        this.y = 440 - this.height; // Setzt die y-Position
        this.animate(); // Startet die Animation des Charakters
    }

    animate() {
        setInterval(() => {
            this.moveCharacter(); // Bewegt den Charakter
        }, 1000 / 60); // 60 FPS für flüssigere Bewegung

        setInterval(() => {
            this.updateAnimation(); // Aktualisiert die Animation des Charakters
        }, 200); // 5 FPS für langsamere Animation
    }

    moveCharacter() {
        this.walking_sound.pause(); // Pausiert den Laufsound
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed; // Bewegt den Charakter nach rechts
            this.direction = 'right'; // Aktualisiert die Richtung
            this.walking_sound.play(); // Spielt den Laufsound ab
        }
        if (this.world.keyboard.LEFT && this.x > -720) {
            this.x -= this.speed; // Bewegt den Charakter nach links
            this.direction = 'left'; // Aktualisiert die Richtung
            this.walking_sound.play(); // Spielt den Laufsound ab
        }
        this.world.camera_x = -this.x +100; // Bewegt die Kamera mit dem Charakter
    }

    updateAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            let i = this.currentImage % this.Images_walking.length;
            let path = this.Images_walking[i];
            this.img = this.imageCache[path]; // Setzt das aktuelle Bild
            this.currentImage++;
        }
    }


    draw(ctx) {
        if (this.direction === 'left') {
            ctx.save(); // Speichert den aktuellen Zustand des Canvas
            ctx.scale(-1, 1); // Spiegelt das Bild horizontal
            ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            ctx.restore(); // Stellt den gespeicherten Zustand wieder her
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Zeichnet das Bild normal
        }
    }

    jump() {
        // Sprunglogik hinzufügen
    }
}
