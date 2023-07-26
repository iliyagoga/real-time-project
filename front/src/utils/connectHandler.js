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
              if(canvasstore.getUsername()==msg.username)
                canvasstore.setUserId(msg.c)
              canvasstore.setCClients(msg.c)
              canvasstore.setActiveId(msg.active)
              if(canvasstore.getUserId()==1){
                const data =canvasstore.getCanvas().toDataURL()
                canvasstore.getSocket().send(JSON.stringify({
                  method: 'update',
                  id: canvasstore.getSessionid(),
                  data: data

                }))
              }
              break
            case 'draw':
              drawHandler(msg, canvasstore.username)
              break
            case 'active':
              canvasstore.setActiveId(msg.aid)
              break
            case'update':
              if(canvasstore.getUsername()==input){
                const img= new Image()
                img.src=msg.data
                img.onload=()=>{
                  canvasstore.getCanvas().getContext('2d').drawImage(img,0,0,canvasstore.getCanvas().width,canvasstore.getCanvas().height)
                }  
              }
          }
        }
        handleClose()
    }

}
export default connectHandler