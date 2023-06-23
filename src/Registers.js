import { LOAD_PROGRAM_ADDRESS } from "./constants/memoryConstants";
import { REGISTERS_COUNT, STACK_DEPTH } from "./constants/registersConstants";

export class Registers{
    constructor(){
        this.V = new Uint8Array(REGISTERS_COUNT);
        this.I = 0;   
        this.DT = 0;
        this.ST = 0;
        this.PC = LOAD_PROGRAM_ADDRESS;
        this.SP = -1;
        this.stack = new Uint16Array(STACK_DEPTH);
        this.reset();
    }
    reset(){
        this.V.fill(0);
        this.I = 0;   
        this.DT = 0;
        this.ST = 0;
        this.PC = LOAD_PROGRAM_ADDRESS;
        this.SP = -1;
        this.stack.fill(0);
    }
    stackPush(value){
        this.SP++;
        this.assertStackOverFlow();
        this.stack[this.SP] = value; 
    }
    stackPop(){
        this.assertStackUnderFlow();
        const value = this.stack[this.SP];
        this.SP--;
        return value;
    }

    assertStackUnderFlow(){
        console.assert(this.SP >=0, "[-] Stack Underflow"); 
    }
    assertStackOverFlow(){
        console.assert(this.SP < STACK_DEPTH, "[-] Stack Overflow");
    }
}