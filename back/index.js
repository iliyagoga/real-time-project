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
            case 'active':
                broadcastConnection(ws,msg)
                break
            case 'update':
                broadcastConnection(ws,msg)
                break
            case 'leave':
                broadcastConnection(ws,msg)
        }
    })
})
function connectionHandler(ws,msg){
    ws.id=msg.id
    msg.c=[...aWss.clients].length
    msg.active=1
    broadcastConnection(ws,msg)

}
function broadcastConnection(ws,msg){
    aWss.clients.forEach(c=>{
        if(c.id==msg.id){
            c.send(JSON.stringify(msg))
        }
    })

}
app.listen(port,()=>{
    console.log('Сервер запущен')
})