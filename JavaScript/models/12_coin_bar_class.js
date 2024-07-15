/**
 * Repräsentiert die Münzleiste im Spiel.
 * @extends DrawableObject
 */
class Coinbar extends DrawableObject {
    /**
     * Die Anzahl der Münzen in der Leiste.
     * @type {number}
     */
    coins = 0;

    /**
     * Die Bilder der Münzleiste.
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
     * Erstellt eine Instanz von Coinbar.
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
     * Setzt die Anzahl der Münzen und aktualisiert die Bildanzeige.
     * @param {number} coins - Die Anzahl der Münzen.
     */
    setCoins(coins) {
        this.coins = coins; // Setzt die Anzahl der Münzen
        this.updateStatusBarImage(); // Aktualisiert die Bildanzeige basierend auf der Anzahl
    }

    /**
     * Aktualisiert das Bild der Münzleiste basierend auf der Anzahl der Münzen.
     */
    updateStatusBarImage() {
        if (this.coins === 10) {
            this.img = this.imageCache[this.Images_statusbar_coins[5]]; // Setzt das Bild auf 10 Münzen
        } else if (this.coins === 8) {
            this.img = this.imageCache[this.Images_statusbar_coins[4]]; // Setzt das Bild auf 8 Münzen
        } else if (this.coins === 6) {
            this.img = this.imageCache[this.Images_statusbar_coins[3]]; // Setzt das Bild auf 6 Münzen
        } else if (this.coins === 3) {
            this.img = this.imageCache[this.Images_statusbar_coins[2]]; // Setzt das Bild auf 3 Münzen
        } else if (this.coins === 2) {
            this.img = this.imageCache[this.Images_statusbar_coins[1]]; // Setzt das Bild auf 2 Münzen
        } else if (this.coins === 0) {
            this.img = this.imageCache[this.Images_statusbar_coins[0]]; // Setzt das Bild auf 0 Münzen
        }
    }
}
