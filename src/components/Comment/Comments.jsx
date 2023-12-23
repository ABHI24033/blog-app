import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

import comment from '../../img/comment.png';
import Spinner from '../Spinner';



const Comments = ({ detailsBlogId, user }) => {

  const [totalComments, setTotalComments] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "comments"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
        setTotalComments(list);
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
  const detailsPostData = totalComments.filter((data) => (data.blogId === detailsBlogId));

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure want to delete the blog")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "comments", id));
        toast.success("comment deleted !!");
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (loading) {
    return <Spinner />
  }
  return (
    <div  className='relative'>
      <span className=" z-10 absolute left-16 top-[-18px] bg-green-600 text-white text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          Comments
          <span className=' bg-red-600 w-4 h-4 text-xs rounded-full text-white absolute top-[-11px]'>{detailsPostData.length}</span>
        </span>
      <div className=' mt-10 border-2 rounded-sm border-white overflow-y-scroll h-[25rem]  py-4 relative '>
      

        {
          detailsPostData.length <= 0 ? "No any Comment" :
            detailsPostData?.map((item, index) => {
              return (
                // <div>
                <div className="relative py-2 my-2 flex gap-2 w-[95%] mx-auto rounded bg-white" key={index}>
                  <img src={comment}
                    className=' w-[4rem]'
                    alt="" />
                  <div className=' text-left flex flex-col justify-center items-start'>
                    <h2 className='font-sans border-b border-gray-200'>
                      <span className=' font-semibold'>{item?.author}</span>
                      <span className=' text-sm ml-4'>{item?.timestamp}</span>
                    </h2>
                    <p className=' text-left font-sans'>{item?.comment}</p>

                  </div>
                  {

                    (user?.uid === item?.userId) ? 
                    (<div className='flex items-center gap-2 absolute right-4'>
                      <MdDeleteForever className=' text-red-500 cursor-pointer text-lg'
                       onClick={() => { handleDeleteComment(`${item.id}`) }} />
                    </div>) : ''
                  }
                  
                </div>
              )
            }
            )
        }
      </div>

    </div>
  );
}

export default Comments;
