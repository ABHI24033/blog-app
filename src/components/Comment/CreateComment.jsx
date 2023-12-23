import { addDoc, collection, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
// import comment from '../../img/comment.png'

const CreateComment = ({blogId,user}) => {
  const [comment,setComment]=useState();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await addDoc(collection(db,"comments"),{
        comment:comment,
        timestamp:new Date().toDateString(),
        author:user.displayName,
        userId:user?.uid,
        blogId:blogId,

      });
      toast.success("Blog Posted Successfully");
      setComment(' ')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className=' my-4'>
       
        <form action="" onSubmit={handleSubmit}>
        <input type="text"
        name='comment'
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        className=' w-[90%]  py-2 px-2 outline-gray-400 border border-gray-300 rounded-md mb-2'
         placeholder='Write a comment'
          />
          <button type='submit'
          className=' bg-blue-600 text-white py-2 px-4 font-sans rounded-md mx-2'
          >Post Comment</button>
          
      </form>
      </div>
      
    </div>
  );
}

export default CreateComment;
