import canvasstore from "../store/canvasstore"

export default function next(check=null){
        if(canvasstore.getMode()=='network'){
            if(canvasstore.getActiveId()==canvasstore.getUserId()){
                if(canvasstore.getCClients()!=canvasstore.getActiveId()){
                    canvasstore.setActiveId(canvasstore.getUserId()+1)
                    canvasstore.getSocket().send(JSON.stringify({
                        method: 'active',
                        aid: (canvasstore.getUserId()+1),
                        id:canvasstore.getSessionid(),
                        check: check
                }))}
                else{
                    canvasstore.setActiveId(1)
                    canvasstore.getSocket().send(JSON.stringify({
                        method: 'active',
                        aid: 1,
                        id:canvasstore.getSessionid(),
                        check: check
                }))
                }
                }
            }
        }