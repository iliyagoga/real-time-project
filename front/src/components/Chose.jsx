import { useNavigate } from 'react-router-dom'
import '../styles/css/Choose.css'
import canvasstore from '../store/canvasstore'
export default function Choose(){
    const nav=useNavigate()
    return <div className='row'>
        <button onClick={()=>{
            canvasstore.setMode('single')
            nav('/single')
        }}>Одиночное рисование</button>
        <button onClick={()=>{
            canvasstore.setMode('network')
            nav('/network')
        }}>Совместное рисование</button>
    </div>
}