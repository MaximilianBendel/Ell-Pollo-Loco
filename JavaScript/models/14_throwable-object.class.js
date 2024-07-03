class ThrowableObject extends MoveableObject {


    throwSound = new Audio('Audio/throwbottle.mp3'); // Soundeffekt für das Werfen
    speedY = 30; // Geschwindigkeit in y-Richtung
    speedX = 20; // Geschwindigkeit in x-Richtung

    Images_Bottle_rotating = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x ,y) {
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png'); // Konstruktor der Elternklasse aufrufen
        this.loadImages(this.Images_Bottle_rotating); // Lädt die Bilder
        this.x = x; // x-Position
        this.y = y; // y-Position
        this.height = 60; 
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 17;
            // Aufrufen der animateImages Methode um die Flaschenbilder zu animieren
            this.animateImages(this.Images_Bottle_rotating);
        }, 25); // Aktualisiere das Bild alle 100 Millisekunden
        this.throwSound.play(); // Spiele den Soundeffekt ab    
    }
    

}