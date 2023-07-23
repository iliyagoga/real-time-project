import './styles/css/app.css'
import { Navigate, Route, Routes} from 'react-router-dom';
import Body from './components/Body';
function App() {
  return <div className="app">
    <Routes>
      <Route path='/:id'element={
        <Body></Body>
    }>
      </Route>
      <Route path='/' element={<Navigate to={'/'+(+new Date).toString(16)} replace></Navigate> }>
      </Route>
    </Routes>
  
  </div>
}

export default App;
