import React from 'react';
import ShortPara from '../../utility/ShortPara';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BlogBox = ({ user, blogData, handleDelete }) => {
    // console.log(user);
    return (
        <div>
            {
                blogData?.map((item, index) => {
                    return (

                        <div key={index}
                            className='flex flex-col md:flex-row py-2 border-b-[1px] bg-white shadow-sm shadow-gray-600 border-gary-300  my-5 '>
                            <div className=' w-[100%] md:w-[40%] flex items-center justify-center rounded-md'>
                                <img src={item?.imgUrl} className=' mx-auto w-[17rem] h-[12rem] rounded-md' />
                            </div>

                            <div className=' text-left ml-0 w-[100%] md:w-[60%] p-4 relative'>
                                <p className=' bg-blue-600 text-white w-fit px-2 rounded-md my-2 font-sans'>{item?.category}</p>
                                <h2 className=' text-lg font-bold font-sans'>{item?.title}</h2>
                                <p className=' font-sans text-gray-600 border-b-2 mb-1'><span className='font-sans font-semibold'>{item?.author}</span> {item?.timestamp.toDate().toDateString()}</p>
                                <p className=' font-sans leading-4 mb-4 w-[90%] overflow-hidden' dangerouslySetInnerHTML={{__html:ShortPara(item.blog, 120)}}></p>
{/* {ShortPara(item.blog, 120)} */}


                                <Link to={`/details/${item?.id}`} className=' font-sans px-4 py-1 bg-slate-600 text-white '>Read More</Link>                            {
                                    user?.uid && item?.userId === user.uid && (
                                        <div className=" flex justify-end">
                                            <Link to={`/update/${item?.id}`}>
                                            <FaEdit
                                                title='Edit'
                                                className=' text-green-700 text-xl m-1 cursor-pointer'
                                                 />
                                            </Link>
                                            <MdDelete
                                                title='Delete'
                                                className=' text-red-700 text-xl m-1 cursor-pointer'
                                                onClick={() => { handleDelete(`${item.id}`) }} />
                                        </div>
                                    )
                                }

                            </div>
                        </div>

                    )
                })
            }
        </div>
    );
}

export default BlogBox;
