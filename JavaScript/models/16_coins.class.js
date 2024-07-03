class Coins extends Drawableobject {

    collectCoinSound = new Audio('Audio/collectcoins.mp3');

    constructor() {
    super().loadImg('img_pollo_locco/img/8_coin/coin_1.png');
    this.height = 80;
    this.width = 100;
    this.x = 200 + Math.random() * 1800;
    this.y = 200 + Math.random() * 150;
    }
    
    collectCoin(collectableCoins, coinbar) {
        this.playSound();
        coinbar.coins += 1;
        coinbar.setCoins(coinbar.coins);
        collectableCoins.splice(collectableCoins.indexOf(this), 1);
    }

    playSound() {
        this.collectCoinSound.currentTime = 0; // Stellt sicher, dass das Audio von Anfang an spielt
        this.collectCoinSound.play();
        // Stoppt die Wiedergabe nach 0,5 Sekunden
        setTimeout(() => {
            this.collectCoinSound.pause();
            this.collectCoinSound.currentTime = 0; // Setzt die Zeit zurück, damit das nächste Mal von Anfang an gespielt wird
        }, 500);
    } 
}