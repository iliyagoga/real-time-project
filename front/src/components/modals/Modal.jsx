import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import canvasstore from "../../store/canvasstore";
import { observer } from "mobx-react-lite";
import Brush from "../../tools/Brush";
import Circle from '../../tools/Circle'
import toolstore from "../../store/toolstore";
import Rect from "../../tools/Rect";
import Line from "../../tools/Line";
import Rubber from "../../tools/Rubber";
const  Modalca=observer(()=>{
    const [show, setShow] = useState(false);
    const {id}=useParams()
    const input=useRef()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        handleShow()
    },[])
    const drawHandler=(msg)=>{    
      const figure=(msg.figure)
      const ctx= canvasstore.canvas.getContext('2d')
      console.log(msg,canvasstore.getFigId())
      if(canvasstore.username!=msg.username){
        switch(figure.type){
          case 'brush':
            Brush.draw2(ctx,figure.x, figure.y,figure.color, figure.width, figure.c)
            break
          case 'circle':
            Circle.draw2(ctx,figure.x, figure.y, figure.w)
            break
          case 'rect':
            Rect.draw2(ctx,figure.x, figure.y, figure.w, figure.h)
            break
          case 'rubber':
            Rubber.draw2(ctx,figure.x, figure.y,figure.c)
            break
          case 'line':
            Line.draw2(ctx,figure.x, figure.y, figure.sx, figure.sy)
            break
        }
      }
    }
    const connectHandler=()=>{
        if(input.current.value){
            canvasstore.setUsername(input.current.value)
            const ws=new WebSocket('ws://192.168.216.64:5000')
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
    return (
      <>
        <Modal show={show} onHide={()=>{input.current.value&&handleClose()}}>
          <Modal.Header closeButton>
          <Modal.Title>Укажите Ваше имя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text"  ref={input}style={{width: '100%',border:'1px solid grey',padding:'10px'}}/>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{input.current.value&&connectHandler()}}>
              Войти
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  })
  export default Modalca


