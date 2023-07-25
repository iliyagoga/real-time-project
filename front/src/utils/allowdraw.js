import canvasstore from "../store/canvasstore"

export default function allowDraw(msg){ 
        const figure=(msg.figure)
        if(canvasstore.username!=msg.username){
            canvasstore.setActive(false)
        }
}