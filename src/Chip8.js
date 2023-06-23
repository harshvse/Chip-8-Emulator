import { Display } from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory ";
import { Registers } from "./Registers";
import { Soundcard } from "./Soundcard";
import { CHAR_SET } from "./constants/charactersetConstants";
import { CHAR_SET_ADDRESS } from "./constants/memoryConstants";
import { TIMER_60_HZ } from "./constants/registersConstants";

export class Chip8{
    constructor(){
        this.memory = new Memory();
        this.loadCharSet();
        this.registers = new Registers();
        this.keyboard = new Keyboard();
        this.soundcard = new Soundcard();
        this.display = new Display(this.memory);

    }
    sleep(ms = TIMER_60_HZ){
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    loadCharSet(){
        this.memory.memory.set(CHAR_SET, CHAR_SET_ADDRESS);
    }
}