class ThrowableObject extends MoveableObject {

    speedY = 30; // Geschwindigkeit in y-Richtung
    speedX = 20; // Geschwindigkeit in x-Richtung
    Bottleisrotating = false; // Statusvariable für die Flaschenrotation



    Images_Bottle_rotating = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    Images_Bottle_splash = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png'); // Konstruktor der Elternklasse aufrufen
        this.loadImages(this.Images_Bottle_rotating); // Lädt die Bilder
        this.loadImages(this.Images_Bottle_splash); // Lädt die Bilder
        this.x = x; // x-Position
        this.y = y; // y-Position
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        if (this.Bottleisrotating) return; // Wenn die Flasche bereits rotiert, wird die Methode beendet
        this.Bottleisrotating = true; // Setzt den Status der Flaschenrotation auf true
        this.speedY = 20;
        this.applyGravity();
        this.ThrowInterval = setInterval(() => {
            this.x += 12;
            // Aufrufen der animateImages Methode um die Flaschenbilder zu animieren
            this.animateImages(this.Images_Bottle_rotating);
        }, 25); // Aktualisiere das Bild alle 25 Millisekunden
        soundManager.playSound('throwbottle'); // Spielt den Soundeffekt ab
    }

    stopRotation() {
        clearInterval(this.ThrowInterval); // Stoppt die Flaschenrotation
        this.Bottleisrotating = false; // Setzt den Status der Flaschenrotation auf false
        this.speedY = 0; // Stellt sicher, dass die Schwerkraft nicht mehr angewendet wird
    }

    bottleSplash() {
        this.stopRotation(); // Stoppt die Flaschenrotation
        const splashInterval = setInterval(() => {
            if (!this.Bottleisrotating) {
                this.animateImages(this.Images_Bottle_splash); // Animiere die Bilder
                clearInterval(splashInterval); // Stoppt die Animation
            }
        }, 100); // Aktualisiere das Bild alle 100 Millisekunden
    }

    playGlasSplashSound() {
        soundManager.playnormalSound('glassbottlehit'); // Spielt den Soundeffekt ab
    }

}
