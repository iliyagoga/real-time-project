
import { useState } from 'react';
import toolstore from '../store/toolstore';
import '../styles/css/settingbar.css'
function SettingBar() {
  const [value,setValue]=useState(1)
    return <div className="settingbar" >
      <label htmlFor="line-wdidth">Толщина линии</label>
      <input type="number" 
      onChange={(e)=>{
        setValue(e.target.value)
        toolstore.setLineWidth(e.target.value)}} 
        value={value}
      style={{marginLeft: '10px', padding: '5px'}} min={1} max={50}  id="line-width" />
      <label htmlFor="stroke-color"> Цвет линии</label>
      <input type="color" 
      onChange={(e)=>{
        toolstore.setStrokeColor(e.target.value)
    }} 
    
      style={{marginLeft: '10px', padding: '5px'}} min={1} max={50}  id="stroke-color" />
    </div>
  }
  
  export default SettingBar;
  