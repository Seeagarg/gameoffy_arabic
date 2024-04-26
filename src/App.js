import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Category from './Pages/Category';
import GameDetails from './Pages/GameDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <div >
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/category/:id" element={<Category/>}/>
   <Route path="/game/:id" element={<GameDetails/>}/>
   </Routes>
   <ToastContainer/>
   </div>
  );
}

export default App;
