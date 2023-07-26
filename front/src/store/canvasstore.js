import {makeAutoObservable} from 'mobx'
class Canvasstore{
    _canvas=null
    userid=1
    activeId=null
    cclients=null
    socket=null
    sessionid=null
    clients=[]
    redolist=[]
    undolist=[]
    username=''
    figId=''
    mode=''
    modeRoom=false
    constructor(){
        makeAutoObservable(this)
        
    }
    getCClients(){
        return this.cclients
    }
    setCClients(c){
        this.cclients=c
    }
    getActiveId(){
        return this.activeId
    }
    setActiveId(id){
        this.activeId=id
    }
    getUserId(){
        return this.userid
    }
    setUserId(id){
        this.userid=id

    }
    getCanvas(){
        return this._canvas
    }
    getMode(){
        return this.mode
    }
    getModeRoom(){
        return this.modeRoom
    }
    getClients(){
        return this.clients
    }
    getFigId(){
        return this.figId
    }
    pushToUndo(data){
        this.undolist.push(data)
    }
    pushToRedo(data){
        this.redolist.push(data)
    }
    getUsername(){
        return this.username
    }
    getSessionid(){
        return this.sessionid
    }
    getSocket(){
        return this.socket
    }
    setCanvas(canvas){
        this._canvas=canvas

    }
    setModeRoom(modeRoom){
        this.modeRoom=modeRoom
    }
    setMode(mode){
        this.mode=mode
    }
    setFigId(figId){
        this.figId=figId
    }
    setClients(client){
        this.clients.push(client)
    }
    setAllClients(client){
        this.clients=client
    }
    setUsername(username){
        this.username =username
    }
    setSessionid(id){
        this.sessionid =id
    }
    setSocket(socket){
        return this.socket=socket
    }
    undo(){
        if(this.undolist.length>0){
            let last=this.undolist.pop()
            this.redolist.push(this.canvas.toDataURL())
            let img=new Image()
            img.src=last
            img.onload=()=>{
                this.canvas.getContext('2d').clearRect(0,0,this.canvas.width,this.canvas.height)
                this.canvas.getContext('2d').drawImage(img,0,0,this.canvas.width,this.canvas.height)
            }
        }else{
            this.canvas.getContext('2d').clearRect(0,0,this.canvas.width,this.canvas.height)
        }
    }
    redo(){
        if(this.redolist.length>0){
            let last=this.redolist.pop()
            this.undolist.push(this.canvas.toDataURL())
            let img=new Image()
            img.src=last
            img.onload=()=>{
                this.canvas.getContext('2d').clearRect(0,0,this.canvas.width,this.canvas.height)
                this.canvas.getContext('2d').drawImage(img,0,0,this.canvas.width,this.canvas.height)
            }
        }
    }
    get canvas(){
        return this._canvas
    }
}
export default new Canvasstore()