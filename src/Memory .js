import { MEMORY_SIZE } from "./constants/memoryConstants";

export class Memory{
    constructor(){
        this.memory =  new Uint8Array(MEMORY_SIZE);
        this.reset();
    }
    reset(){
        this.memory.fill(0);
    }
    writeMemory(index,value){
        this.assertMemory(index);
        this.memory[index] = value;
    }
    readMemory(index){
        this.assertMemory(index);
        return this.memory[index];
    }

    assertMemory(index){
        console.assert(index>=0 && index < MEMORY_SIZE, `[-] Error: OUT OF BOUND MEMORY ACCESS, Index = ${index}`);
    }
}