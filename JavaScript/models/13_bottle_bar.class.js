class Bottlebar extends Drawableobject {
    bottles = 0;

    Images_statusbar_bottle = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.Images_statusbar_bottle);
        this.setBottles(0);
        this.x = 20;
        this.y = 85;
        this.width = 200;
        this.height = 50;
    }


    setBottles(bottles) { 
        this.bottles = bottles; // Setzt die Anzahl der Münzen
        if (this.bottles === 5) {
            this.img = this.imageCache[this.Images_statusbar_bottle[5]]; // Setzt das Bild auf 5 Münzen  
        } else if (this.bottles === 4) { 
            this.img = this.imageCache[this.Images_statusbar_bottle[4]]; // Setzt das Bild auf 4 Münzen
        } else if (this.bottles === 3) {
            this.img = this.imageCache[this.Images_statusbar_bottle[3]]; // Setzt das Bild auf 3 Münzen
        } else if (this.bottles === 2) {
            this.img = this.imageCache[this.Images_statusbar_bottle[2]]; // Setzt das Bild auf 2 Münzen
        } else if (this.bottles === 1) {
            this.img = this.imageCache[this.Images_statusbar_bottle[1]]; // Setzt das Bild auf 1 Münze
        } else if (this.bottles === 0)  {
            this.img = this.imageCache[this.Images_statusbar_bottle[0]]; // Setzt das Bild auf 0 Münzen
        }
    }
}