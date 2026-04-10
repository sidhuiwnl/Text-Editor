const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let showCursor = true;

ctx.fillStyle = 'white';
ctx.font = "16px monospace";



const charWidth = ctx.measureText("M").width; //Why "M"? - Widest character in monospace → safe baseline
let lineHeight = 16 * 1.4;

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
    console.log("This is running everytime")
    ctx.clearRect(0,0,canvas.width,canvas.height);
    

    let startX = 30;
    let startY = 80;

    

    const lines = text.split("\n");

    
    lines.forEach((line, i) => {
    ctx.fillText(line, startX, startY + i * lineHeight);
    });

    let cx = startX;
    let cy = startY;

    for(let i = 0; i< cursor; i++){
        if(text[i] === '\n'){
            cy += lineHeight;
            cx = startX
        }else{
            cx += charWidth;
        }
    }

   

    if (showCursor) {
    ctx.fillRect(cx, cy - 14, 2, 18);
}
}


function getCaretPosition(line,cursor){

}

 setInterval(() => {
        showCursor = !showCursor;
        render();
    }, 500);