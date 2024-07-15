class CollectableBottles extends Drawableobject {
    static allBottles = []; // Speichert alle Instanzen

    constructor(x , y) { 
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.height = 40;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.offsetX = 0; // Beispiel: verkleinert die Hitbox an allen Seiten
        this.offsetY = 0;
        this.offsetWidth = 5;
        this.offsetHeight = 5;
    }

    collectBottle(collectableBottles, bottlebar) {
        soundManager.playSound('collectBottle', 300);
        bottlebar.bottles += 1;
        bottlebar.setBottles(bottlebar.bottles);
        collectableBottles.splice(collectableBottles.indexOf(this), 1);
    }
}
