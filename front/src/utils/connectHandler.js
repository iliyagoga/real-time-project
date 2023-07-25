import { observer } from "mobx-react-lite"
import drawHandler from "./drawHandler"
import canvasstore from "../store/canvasstore";
import allowDraw from "./allowdraw";
import { config } from "../config";
const connectHandler=(input,handleClose,id)=>{
    if(input){
        canvasstore.setUsername(input)
        const ws=new WebSocket('ws://'+config.ip+':'+config.port)
        canvasstore.setSessionid(id)
        canvasstore.setSocket(ws)
        ws.onopen=()=>{
            ws.send(JSON.stringify({
                id,
                username: canvasstore.username,
                method: 'connection'
            }))
            console.log('Подключение установлено')
        }
        ws.onmessage=(e)=>{
          let msg=JSON.parse(e.data)
          switch(msg.method){
            case 'connection':
              canvasstore.setClients(msg.username)
              break
            case 'draw':
              drawHandler(msg, canvasstore.username)


          }
        }
        handleClose()
    }

}
export default connectHandler