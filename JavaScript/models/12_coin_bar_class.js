class Coinbar extends Drawableobject {
    coins = 0;

    Images_statusbar_coins = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.Images_statusbar_coins);
        this.setCoinValue(0);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 50;
    }


    setCoinValue(coins) { 
        this.coins = coins; // Setzt die Anzahl der Münzen
        if (this.coins === 5) {
            this.img = this.imageCache[this.Images_statusbar_coins[5]]; // Setzt das Bild auf 5 Münzen  
        } else if (this.coins === 4) { 
            this.img = this.imageCache[this.Images_statusbar_coins[4]]; // Setzt das Bild auf 4 Münzen
        } else if (this.coins === 3) {
            this.img = this.imageCache[this.Images_statusbar_coins[3]]; // Setzt das Bild auf 3 Münzen
        } else if (this.coins === 2) {
            this.img = this.imageCache[this.Images_statusbar_coins[2]]; // Setzt das Bild auf 2 Münzen
        } else if (this.coins === 1) {
            this.img = this.imageCache[this.Images_statusbar_coins[1]]; // Setzt das Bild auf 1 Münze
        } else if (this.coins === 0)  {
            this.img = this.imageCache[this.Images_statusbar_coins[0]]; // Setzt das Bild auf 0 Münzen
        }
    }
}