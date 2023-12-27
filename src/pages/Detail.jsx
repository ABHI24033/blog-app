import { doc, getDoc, collection, onSnapshot, addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Category from '../components/Home/Category';
import PopularBlogs from '../components/Home/PopularBlogs';
import CreateComment from '../components/Comment/CreateComment';
import Comments from '../components/Comment/Comments';

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const Details = ({ setActive, user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Popularblog, setPopularblog] = useState()
  const [liked,setLiked]=useState([]);
  const [showLiked,setShowLiked]=useState(false);

  // const getBlogDetail = () => {
  //   const docRef = doc(db, "blogs", id);
  //   getDoc(docRef).then((item) => {
  //     setBlog(item.data());
  //     setLoading(false);
  //     setActive(null);
  //   }).catch((error) => {
  //     console.log("err", error);
  //   });
  // }


  useEffect(() => {
    const getBlogDetail = () => {
      const docRef = doc(db, "blogs", id);
      getDoc(docRef).then((item) => {
        setBlog(item.data());
        setLoading(false);
        // setActive(null);
      }).catch((error) => {
        console.log("err", error);
      });
    }
    id && getBlogDetail();
  }, [id]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
        setPopularblog(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    }
  }, []);
// ==================================like functionality=======================
  const handleLike=async()=>{
    if(user){
      liked?.forEach(async(like)=>{
        if(like.userId!==user?.uid){
          try {
            await addDoc(collection(db,"like"),{
              userId:user?.uid,
            })
            setShowLiked(true);
          } catch (error) {
            console.log(error)
          }
        }
        // else{
        //   alert("already Liked")
        // }
      })
      
    }else{
      alert("please Login To like");

    }
  }

  useEffect(()=>{
    
   const fetchLikeData= onSnapshot(collection(db, "like"),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            })
            setLiked(list);
          })
          
    liked.forEach((like)=>like?.userId===user?.uid?setShowLiked(true):setShowLiked(false));

   return ()=>{
    fetchLikeData();
   } 
  },[liked,user]);


  if (loading) {
    return (
      <>
        <Spinner />
      </>
    )
  }
  return (
    <div className=' mt-10'>
      <div className=' bg-gray-200 py-4'>

        <div className=' mx-auto w-[90%] flex justify-center h-[30rem] '>
          <img src={blog?.imgUrl} alt="blogpicture" className=' w-[100%] h-[100%]' />
          <div className='absolute bottom-24  w-[20rem] h-[5rem] mx-auto bg-black opacity-50 text-white'>
            <p className=' font-medium text-md'>{blog?.timestamp.toDate().toDateString()}</p>
            <h1 className=' text-[2rem] font-sans font-bold'>{blog?.category}</h1>
          </div>
        </div>

        <div className=' flex'>
          <div className=' w-[100%] md:ml-[3rem] mx-[1rem] my-[2rem]'>
            <h1 className=' text-4xl text-left md:ml-10 font-sans font-normal my-5'>{blog?.title}</h1>
            
            <div className='flex justify-between md:mx-10 border-b-2 border-black mb-4'>
            
              <p className=' text-left font-sans text-sm '>
                By <span className=' font-bold'>{blog?.author}</span>-{blog?.timestamp.toDate().toDateString()}
              </p>
              <button type="button"
              onClick={handleLike}
               className=' bg-blue-600 flex text-white px-4 font-sans py-1 rounded-md outline-none'>
                {
                  showLiked===true?<AiFillLike className='text-xl'/>:<AiOutlineLike className='text-xl'/>
                }
                Like
              </button>
            </div>

            <p className=' text-left md:mx-10 font-sans text-lg overflow-hidden' dangerouslySetInnerHTML={{ __html: blog?.blog }}></p>
            <Comments detailsBlogId={id} user={user} />
            <CreateComment author={blog?.author} blogId={id} user={user} />
          </div>

          <div className=' w-[30%] hidden md:block'>
            <Category />
            <div className=' text-left w-[90%]'>
              <p className=' text-base font-sans font-semibold px-3 py-2 border-b-2 border-gray-400'>Popular Blogs</p>
              <PopularBlogs blogData={Popularblog} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Details;
