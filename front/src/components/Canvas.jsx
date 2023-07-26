import {observer} from 'mobx-react-lite'
import '../styles/css/canvas.css'
import { useEffect, useRef } from 'react'
import canvasstore from '../store/canvasstore'
const  Canvas= observer(()=> {
    const canvasRef=useRef()
    useEffect(()=>{
        canvasstore.setCanvas(canvasRef.current)
    },[])
    function screenundo(){
        canvasstore.pushToUndo(canvasRef.current.toDataURL())
    }
    function connect(){
        if(canvasstore.getMode()=='network'){
            if(canvasstore.getActiveId()==canvasstore.getUserId()){
                if(canvasstore.getCClients()!=canvasstore.getActiveId()){
                    canvasstore.setActiveId(canvasstore.getUserId()+1)
                    canvasstore.getSocket().send(JSON.stringify({
                        method: 'active',
                        aid: (canvasstore.getUserId()+1),
                        id:canvasstore.getSessionid()
                }))}
                else{
                    canvasstore.setActiveId(1)
                    canvasstore.getSocket().send(JSON.stringify({
                        method: 'active',
                        aid: 1,
                        id:canvasstore.getSessionid()
                }))
                }
                }
            }
        }
    return (<div className="canvas">
        <canvas  
        onTouchStart={()=>{screenundo()}}
        onMouseDown={()=>{screenundo()}}
        onTouchEnd={()=>{connect()}}
        onMouseUp={()=>{connect()}}
        ref={canvasRef}width={window.screen.width-100} height={window.screen.height-300}></canvas>
    </div>)
  })
  
  export default Canvas;
  