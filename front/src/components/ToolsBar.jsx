
import canvasstore from '../store/canvasstore';
import toolstore from '../store/toolstore';
import '../styles/css/toolbar.css'
import Brush from '../tools/Brush';
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Rubber from '../tools/Rubber'
import Line from '../tools/Line'
import download from '../utils/download';
function ToolBar() {
    return <div className="toolbar">
      <div>
        <button className='toolbar__bt brush' onClick={()=>{
          toolstore.setTool(new Brush(canvasstore.canvas,canvasstore.getSocket(),canvasstore.getSessionid()))
          }}>
        </button>
        <button className='toolbar__bt rect' onClick={()=>{toolstore.setTool(new Rect(canvasstore.canvas,canvasstore.getSocket(),canvasstore.getSessionid()))}}>
        </button>
        <button className='toolbar__bt circle' onClick={()=>{toolstore.setTool(new Circle(canvasstore.canvas,canvasstore.getSocket(),canvasstore.getSessionid()))}}>
        </button>
        <button className='toolbar__bt eraser' onClick={()=>{toolstore.setTool(new Rubber(canvasstore.canvas,canvasstore.getSocket(),canvasstore.getSessionid()))}}>
        </button>
        <button className='toolbar__bt line' onClick={()=>{toolstore.setTool(new Line(canvasstore.canvas,canvasstore.getSocket(),canvasstore.getSessionid()))}}>
        </button>
        <input type="color" onChange={(e)=>{
        toolstore.setFillColor(e.target.value)}}/>
      </div>
    <div>
      {canvasstore.getMode()=='single'&& <button className='toolbar__bt undo' onClick={()=>{canvasstore.undo()}}>
      </button>}
      {canvasstore.getMode()=='single'&& <button className='toolbar__bt redo' onClick={()=>{canvasstore.redo()}}>
      </button>}
      <button className='toolbar__bt save' onClick={()=>{download()}}>
      </button>
    </div>
    </div>
  }
  
  export default ToolBar;
  