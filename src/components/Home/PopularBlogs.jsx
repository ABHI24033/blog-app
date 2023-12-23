import React from 'react';
import { Link } from 'react-router-dom';

const PopularBlogs = ({ blogData }) => {
    // console.log(blogData);
    return (
        <div>
            {
                blogData?.map((item, index) => {
                    return (
                        <Link to={`details/${item.id}`} key={index}>
                            <div className='flex gap-2 bg-gray-50 my-3 shadow-sm p-2' >
                                <img src={item.imgUrl} alt="" className='w-[8rem] h-[5rem]' />
                                <div>
                                    <p className=' text-lg font-sans font-bold'>{item?.title}</p>
                                    <p className=' text-md font-sans'>{item?.timestamp.toDate().toDateString()}</p>
                                </div>
                            </div>
                        </Link>

                    )
                })
            }

        </div>
    );
}

export default PopularBlogs;
