/**
 * @fileoverview This script initializes and controls the game and the user interface.
 */

let canvas;
let world;
let keyboard = new Keyboard(); 
let Bosslife = false;
let startScreen, WinEndScreen;
let GamePlays = false;
let showMobileButtonsStatus = false;

/**
 * Starts the game, initializes the necessary elements, and displays the game canvas.
 */
function startGame() {
    canvas = document.getElementById('canvas'); 
    startScreen = document.getElementById('startMenuBox');
    WinEndScreen = document.getElementById('WinScreenEnd');
    WinEndScreen.classList.remove('display-block');
    startScreen.classList.add('display-none');
    canvas.classList.add('display-block');
    canvasContainer.classList.add('display-block');
    initLevel(); 
    init(); 
    GamePlays = true;
    showMobileButtonsStatus = true;
    mobileEventListener();
    controlMobileButtons();
}

/**
 * Initializes the game and the world.
 */
function init() {
    canvas = document.getElementById('canvas'); 
    world = new World(canvas, keyboard); 
}

/**
 * Restarts the game by reloading the page.
 */
function restartGame() {
    location.reload();
}

/**
 * Updates the keyboard state on keydown.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener('keydown', function (e) {
    keyboard.updateKeyState(e.key, true); 
});

/**
 * Updates the keyboard state on keyup.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener('keyup', function (e) {
    keyboard.updateKeyState(e.key, false); 
});

/**
 * Opens the keyboard menu.
 */
function openKeyboardMenu() {
    document.getElementById('startMenuBox').classList.add('display-none');
    document.getElementById('keyboardMenu').style.display = 'block';
}

/**
 * Closes the keyboard menu.
 */
function closeKeyboardMenu() {
    document.getElementById('startMenuBox').classList.remove('display-none');
    document.getElementById('keyboardMenu').style.display = 'none';
}

/**
 * Opens the Impressum information.
 */
function openImpressum() {
    document.getElementById('startMenuBox').style.display = 'none';
    document.getElementById('impressumBox').style.display = 'block';
}

/**
 * Opens the data protection information.
 */
function openDatenschutz() {
    document.getElementById('startMenuBox').style.display = 'none';
    document.getElementById('datenschutzBox').style.display = 'block';
}

/**
 * Closes the information boxes.
 */
function closeInfoBox() {
    document.getElementById('impressumBox').style.display = 'none';
    document.getElementById('datenschutzBox').style.display = 'none';
    document.getElementById('startMenuBox').style.display = 'block';
}

/**
 * Checks the device orientation and adjusts the display accordingly.
 */
function checkOrientation() {
    const rotateMessage = document.getElementById('rotateDeviceMessage');
    if (window.innerWidth <= 720 && window.innerHeight + 110 > window.innerWidth) {
        rotateMessage.style.display = 'flex';
        document.getElementById('startMenuBox').classList.add('display-none');
    } else if (GamePlays) {
        rotateMessage.style.display = 'none';
        document.getElementById('startMenuBox').classList.add('display-none');
    } else {
        rotateMessage.style.display = 'none';
        document.getElementById('startMenuBox').classList.remove('display-none');
    }
}

/**
 * Shows the mobile control buttons.
 */
function showMobileButtons() {
    if (showMobileButtonsStatus) {
        document.getElementById('leftButton').style.display = 'block';
        document.getElementById('rightButton').style.display = 'block';
        document.getElementById('jumpButton').style.display = 'block';
        document.getElementById('throwButton').style.display = 'block';
    }
}

/**
 * Hides the mobile control buttons.
 */
function hideMobileButtons() {
    if (!showMobileButtonsStatus || window.innerHeight >= 1025) {
        document.getElementById('leftButton').style.display = 'none';
        document.getElementById('rightButton').style.display = 'none';
        document.getElementById('jumpButton').style.display = 'none';
        document.getElementById('throwButton').style.display = 'none';
    }
}

/**
 * Controls the display of the mobile control buttons.
 */
function controlMobileButtons() {
    setInterval(() => {
        showMobileButtons();
        hideMobileButtons();
    }, 100);
}

/**
 * Adds event listeners for window resize and orientation change.
 */
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

/**
 * Adds event listeners for the mobile buttons.
 */
function mobileEventListener() {
    document.getElementById('leftButton').addEventListener('touchstart', () => keyboard.updateButtonState('LEFT', true));
    document.getElementById('leftButton').addEventListener('touchend', () => keyboard.updateButtonState('LEFT', false));
    document.getElementById('rightButton').addEventListener('touchstart', () => keyboard.updateButtonState('RIGHT', true));
    document.getElementById('rightButton').addEventListener('touchend', () => keyboard.updateButtonState('RIGHT', false));
    document.getElementById('jumpButton').addEventListener('touchstart', () => keyboard.updateButtonState('JUMP', true));
    document.getElementById('jumpButton').addEventListener('touchend', () => keyboard.updateButtonState('JUMP', false));
    document.getElementById('throwButton').addEventListener('touchstart', () => keyboard.updateButtonState('THROW', true));
    document.getElementById('throwButton').addEventListener('touchend', () => keyboard.updateButtonState('THROW', false));
}

/**
 * Initializes the game music and sound settings once the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('toggleSoundButtonStart');
    const canvasButton = document.getElementById('toggleSoundButtonCanvas');

    if (!soundManager.isMuted) {
        soundManager.initAudioContext().then(() => {
            loadMusic().then(() => {
                soundManager.playnormalSound('gamemusic');
            });
        });

        if (startButton) startButton.src = './img_pollo_locco/img/MusicMute.png';
        if (canvasButton) canvasButton.src = './img_pollo_locco/img/MusicMute.png';
    } else {
        if (startButton) startButton.src = './img_pollo_locco/img/MusicUnmute.png';
        if (canvasButton) canvasButton.src = './img_pollo_locco/img/MusicUnmute.png';
    }
});

