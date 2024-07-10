class Chicken extends MoveableObject {
    lifepoints = 100; // Setzt die Lebenspunkte
    isHitCooldown = false; // Setzt den Treffer-Cooldown
    isDead = false; // Markiert das Objekt als lebendig

    Images_walking = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    Images_dead = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImg('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png'); // Lädt das Standbild des Huhns
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Huhns
        this.loadImages(this.Images_dead); // Lädt die Todesbilder des Huhns
        this.x = x; // Setzt die x-Position
        this.height = 70;
        this.width = 60;
        this.y = 445 - this.height; // Setzt die y-Position
        this.speed = 0.15 + Math.random() * 0.5; // Setzt eine zufällige Geschwindigkeit
        this.animate(); // Startet die Animation des Huhns
    }

    animate() {
        this.moveLeftInterval = setInterval(() => {
            this.moveLeft(); // Startet die Bewegung nach links
        }, 1000 / 60); // 60 FPS für flüssigere Bewegung
    
        this.walkingImagesInterval = setInterval(() => {
            this.animateImages(this.Images_walking); // Startet die Laufanimation
        }, 1000 / 6); // 6 FPS für Animation
    }
    
    stopAllAnimations() {
        clearInterval(this.moveLeftInterval); // Stoppt die Bewegung
        clearInterval(this.walkingImagesInterval); // Stoppt die Laufanimation
    }

    deadAnimation() {
        if (this.lifepoints === 0) {
            this.stopAllAnimations(); // Stoppt alle Animationen
            this.img = this.imageCache[this.Images_dead[0]]; // Setzt das Todesbild
            setTimeout(() => {
                this.isDead = true; // Markiert das Objekt als tot
            }, 1000); // 1 Sekunde Verzögerung
        }
    }

    hit(damage) {
        if (!this.isHitCooldown) {
            this.lifepoints -= damage;
            this.isHitCooldown = true;
            setTimeout(() => {
                this.isHitCooldown = false;
            }, 1000); // Cooldown-Zeit von 1 Sekunde
        }
    }
}
