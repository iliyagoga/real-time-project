import { observer } from "mobx-react-lite";
import canvasstore from "../store/canvasstore";
import Canvas from "./Canvas";
import SettingBar from "./SettingBar";
import ToolBar from "./ToolsBar";
import UsersList from "./USersList";
import Modalca from "./modals/Modal";


const Body =observer(()=>{
    return <>
        <ToolBar ></ToolBar>
        <SettingBar></SettingBar>
        <Canvas></Canvas>
        <UsersList ></UsersList>
        {canvasstore.getMode()=='network'&&<Modalca></Modalca>}
        </>
})
export default Body