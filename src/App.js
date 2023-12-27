// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// liberary
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// pages
import Header from './components/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';
import AddEditBlog from './pages/AddEditBlog';
import About from './pages/About';
import NotFound from './pages/PageNotFound';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { auth } from './firebase/firebase';
import { signOut } from 'firebase/auth';
// import Spinner from './components/Spinner';
import ForgotPassword from './components/ForgotPassword';


function App() {
  const navigate=useNavigate();
  const [active, setActive] = useState("Home");
  const [user,setUser]=useState(null);

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    })
  },[]);

  const handleLogout=()=>{
    signOut(auth).then(()=>{
      setActive('Login');
      setUser(null);
      navigate("/login");
    })
  }
  return (
    <div className="App overflow-x-hidden">
      <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout}/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='/login' element={<Login setActive={setActive}/>}/>
        <Route path='/register' element={<Signup setActive={setActive}/>}/>
        <Route path='/details/:id' element={<Detail setActive={setActive} user={user}/>}/>
        <Route path='/create' element={user?.uid?<AddEditBlog user={user} setActive={setActive}/>:<Navigate to='/login'/>}/>
        <Route path='/update/:id' element={<AddEditBlog/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='*' element={<NotFound/>}/>
        {/* <Route path='*' element={<Spinner/>}/> */}

      </Routes>
      {/* <Home/> */}
    </div>
  );
}

export default App;
