import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';

import Logo from '../img/blog.jpg';
import userImg from '../img/user.jpg';

const Header = ({active,setActive,user,handleLogout}) => {
  const userId=user?.uid;
  
  const [toggleMenu, setToggleMenu] = useState(false);
  // const [active, setActive] = useState("Home");
  function ToggleMenuBar() {
    setToggleMenu(!toggleMenu);
  }
  return (
    <div className='mt-[4.5rem]'>
      <nav className= "fixed top-0 w-[100%] bg-white border-gray-200 dark:bg-gray-900 shadow-md z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="w-[4rem] md:w-[4rem]" alt="Logo" />
          </a>

          <div className=" md:flex items-center ">
            <ul className={`flex flex-col md:flex-row z-0 font-medium mt-0 absolute md:static duration-1000 ${toggleMenu ? 'top-[4rem]' : 'top-[-25rem]'} w-[100%] left-0 rtl:space-x-reverse text-sm bg-white shadow-lg h-[20rem] md:h-0 items-center justify-center gap-5`}>
              <li>
                <Link to='/' href="#" className={`${active === 'Home' ? 'active-nav-link' : ''} text-gray-900  hover:text-blue-800  dark:text-white  px-5 py-2 font-serif md:text-lg`} aria-current="page" onClick={() => { setActive("Home") }}>Home</Link>
              </li>
              <li>
                <Link to='/about' href="#" className={`${active === 'About' ? 'active-nav-link' : ''} text-gray-900  hover:text-blue-800  dark:text-white  px-5 py-2 font-serif md:text-lg`} onClick={() => { setActive("About") }}>About</Link>
              </li>
              <li>
                <Link to='/create' href="#" className={`${active === 'Create' ? 'active-nav-link' : ''} text-gray-900  hover:text-blue-800  dark:text-white  px-5 py-2 font-serif md:text-lg`} onClick={() => { setActive("Create") }} >Create</Link>
              </li>

            </ul>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse ">
            {userId?(
              <>
              
              <div className='flex items-center justify-center'>
                <img src={userImg} 
                className=' w-[40px] h-[40px]'
                 />
                <p className=' text-lg font-sans '>{user?.displayName}</p>
              </div>
              <button 
              onClick={handleLogout}
              className=' bg-blue-700 text-white py-1 px-4 rounded-md hover:bg-blue-600 active:bg-blue-500'
              >Logout</button>
              </>
            ):
            <Link to='/login' 
            className={`${active === 'Login' ? 'active-nav-link' : ''}
             text-gray-900  hover:text-blue-800  dark:text-white  px-5 py-2 font-serif md:text-lg`}
              onClick={() => { setActive("Login") }}>Login</Link>
            }
            <FaBars className='text-md md:hidden' onClick={() => { ToggleMenuBar() }} />
          </div>
        </div>
      </nav>


    </div>
  );
}

export default Header;
