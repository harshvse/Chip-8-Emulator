import { Chip8 } from "./Chip8";

const chip8 = new Chip8;
runChip8();
async function runChip8(){
    while(1){
        const hasKeyDown = chip8.keyboard.hasKeyDown();
        const isKeyDown = chip8.keyboard.isKeyDown(1);
        await chip8.sleep();
    }
}