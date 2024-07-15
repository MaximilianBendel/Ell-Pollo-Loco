/**
 * Repräsentiert eine sammelbare Flasche im Spiel.
 * @extends DrawableObject
 */
class CollectableBottles extends DrawableObject {
    /**
     * Speichert alle Instanzen von CollectableBottles.
     * @type {Array<CollectableBottles>}
     */
    static allBottles = []; // Speichert alle Instanzen

    /**
     * Erstellt eine Instanz von CollectableBottles.
     * @param {number} x - Die x-Position der sammelbaren Flasche.
     * @param {number} y - Die y-Position der sammelbaren Flasche.
     */
    constructor(x, y) { 
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

    /**
     * Sammelt die Flasche ein und aktualisiert die Flaschenleiste.
     * @param {Array<CollectableBottles>} collectableBottles - Das Array der sammelbaren Flaschen.
     * @param {Bottlebar} bottlebar - Die Flaschenleiste.
     */
    collectBottle(collectableBottles, bottlebar) {
        soundManager.playSound('collectBottle', 300);
        bottlebar.bottles += 1;
        bottlebar.setBottles(bottlebar.bottles);
        collectableBottles.splice(collectableBottles.indexOf(this), 1);
    }
}
