class Endboss extends MoveableObject {

    height = 500;
    width = 300;
    y = -20;

    firstContact = false;
    startAttackAnimation = false;
    character;
    speed = 1;

    Images_alert = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    Images_walking = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    Images_attack = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    constructor() { 
        super().loadImg('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png'); // Lädt das Standbild des Huhns
        this.loadImages(this.Images_alert); // Lädt die Laufbilder des Huhns
        this.loadImages(this.Images_walking); // Lädt die Laufbilder des Huhns
        this.loadImages(this.Images_attack); // Lädt die Angriffsbilder des Huhns
        this.x = 2100
        this.alertAnimationPlayed = false; // Zustandsvariable zur Überwachung der 'alert' Animation
        this.startMoving(); // Startet die Bewegung nach links
    }


    startAnimation() {
        if (this.isAnimating) return;  // Verhindert das mehrfache Starten der Animation
        this.isAnimating = true;
        let i = 0;
        let animationLimit = this.Images_alert.length;
    
        this.animationInterval = setInterval(() => {
            this.animateImages(this.Images_alert);
            i++;
            if (i >= animationLimit) {
                clearInterval(this.animationInterval);  // Beendet das Interval nach einer vollständigen Animation
                this.alertAnimationPlayed = true; // Setzt, dass die Alert-Animation abgespielt wurde
                this.isAnimating = false;  // Setzt die Animationsvariable zurück
                this.startMoving(); // Beginnt mit der Bewegung
            }
        }, 150);
    }
    

    
    startMoving() {
        if (this.isMoving || !this.alertAnimationPlayed) return; // Verhindert das vorzeitige Bewegen
        this.isMoving = true;
        setInterval(() => {
            if (!this.isAttacking) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
    

    
    startAttack() {
        if (this.isAttacking) return; // Verhindert das mehrfache Starten der Angriffsanimation
        this.isAttacking = true;
        let i = 0;
    
        const attackInterval = setInterval(() => {
            this.animateImages(this.Images_attack);
            i++;
    
            if (i >= this.Images_attack.length) {
                clearInterval(attackInterval); // Beendet das Angriffsintervall
                this.isAttacking = false; // Setzt den Angriffszustand zurück
                this.startMoving(); // Startet die Bewegung wieder
            }
        }, 150);
    }
    
    
}