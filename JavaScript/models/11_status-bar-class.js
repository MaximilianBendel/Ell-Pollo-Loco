class Statusbar extends Drawableobject {

    percentage = 100;

    Images_healthbar = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
   

    constructor() {
        super();
        this.loadImages(this.Images_healthbar);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {         // Methode zum Setzen des Prozentsatzes
        this.percentage = percentage; // Setzt den Prozentsatz

        if (this.percentage >= 100) {
            this.img = this.imageCache[this.Images_healthbar[5]]; // Setzt das Bild auf 100%
        } else if (this.percentage >= 80) {
            this.img = this.imageCache[this.Images_healthbar[4]]; // Setzt das Bild auf 80%
        } else if (this.percentage >= 60) {
            this.img = this.imageCache[this.Images_healthbar[3]]; // Setzt das Bild auf 60%
        } else if (this.percentage >= 40) {
            this.img = this.imageCache[this.Images_healthbar[2]]; // Setzt das Bild auf 40%
        } else if (this.percentage >= 20) {
            this.img = this.imageCache[this.Images_healthbar[1]]; // Setzt das Bild auf 20%
        } else {
            this.img = this.imageCache[this.Images_healthbar[0]]; // Setzt das Bild auf 0%
        }
    } 

}