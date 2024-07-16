/**
 * Represents a brown chicken in the game.
 * @extends Chicken
 */
class brownChicken extends Chicken {

    /**
     * The images of the brown chicken in walking mode.
     * @type {Array<string>}
     */
    Images_walking_brown = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * The images of the brown chicken in dead mode.
     * @type {Array<string>}
     */
    Images_dead_brown = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of brownChicken.
     * @param {number} x - The x-position of the brown chicken.
     */
    constructor(x) {
        super().loadImg('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.Images_walking_brown);
        this.loadImages(this.Images_dead_brown);
        this.x = x;
        this.height = 70;
        this.width = 60;
        this.y = 445 - this.height;
        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 30;
    }

    /**
     * Starts the animation of the brown chicken.
     */
    animate() {
        this.moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkingImagesInterval = setInterval(() => {
            this.animateImages(this.Images_walking_brown);
        }, 1000 / 6);
    }
    
    /**
     * Stops all animations of the brown chicken.
     */
    stopAllAnimations() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.walkingImagesInterval);
    }

    /**
     * Activates all animations of the brown chicken.
     */
    activateAllAnimations() {
        this.animate();
    }

    /**
     * Starts the death animation of the brown chicken.
     */
    deadAnimation() {
        if (this.lifepoints === 0) {
            this.stopAllAnimations();
            soundManager.playSound('smallchickendies');
            this.img = this.imageCache[this.Images_dead_brown[0]];
            setTimeout(() => {
                this.isDead = true;
            }, 300);
        }
    }

    /**
     * Causes damage to the brown chicken.
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
