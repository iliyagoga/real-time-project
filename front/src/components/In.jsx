import { observer } from "mobx-react-lite";
import canvasstore from "../store/canvasstore";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const In =observer(()=>{
    const input=useRef()
    const nav=useNavigate()
    if(canvasstore.getModeRoom())
    return <div className="line2">
        <label htmlFor="input">Введина id комнаты</label>
        <input id="input"ref={input} type="text" />
        <button onClick={()=>{nav(input.current.value)}}>Войти</button>
    </div>
    else
    return
})
export default In