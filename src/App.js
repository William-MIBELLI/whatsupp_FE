
import './App.css';
import { Route, Routes} from 'react-router-dom'
import Home from './routes/home/home';
import Login from './routes/login/login';
import Register from './routes/register/register';
import UnLoggedRoute from './routes/protected-route/unLoggedRoute';
import LoggedRoute from './routes/protected-route/loggedRoute';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route element={<UnLoggedRoute/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
        <Route element={<LoggedRoute/>}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
