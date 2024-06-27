class Character extends MoveableObject {
    Images_walking = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    Images_idle = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    Images_long_idle = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    currentImage = 0;
    world;
    speed = 5;
    direction = 'right';
    walking_sound = new Audio('Audio/walking.mp3');
    snoring_sound = new Audio('Audio/snoring.mp3');
    idleTime = 0;
    

    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png'); // Lädt das Standbild des Charakters
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Charakters 
        this.loadImages(this.Images_idle); // Lädt die Standbilder des Charakters
        this.loadImages(this.Images_long_idle); // Lädt die Long-Idle-Bilder des Charakters
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
            this.idleTime = 0; // Setzt die Idle-Zeit zurück
            this.snoring_sound.pause(); // Pausiert den Schnarchsound
        }
        if (this.world.keyboard.LEFT && this.x > -720) {
            this.x -= this.speed; // Bewegt den Charakter nach links
            this.direction = 'left'; // Aktualisiert die Richtung
            this.walking_sound.play(); // Spielt den Laufsound ab
            this.idleTime = 0; // Setzt die Idle-Zeit zurück
            this.snoring_sound.pause(); // Pausiert den Schnarchsound
        }
        this.world.camera_x = -this.x + 100; // Bewegt die Kamera mit dem Charakter
    }

    updateAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.animateImages(this.Images_walking); // Startet die Laufanimation
            this.idleTime = 0; // Setzt die Idle-Zeit zurück
            this.snoring_sound.pause(); // Pausiert den Schnarchsound
        } else {
            this.idleTime += 200; // Erhöht die Idle-Zeit um 200 Millisekunden
            if (this.idleTime >= 2000000) { // Wenn die Idle-Zeit 2 Sekunden überschreitet
                this.animateImages(this.Images_long_idle); // Startet die Long-Idle-Animation
                if (this.snoring_sound.paused) { // Spielt den Schnarchsound ab, falls er pausiert ist
                    this.snoring_sound.play();
                }
            } else {
                this.animateImages(this.Images_idle); // Startet die Idle-Animation
                this.snoring_sound.pause(); // Pausiert den Schnarchsound
            }
        }
    }

    animateImages(images) {
        this.currentImage++;
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        this.img = this.imageCache[images[this.currentImage]];
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
