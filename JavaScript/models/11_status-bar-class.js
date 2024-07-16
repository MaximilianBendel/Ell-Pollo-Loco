/**
 * Represents the status bar in the game.
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject {

    /**
     * The percentage of the status bar.
     * @type {number}
     */
    percentage = 100;

    /**
     * The images of the health bar.
     * @type {Array<string>}
     */
    Images_healthbar = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Creates an instance of Statusbar.
     */
    constructor() {
        super();
        this.loadImages(this.Images_healthbar);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the percentage of the status bar and updates the image.
     * @param {number} percentage - The new percentage of the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        if (this.percentage >= 100) {
            this.img = this.imageCache[this.Images_healthbar[5]];
        } else if (this.percentage >= 80) {
            this.img = this.imageCache[this.Images_healthbar[4]];
        } else if (this.percentage >= 60) {
            this.img = this.imageCache[this.Images_healthbar[3]];
        } else if (this.percentage >= 40) {
            this.img = this.imageCache[this.Images_healthbar[2]];
        } else if (this.percentage >= 20) {
            this.img = this.imageCache[this.Images_healthbar[1]];
        } else {
            this.img = this.imageCache[this.Images_healthbar[0]];
        }
    }
}
