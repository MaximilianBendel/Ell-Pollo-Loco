/**
 * Repräsentiert den Endboss im Spiel.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
    // Eigenschaften
    speed = 2;
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

    /**
     * Erstellt eine Instanz von Endboss.
     */
    constructor() {
        super().loadImg('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.alertImages);
        this.loadImages(this.walkingImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.x = 5700;
        this.height = 500;
        this.width = 300;
        this.y = -20;
        this.offsetX = 70; // Beispiel: verkleinert die Hitbox an allen Seiten
        this.offsetY = 40;
        this.offsetWidth = 120;
        this.offsetHeight = 0;
    }

    /**
     * Startet die Alarm-Animation.
     */
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

    /**
     * Beendet die Alarm-Animation und startet die Bewegungs-Animation.
     */
    endAlertAnimation() {
        clearInterval(this.animationInterval);
        this.alertAnimationPlayed = true;
        this.isAnimating = false;
        this.startMoving();
    }

    /**
     * Startet die Bewegung des Endbosses.
     */
    startMoving() {
        if (this.isMoving || !this.alertAnimationPlayed) return;
        this.isMoving = true;
        this.notHurtable = true;
    
        this.moveInterval = setInterval(() => {
            this.followCharacter(); // Überprüft die Position des Charakters und bewegt den Endboss entsprechend
        }, 1000 / 60);
    
        this.walkingAnimationInterval = setInterval(() => {
            if (!this.isAttacking) {
                this.animateImages(this.walkingImages);
            }
        }, 150);
    }

    followCharacter() {
        const minDistance = 5; // Minimale Distanz zwischen Endboss und Charakter
        const distance = Math.abs(this.character.x - this.x);
        if (distance > minDistance) {
            if (this.character.x < this.x) {
                this.moveLeft();
            } else if (this.character.x > this.x) {
                this.moveRight();
            }
        }
    }

    /**
     * Bewegt den Endboss nach links.
     */
    moveLeft() {
        this.x -= this.speed;
        this.direction = 'right';
    }

    /**
     * Bewegt den Endboss nach rechts.
     */
    moveRight() {
        this.x += this.speed;
        this.direction = 'left';
    }

    /**
     * Stoppt die Bewegung des Endbosses.
     */
    stopMoving() {
        clearInterval(this.moveInterval);
        clearInterval(this.walkingAnimationInterval);
        this.isMoving = false;
    }

    /**
     * Stoppt den Angriff des Endbosses.
     */
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
    }

    /**
     * Startet den Angriff des Endbosses.
     */
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
                setTimeout(() => {
                    this.startMoving();
                }, 300);
            }
        }, 150);
    }

    /**
     * Startet die Verletzungs-Animation.
     */
    isHurtAnimation() {
        if (this.isHurt) return;
        this.isHurt = true;
        this.stopMoving();
        this.stopAttack();
        let frameIndex = 0;
        soundManager.playnormalSound('endbosshitwithbottle');
        this.hurtInterval = setInterval(() => {
            this.animateImages(this.hurtImages);
            frameIndex++;

            if (frameIndex >= this.hurtImages.length) {
                clearInterval(this.hurtInterval);
                this.isHurt = false;
                if (this.lifepoints > 0) {
                    this.startMoving();
                } else {
                    this.isDeadAnimation();
                }
            }
        }, 150);
    }

    /**
     * Startet die Todes-Animation.
     */
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
                this.stopAllAnimations();
            }
        }, 150);
    }

    /**
     * Verursacht Schaden beim Endboss.
     * @param {number} damage - Der zugefügte Schaden.
     */
    hit(damage) {
        if (!this.isHitCooldown) {
            this.lifepoints -= damage;
            this.isHitCooldown = true;
            setTimeout(() => {
                this.isHitCooldown = false;
            }, 1000); // Cooldown-Zeit von 1 Sekunde
        }
    }

    /**
     * Stoppt alle Animationen des Endbosses.
     */
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
