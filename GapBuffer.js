export class GapBuffer{
    constructor(initialCapacity = 256){
        this.buf = new Array(initialCapacity).fill(null);
        this.gapStart = 0;
        this.gapEnd   = initialCapacity;
    }

    get gapSize() { return this.gapEnd - this.gapStart };
    get length() { return this.buf.length - this.gapSize; };


    _grow(){
        const extra = Math.max(256,this.buf.length) // doubling the inital 256
        const newBuf  = new Array(this.buf.length + extra).fill(null); // same this.buf plus extra 256

        for(let i = 0; i < this.gapStart; i++){
            newBuf[i] = this.buf[i];   
        }

        const rightLen = this.buf.length - this.gapEnd;
        const newGapEnd = newBuf.length - rightLen;

        for(let i = 0; i < rightLen; i++){
            newBuf[newGapEnd + i] = this.buf[this.gapEnd + i];          
        }

        this.buf = newBuf;
        this.gapEnd = newGapEnd;

    }

    _moveGap(pos){
        if(pos < this.gapStart){
            while(this.gapStart > pos){
                this.gapStart --;
                this.gapEnd --;
                this.buf[this.gapEnd] = this.buf[this.gapStart]
                this.buf[this.gapStart] = null;
            }
        }else if (pos > this.gapStart){
            while (this.gapStart < pos) {
                this.buf[this.gapStart] = this.buf[this.gapEnd];
                this.buf[this.gapEnd] = null;
                this.gapStart++;
                this.gapEnd++;
            }
        }
    }

    insert(pos,char){
        if(this.gapSize === 0) this._grow();
        this._moveGap(pos);
        this.buf[this.gapStart] = char;
        this.gapStart++;
    }

    delete(pos){
        if(this.gapSize === 0) return;
        this._moveGap(pos);
        this.gapStart--;
        this.buf[this.gapStart] = null;
    }

    toString(){
        const left = this.buf.slice(0,this.gapStart);
        const right = this.buf.slice(this.gapEnd);
        return [...left, ...right].join("");
    }
}