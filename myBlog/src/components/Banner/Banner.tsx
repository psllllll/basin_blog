import React from "react";
import Swiper from '../Swiper/Swiper';
import BlogCard from '../blogCard/blogCard';
import Banner1 from"../assets/home/banner1.jpg";
import Banner2 from"../assets/home/banner2.jpg";
import'./Banner.less'

const parentData = [
    {
        id: 1,
        title: '博客1',
        description: '第一个博客',
        imgsrc: Banner1,
    },
    {
        id: 2,
        title: '博客2',
        description: '第二个博客',
        imgsrc: Banner2,
    },
      
  ];

const Banner: React.FC = function(){
    return(
        <div className="banner_container">
            <div className="banner_swiper">
                <Swiper></Swiper>
            </div>
            <div className="banner_card">
                <BlogCard cardData={parentData} />
            </div>
        </div>
    )
}

export default Banner;