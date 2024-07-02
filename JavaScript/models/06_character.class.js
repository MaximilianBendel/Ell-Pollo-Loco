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
    Images_jumping = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
    ];
    Images_dead = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];
    Images_hurt = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    currentImage = 0;
    world;
    speed = 5;
    direction = 'right';
    walking_sound = new Audio('Audio/walking.mp3');
    snoring_sound = new Audio('Audio/snoring.mp3');
    idleTime = 0;
    isDeadAnimationStopped = false;

    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png'); // Lädt das Standbild des Charakters
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Charakters 
        this.loadImages(this.Images_idle); // Lädt die Standbilder des Charakters
        this.loadImages(this.Images_long_idle); // Lädt die Long-Idle-Bilder des Charakters
        this.loadImages(this.Images_jumping); // Lädt die Sprungbilder des Charakters
        this.loadImages(this.Images_dead); // Lädt die Todesbilder des Charakters
        this.loadImages(this.Images_hurt); // Lädt die Verletzungs-Bilder des Charakters
        this.applyGravity(); // Startet die Fallgeschwindigkeit des Charakters
        this.x = 0;
        this.height = 240;
        this.width = 100;
        this.y = 210;
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
            this.moveRightCharacter();
        }
        if (this.world.keyboard.LEFT && this.x > -720) {
            this.moveLeftCharacter();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) { // Nur springen, wenn der Charakter nicht bereits in der Luft ist
            this.jump(); // Startet den Sprung
            this.startJumpingAnimation(); // Startet die Sprunganimation
        }
        this.world.camera_x = -this.x + 100; // Bewegt die Kamera mit dem Charakter
    }

    moveRightCharacter() {
        this.x += this.speed; // Bewegt den Charakter nach rechts
        this.direction = 'right'; // Aktualisiert die Richtung
        this.walking_sound.play(); // Spielt den Laufsound ab
        this.idleTime = 0; // Setzt die Idle-Zeit zurück
        this.snoring_sound.pause(); // Pausiert den Schnarchsound
    }

    moveLeftCharacter() {
        this.x -= this.speed; // Bewegt den Charakter nach links
        this.direction = 'left'; // Aktualisiert die Richtung
        this.walking_sound.play(); // Spielt den Laufsound ab
        this.idleTime = 0; // Setzt die Idle-Zeit zurück
        this.snoring_sound.pause(); // Pausiert den Schnarchsound
    }

    startJumpingAnimation() {
        if (this.jumpingAnimationInterval) {
            clearInterval(this.jumpingAnimationInterval); // Stoppt bestehende Animation, falls vorhanden
        }
        this.currentImage = 0; // Startet von Anfang der Sprungbilder
        this.jumpingAnimationInterval = setInterval(() => {
            this.animateImages(this.Images_jumping); // Aktualisiert die Sprunganimation
            if (this.currentImage >= this.Images_jumping.length - 1) {
                clearInterval(this.jumpingAnimationInterval); // Beendet die Animation, wenn das letzte Bild erreicht ist
            }
        }, 250); // 250 ms zwischen den Frames für eine gleichmäßige Animation
    }
    
    stopJumpingAnimation() {
        if (this.jumpingAnimationInterval) { // Überprüft, ob die Sprunganimation läuft
            clearInterval(this.jumpingAnimationInterval); // Pausiert die Sprunganimation
            this.jumpingAnimationInterval = null; // Setzt die Sprunganimation zurück
        }
    }

    stopDeadAnimation() {
        if (this.deadAnimationInterval) {
            clearInterval(this.deadAnimationInterval); // Pausiert die Todesanimation
            this.deadAnimationInterval = null; // Setzt die Todesanimation zurück
        }
        this.loadImg('img_pollo_locco/img/2_character_pepe/5_dead/D-56.png'); // Setzt das letzte Todesbild
        this.isDeadAnimationStopped = true; // Setzt den Todesanimationsstatus
    }

    updateAnimation() {
        if (!this.isAboveGround()) {
            this.speedY = 0;
            this.stopJumpingAnimation();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.Images_walking);
                this.idleTime = 0;
                this.snoring_sound.pause();
            } else {
                this.idleTime += 200;
                if (this.idleTime >= 200000) {
                    this.animateImages(this.Images_long_idle);
                    if (this.snoring_sound.paused) {
                        this.snoring_sound.play();
                    }
                } else {
                    this.animateImages(this.Images_idle);
                    this.snoring_sound.pause();
                }
            }
        } else {
            this.animateImages(this.Images_jumping);
        } if (this.isHurt()) {
            this.animateImages(this.Images_hurt);
        }
        if (this.isDead()) {
            if (!this.isDeadAnimationStopped) {
                this.animateImages(this.Images_dead);
                setTimeout(() => {
                    this.stopDeadAnimation();
                }, 400);
            }
            return; // Beendet die updateAnimation Methode vorzeitig, wenn der Charakter tot ist
        }
    }

    animateImages(images) {
        if (this.isDeadAnimationStopped) {
            return; // Beendet die Methode frühzeitig, wenn die Todesanimation gestoppt wurde
        }
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
}
