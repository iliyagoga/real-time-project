import { observer } from "mobx-react-lite"
import drawHandler from "./drawHandler"
import canvasstore from "../store/canvasstore";
import allowDraw from "./allowdraw";
import { config } from "../config";
import next from "./next";
const connectHandler=(input,handleClose,id)=>{
    if(input){
        canvasstore.setUsername(input)
        const ws=new WebSocket('ws://'+config.ip+':'+config.port)
        canvasstore.setSessionid(id)
        canvasstore.setSocket(ws)
        var r;
        ws.onopen=()=>{
            ws.send(JSON.stringify({
                id,
                username: canvasstore.username,
                method: 'connection'
            }))
            console.log('Подключение установлено')
            setInterval(() => {
              
            },);
        }

        window.onbeforeunload=()=>{
          ws.send(JSON.stringify({
            method:'leave',
            id: canvasstore.getSessionid(),
            idu: canvasstore.getUserId()
          }))
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
              if(canvasstore.getActiveId()==canvasstore.getUserId()){
                   r = setTimeout(() => {
                      next()
                      clearTimeout(r)
                  }, 30000);
                }
              break
            case 'update':
              if(canvasstore.getUsername()==input){
                const img= new Image()
                img.src=msg.data
                img.onload=()=>{
                  canvasstore.getCanvas().getContext('2d').drawImage(img,0,0,canvasstore.getCanvas().width,canvasstore.getCanvas().height)
                }  
              }
              break
            case 'leave':
              if(msg.idu< canvasstore.getUserId()){
                canvasstore.setUserId(canvasstore.getUserId()-1)
              }
              canvasstore.setCClients(canvasstore.getCClients()-1)
              if(canvasstore.getActiveId()>=canvasstore.getCClients()){
                canvasstore.setActiveId(1)
              }
              else{
                canvasstore.setActiveId(canvasstore.getActiveId()+1)
              }
              console.log(canvasstore.getUserId(),canvasstore.getActiveId(),canvasstore.getCClients(),canvasstore.getClients())
              

              
          }
        }
        handleClose()
    }

}
export default connectHandler