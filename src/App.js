import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './Screens/Home';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';
import Create from './Screens/Create';
import UserTweets from './Screens/UserTweets';
import MyTweets from './Screens/MyTweets';
import Edit from './Screens/Edit';

function App() {
  return (
    
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/myTweets' element={<MyTweets/>}/>
        <Route path='/Edit/:id/:title/:body' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
