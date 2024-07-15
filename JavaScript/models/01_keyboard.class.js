/**
 * Klasse, die die Tastatur- und mobile Steuerungseingaben verwaltet.
 */
class Keyboard {
    constructor() {
        this.LEFT = false;
        this.A = false;
        this.RIGHT = false;
        this.D = false;
        this.UP = false;
        this.SPACE = false;
        this.F = false;
        this.C = false;
        this.LEFT_BTN = false;
        this.RIGHT_BTN = false;
        this.JUMP_BTN = false;
        this.THROW_BTN = false;
    }

    /**
     * Aktualisiert den Zustand der Tastatureingaben.
     * 
     * @param {string} key - Der Name der Taste.
     * @param {boolean} isPressed - Der Zustand der Taste (gedrückt oder nicht gedrückt).
     */
    updateKeyState(key, isPressed) {
        switch (key) {
            case 'ArrowLeft':
                this.LEFT = isPressed;
                break;
            case 'ArrowRight':
                this.RIGHT = isPressed;
                break;
            case 'ArrowUp':
                this.UP = isPressed;
                break;
            case ' ':
                this.SPACE = isPressed;
                break;
            case 'f':
            case 'F':
                this.F = isPressed;
                break;
            case 'a':
            case 'A':
                this.A = isPressed;
                break;
            case 'd':
            case 'D':
                this.D = isPressed;
                break;
            case 'c':
            case 'C':
                this.C = isPressed;
                break;
            default:
                break;
        }
    }

    /**
     * Aktualisiert den Zustand der mobilen Steuereingaben.
     * 
     * @param {string} button - Der Name der Taste.
     * @param {boolean} isPressed - Der Zustand der Taste (gedrückt oder nicht gedrückt).
     */
    updateButtonState(button, isPressed) {
        switch (button) {
            case 'LEFT':
                this.LEFT_BTN = isPressed;
                break;
            case 'RIGHT':
                this.RIGHT_BTN = isPressed;
                break;
            case 'JUMP':
                this.JUMP_BTN = isPressed;
                break;
            case 'THROW':
                this.THROW_BTN = isPressed;
                break;
            default:
                break;
        }
    }
}
