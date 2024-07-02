class CollectableBottles extends Drawableobject {
    static allBottles = []; // Speichert alle Instanzen
    collectBottleSound = new Audio('Audio/collectfbottle.mp3');

    constructor() { 
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.height = 60;
        this.width = 50;
        this.setPosition();
    }

    setPosition() {
        let hasConflict;
        do {
            this.x = 100 + Math.random() * 1800;
            this.y = 150 + Math.random() * 100;
            hasConflict = this.checkConflict();
        } while (hasConflict);
        CollectableBottles.allBottles.push(this);
    }

    checkConflict() {
        const minDistance = 100; // Setze den gewünschten Mindestabstand
        for (let bottle of CollectableBottles.allBottles) {
            const distance = Math.sqrt((bottle.x - this.x) ** 2 + (bottle.y - this.y) ** 2);
            if (distance < minDistance) {
                return true; // Es gibt einen Konflikt, wenn der Abstand zu klein ist
            }
        }
        return false; // Kein Konflikt gefunden
    }

    collectBottle(collectableBottles, bottlebar) {
        this.playSound();
        bottlebar.bottles += 1;
        bottlebar.setBottles(bottlebar.bottles);
        collectableBottles.splice(collectableBottles.indexOf(this), 1);
    }

    playSound() {
        this.collectBottleSound.currentTime = 0; // Stellt sicher, dass das Audio von Anfang an spielt
        this.collectBottleSound.play();
        // Stoppt die Wiedergabe nach 0,5 Sekunden
        setTimeout(() => {
            this.collectBottleSound.pause();
            this.collectBottleSound.currentTime = 0; // Setzt die Zeit zurück, damit das nächste Mal von Anfang an gespielt wird
        }, 500);
    }   
    
    
    
}
