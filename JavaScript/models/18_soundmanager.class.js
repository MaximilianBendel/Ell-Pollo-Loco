/**
 * Manages sound effects and background music for the game.
 */
class SoundManager {
    constructor() {
        this.sounds = {};
        this.lastPlayTime = {};
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || true;
        this.audioContext = null;
    }

    /**
     * Initializes the audio context.
     * @returns {Promise} A promise that resolves when the audio context is resumed.
     */
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return this.audioContext.resume();
        }
        return Promise.resolve();
    }

    /**
     * Adds a sound to the sound manager.
     * @param {string} name - The name of the sound.
     * @param {HTMLAudioElement} sound - The sound element.
     */
    addSound(name, sound) {
        if (!this.audioContext) {
            return;
        }
        const track = this.audioContext.createMediaElementSource(sound);
        const gainNode = this.audioContext.createGain();
        track.connect(gainNode).connect(this.audioContext.destination);

        this.sounds[name] = {
            sound: sound,
            gainNode: gainNode
        };
        this.lastPlayTime[name] = 0;
    }

    /**
     * Plays a sound with an optional delay.
     * @param {string} name - The name of the sound.
     * @param {number} [delay=500] - The delay between plays in milliseconds.
     */
    playSound(name, delay = 500) {
        const currentTime = Date.now();
        if (!this.isMuted && this.sounds[name] && currentTime - this.lastPlayTime[name] > delay) {
            const soundObject = this.sounds[name];
            soundObject.sound.currentTime = 0;
            soundObject.sound.play();
            this.lastPlayTime[name] = currentTime;
            setTimeout(() => {
                soundObject.sound.pause();
                soundObject.sound.currentTime = 0;
            }, 500);
        }
    }

    /**
     * Plays a sound without any delay.
     * @param {string} name - The name of the sound.
     */
    playnormalSound(name) {
        if (!this.isMuted && this.sounds[name]) {
            this.sounds[name].sound.play();
        }
    }

    /**
     * Pauses a sound.
     * @param {string} name - The name of the sound.
     */
    pauseSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].sound.pause();
        }
    }

    /**
     * Mutes all sounds.
     */
    muteAll() {
        this.isMuted = true;
        localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
        for (let sound in this.sounds) {
            this.sounds[sound].sound.pause();
        }
    }

    /**
     * Unmutes all sounds.
     */
    unmuteAll() {
        this.isMuted = false;
        localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
    }

    /**
     * Sets the volume of a sound.
     * @param {string} name - The name of the sound.
     * @param {number} volume - The volume level (0.0 to 1.0).
     */
    setVolume(name, volume) {
        if (this.sounds[name]) {
            this.sounds[name].gainNode.gain.value = volume;
        }
    }

    /**
     * Resumes the audio context if it is suspended.
     * @returns {Promise} A promise that resolves when the audio context is resumed.
     */
    resumeAudioContext() {
        if (this.audioContext.state === 'suspended') {
            return this.audioContext.resume();
        } else {
            return Promise.resolve();
        }
    }
}

const soundManager = new SoundManager();

/**
 * Loads and initializes all game sounds.
 */
async function loadMusic() {
    loadCharacterSounds();
    loadChickenSounds();
    loadEndbossSounds();
    loadBottleSounds();
    loadCollectSounds();
    loadEndScreenSounds();
    await loadBackGroundMusic();
    soundManager.playnormalSound('gamemusic');
}

/**
 * Loads character-related sounds.
 */
function loadCharacterSounds() {
    const jump_sound = new Audio('Audio/jumping.mp3');
    const hurt_sound = new Audio('Audio/hurtpepe.mp3');
    const walking_sound = new Audio('Audio/walking.mp3');
    const snoring_sound = new Audio('Audio/snoring.mp3');
    soundManager.addSound('jumping', jump_sound);
    soundManager.addSound('hurt', hurt_sound);
    soundManager.addSound('walking', walking_sound);
    soundManager.addSound('snoring', snoring_sound);
    soundManager.setVolume('walking', 1.5);
}

/**
 * Loads chicken-related sounds.
 */
function loadChickenSounds() {
    const hitSound = new Audio('Audio/smallchickendies.mp3');
    soundManager.addSound('smallchickendies', hitSound);
}

/**
 * Loads endboss-related sounds.
 */
function loadEndbossSounds() {
    const introSound = new Audio('Audio/endbossIntroSound.mp3');
    const hurtSound = new Audio('Audio/endbosshitwithbottle.mp3');
    soundManager.addSound('endbossIntroSound', introSound);
    soundManager.addSound('endbosshitwithbottle', hurtSound);
}

/**
 * Loads bottle-related sounds.
 */
function loadBottleSounds() {
    const throwSound = new Audio('Audio/throwbottle.mp3');
    const hitBottleSound = new Audio('Audio/glassplash.mp3');
    soundManager.addSound('throwbottle', throwSound);
    soundManager.addSound('glassbottlehit', hitBottleSound);
}

/**
 * Loads end screen-related sounds.
 */
function loadEndScreenSounds() {
    const winLevelSound = new Audio('Audio/winlevel.mp3');
    const loseLevelSound = new Audio('Audio/loselevel.mp3');
    soundManager.addSound('winlevel', winLevelSound);
    soundManager.addSound('loselevel', loseLevelSound);
}

/**
 * Loads background music.
 * @returns {Promise} A promise that resolves when the background music is loaded.
 */
async function loadBackGroundMusic() {
    const gameMusic = new Audio('Audio/gamemusicloop.mp3');
    soundManager.addSound('gamemusic', gameMusic);
    soundManager.setVolume('gamemusic', 0.4);
}

/**
 * Loads sounds for collecting items.
 */
function loadCollectSounds() {
    const collectBottleSound = new Audio('Audio/collectfbottle.mp3');
    const collectCoinSound = new Audio('Audio/collectcoins.mp3');
    soundManager.addSound('collectBottle', collectBottleSound);
    soundManager.addSound('collectCoin', collectCoinSound);
    soundManager.setVolume('collectBottle', 1.5);
}

/**
 * Toggles sound on and off.
 */
function toggleSound() {
    soundManager.initAudioContext().then(() => {
        const startButton = document.getElementById('toggleSoundButtonStart');
        const canvasButton = document.getElementById('toggleSoundButtonCanvas');
        
        if (soundManager.isMuted) {
            soundManager.unmuteAll();
            if (startButton) startButton.src = './img_pollo_locco/img/MusicMute.png';
            if (canvasButton) canvasButton.src = './img_pollo_locco/img/MusicMute.png';
            loadMusic();
        } else {
            soundManager.muteAll();
            if (startButton) startButton.src = './img_pollo_locco/img/MusicUnmute.png';
            if (canvasButton) canvasButton.src = './img_pollo_locco/img/MusicUnmute.png';
        }
    });
}
