import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth,  } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState();
    function HandleChange(e){
        setEmail(e.target.value);
    }

     function handleSubmit(e){
        e.preventDefault();
        sendPasswordResetEmail(auth,email).then(()=>{
            alert("Check Email your a reset link is sent");
            navigate("/login")
        }).catch((error)=>{
            console.log(error.code);
            console.log(error.message);
        })
    }
  return (
    <div>
        <div className= ' mt-[5rem]'>
            <h1 className=' py-5 font-sans font-bold underline text-2xl'>Forgot Password</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className=' bg-slate-100 mx-auto w-[30%] shadow-lg shadow-slate-700 rounded-md'>
                    <input type="email" 
                    className='px-4 py-2 mt-14 rounded-sm w-[90%] border border-blue-600 outline-none'
                    placeholder='Enter your email'
                    onChange={(e)=>HandleChange(e)}
                    name="email" 
                    id="email" 
                    /> <br />
                    <button className='bg-blue-600 text-white rounded-md px-4 py-2 my-5 font-sans' type="submit">Reset Password</button>
                </div>
            </form>
        </div>
      
    </div>
  );
}

export default ForgotPassword;
