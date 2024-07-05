class Endbossbar extends Drawableobject {

    percentage = 100;

    healthbarImages = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.healthbarImages);
        this.setPercentage(100);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        if (percentage >= 100) {
            this.img = this.imageCache[this.healthbarImages[5]];
        } else if (percentage >= 80) {
            this.img = this.imageCache[this.healthbarImages[4]];
        } else if (percentage >= 60) {
            this.img = this.imageCache[this.healthbarImages[3]];
        } else if (percentage >= 40) {
            this.img = this.imageCache[this.healthbarImages[2]];
        } else if (percentage >= 20) {
            this.img = this.imageCache[this.healthbarImages[1]];
        } else {
            this.img = this.imageCache[this.healthbarImages[0]];
        }
    }
}
