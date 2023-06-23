import { MASTER_GAIN } from "./constants/audioConstants";

export class Soundcard{
    constructor(){
        this.soundEnabled = false;
        if("AudioContext" in window || "webkitAudioContext" in window){
            const audioContext = new (AudioContext || webkitAudioContext)();
            const masterGain = new GainNode(audioContext);
            masterGain.gain.value = MASTER_GAIN;
            masterGain.connect(audioContext.destination);
            let soundEnabled = false;
            let oscillator;
            Object.defineProperties(this,{
                soundEnabled: {
                    get:function (){
                        return soundEnabled;
                    },
                    set: function(value){
                        if(value === soundEnabled){
                            return;
                        }
                        soundEnabled = value;
                        if(soundEnabled){
                            oscillator =  new OscillatorNode(audioContext,{type: "square"});
                            oscillator.connect(masterGain);
                            oscillator.start();
                        }else{
                            oscillator.stop();
                        }
                    },
                },
            });
        }
    }
    enableSound(){
        this.soundEnabled = true;
    }
    disableSound(){
        this.soundEnabled = false;
    }

}