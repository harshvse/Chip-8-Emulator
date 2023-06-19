import { KEYCOUNT, KEYMAP } from "./constants/keyboardConstants";

export class Keyboard{
    constructor(){
        this.keys = new Array(KEYCOUNT).fill(false);
        document.addEventListener("keydown", (event) => this.keyDown(event.key));
        document.addEventListener("keyup", (event) =>  this.keyUp(event.key));
    }
    keyDown(key){
        const keyIndex = KEYMAP.findIndex((mapKey) => mapKey === key.toLowerCase())
        if(keyIndex>-1){
            this.keys[keyIndex] = true;
        }
    }
    keyUp(key){
        const keyIndex = KEYMAP.findIndex((mapKey) => mapKey === key.toLowerCase())
        if(keyIndex>-1){
            this.keys[keyIndex] = false;
        }
    }
    isKeyDown(index){
        return this.keys[index];
    }
    hasKeyDown(){
        return this.keys.findIndex((key) => key) != -1;
    }
}