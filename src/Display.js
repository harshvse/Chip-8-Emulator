import { CHAR_SET_WIDTH } from "./constants/charactersetConstants";
import {BACKGROUND_COLOR, COLOR, DISPLAY_HEIGHT, DISPLAY_MULTIPLY, DISPLAY_WIDTH} from "./constants/displayConstants"
export class Display{
    constructor(memory){
        this.screen = document.querySelector("canvas");
        this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLY;
        this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLY;
        this.context = this.screen.getContext("2d");
        this.context.fillStyle = BACKGROUND_COLOR;
        this.frameBuffer = []
        this.reset();
        this.memory = memory;
    }

    reset() {
        for(let i = 0; i < DISPLAY_HEIGHT;i++){
            this.frameBuffer.push([]);
            for(let j  = 0; j < DISPLAY_WIDTH;j++){
                this.frameBuffer[i].push(0);
            }
        }
        this.context.fillRect(0,0,this.screen.width, this.screen.height);
        this.drawBuffer();
    }

    drawBuffer(){
        for(let h = 0; h < DISPLAY_HEIGHT;h++){
            this.frameBuffer.push([]);
            for(let w  = 0; w < DISPLAY_WIDTH;w++){
                this.drawPixel(h,w,this.frameBuffer[h][w]);
            }
        }
    }

    drawPixel(h,w,value){
        if(value){
            this.context.fillStyle = COLOR;
        }else{
            this.context.fillStyle = BACKGROUND_COLOR;
        }
        this.context.fillRect(w * DISPLAY_MULTIPLY,h * DISPLAY_MULTIPLY,DISPLAY_MULTIPLY,DISPLAY_MULTIPLY);
    }

    drawSprite(h,w, sprite, num){
        for(let lh = 0; lh < num; lh++){
            const line = this.memory.memory[sprite+lh];
            for(let lw = 0; lw < CHAR_SET_WIDTH; lw++){
                const bitToCheck = (0b10000000 >> lw)
                const value = line & bitToCheck;
                this.drawPixel(h+lh, w + lw,value);
            }
        }
    }
}