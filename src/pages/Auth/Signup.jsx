
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// icons
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// imgaes
import signupImg from '../../img/auth/signup-image.jpg';
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const Signup = ({ setActive }) => {
    const navigate = useNavigate();
    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [state, setState] = useState(initialState);
    const [seePassword, setSeePassword] = useState(false);
    const [seeconfirmPassword, setSeeconfirmPassword] = useState(false);
    function ToggleEyebutton() {
        setSeePassword(!seePassword);
    }

    const { name, email, password, confirmPassword } = state;
    const handelChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handelAuth = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Password and confirm password are not same")
        }
        if (password.length < 6) {
            return toast.error("Password must be greater than 6");
        }
        if (name && email && password) {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, { displayName: name });
                navigate('/');
                setActive("Home");
                toast.success("Sign-up successfully");
            } catch (error) {
                console.log("error from signup ",error.message);
                toast.error(error.message)
            }

        } else {
            toast.error("Please fill all fields");
        }
    }
    return (
        <div className=' mx-auto my-6 ' >
            <div className=' w-[90%] md:w-[60%] h-[30rem] mt-[6rem] shadow-lg rounded-lg shadow-black mx-auto flex flex-col items-center justify-center'>
                <h1 className=' text-2xl font-bold font-sans my-6'>SIGN-UP</h1>

                <div className=' flex items-center flex-row-reverse justify-center w-[90%]'>

                    <div className=" hidden md:flex flex-col items-center justify-center">
                        <img src={signupImg} alt='signupImg'/>
                        {/* <Link className=' underline'>Alredy have an account</Link> */}
                    </div>

                    <form className="w-[100%] md:w-[60%] h-[20rem] flex items-center justify-center flex-col gap-6" onSubmit={handelAuth}>
                        <div className=' bg-white mx-2 w-[70%] flex items-center justify-center border-b-2 border-black'>
                            <FaUserAlt />
                            <input type="text"
                                className='px-3 py-2 w-[90%] outline-none placeholder:text-gray-700 '
                                placeholder='Your Full Name'
                                name='name'
                                value={name}
                                onChange={handelChange}
                            />
                        </div>
                        <div className=' bg-white mx-2 w-[70%] flex items-center justify-center border-b-2 border-black'>
                            <MdEmail />
                            <input type="text"
                                className='px-3 py-2 w-[90%] outline-none placeholder:text-gray-700 '
                                placeholder='Your Email'
                                name='email'
                                value={email}
                                onChange={handelChange}
                            />
                        </div>
                        <div className=' bg-white mx-2 w-[70%] flex items-center justify-center border-b-2 border-black'>
                            <RiLockPasswordFill />
                            <input type={`${seePassword ? 'text' : 'password'}`}
                                className='px-3 py-2 w-[90%] outline-none placeholder:text-gray-700 '
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={handelChange}
                            />
                            {
                                seePassword === false ? <FaEye className=' mr-2 cursor-pointer '
                                    onClick={() => ToggleEyebutton()}
                                /> : <FaEyeSlash className=' mr-2 cursor-pointer' onClick={() => ToggleEyebutton()} />
                            }

                        </div>
                        <div className=' bg-white mx-2 w-[70%] flex items-center justify-center border-b-2 border-black'>
                            <RiLockPasswordFill />
                            <input type={`${seeconfirmPassword ? 'text' : 'password'}`}
                                className='px-3 py-2 w-[90%] outline-none placeholder:text-gray-700 '
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handelChange}
                            />
                            {
                                seeconfirmPassword === false ? <FaEye className=' mr-2 cursor-pointer '
                                    onClick={() => setSeeconfirmPassword(!seeconfirmPassword)}
                                /> : <FaEyeSlash className=' mr-2 cursor-pointer' onClick={() => setSeeconfirmPassword(!seeconfirmPassword)} />
                            }

                        </div>

                        <div>
                            <button className=' bg-blue-700 active:bg-blue-400 hover:bg-blue-600 px-6 py-2 text-white rounded-md'>Sign-Up</button>
                        </div>
                        <p className=' text-left'>Alredy have an account?
                            <Link to='/login' className=' text-blue-600 underline mx-3' >Sign-In</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

