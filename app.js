const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


ctx.fillStyle = 'white';

let cursorX = 30;
let cursorY = 80;

let charWidth = 6;
let lineHeight = 10;

let text = "";
let cursor = 0;


document.addEventListener('keydown',(event) => {
    if(event.key.length === 1){
       text = text.slice(0,cursor) + event.key + text.slice(cursor);
       
       cursor++;
    }else if(event.key === 'Backspace'){
        if(cursor > 0){
            text = text.slice(0,cursor - 1) + text.slice(cursor);
            cursor--;
        }
    }else if(event.key === 'Enter'){
        text = text.slice(0, cursor) + "\n" + text.slice(cursor);
        
        cursor++;
    }else if(event.key === 'ArrowLeft'){
        if(cursor > 0){
            cursor--;
        }
    }else if (event.key === 'ArrowRight'){
        if(cursor < text.length){
            cursor++;
        }
    }

    render()
})


function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let x = 30;
    let y = 80;

    for(let i = 0; i < text.length; i++){
        if(i === cursor){
            ctx.fillText("|", x, y);
            x += charWidth
        }

        if(text[i] === '\n'){
            y += lineHeight;
            x = 30;
        }else{
            ctx.fillText(text[i],x,y);
            x += charWidth;
        }

       
    }

    if (cursor === text.length) {
        ctx.fillText("|", x, y);
    }
}