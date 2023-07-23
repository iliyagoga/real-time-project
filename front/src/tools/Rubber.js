
import canvasstore from "../store/canvasstore";
import toolstore from "../store/toolstore";
import Tools from "./Tools";

export default class Rubber extends Tools{
    c=0
    constructor(canvas,socket,id){
        super(canvas,socket,id)
        this.listen()
        
    }
    listen(){
        this.canvas.onmousemove=this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown= this.mouseDownHandler.bind(this)
        this.canvas.onmouseup=this.mouseUpHandler.bind(this)
        this.first= this.mouseDownHandler.bind(this)
        this.second=this.mouseUpHandler.bind(this)
        this.third=this.mouseMoveHandler.bind(this)
        this.canvas.addEventListener('touchstart',this.first)
        this.canvas.addEventListener('touchend',this.second)
        this.canvas.addEventListener('touchmove',this.third)
    }
    mouseUpHandler(e){
        this.mouseDown=false
        this.canvas.removeEventListener('touchend',this.second)
        this.canvas.removeEventListener('touchmove',this.third)
        this.canvas.removeEventListener('touchstart',this.first)
        

    }
    mouseDownHandler(e){
        this.c=0
        e.preventDefault();
        this.mouseDown=true
        this.ctx.beginPath()
        if(e.touches===undefined){
            this.ctx.moveTo(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop)
        }
        else{
            this.ctx.moveTo(e.changedTouches[0].clientX-e.target.offsetLeft, e.changedTouches[0].clientY-e.target.offsetTop)
        }
        
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            if(e.touches===undefined){
                this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop)
            }
            else{
                this.draw(e.changedTouches[0].clientX-e.target.offsetLeft, e.changedTouches[0].clientY-e.target.offsetTop)
            }
            this.socket.send(JSON.stringify({
                method:'draw',
                id:  this.id,
                username: canvasstore.username,
                figure:{
                    c: this.c,
                    type: 'rubber',
                    x: e.touches===undefined?e.pageX-e.target.offsetLeft:e.changedTouches[0].clientX-e.target.offsetLeft,
                    y: e.touches===undefined?e.pageY-e.target.offsetTop:e.changedTouches[0].clientY-e.target.offsetTop,
                }
            }))
        }
        this.c++

    }
    draw(x,y){
        this.ctx.lineTo(x,y) 
        this.ctx.strokeStyle='white'
        this.ctx.lineWidth=toolstore._lineWidth
        this.ctx.stroke()  

     }
    static draw2(ctx, x,y,c){
        if(c==0){
            ctx.beginPath()
            ctx.moveTo(x,y)
        }
        ctx.lineTo(x,y) 
        ctx.strokeStyle='white'
        ctx.lineWidth=toolstore._lineWidth
        ctx.stroke()  

     }


}
