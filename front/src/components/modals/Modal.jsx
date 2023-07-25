import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { observer } from "mobx-react-lite";
import connectHandler from "../../utils/connectHandler";
const  Modalca=observer(()=>{
    const [show, setShow] = useState(false);
    const {id}=useParams()
    const input=useRef()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        handleShow()
    },[])
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
            <Button variant="secondary" onClick={()=>{input.current.value&&connectHandler(input.current.value,handleClose,id)}}>
              Войти
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  })
  export default Modalca


