
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolsBar';
import Canvas from './components/Canvas'
import './styles/css/app.css'
function App() {
  return <div className="app">
    <ToolBar></ToolBar>
    <SettingBar></SettingBar>
    <Canvas></Canvas>
  </div>
}

export default App;
