/**
 * Repräsentiert die Flaschenleiste im Spiel.
 * @extends DrawableObject
 */
class Bottlebar extends DrawableObject {
    /**
     * Die Anzahl der Flaschen in der Leiste.
     * @type {number}
     */
    bottles = 0;

    /**
     * Die Bilder der Flaschenleiste.
     * @type {Array<string>}
     */
    Images_statusbar_bottle = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * Erstellt eine Instanz von Bottlebar.
     */
    constructor() {
        super();
        this.loadImages(this.Images_statusbar_bottle);
        this.setBottles(this.bottles);
        this.x = 20;
        this.y = 85;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Setzt die Anzahl der Flaschen und aktualisiert die Bildanzeige.
     * @param {number} bottles - Die Anzahl der Flaschen.
     */
    setBottles(bottles) {
        this.bottles = bottles; // Setzt die Anzahl der Flaschen
        this.updateStatusBarImage(); // Aktualisiert die Bildanzeige basierend auf der Anzahl
    }
    
    /**
     * Aktualisiert das Bild der Flaschenleiste basierend auf der Anzahl der Flaschen.
     */
    updateStatusBarImage() {
        if (this.bottles === 10) {
            this.img = this.imageCache[this.Images_statusbar_bottle[5]]; 
        } else if (this.bottles >= 8) { 
            this.img = this.imageCache[this.Images_statusbar_bottle[4]];
        } else if (this.bottles >= 6) {
            this.img = this.imageCache[this.Images_statusbar_bottle[3]]; 
        } else if (this.bottles >= 4) {
            this.img = this.imageCache[this.Images_statusbar_bottle[2]]; 
        } else if (this.bottles >= 2) {
            this.img = this.imageCache[this.Images_statusbar_bottle[1]]; 
        } else {
            this.img = this.imageCache[this.Images_statusbar_bottle[0]]; 
        }
    }
}
