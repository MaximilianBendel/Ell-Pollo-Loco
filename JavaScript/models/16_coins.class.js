class Coins extends Drawableobject {


    constructor() {
        super().loadImg('img_pollo_locco/img/8_coin/coin_1.png');
        this.height = 80;
        this.width = 100;
        this.x = 200 + Math.random() * 1800;
        this.y = 200 + Math.random() * 150;
        this.collectCoinSound = new Audio('Audio/collectcoins.mp3');
        soundManager.addSound('collectCoin', this.collectCoinSound);
    }

    collectCoin(collectableCoins, coinbar) {
        soundManager.playSound('collectCoin', 300);
        coinbar.coins += 1;
        coinbar.setCoins(coinbar.coins);
        collectableCoins.splice(collectableCoins.indexOf(this), 1);
    }

    
}