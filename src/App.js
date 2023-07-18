
import './App.css';
import { Route, Routes} from 'react-router-dom'
import Home from './routes/home/home';
import Login from './routes/login/login';
import Register from './routes/register/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
