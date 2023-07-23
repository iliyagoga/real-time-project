import { observer } from "mobx-react-lite";
import canvasstore from "../store/canvasstore";
import Canvas from "./Canvas";
import SettingBar from "./SettingBar";
import ToolBar from "./ToolsBar";
import UsersList from "./USersList";
import Modalca from "./modals/Modal";


const Body =observer(()=>{
    const r=canvasstore.getClients()
    return <>
        <ToolBar></ToolBar>
        <SettingBar></SettingBar>
        <Canvas></Canvas>
        <UsersList usernames={r}></UsersList>
        <Modalca></Modalca>
        </>
})
export default Body