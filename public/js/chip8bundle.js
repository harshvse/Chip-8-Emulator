/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Chip8: () => (/* binding */ Chip8)
/* harmony export */ });
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _Memory___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _Soundcard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _constants_charactersetConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);









class Chip8{
    constructor(){
        this.memory = new _Memory___WEBPACK_IMPORTED_MODULE_2__.Memory();
        this.loadCharSet();
        this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_3__.Registers();
        this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard();
        this.soundcard = new _Soundcard__WEBPACK_IMPORTED_MODULE_4__.Soundcard();
        this.display = new _Display__WEBPACK_IMPORTED_MODULE_0__.Display(this.memory);

    }
    sleep(ms = _constants_registersConstants__WEBPACK_IMPORTED_MODULE_7__.TIMER_60_HZ){
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    loadCharSet(){
        this.memory.memory.set(_constants_charactersetConstants__WEBPACK_IMPORTED_MODULE_5__.CHAR_SET, _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_6__.CHAR_SET_ADDRESS);
    }
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Display: () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _constants_charactersetConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


class Display{
    constructor(memory){
        this.screen = document.querySelector("canvas");
        this.screen.width = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLY;
        this.screen.height = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLY;
        this.context = this.screen.getContext("2d");
        this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.BACKGROUND_COLOR;
        this.frameBuffer = []
        this.reset();
        this.memory = memory;
    }

    reset() {
        for(let i = 0; i < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT;i++){
            this.frameBuffer.push([]);
            for(let j  = 0; j < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH;j++){
                this.frameBuffer[i].push(0);
            }
        }
        this.context.fillRect(0,0,this.screen.width, this.screen.height);
        this.drawBuffer();
    }

    drawBuffer(){
        for(let h = 0; h < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT;h++){
            this.frameBuffer.push([]);
            for(let w  = 0; w < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH;w++){
                this.drawPixel(h,w,this.frameBuffer[h][w]);
            }
        }
    }

    drawPixel(h,w,value){
        if(value){
            this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.COLOR;
        }else{
            this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.BACKGROUND_COLOR;
        }
        this.context.fillRect(w * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLY,h * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLY,_constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLY,_constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLY);
    }

    drawSprite(h,w, sprite, num){
        for(let lh = 0; lh < num; lh++){
            const line = this.memory.memory[sprite+lh];
            for(let lw = 0; lw < _constants_charactersetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET_WIDTH; lw++){
                const bitToCheck = (0b10000000 >> lw)
                const value = line & bitToCheck;
                this.drawPixel(h+lh, w + lw,value);
            }
        }
    }
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHAR_SET: () => (/* binding */ CHAR_SET),
/* harmony export */   CHAR_SET_WIDTH: () => (/* binding */ CHAR_SET_WIDTH)
/* harmony export */ });
const CHAR_SET_WIDTH = 8;
const CHAR_SET = [
  0xf0,
  0x90,
  0x90,
  0x90,
  0xf0,
  0x20,
  0x60,
  0x20,
  0x20,
  0x70,
  0xf0,
  0x10,
  0xf0,
  0x80,
  0xf0,
  0xf0,
  0x10,
  0xf0,
  0x10,
  0xf0,
  0x90,
  0x90,
  0xf0,
  0x10,
  0x10,
  0xf0,
  0x80,
  0xf0,
  0x10,
  0xf0,
  0xf0,
  0x80,
  0xf0,
  0x90,
  0xf0,
  0xf0,
  0x10,
  0x20,
  0x40,
  0x40,
  0xf0,
  0x90,
  0xf0,
  0x90,
  0xf0,
  0xf0,
  0x90,
  0xf0,
  0x10,
  0xf0,
  0xf0,
  0x90,
  0xf0,
  0x90,
  0x90,
  0xe0,
  0x90,
  0xe0,
  0x90,
  0xe0,
  0xf0,
  0x80,
  0x80,
  0x80,
  0xf0,
  0xe0,
  0x90,
  0x90,
  0x90,
  0xe0,
  0xf0,
  0x80,
  0xf0,
  0x80,
  0xf0,
  0xf0,
  0x80,
  0xf0,
  0x80,
  0x80,
];

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BACKGROUND_COLOR: () => (/* binding */ BACKGROUND_COLOR),
/* harmony export */   COLOR: () => (/* binding */ COLOR),
/* harmony export */   DISPLAY_HEIGHT: () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   DISPLAY_MULTIPLY: () => (/* binding */ DISPLAY_MULTIPLY),
/* harmony export */   DISPLAY_WIDTH: () => (/* binding */ DISPLAY_WIDTH)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const DISPLAY_MULTIPLY = 10;
const BACKGROUND_COLOR = "black";
const COLOR = "#3f6";

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Keyboard: () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


class Keyboard{
    constructor(){
        this.keys = new Array(_constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.KEYCOUNT).fill(false);
        document.addEventListener("keydown", (event) => this.keyDown(event.key));
        document.addEventListener("keyup", (event) =>  this.keyUp(event.key));
    }
    keyDown(key){
        const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.KEYMAP.findIndex((mapKey) => mapKey === key.toLowerCase())
        if(keyIndex>-1){
            this.keys[keyIndex] = true;
        }
    }
    keyUp(key){
        const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.KEYMAP.findIndex((mapKey) => mapKey === key.toLowerCase())
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

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KEYCOUNT: () => (/* binding */ KEYCOUNT),
/* harmony export */   KEYMAP: () => (/* binding */ KEYMAP)
/* harmony export */ });
const KEYCOUNT = 16;
const KEYMAP = [
    "1","2","3", // 1 2 3 
    "q","w","e", // 4 5 6 
    "a","s","d", // 7 8 9 
    "z","x","c", // A 0 B 
    "4","r","f","v" // C D E F
]

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Memory: () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


class Memory{
    constructor(){
        this.memory =  new Uint8Array(_constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE);
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
        console.assert(index>=0 && index < _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE, `[-] Error: OUT OF BOUND MEMORY ACCESS, Index = ${index}`);
    }
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHAR_SET_ADDRESS: () => (/* binding */ CHAR_SET_ADDRESS),
/* harmony export */   LOAD_PROGRAM_ADDRESS: () => (/* binding */ LOAD_PROGRAM_ADDRESS),
/* harmony export */   MEMORY_SIZE: () => (/* binding */ MEMORY_SIZE)
/* harmony export */ });
const MEMORY_SIZE = 4096;
const LOAD_PROGRAM_ADDRESS = 0x200;
const CHAR_SET_ADDRESS = 0x00;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Registers: () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



class Registers{
    constructor(){
        this.V = new Uint8Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.REGISTERS_COUNT);
        this.I = 0;   
        this.DT = 0;
        this.ST = 0;
        this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS;
        this.SP = -1;
        this.stack = new Uint16Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEPTH);
        this.reset();
    }
    reset(){
        this.V.fill(0);
        this.I = 0;   
        this.DT = 0;
        this.ST = 0;
        this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS;
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
        console.assert(this.SP < _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEPTH, "[-] Stack Overflow");
    }
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REGISTERS_COUNT: () => (/* binding */ REGISTERS_COUNT),
/* harmony export */   STACK_DEPTH: () => (/* binding */ STACK_DEPTH),
/* harmony export */   TIMER_60_HZ: () => (/* binding */ TIMER_60_HZ)
/* harmony export */ });
const REGISTERS_COUNT = 16;
const STACK_DEPTH = 16;
const TIMER_60_HZ = 1000/60;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Soundcard: () => (/* binding */ Soundcard)
/* harmony export */ });
/* harmony import */ var _constants_audioConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


class Soundcard{
    constructor(){
        this.soundEnabled = false;
        if("AudioContext" in window || "webkitAudioContext" in window){
            const audioContext = new (AudioContext || webkitAudioContext)();
            const masterGain = new GainNode(audioContext);
            masterGain.gain.value = _constants_audioConstants__WEBPACK_IMPORTED_MODULE_0__.MASTER_GAIN;
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

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MASTER_GAIN: () => (/* binding */ MASTER_GAIN)
/* harmony export */ });
const MASTER_GAIN = 0.3

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chip8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8;
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

})();

/******/ })()
;