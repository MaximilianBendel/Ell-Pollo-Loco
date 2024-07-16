/**
 * Represents the coin bar in the game.
 * @extends DrawableObject
 */
class Coinbar extends DrawableObject {
    /**
     * The number of coins in the bar.
     * @type {number}
     */
    coins = 0;

    /**
     * The images of the coin bar.
     * @type {Array<string>}
     */
    Images_statusbar_coins = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates an instance of Coinbar.
     */
    constructor() {
        super();
        this.loadImages(this.Images_statusbar_coins);
        this.setCoins(this.coins);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the number of coins and updates the image display.
     * @param {number} coins - The number of coins.
     */
    setCoins(coins) {
        this.coins = coins;
        this.updateStatusBarImage();
    }

    /**
     * Updates the coin bar image based on the number of coins.
     */
    updateStatusBarImage() {
        if (this.coins >= 10) {
            this.img = this.imageCache[this.Images_statusbar_coins[5]];
        } else if (this.coins >= 8) {
            this.img = this.imageCache[this.Images_statusbar_coins[4]];
        } else if (this.coins >= 6) {
            this.img = this.imageCache[this.Images_statusbar_coins[3]];
        } else if (this.coins >= 3) {
            this.img = this.imageCache[this.Images_statusbar_coins[2]];
        } else if (this.coins >= 2) {
            this.img = this.imageCache[this.Images_statusbar_coins[1]];
        } else {
            this.img = this.imageCache[this.Images_statusbar_coins[0]];
        }
    }
}
