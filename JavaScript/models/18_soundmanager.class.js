class SoundManager {
    constructor() {
        this.sounds = {};
        this.lastPlayTime = {};
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false; // Standardmäßig nicht stummgeschaltet
        this.audioContext = null;
    }

    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return this.audioContext.resume();
        }
        return Promise.resolve();
    }

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
        localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
        for (let sound in this.sounds) {
            this.sounds[sound].sound.pause();
        }
    }

    unmuteAll() {
        this.isMuted = false;
        localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
    }

    setVolume(name, volume) {
        if (this.sounds[name]) {
            this.sounds[name].gainNode.gain.value = volume;
        }
    }

    resumeAudioContext() {
        if (this.audioContext.state === 'suspended') {
            return this.audioContext.resume();
        } else {
            return Promise.resolve();
        }
    }
}

const soundManager = new SoundManager();

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

function loadChickenSounds() {
    const hitSound = new Audio('Audio/smallchickendies.mp3'); // Soundeffekt für den Treffer
    soundManager.addSound('smallchickendies', hitSound); // Registriert den Soundeffekt
}

function loadEndbossSounds() {
    const introSound = new Audio('Audio/endbossIntroSound.mp3');
    const hurtSound = new Audio('Audio/endbosshitwithbottle.mp3');
    soundManager.addSound('endbossIntroSound', introSound);
    soundManager.addSound('endbosshitwithbottle', hurtSound);
}

function loadBottleSounds() {
    const throwSound = new Audio('Audio/throwbottle.mp3'); // Soundeffekt für das Werfen
    const hitBottleSound = new Audio('Audio/glassplash.mp3'); // Soundeffekt für das Treffen der Flasche
    soundManager.addSound('throwbottle', throwSound); // Registriert den Soundeffekt
    soundManager.addSound('glassbottlehit', hitBottleSound); // Registriert den Soundeffekt
}

function loadEndScreenSounds() {
    const winLevelSound = new Audio('Audio/winlevel.mp3'); // Soundeffekt für das Gewinnen des Levels
    const loseLevelSound = new Audio('Audio/loselevel.mp3'); // Soundeffekt für das Verlieren des Levels
    soundManager.addSound('winlevel', winLevelSound); // Registriert den Soundeffekt
    soundManager.addSound('loselevel', loseLevelSound); // Registriert den Soundeffekt
}

async function loadBackGroundMusic() {
    const gameMusic = new Audio('Audio/gamemusicloop.mp3'); // Hintergrundmusik
    soundManager.addSound('gamemusic', gameMusic); // Registriert den Soundeffekt
    soundManager.setVolume('gamemusic', 0.4);
}

function loadCollectSounds() {
    const collectBottleSound = new Audio('Audio/collectfbottle.mp3');
    const collectCoinSound = new Audio('Audio/collectcoins.mp3');
    soundManager.addSound('collectBottle', collectBottleSound);
    soundManager.addSound('collectCoin', collectCoinSound);
    soundManager.setVolume('collectBottle', 1.5);
}

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
