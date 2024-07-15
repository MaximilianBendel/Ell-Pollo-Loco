/**
 * SoundManager ist eine Klasse zur Verwaltung von Sounds im Spiel.
 */
class SoundManager {
    /**
     * Erstellt eine Instanz von SoundManager.
     */
    constructor() {
        this.sounds = {};
        this.lastPlayTime = {};
        this.isMuted = true; // Standardmäßig auf stumm geschaltet
        this.audioContext = null;
    }

    /**
     * Initialisiert den Audio-Kontext.
     * @returns {Promise} - Ein Promise, das nach der Initialisierung aufgelöst wird.
     */
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return this.audioContext.resume();
        }
        return Promise.resolve();
    }

    /**
     * Fügt einen Sound hinzu und verbindet ihn mit dem Audio-Kontext.
     * @param {string} name - Der Name des Sounds.
     * @param {HTMLAudioElement} sound - Das Audio-Element des Sounds.
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
        this.lastPlayTime[name] = 0; // Initialisierungszeitstempel
    }

    /**
     * Spielt einen Sound ab, falls er nicht stumm geschaltet ist und die Verzögerung eingehalten wurde.
     * @param {string} name - Der Name des abzuspielenden Sounds.
     * @param {number} [delay=500] - Die Mindestverzögerung zwischen zwei Abspielvorgängen.
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
     * Spielt einen Sound ab, falls er nicht stumm geschaltet ist.
     * @param {string} name - Der Name des abzuspielenden Sounds.
     */
    playnormalSound(name) {
        if (!this.isMuted && this.sounds[name]) {
            this.sounds[name].sound.play();
        }
    }

    /**
     * Pausiert einen Sound.
     * @param {string} name - Der Name des zu pausierenden Sounds.
     */
    pauseSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].sound.pause();
        }
    }

    /**
     * Schaltet alle Sounds stumm.
     */
    muteAll() {
        this.isMuted = true;
        for (let sound in this.sounds) {
            this.sounds[sound].sound.pause();
        }
    }

    /**
     * Hebt die Stummschaltung aller Sounds auf.
     */
    unmuteAll() {
        this.isMuted = false;
    }

    /**
     * Setzt die Lautstärke eines Sounds.
     * @param {string} name - Der Name des Sounds.
     * @param {number} volume - Die neue Lautstärke.
     */
    setVolume(name, volume) {
        if (this.sounds[name]) {
            this.sounds[name].gainNode.gain.value = volume;
        }
    }

    /**
     * Setzt den Audio-Kontext fort, falls er angehalten wurde.
     * @returns {Promise} - Ein Promise, das nach dem Fortsetzen aufgelöst wird.
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
 * Lädt alle benötigten Sounds und spielt die Hintergrundmusik ab.
 */
async function loadMusic() {
    loadCharacterSounds(); // Lädt die Charakter-Sounds
    loadChickenSounds(); // Lädt die Huhn-Sounds
    loadEndbossSounds(); // Lädt die Endboss-Sounds
    loadBottleSounds(); // Lädt die Flaschen-Sounds
    loadCollectSounds(); // Lädt die Sammel-Sounds
    loadEndScreenSounds(); // Lädt die Endscreen-Sounds
    await loadBackGroundMusic();
    soundManager.playnormalSound('gamemusic'); // Spielt den Hintergrundsound ab
}

/**
 * Lädt die Sounds für den Charakter.
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
    soundManager.setVolume('walking', 1.5); // 1.5 bedeutet 150% der ursprünglichen Lautstärke (maximaler Wert ist 2)
}

/**
 * Lädt die Sounds für die Hühner.
 */
function loadChickenSounds() {
    const hitSound = new Audio('Audio/smallchickendies.mp3'); // Soundeffekt für den Treffer
    soundManager.addSound('smallchickendies', hitSound); // Registriert den Soundeffekt
}

/**
 * Lädt die Sounds für den Endboss.
 */
function loadEndbossSounds() {
    const introSound = new Audio('Audio/endbossIntroSound.mp3');
    const hurtSound = new Audio('Audio/endbosshitwithbottle.mp3');
    soundManager.addSound('endbossIntroSound', introSound);
    soundManager.addSound('endbosshitwithbottle', hurtSound);
}

/**
 * Lädt die Sounds für die Flaschen.
 */
function loadBottleSounds() {
    const throwSound = new Audio('Audio/throwbottle.mp3'); // Soundeffekt für das Werfen
    const hitBottleSound = new Audio('Audio/glassplash.mp3'); // Soundeffekt für das Treffen der Flasche
    soundManager.addSound('throwbottle', throwSound); // Registriert den Soundeffekt
    soundManager.addSound('glassbottlehit', hitBottleSound); // Registriert den Soundeffekt
}

/**
 * Lädt die Sounds für die Endbildschirme.
 */
function loadEndScreenSounds() {
    const winLevelSound = new Audio('Audio/winlevel.mp3'); // Soundeffekt für das Gewinnen des Levels
    const loseLevelSound = new Audio('Audio/loselevel.mp3'); // Soundeffekt für das Verlieren des Levels
    soundManager.addSound('winlevel', winLevelSound); // Registriert den Soundeffekt
    soundManager.addSound('loselevel', loseLevelSound); // Registriert den Soundeffekt
}

/**
 * Lädt die Hintergrundmusik.
 * @returns {Promise} - Ein Promise, das nach dem Laden der Musik aufgelöst wird.
 */
async function loadBackGroundMusic() {
    const gameMusic = new Audio('Audio/gamemusicloop.mp3'); // Hintergrundmusik
    soundManager.addSound('gamemusic', gameMusic); // Registriert den Soundeffekt
    soundManager.setVolume('gamemusic', 0.4);
}

/**
 * Lädt die Sounds für das Sammeln von Gegenständen.
 */
function loadCollectSounds() {
    const collectBottleSound = new Audio('Audio/collectfbottle.mp3');
    const collectCoinSound = new Audio('Audio/collectcoins.mp3');
    soundManager.addSound('collectBottle', collectBottleSound);
    soundManager.addSound('collectCoin', collectCoinSound);
    soundManager.setVolume('collectBottle', 1.5);
}

/**
 * Schaltet den Sound an oder aus.
 */
function toggleSound() {
    soundManager.initAudioContext().then(() => {
        if (soundManager.isMuted) {
            soundManager.unmuteAll();
            document.getElementById('toggleSoundButton').src = './img_pollo_locco/img/MusicMute.png';
            loadMusic();
        } else {
            soundManager.muteAll();
            document.getElementById('toggleSoundButton').src = './img_pollo_locco/img/MusicUnmute.png';
        }
    });
}
