class SoundManager {
    constructor() {
        this.sounds = {};
        this.lastPlayTime = {};
        this.isMuted = true; // Standardmäßig auf stumm geschaltet
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
            console.error("AudioContext has not been initialized");
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
        console.log(`Attempting to play sound: ${name}`);
        const currentTime = Date.now();
        if (!this.isMuted && this.sounds[name] && currentTime - this.lastPlayTime[name] > delay) {
            const soundObject = this.sounds[name];
            soundObject.sound.currentTime = 0;
            soundObject.sound.play();
            console.log(`Sound played: ${name}`);
            this.lastPlayTime[name] = currentTime;
            setTimeout(() => {
                soundObject.sound.pause();
                soundObject.sound.currentTime = 0;
            }, 500);
        }
    }

    playnormalSound(name) {
        console.log(`Attempting to play normal sound: ${name}`);
        if (!this.isMuted && this.sounds[name]) {
            this.sounds[name].sound.play();
            console.log(`Normal sound played: ${name}`);
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

    resumeAudioContext() {
        if (this.audioContext.state === 'suspended') {
            return this.audioContext.resume().then(() => {
                console.log('AudioContext resumed');
            });
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
    loadEndScreenSounds();
    await loadBackGroundMusic();
    soundManager.playnormalSound('gamemusic'); // Spielt den Hintergrundsound ab
}

function loadCharacterSounds() {
    walking_sound = new Audio('Audio/walking.mp3');
    snoring_sound = new Audio('Audio/snoring.mp3');
    soundManager.addSound('walking', walking_sound);
    soundManager.addSound('snoring', snoring_sound);
    soundManager.setVolume('walking', 1.0); // 1.5 bedeutet 150% der ursprünglichen Lautstärke (maximaler Wert ist 2)
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

async function loadBackGroundMusic() {
    gameMusic = new Audio('Audio/gamemusicloop.mp3'); // Hintergrundmusik
    soundManager.addSound('gamemusic', gameMusic); // Registriert den Sounde
    soundManager.setVolume('gamemusic', 0.4);
}

function toggleSound() {
    console.log("Toggle sound called. Current mute status: ", soundManager.isMuted);

    soundManager.initAudioContext().then(() => {
        console.log("AudioContext initialized or resumed.");

        if (soundManager.isMuted) {
            soundManager.unmuteAll();
            document.getElementById('toggleSoundButton').src = './img_pollo_locco/img/MusicMute.png';
            console.log("Sound unmuted.");
            loadMusic();
        } else {
            soundManager.muteAll();
            document.getElementById('toggleSoundButton').src = './img_pollo_locco/img/MusicUnmute.png';
            console.log("Sound muted.");
        }
    }).catch((error) => {
        console.error('Error initializing audio context:', error);
    });
}
