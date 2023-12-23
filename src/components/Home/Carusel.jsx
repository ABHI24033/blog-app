import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const Carusel = ({ blogData }) => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <div>
                
                <Slider {...settings}>
                    {
                        blogData?.map((item,index) => {
                            return (
                                <Link to={`/details/${item.id}`} key={index}>
                                <div className=' relative m-4'>
                                    <img src={item.imgUrl} alt="" className=' w-[100%] h-[20rem]' />
                                    <div className=' py-1 absolute bottom-0 flex flex-col justify-center w-[100%] opacity-75 bg-slate-700'>
                                        <h2 className=' text-white text-2xl font-sans'>{item?.title}</h2>
                                        <p className=' text-white font-sans'><span className='font-sans font-semibold'>{item?.author}</span></p>
                                    </div>
                                </div>
                                </Link>
                            )
                        })
                    }


                </Slider>
            </div>
        </div>


    );
}

export default Carusel;
