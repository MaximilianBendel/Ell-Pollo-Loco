/**
 * Represents a chicken in the game.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {

    lifepoints = 100;
    isHitCooldown = false;
    isDead = false;
    Images_walking = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    Images_dead = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chicken.
     * @param {number} x - The x-position of the chicken.
     */
    constructor(x) {
        super().loadImg('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.Images_walking);
        this.loadImages(this.Images_dead);
        this.x = x;
        this.height = 70;
        this.width = 60;
        this.y = 445 - this.height;
        this.speed = 0.15 + Math.random() * 0.5;
        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 30;
        this.animate();
    }

    /**
     * Starts the animation of the chicken.
     */
    animate() {
        this.moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    
        this.walkingImagesInterval = setInterval(() => {
            this.animateImages(this.Images_walking);
        }, 1000 / 6);
    }

    /**
     * Stops all animations of the chicken.
     */
    stopAllAnimations() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.walkingImagesInterval);
    }

    /**
     * Activates all animations of the chicken.
     */
    activateAllAnimations() {
        this.animate();
    }

    /**
     * Executes the death animation of the chicken.
     */
    deadAnimation() {
        if (this.lifepoints === 0) {
            this.stopAllAnimations();
            soundManager.playSound('smallchickendies');
            this.img = this.imageCache[this.Images_dead[0]];
            setTimeout(() => {
                this.isDead = true;
            }, 300);
        }
    }

    /**
     * Causes damage to the chicken.
     * @param {number} damage - The damage inflicted.
     */
    hit(damage) {
        if (!this.isHitCooldown) {
            this.lifepoints -= damage;
            this.isHitCooldown = true;
            setTimeout(() => {
                this.isHitCooldown = false;
            }, 1000);
        }
    }
}
