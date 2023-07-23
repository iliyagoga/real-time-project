import canvasstore from "../store/canvasstore";
import toolstore from "../store/toolstore";
import Tools from "./Tools";

export default class Rect extends Tools{
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
        this.socket.send(JSON.stringify({
            method:'draw',
            id:  this.id,
            username: canvasstore.username,
            figure:{
                type: 'circle',
                x: this.startX,
                y: this.startY,
                w: Math.abs(this.width)
            }
        }))
        

    }
    mouseDownHandler(e){
        this.ctx.lineWidth=toolstore._lineWidth
        this.ctx.strokeStyle=toolstore._strokeColor
        this.ctx.fillStyle=toolstore._fillColor
        e.preventDefault();
        this.mouseDown=true
        this.ctx.beginPath()
        if(e.touches===undefined){
            this.startX=e.pageX-e.target.offsetLeft
            this.startY=e.pageY-e.target.offsetTop
        }
        else{
            this.startX= e.changedTouches[0].clientX-e.target.offsetLeft
            this.startY= e.changedTouches[0].clientY-e.target.offsetTop
        }
        this.saved=this.canvas.toDataURL()
        
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            let currentX
            if(e.touches===undefined){
                currentX=e.pageX-e.target.offsetLeft
            }
            else{
                currentX= e.changedTouches[0].clientX-e.target.offsetLeft
            }
            let width =currentX-this.startX
            this.width=width
            this.draw(this.startX,this.startY, width)
        }
        

    }
    draw(x,y,w){
        const img=new Image()
        img.src=this.saved
        img.onload=()=>{
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, Math.abs(w), 0, 2 * Math.PI, false)
            this.ctx.stroke()
            this.ctx.fill()
        }

     }
    static draw2(ctx, x,y,w){
        ctx.beginPath()
        ctx.arc(x, y, Math.abs(w), 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fill()

     }

}
