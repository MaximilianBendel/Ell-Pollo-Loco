/**
 * Class that manages keyboard and mobile control inputs.
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
     * Updates the state of keyboard inputs.
     * 
     * @param {string} key - The name of the key.
     * @param {boolean} isPressed - The state of the key (pressed or not pressed).
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
     * Updates the state of mobile control inputs.
     * 
     * @param {string} button - The name of the button.
     * @param {boolean} isPressed - The state of the button (pressed or not pressed).
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
