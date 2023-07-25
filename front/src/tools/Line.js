import canvasstore from "../store/canvasstore";
import toolstore from "../store/toolstore";
import Tools from "./Tools";

export default class Line extends Tools{
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
        if(canvasstore.getMode()=='network')
        this.socket.send(JSON.stringify({
            method:'draw',
            id:  this.id,
            username: canvasstore.username,
            figure:{
                type: 'line',
                x: this.currentX,
                y: this.currentY,
                sx: this.startX,
                sy: this.startY,
                color: toolstore._strokeColor,
                width: toolstore._lineWidth
            }
        }))


    }
    mouseDownHandler(e){
        this.ctx.lineWidth=toolstore._lineWidth
        this.ctx.strokeStyle=toolstore._strokeColor
        e.preventDefault();
        this.mouseDown=true
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
            let currentY
            if(e.touches===undefined){
                currentX=e.pageX-e.target.offsetLeft
                currentY=e.pageY-e.target.offsetTop
            }
            else{
                currentX= e.changedTouches[0].clientX-e.target.offsetLeft
                currentY= e.changedTouches[0].clientY-e.target.offsetTop
            }
            this.currentX=currentX
            this.currentY=currentY
            this.draw(currentX,currentY)

    }}
    draw(cX,cY){
        const img=new Image()
        img.src=this.saved
        img.onload=()=>{
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX,this.startY)
            this.ctx.lineTo(cX,cY)
            this.ctx.stroke()
        }

     }
     static draw2(ctx,cX,cY,sX,sY, color, width){
        ctx.beginPath()
        ctx.lineWidth=width
        ctx.strokeStyle=color
        ctx.moveTo(sX,sY)
        ctx.lineTo(cX,cY)
        ctx.stroke()

     }

}
