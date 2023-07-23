const express=require('express')
const app=express()
const wsserver=require('express-ws')(app)
const aWss=wsserver.getWss()
const port= process.env.PORT ||5000
app.ws('/',(ws,req)=>{
    ws.on('message',(msg)=>{
        msg=JSON.parse(msg)
        switch (msg.method){
            case 'connection':
                connectionHandler(ws,msg)
                break
            case 'draw':
                broadcastConnection(ws,msg)
                break
        }
    })
})
function connectionHandler(ws,msg){
    ws.id=msg.id
    broadcastConnection(ws,msg)

}
function broadcastConnection(ws,msg){
    console.log(msg.method)
    aWss.clients.forEach(c=>{
        if(c.id==msg.id){
            c.send(JSON.stringify(msg))
        }
    })

}
app.listen(port,()=>{
    console.log('Сервер запущен')
})