/**
 * Represents a collectable coin in the game.
 * @extends DrawableObject
 */
class Coins extends DrawableObject {

    /**
     * Creates an instance of Coins.
     * @param {number} x - The x-position of the coin.
     * @param {number} y - The y-position of the coin.
     */
    constructor(x, y) {
        super().loadImg('img_pollo_locco/img/8_coin/coin_1.png');
        this.height = 80;
        this.width = 100;
        this.x = x;
        this.y = y;
        this.offsetX = 20;
        this.offsetY = 20;
        this.offsetWidth = 40;
        this.offsetHeight = 40;
    }

    /**
     * Collects the coin and updates the coin bar.
     * @param {Array<Coins>} collectableCoins - The array of collectable coins.
     * @param {Coinbar} coinbar - The coin bar.
     */
    collectCoin(collectableCoins, coinbar) {
        soundManager.playnormalSound('collectCoin');
        coinbar.coins += 1;
        coinbar.setCoins(coinbar.coins);
        collectableCoins.splice(collectableCoins.indexOf(this), 1);
    }
}
