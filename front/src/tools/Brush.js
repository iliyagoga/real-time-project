import Tools from "./Tools";

export default class Brush extends Tools{
    constructor(canvas){
        super(canvas)
        this.listen()
    }
    listen(){
        this.canvas.onmousemove=this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown= this.mouseDownHandler.bind(this)
        this.canvas.onmouseup=this.mouseUpHandler.bind(this)
    }
    mouseUpHandler(e){

    }
    mouseDownHandler(e){

    }
    mouseMoveHandler(e){

    }
}
