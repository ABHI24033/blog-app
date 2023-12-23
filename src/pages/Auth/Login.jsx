import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
// icons
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// imgaes
import LoginImg from '../../img/auth/signin-image.jpg'
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({setActive}) => {
    const navigate=useNavigate();
    const initialState={
        email:'',
        password:'',
    }
    const [state,setState]=useState(initialState);
    const [seePassword,setSeePassword]=useState(false);
    function ToggleEyebutton(){
        setSeePassword(!seePassword);
    }

    const {email,password}=state;
    const handelChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value});
    }

    const handelLogin=async(e)=>{
        e.preventDefault();
        
        if(password.length<6){
            return toast.error("Password must be greater than 6");
        }
        if(email&&password){
            // const {user}=
            await signInWithEmailAndPassword(auth,email,password);
            // await updateProfile(user,{displayName:"name"});
            navigate('/');
            setActive("Home")
        }else{
            return toast.error("Please fill all fields");
        }
    }
    return (
        <div className=' mx-auto ' >
            <div className='w-[90%] md:w-[60%] h-[30rem] shadow-lg rounded-lg shadow-black mx-auto flex flex-col items-center justify-center'>
                <h1 className=' text-2xl font-bold font-sans'>LOG-IN</h1>

                <div className=' flex items-center justify-center w-[90%]'>

                    <div className=" hidden md:flex flex-col items-center justify-center">
                        <img src={LoginImg}  />
                    </div>

                    <form className=" w-[100%] md:w-[60%] h-[20rem] flex items-center justify-center flex-col gap-6" onSubmit={handelLogin}>
                        <div className=' bg-white mx-2 w-[70%] flex items-center justify-center border-b-2 border-black'>
                            <FaUserAlt />
                            <input type="text"
                                className='px-3 py-2 w-[90%] outline-none placeholder:text-gray-400 '
                                placeholder='Your Email'
                                value={email}
                                name='email'
                                onChange={handelChange}
                            />
                        </div>
                        <div className=' bg-white mx-2 w-[70%] flex items-center justify-center border-b-2 border-black'>
                            <RiLockPasswordFill />
                            <input type={`${seePassword?'text':'password'}`}
                                className='px-3 py-2 w-[90%] outline-none placeholder:text-gray-400 '
                                placeholder='Password'
                                value={password}
                                name='password'
                                onChange={handelChange}
                            />
                            {
                                seePassword===false?<FaEye className=' mr-2 cursor-pointer '
                                onClick={()=>ToggleEyebutton()}
                                />:<FaEyeSlash className=' mr-2 cursor-pointer' onClick={()=>ToggleEyebutton()}/>
                            }
                           
                        </div>
                        
                        <div>
                            <button className=' bg-blue-700 active:bg-blue-400 hover:bg-blue-600 px-6 py-2 text-white rounded-md'>Login</button>
                        </div>
                        <p className=' text-left bg-slate-700'>Don't have an account?
                            <Link to='/register' className=' text-blue-600 underline mx-3' >Sign-Up</Link>
                        </p>
                        <p className=' text-left '>Forget Passowrd..
                            <Link to='/forgot-password' className=' text-blue-600 underline mx-3' >Reset</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
