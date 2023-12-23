import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';

import BlogBox from '../components/Home/BlogBox';
import { db } from '../firebase/firebase';
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';
import PopularBlogs from '../components/Home/PopularBlogs';
import Carusel from '../components/Home/Carusel';
import Category from '../components/Home/Category';

// const categoryOfBlog = ["Technology", 'Music', 'Bollywood', 'Food', 'Fashion', 'Hollywood', 'Others',];

const Home = ({ user }) => {

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParam] = useSearchParams()
  const category = searchParam.get("category");

  const categorywiseBlog = blogData.filter((item) => (category === item.category));
  
  

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
        setBlogData(list);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete the blog")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.info("Blog deleted successfully");
      } catch (error) {
        console.error(error);
      }
    }
  }
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  return (

    <div className=' bg-gray-100'>
      <div className=' mt-10 w-[100%] md:w-[87%] mx-auto'>
        <h1 className=' text-md font-medium font-sans py-2 text-left border-b-2 border-gray-300 mx-4 pl-2'>Trending</h1>
        <Carusel blogData={blogData}/>
      </div>
      <div className=' flex flex-col md:flex-row w-[100%] h-auto  '>

        <div className=' w-[100%] md:w-[70%]'>
          <div className=' w-[100%] md:ml-[5rem] md:w-[87%] mx-auto p-2'>
            <p className='text-left font-sans font-medium mx-1 my-1'>{category !== null ? category : "Daily's Blog"}</p>
            <hr className=' text-gray-600 h-[2px] bg-slate-300' />

            {
              category === null ?
                <BlogBox user={user} blogData={blogData} handleDelete={handleDelete} />
                :
                categorywiseBlog.length > 0 ?
                  <BlogBox user={user} blogData={categorywiseBlog} handleDelete={handleDelete} /> : <NotFound />

            }
          </div>
        </div>
        {/* ===============left Side======================= */}
        <div className=' md:w-[30%] w-[100%] mx-auto'>
          <Category/>

          <div className=' text-left w-[90%]'>
            <p className=' text-base font-sans font-semibold px-3 py-2 border-b-2 border-gray-400'>Popular Blogs</p>
            <PopularBlogs blogData={blogData} />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
