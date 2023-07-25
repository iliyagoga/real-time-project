import './styles/css/app.css'
import { Navigate, Route, Routes} from 'react-router-dom';
import Body from './components/Body';
import Choose from './components/Chose';
import CreateRoom from './components/CreateRoom';
import In from './components/In';
function App() {
  return <div className="app">
    <Routes>
      <Route path='/network/room'element={
        <In></In>
      }/>
      <Route path='/network/room/:id'element={
        <Body></Body>
    }>
      </Route>
      <Route path='/network' element={<CreateRoom></CreateRoom>}></Route>
      <Route path='/single' element={<Body></Body>}></Route>
      <Route path='/' element={<Choose></Choose> }>
      </Route>
      <Route path="/*" element={<Choose></Choose>}></Route>
    </Routes>
  
  </div>
}

export default App;
