import { Chip8 } from "./Chip8";

const chip8 = new Chip8;
async function runChip8(){
    chip8.registers.ST = 10;
    while(1){
        await chip8.sleep(200);
        if(chip8.registers.DT > 0){
            await chip8.sleep();
            chip8.registers.DT--;
        }
        if(chip8.registers.ST > 0){
            chip8.soundcard.enableSound();
            await chip8.sleep();
            chip8.registers.ST--;
            console.log(chip8.registers.ST);
        }
        if(chip8.registers.ST === 0){
            chip8.soundcard.disableSound();
        }
    }
}


runChip8();
