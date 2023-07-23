export default class Tools{
    constructor(canvas,socket,id){
        this.canvas=canvas
        this.socket=socket
        this.id=id
        this.ctx=canvas.getContext('2d')
    }
    destroyEvents(){
        this.canvas.ommouseup=null
        this.canvas.onmousemove=null
        this.canvas.onmousedown=null
    }
}