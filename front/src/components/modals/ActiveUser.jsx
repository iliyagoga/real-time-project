import canvasstore from '../../store/canvasstore'
import  '../../styles/css/alert.css'
export default function ActiveUser(){
    return <div className="alert">
        <p>Рисует {canvasstore.getUsername()}</p>
    </div>
}