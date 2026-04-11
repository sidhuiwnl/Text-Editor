import { GapBuffer } from './GapBuffer.js';

const textCanvas   = document.getElementById('textCanvas');
const cursorCanvas = document.getElementById('cursorCanvas');
const textCtx      = textCanvas.getContext('2d');
const cursorCtx    = cursorCanvas.getContext('2d');

const FONT         = '16px monospace';
const START_X      = 30;
const START_Y      = 80;
const LINE_HEIGHT  = 16 * 1.4;







function applyStyles() {
  textCtx.fillStyle   = 'white';
  textCtx.font        = FONT;
  cursorCtx.fillStyle = 'white';
  cursorCtx.font      = FONT;
}

function setSize() {
  textCanvas.width    = window.innerWidth;
  textCanvas.height   = window.innerHeight;
  cursorCanvas.width  = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
  applyStyles(); // canvas resets font/fillStyle on resize — always reapply
}

setSize();




const charWidth = textCtx.measureText('M').width; //Why "M"? - Widest character in monospace → safe baseline
const HANDLED_KEYS = ['Backspace','Enter','Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];


const gb = new GapBuffer();

let text       = '';
let cursor     = 0;
let showCursor = true;







document.addEventListener('keydown',(event) => {

    if(event.key.length === 1 || HANDLED_KEYS.includes(event.key)){
         event.preventDefault();
    }


    if(event.key.length === 1){
       gb.insert(cursor,event.key);
       cursor++;
    }else if(event.key === 'Backspace'){
       gb.delete(cursor);
       if (cursor > 0) cursor--;
    }else if(event.key === 'Enter'){
        gb.insert(cursor, '\n');
        cursor++;
    }else if(event.key === 'ArrowLeft'){
        if(cursor > 0){
            cursor--;
        }
    }else if (event.key === 'ArrowRight'){
        if(cursor < gb.length){
            cursor++;
        }
    }

    showCursor = true; // reset blink so cursor is always visible while typing
    text = gb.toString(); 
    renderText();
    renderCursor();
})



function renderText(){
    textCtx.clearRect(0,0,textCanvas.width,textCanvas.height);
    const lines = text.split("\n");

    lines.forEach((line,i) => {
        textCtx.fillText(line,START_X,START_Y + i * LINE_HEIGHT)
    })

    console.log("The text",text)
}


function renderCursor(){
    cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

    if(!showCursor ) return;

    const {line,col} = getCaretPosition(text,cursor);

    const cx = START_X + col * charWidth;
    const cy = START_Y + line * LINE_HEIGHT;
    cursorCtx.fillRect(cx, cy - 14, 2, 18);
}

function getCaretPosition(text,cursor){
    
    let line = 0, col = 0;

    for(let i = 0; i < cursor; i++){
        if(text[i] === '\n'){ line ++, col = 0}
        else col ++;
    }

    return {line,col}

}

setInterval(() => {
    showCursor = !showCursor;
    renderCursor();
}, 500);


window.addEventListener('resize', () => {
  setSize();
  text = gb.toString();
  renderText();
  renderCursor();
});






