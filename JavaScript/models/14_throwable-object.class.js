/**
 * Represents a throwable object in the game.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {

    /**
     * The speed in the y-direction.
     * @type {number}
     */
    speedY = 30;

    /**
     * The speed in the x-direction.
     * @type {number}
     */
    speedX = 20;

    /**
     * Status variable for the bottle rotation.
     * @type {boolean}
     */
    Bottleisrotating = false;

    /**
     * The images of the rotating bottle.
     * @type {Array<string>}
     */
    Images_Bottle_rotating = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * The images of the bottle splash.
     * @type {Array<string>}
     */
    Images_Bottle_splash = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The x-position of the throwable object.
     * @param {number} y - The y-position of the throwable object.
     * @param {string} direction - The direction of the throw.
     */
    constructor(x, y, direction) {
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Images_Bottle_rotating);
        this.loadImages(this.Images_Bottle_splash);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        this.offsetX = 5;
        this.offsetY = 5;
        this.offsetWidth = 30;
        this.offsetHeight = 30;
        this.throw();
    }

    /**
     * Starts the throw of the bottle.
     */
    throw() {
        if (this.Bottleisrotating) return;
        this.Bottleisrotating = true;
        this.speedY = 20;
        this.applyGravity();
        this.ThrowInterval = setInterval(() => {
            this.x += this.direction === 'left' ? -12 : 12;
            this.animateImages(this.Images_Bottle_rotating);
        }, 25);
        soundManager.playSound('throwbottle');
    }

    /**
     * Stops the rotation of the bottle.
     */
    stopRotation() {
        clearInterval(this.ThrowInterval);
        this.Bottleisrotating = false;
        this.speedY = 0;
    }

    /**
     * Starts the splash animation of the bottle.
     */
    bottleSplash() {
        this.stopRotation();
        const splashInterval = setInterval(() => {
            if (!this.Bottleisrotating) {
                this.animateImages(this.Images_Bottle_splash);
                clearInterval(splashInterval);
            }
        }, 100);
    }

    /**
     * Plays the sound of breaking glass.
     */
    playGlasSplashSound() {
        soundManager.playnormalSound('glassbottlehit');
    }
}
