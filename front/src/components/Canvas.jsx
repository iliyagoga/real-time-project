import {observer} from 'mobx-react-lite'
import '../styles/css/canvas.css'
import { useEffect, useRef } from 'react'
import canvasstore from '../store/canvasstore'
const  Canvas= observer(()=> {
    const canvasRef=useRef()
    useEffect(()=>{
        canvasstore.setCanvas(canvasRef.current.value)
    },[])
    return (<div className="canvas">
        <canvas  ref={canvasRef}width={window.screen.width-100} height={window.screen.height-300}></canvas>
    </div>)
  })
  
  export default Canvas;
  