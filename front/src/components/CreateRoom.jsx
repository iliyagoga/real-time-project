import { useNavigate } from "react-router-dom"
import canvasstore from "../store/canvasstore";
import '../styles/css/room.css'
export default function CreateRoom(){
    const nav=useNavigate()
    return <div className="room">
        <button onClick={()=>{nav('room');canvasstore.setModeRoom(true)}}>Войти в комнату</button>
    </div>
}