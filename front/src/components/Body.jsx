import { observer } from "mobx-react-lite";
import canvasstore from "../store/canvasstore";
import Canvas from "./Canvas";
import SettingBar from "./SettingBar";
import ToolBar from "./ToolsBar";
import UsersList from "./USersList";
import Modalca from "./modals/Modal";
import Alert from "./modals/Alert";
import ActiveUser from "./modals/ActiveUser";


const Body =observer(()=>{
    if(canvasstore.getMode()=='single'){
        canvasstore.setUserId(1)
        canvasstore.setActiveId(1)
    }
    console.log(canvasstore.getUserId(),canvasstore.getActiveId())
    return <>
        <ToolBar ></ToolBar>
        <SettingBar></SettingBar>
        <Canvas></Canvas>
        <UsersList ></UsersList>
        {canvasstore.getMode()=='network'&&<Modalca></Modalca>}
        {canvasstore.getUserId()==canvasstore.getActiveId()&& <Alert></Alert>}
        {canvasstore.getUserId()!=canvasstore.getActiveId()&& <ActiveUser></ActiveUser>}
        </>
})
export default Body