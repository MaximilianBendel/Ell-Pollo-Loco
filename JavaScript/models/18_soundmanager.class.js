class SoundManager {
    constructor() {
        this.sounds = {};
        this.lastPlayTime = {};
        this.isMuted = false;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    addSound(name, sound) {
        const track = this.audioContext.createMediaElementSource(sound);
        const gainNode = this.audioContext.createGain();
        track.connect(gainNode).connect(this.audioContext.destination);

        this.sounds[name] = {
            sound: sound,
            gainNode: gainNode
        };
        this.lastPlayTime[name] = 0; // Initialisierungszeitstempel
    }

    playSound(name, delay = 500) {
        const currentTime = Date.now();
        if (!this.isMuted && this.sounds[name] && currentTime - this.lastPlayTime[name] > delay) {
            const soundObject = this.sounds[name];
            soundObject.sound.currentTime = 0; // Stellt sicher, dass das Audio von Anfang an spielt
            soundObject.sound.play();
            this.lastPlayTime[name] = currentTime; // Aktualisiert den letzten Wiedergabezeitpunkt
            // Stoppt die Wiedergabe nach 0,5 Sekunden
            setTimeout(() => {
                soundObject.sound.pause();
                soundObject.sound.currentTime = 0; // Setzt die Zeit zurück, damit das nächste Mal von Anfang an gespielt wird
            }, 500);
        }
    }

    playnormalSound(name) {
        if (!this.isMuted && this.sounds[name]) {
            this.sounds[name].sound.play();
        }
    }

    pauseSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].sound.pause();
        }
    }

    muteAll() {
        this.isMuted = true;
        for (let sound in this.sounds) {
            this.sounds[sound].sound.pause();
        }
    }

    unmuteAll() {
        this.isMuted = false;
    }

    setVolume(name, volume) {
        if (this.sounds[name]) {
            this.sounds[name].gainNode.gain.value = volume;
        }
    }
}

const soundManager = new SoundManager();

function loadMusic() {
    loadCharacterSounds(); // Lädt die Charakter-Sounds
    loadChickenSounds(); // Lädt die Huhn-Sounds
    loadEndbossSounds(); // Lädt die Endboss-Sounds
    loadBottleSounds(); // Lädt die Flaschen-Sounds
    loadEndScreenSounds(); 
    loadBackGroundMusic();
    soundManager.playnormalSound('gamemusic'); // Spielt den Hintergrundsound ab
}

function loadCharacterSounds() {
    walking_sound = new Audio('Audio/walking.mp3');
    snoring_sound = new Audio('Audio/snoring.mp3');
    soundManager.addSound('walking', walking_sound);
    soundManager.addSound('snoring', snoring_sound);
    soundManager.setVolume('walking', 5.0); // 1.5 bedeutet 150% der ursprünglichen Lautstärke (maximaler Wert ist 2)
}

function loadChickenSounds() {
    hitSound = new Audio('Audio/smallchickendies.mp3'); // Soundeffekt für den Treffer
    soundManager.addSound('smallchickendies', hitSound); // Registriert den Soundeffekt
}

function loadEndbossSounds() {
    introSound = new Audio('Audio/endbossIntroSound.mp3');
    hurtSound = new Audio('Audio/endbosshitwithbottle.mp3');
    soundManager.addSound('endbossIntroSound', introSound);
    soundManager.addSound('endbosshitwithbottle', hurtSound);
}

function loadBottleSounds() {
    throwSound = new Audio('Audio/throwbottle.mp3'); // Soundeffekt für das Werfen
    hitBottleSound = new Audio('Audio/glassplash.mp3'); // Soundeffekt für das Treffen der Flasche
    soundManager.addSound('throwbottle', throwSound); // Registriert den Soundeffekt
    soundManager.addSound('glassbottlehit', hitBottleSound); // Registriert den Sounde
}


function loadEndScreenSounds() {
    winLevelSound = new Audio('Audio/winlevel.mp3'); // Soundeffekt für das Gewinnen des Levels
    loseLevelSound = new Audio('Audio/loselevel.mp3'); // Soundeffekt für das Verlieren des Levels
    soundManager.addSound('winlevel', winLevelSound); // Registriert den Soundeffekt
    soundManager.addSound('loselevel', loseLevelSound); // Registriert den Soundeffekt
}

function loadBackGroundMusic() {
    gameMusic = new Audio('Audio/gamemusicloop.mp3'); // Hintergrundmusik
    soundManager.addSound('gamemusic', gameMusic); // Registriert den Sounde
    soundManager.setVolume('gamemusic', 0.4);
}







