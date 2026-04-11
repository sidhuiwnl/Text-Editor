

export class History{
    constructor(){
        this.undoStack = [];
        this.redoStack = [];

    }

    push(command){
        this.undoStack.push(command);
        this.redoStack = [];
    }

    undo(gb){
        if(!this.undoStack.length) return null;

        const cmd = this.undoStack.pop();

        if(cmd.type === "insert"){
            gb._moveGap(cmd.pos + 1);
            gb.gapStart--;
            gb.buf[gb.gapStart] = null;
        }else if(cmd.type === "delete"){
            gb.insert(cmd.pos,cmd.char)
        }

        this.redoStack.push(cmd);
        return cmd;
    }

    redo(gb){
        if(!this.redoStack.length) return null;
        const cmd = this.redoStack.pop();

        if(cmd.type === "insert"){
            gb.insert(cmd.pos, cmd.char);
        }else if (cmd.type === 'delete') {
            gb._moveGap(cmd.pos);
            gb.gapStart--;
            gb.buf[gb.gapStart] = null;
            }

            this.undoStack.push(cmd);
            return cmd;
    
    }
}