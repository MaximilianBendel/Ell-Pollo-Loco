/**
 * Repräsentiert eine sammelbare Münze im Spiel.
 * @extends DrawableObject
 */
class Coins extends DrawableObject {

    /**
     * Erstellt eine Instanz von Coins.
     * @param {number} x - Die x-Position der Münze.
     * @param {number} y - Die y-Position der Münze.
     */
    constructor(x, y) {
        super().loadImg('img_pollo_locco/img/8_coin/coin_1.png');
        this.height = 80;
        this.width = 100;
        this.x = x;
        this.y = y;
        this.offsetX = 20; // Beispiel: verkleinert die Hitbox an allen Seiten
        this.offsetY = 20;
        this.offsetWidth = 40;
        this.offsetHeight = 40;
    }

    /**
     * Sammelt die Münze ein und aktualisiert die Münzleiste.
     * @param {Array<Coins>} collectableCoins - Das Array der sammelbaren Münzen.
     * @param {Coinbar} coinbar - Die Münzleiste.
     */
    collectCoin(collectableCoins, coinbar) {
        soundManager.playnormalSound('collectCoin');
        coinbar.coins += 1;
        coinbar.setCoins(coinbar.coins);
        collectableCoins.splice(collectableCoins.indexOf(this), 1);
    }
}
