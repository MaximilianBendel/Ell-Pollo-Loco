class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -20;
    speed = 1;
    lifepoints = 100;

    // Statusvariablen
    firstContact = false;
    startAttackAnimation = false;
    animationTriggered = false;
    isAnimating = false;
    isMoving = false;
    isAttacking = false;
    alertAnimationPlayed = false;
    isHurt = false;
    notHurtable = false;
    isHitCooldown = false;
    isDead = false;

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
    hurtImages = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    deadImages = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImg('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.alertImages);
        this.loadImages(this.walkingImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.x = 2100;
    }

    startAnimation() {
        soundManager.playnormalSound('endbossIntroSound');
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
        this.notHurtable = true;

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

    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
    }

    startAttack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        this.stopMoving();
        let frameIndex = 0;
        this.attackInterval = setInterval(() => {
            this.animateImages(this.attackImages);
            frameIndex++;
            if (frameIndex >= this.attackImages.length) {
                clearInterval(this.attackInterval);
                this.isAttacking = false;
                this.startMoving();
            }
        }, 150);
    }

    isHurtAnimation() {
        if (this.isHurt) return;
        this.isHurt = true;
        this.stopMoving();
        this.stopAttack();
        let frameIndex = 0;
        soundManager.playnormalSound('endbosshitwithbottle');
        this.hurtInterval = setInterval(() => {
            if (this.notHurtable) {
                this.animateImages(this.hurtImages);
                frameIndex++;
                console.log('Hurt frame:', frameIndex);
            }

            if (frameIndex >= this.hurtImages.length) {
                clearInterval(this.hurtInterval);
                this.isHurt = false;
                console.log('Endboss finished hurting!');
                this.startMoving();
                if (this.lifepoints <= 0) {
                    this.isDeadAnimation();
                }
            }
        }, 150);
    }

    isDeadAnimation() {
        this.stopMoving();
        this.stopAttack();
        let frameIndex = 0;

        this.deadInterval = setInterval(() => {
            this.animateImages(this.hurtImages);
            this.animateImages(this.deadImages);
            frameIndex++;

            if (frameIndex >= this.deadImages.length) {
                clearInterval(this.deadInterval);
                this.loadImg('img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png');
                this.notHurtable = false;
            }
        }, 150);
    }

    hit(damage) {
        if (!this.isHitCooldown) {
            this.lifepoints -= damage;
            console.log('Endboss lifepoints:', this.lifepoints);
            this.isHitCooldown = true;
            setTimeout(() => {
                this.isHitCooldown = false;
            }, 1000); // Cooldown-Zeit von 1 Sekunde
        }
    }

    stopAllAnimations() {
        clearInterval(this.animationInterval);
        clearInterval(this.moveInterval);
        clearInterval(this.walkingAnimationInterval);
        clearInterval(this.attackInterval);
        clearInterval(this.hurtInterval);
        clearInterval(this.deadInterval);
        this.isAnimating = false;
        this.isMoving = false;
        this.isAttacking = false;
        this.isHurt = false;
        this.notHurtable = false;
    }
}
