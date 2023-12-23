
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate,useParams } from 'react-router-dom';

import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const categoryOfBlog = ["Technology", 'Music', 'Bollywood', 'Food', 'Fashion','Hollywood', 'Others'];

const AddEditBlog = ({user,setActive}) => {

  const navigate=useNavigate();
  const initialBlogState = {
    title: '',
    category: '',
    blog: ''
  }
  const [blogPost, setBlogPost] = useState(initialBlogState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  
// ====================image upload=============================
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadFile = uploadBytesResumable(storageRef, file);

      uploadFile.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadFile.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setBlogPost((prev) => ({ ...prev, imgUrl: downloadUrl }));
          })
        })
    }
    file && uploadFile();
  }, [file])
// ============================================================================
  const handleEditorChange=(editorValue)=>{
    setBlogPost({...blogPost,blog:editorValue});
    // console.log(editorValue);
  }
  const handleChange = (e) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  }

  const { title, category, blog } = blogPost;
  // ====================submit documents=====================
  const {id}=useParams();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(title&& category && blog){
      if(!id){
        try {
          await addDoc(collection(db,"blogs"),{
            ...blogPost,
            timestamp:serverTimestamp(),
            author:user.displayName,
            userId:user.uid,
          })
          toast.success("Blog created successfully");
          navigate('/');
        } catch (error) {
          console.log(error);
        }

      }else{
        try {
          await updateDoc(doc(db,"blogs",id),{
            ...blogPost,
          })
          toast.success("blog upadted successfully");
          navigate('/');
        } catch (error) {
          console.log(error);
        } 
      }
    }else{
      toast.warn("All fields are mendatorary")
    }
    
  }
  
  const GetDataById=async()=>{
    try {
      const docRef=doc(db,"blogs",id);
      const snapshot=await getDoc(docRef);
      if(snapshot.exists()){
        setBlogPost(snapshot?.data());
      }
      setActive(null)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    id&&GetDataById();
  },[]);

  return (
    <div>
      <div className="bg-gray-200 py-10 px-2 md:p-10 ">
        <h3 className=' text-2xl font-sans font-semibold border-b-2 w-[100%] md:w-[20%] mx-auto border-gray-800 text-gray-800 py-1'>Write a Blog</h3>
        <form onSubmit={handleSubmit} className='bg-white p-5 w-[100%] md:w-[60%] mx-auto my-10 shadow-md rounded-sm ' >

          <input type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className='w-[100%] p-2 border border-gray-600 rounded-md my-4 '
            placeholder='Upload a picture'
          
          />
         
          <input type="text"
            name='title'
            className='w-[100%] p-2 border border-gray-600 rounded-md my-4  outline-gray-600'
            placeholder='Title of Blog'
            value={title}
            onChange={handleChange}
          />


          <select name="category"
            onChange={handleChange}
            className='w-[100%] p-2 border border-gray-600 rounded-md my-4  outline-gray-600'
            defaultValue="Category">
            <option disabled>Category</option>
            {
              categoryOfBlog?.map((item, index) => {
                return (
                  <option value={item} key={index}>{item}</option>
                )
              })
            }
          </select>

          <ReactQuill theme='snow'  
          value={blog} 
          onChange={(e)=>handleEditorChange(e)} 
          placeholder='Write Blog here'
          className=' h-[20rem] mb-16'
          />
          {/* <textarea name="blog" cols="30" rows="10"
            placeholder='write blog here'
            className='w-[100%] p-2 border border-gray-600 rounded-md my-4 outline-gray-600'
            value={blog}
            onChange={handleChange}
          ></textarea> */}
         
          <button className='bg-blue-700 px-6 py-2 text-white font-semibold rounded-md hover:bg-blue-600 active:bg-blue-400'>Publish</button>
          
        </form>
      </div>
    </div>
  );
}

export default AddEditBlog;
