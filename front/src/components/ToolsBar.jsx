
import '../styles/css/toolbar.css'
function ToolBar() {
    return <div className="toolbar">
      <div>
        <button className='toolbar__bt brush'>
        </button>
        <button className='toolbar__bt rect'>
        </button>
        <button className='toolbar__bt circle'>
        </button>
        <button className='toolbar__bt eraser'>
        </button>
        <button className='toolbar__bt line'>
        </button>
        <input type="color" />
      </div>
    <div>
      <button className='toolbar__bt undo'>
      </button>
      <button className='toolbar__bt redo'>
      </button>
      <button className='toolbar__bt save'>
      </button>
    </div>
    </div>
  }
  
  export default ToolBar;
  