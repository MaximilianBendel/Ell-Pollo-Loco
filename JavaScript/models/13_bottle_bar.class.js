/**
 * Represents the bottle bar in the game.
 * @extends DrawableObject
 */
class Bottlebar extends DrawableObject {
    /**
     * The number of bottles in the bar.
     * @type {number}
     */
    bottles = 0;

    /**
     * The images of the bottle bar.
     * @type {Array<string>}
     */
    Images_statusbar_bottle = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * Creates an instance of Bottlebar.
     */
    constructor() {
        super();
        this.loadImages(this.Images_statusbar_bottle);
        this.setBottles(this.bottles);
        this.x = 20;
        this.y = 85;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the number of bottles and updates the image display.
     * @param {number} bottles - The number of bottles.
     */
    setBottles(bottles) {
        this.bottles = bottles;
        this.updateStatusBarImage();
    }
    
    /**
     * Updates the bottle bar image based on the number of bottles.
     */
    updateStatusBarImage() {
        if (this.bottles >= 10) {
            this.img = this.imageCache[this.Images_statusbar_bottle[5]];
        } else if (this.bottles >= 8) {
            this.img = this.imageCache[this.Images_statusbar_bottle[4]];
        } else if (this.bottles >= 6) {
            this.img = this.imageCache[this.Images_statusbar_bottle[3]];
        } else if (this.bottles >= 4) {
            this.img = this.imageCache[this.Images_statusbar_bottle[2]];
        } else if (this.bottles >= 2) {
            this.img = this.imageCache[this.Images_statusbar_bottle[1]];
        } else {
            this.img = this.imageCache[this.Images_statusbar_bottle[0]];
        }
    }
}
