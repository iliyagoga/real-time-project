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
        if(canvasstore.getUserId()==canvasstore.getActiveId()){
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
                    type: 'rect',
                    x: this.startX,
                    y: this.startY,
                    w: this.width,
                    h: this.height,
                    colorS: toolstore._strokeColor,
                    colorF: toolstore._fillColor,
                    width: toolstore._lineWidth
                }
            }))
        }
    }
    mouseDownHandler(e){
        if(canvasstore.getUserId()==canvasstore.getActiveId()){
            this.ctx.lineWidth=toolstore._lineWidth
            this.ctx.strokeStyle=toolstore._strokeColor
            this.ctx.fillStyle=String(toolstore._fillColor)
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
            if(canvasstore.getMode()=='network'){
            this.socket.send(JSON.stringify({
                method:'start',
                id:  this.id,
                username: canvasstore.username,
            }))}
        }
    }
    mouseMoveHandler(e){
        if(canvasstore.getUserId()==canvasstore.getActiveId()){
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
                let width =currentX-this.startX
                let height =currentY-this.startY
                this.width=width
                this.height=height
                this.draw(this.startX,this.startY, width, height)
            }
        }
    }
    draw(x,y,w,h){
        const img=new Image()
        img.src=this.saved
        img.onload=()=>{
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x,y,w,h)
            this.ctx.stroke()
            this.ctx.fill()
        }

     }
     static draw2(ctx, x,y,w,h, cS,cF,width){
        ctx.beginPath()
        ctx.rect(x,y,w,h)
        ctx.lineWidth=width
        ctx.strokeStyle=cS
        ctx.fillStyle=cF
        ctx.stroke()
        ctx.fill()
        }

}
