import React from 'react';
import { Link } from 'react-router-dom';
const categoryOfBlog = ["Technology", 'Music', 'Bollywood', 'Food', 'Fashion', 'Hollywood', 'Others',];

const Category = () => {
  return (
    <div>
      <div className='text-left w-[90%]  mt-12 shadow-md p-4'>
            <p className=' text-base font-sans font-semibold px-3 py-2 border-b-2 border-gray-400'>Category</p>
            <div className=' flex item-center justify-center flex-wrap '>
              <Link to='/' className=' bg-gray-300 shadow-md py-1 px-5 rounded-sm m-2 font-sans'>All</Link>
              {
                categoryOfBlog?.map((item, index) => {
                  return (
                    <Link to={`/?category=${item}`} key={index}
                      className='  bg-gray-300 shadow-md py-1 flex-wrap px-5 rounded-sm m-2 font-sans'>
                      {item}
                    </Link>
                  )
                })
              }
            </div>
          </div>
    </div>
  );
}

export default Category;
