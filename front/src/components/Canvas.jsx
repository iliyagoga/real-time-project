import {observer} from 'mobx-react-lite'
import '../styles/css/canvas.css'
import { useEffect, useRef } from 'react'
import canvasstore from '../store/canvasstore'
import next from '../utils/next'
const  Canvas= observer(()=> {
    const canvasRef=useRef()
    useEffect(()=>{
        canvasstore.setCanvas(canvasRef.current)
    },[])
    function screenundo(){
        canvasstore.pushToUndo(canvasRef.current.toDataURL())
    }
    return (<div className="canvas">
        <canvas  
        onTouchStart={()=>{screenundo()}}
        onMouseDown={()=>{screenundo()}}
        onTouchEnd={()=>{next()}}
        onMouseUp={()=>{next()}}
        ref={canvasRef}width={window.screen.width-100} height={window.screen.height-300}></canvas>
    </div>)
  })
  
  export default Canvas;
  