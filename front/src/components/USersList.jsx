import { observer } from "mobx-react-lite"
import canvasstore from "../store/canvasstore";

const UsersList =observer(({usernames})=>{
    if(usernames.length>0)
    return <div className="userlist">
        {usernames.map((e,i)=>{
            const r=setTimeout(() => {
                let c=[]
                if(usernames.length!=1){
                    c=usernames;
                    c.splice(i,1)
                }
                else{
                    c=[]
                }
                canvasstore.setAllClients(c)
                clearTimeout(r)
            }, 10000);
            return <div key={e}>{e}</div>})}
    </div>
})
export default UsersList