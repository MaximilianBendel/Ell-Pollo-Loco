class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -20;
    speed = 1;

    // Statusvariablen
    firstContact = false;
    startAttackAnimation = false;
    animationTriggered = false;
    isAnimating = false;
    isMoving = false;
    isAttacking = false;
    alertAnimationPlayed = false;

    // Bild-Arrays
    alertImages = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    walkingImages = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    attackImages = [
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
        super().loadImg('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png'); 
        this.loadImages(this.alertImages); 
        this.loadImages(this.walkingImages); 
        this.loadImages(this.attackImages); 
        this.x = 2100;
    }

    startAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        let frameIndex = 0;
        const frameLimit = this.alertImages.length;

        this.animationInterval = setInterval(() => {
            this.animateImages(this.alertImages);
            frameIndex++;
            if (frameIndex >= frameLimit) {
                this.endAlertAnimation();
            }
        }, 150);
    }

    endAlertAnimation() {
        clearInterval(this.animationInterval);
        this.alertAnimationPlayed = true;
        this.isAnimating = false;
        this.startMoving();
    }

    startMoving() {
        if (this.isMoving || !this.alertAnimationPlayed) return; 
        this.isMoving = true;

        this.moveInterval = setInterval(() => {
            if (!this.isAttacking) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.walkingAnimationInterval = setInterval(() => {
            if (!this.isAttacking) {
                this.animateImages(this.walkingImages);
            }
        }, 150);
    }

    stopMoving() {
        clearInterval(this.moveInterval);
        clearInterval(this.walkingAnimationInterval);
        this.isMoving = false;
    }

    startAttack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        this.stopMoving();
        let frameIndex = 0;

        const attackInterval = setInterval(() => {
            this.animateImages(this.attackImages);
            frameIndex++;

            if (frameIndex >= this.attackImages.length) {
                clearInterval(attackInterval);
                this.isAttacking = false;
                this.startMoving();
            }
        }, 150);
    }
}
