/**
 * Repräsentiert die Gesundheitsleiste des Endbosses im Spiel.
 * @extends DrawableObject
 */
class Endbossbar extends DrawableObject {

    /**
     * Der Prozentsatz der Gesundheitsleiste.
     * @type {number}
     */
    percentage = 100;

    /**
     * Die Bilder der Gesundheitsleiste des Endbosses.
     * @type {Array<string>}
     */
    healthbarImages = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * Erstellt eine Instanz von Endbossbar.
     */
    constructor() {
        super();
        this.loadImages(this.healthbarImages);
        this.setPercentage(this.percentage);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Setzt den Prozentsatz der Gesundheitsleiste und aktualisiert das Bild.
     * @param {number} percentage - Der neue Prozentsatz der Gesundheitsleiste.
     */
    setPercentage(percentage) { 
        this.percentage = percentage; // Setzt den Prozentsatz
        this.updateStatusBarImage(); // Aktualisiert das Bild basierend auf dem Prozentsatz
    }

    /**
     * Aktualisiert das Bild der Gesundheitsleiste basierend auf dem Prozentsatz.
     */
    updateStatusBarImage() {
        if (this.percentage >= 100) {
            this.img = this.imageCache[this.healthbarImages[5]];
        } else if (this.percentage >= 80) {
            this.img = this.imageCache[this.healthbarImages[4]];
        } else if (this.percentage >= 60) {
            this.img = this.imageCache[this.healthbarImages[3]];
        } else if (this.percentage >= 40) {
            this.img = this.imageCache[this.healthbarImages[2]];
        } else if (this.percentage >= 20) {
            this.img = this.imageCache[this.healthbarImages[1]];
        } else {
            this.img = this.imageCache[this.healthbarImages[0]];
        }
    }
}
