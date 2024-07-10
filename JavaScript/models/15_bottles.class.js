class CollectableBottles extends Drawableobject {
    static allBottles = []; // Speichert alle Instanzen

    constructor() { 
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.height = 40;
        this.width = 50;
        this.setPosition();
        this.collectBottleSound = new Audio('Audio/collectfbottle.mp3');
        soundManager.addSound('collectBottle', this.collectBottleSound);
    }

    setPosition() {
        let hasConflict;
        do {
            this.x = 100 + Math.random() * 1800;
            this.y = 100 + Math.random() * 150;
            hasConflict = this.checkConflict();
        } while (hasConflict);
        CollectableBottles.allBottles.push(this);
    }

    checkConflict() {
        const minDistance = 150; // Setze den gewünschten Mindestabstand
        for (let bottle of CollectableBottles.allBottles) { 
            const distance = Math.sqrt((bottle.x - this.x) ** 2 + (bottle.y - this.y) ** 2);
            if (distance < minDistance) {
                return true; // Es gibt einen Konflikt, wenn der Abstand zu klein ist
            }
        }
        return false; // Kein Konflikt gefunden
    }

    collectBottle(collectableBottles, bottlebar) {
        soundManager.playSound('collectBottle', 300);
        bottlebar.bottles += 1;
        bottlebar.setBottles(bottlebar.bottles);
        collectableBottles.splice(collectableBottles.indexOf(this), 1);
    }
}
