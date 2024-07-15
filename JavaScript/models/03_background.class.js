/**
 * Repräsentiert ein Hintergrundobjekt im Spiel.
 * @extends MoveableObject
 */
class BackGroundObject extends MoveableObject {
   
    width = 720;
    height = 480;

    /**
     * Erstellt eine Instanz von BackGroundObject.
     * @param {string} path - Der Pfad zum Bild des Hintergrundobjekts.
     * @param {number} x - Die x-Position des Hintergrundobjekts.
     * @param {number} y - Die y-Position des Hintergrundobjekts.
     */
    constructor(path, x, y) {
        super().loadImg(path); // Lädt das Bild des Hintergrundobjekts
        this.x = x;
        this.y = 480 - this.height; // Setzt die y-Position des Hintergrundobjekts
    }
}
