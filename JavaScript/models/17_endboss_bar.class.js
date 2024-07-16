/**
 * Represents the health bar of the endboss in the game.
 * @extends DrawableObject
 */
class Endbossbar extends DrawableObject {

    percentage = 100;

    /**
     * The images of the endboss's health bar.
     * @type {Array<string>}
     */
    healthbarImages = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * Creates an instance of Endbossbar.
     */
    constructor() {
        super();
        this.loadImages(this.healthbarImages);
        this.setPercentage(this.percentage);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the percentage of the health bar and updates the image.
     * @param {number} percentage - The new percentage of the health bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.updateStatusBarImage();
    }

    /**
     * Updates the health bar image based on the percentage.
     */
    updateStatusBarImage() {
        if (this.percentage >= 100) {
            this.img = this.imageCache[this.healthbarImages[5]];
        } else if (this.percentage >= 80) {
            this.img = this.imageCache[this.healthbarImages[4]];
        } else if (this.percentage >= 60) {
            this.img = this.imageCache[this.healthbarImages[3]];
        } else if (this.percentage >= 40) {
            this.img = this.imageCache[this.healthbarImages[2]];
        } else if (this.percentage >= 20) {
            this.img = this.imageCache[this.healthbarImages[1]];
        } else {
            this.img = this.imageCache[this.healthbarImages[0]];
        }
    }
}
