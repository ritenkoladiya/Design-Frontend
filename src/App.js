import './App.css';
import Login from './Page/Login';
import Registration from './Page/Registration';
import { Routes, Route, useNavigate } from "react-router-dom";
import Sideandnav from './Page/Sideandnav';
import Dashboard from './Page/Dashboard';
import Addproduct from './Page/Addproduct';
import Allproduct from './Page/Allproduct';
import Alluser from './Page/Alluser';
import Adduser from './Page/Adduser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Protected from './Page/Protected';
import { useEffect, useState } from 'react';
import Category from './Page/Category';



function App() {
  const login = JSON.parse(localStorage.getItem('token'));
  console.log("login===", login)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect((e) => {
    if (login) {
      setIsLoggedIn(true);
      // navigate('/Dashboard');
      window.addEventListener("login", () => {
        window.location.reload();
      });
      // window.location.reload(false);
      // e?.preventDefault();
    } else {
      setIsLoggedIn(false);
      // navigate('/');
    }
  }, [login]);

  return (
    <>
      <ToastContainer />
      <>{isLoggedIn ? <>
        <Sideandnav>
          <Routes>
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/addproduct' element={<Addproduct />} />
            <Route path='/allproduct' element={<Allproduct />} />
            <Route path='/alluser' element={<Alluser />} />
            <Route path='/adduser' element={<Adduser />} />
            <Route path='category' element={<Category />} />
          </Routes>
        </Sideandnav>
      </> :
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
        </Routes>}
      </>
    </>
  );
}

export default App;
