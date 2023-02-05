import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Home';
import Form from './Components/Form';
import Login from './Components/Login';
import Admin from './Components/Admin';


function App() {
  return (
   
   <BrowserRouter>
   <Routes>
    <Route path='/home' exact element={<Home/>}/>
    <Route path='/form' exact element={<Form/>}/>
    <Route path='/' exact element={<Login/>}/>
    <Route path='/admin' exact element={<Admin/>}/>
   </Routes>
   </BrowserRouter>
   
  );
}

export default App;
