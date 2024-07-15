/**
 * Repräsentiert den Gewinnbildschirm im Spiel.
 * @extends DrawableObject
 */
class WinScreen extends DrawableObject { 

    /**
     * Zeigt an, ob der Gewinnbildschirm angezeigt werden soll.
     * @type {boolean}
     */
    ShowWinScreen = false;

    /**
     * Das Bild des Gewinnbildschirms.
     * @type {Array<string>}
     */
    WinScreenImage = [
        'img_pollo_locco/img/9_intro_outro_screens/win/won_2.png'
    ];

    /**
     * Erstellt eine Instanz von WinScreen.
     */
    constructor() { 
        super();
        this.loadImg('img_pollo_locco/img/9_intro_outro_screens/win/won_2.png');
        this.x = 100;
        this.y = 100;
        this.height = 300;
        this.width = 500;
    }

    /**
     * Zeichnet den Gewinnbildschirm, wenn ShowWinScreen auf true gesetzt ist.
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Kontext des Canvas.
     */
    draw(ctx) {
        if (this.ShowWinScreen) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}
