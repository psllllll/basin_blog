import { Carousel } from "antd";
import Banner1 from "../assets/home/banner1.jpg"
import Banner2 from "../assets/home/banner2.jpg"
import Banner3 from "../assets/home/banner3.jpg"
import'./Swiper.less'
import type { IMG_TYPE } from "../type/homeType";
const swiperImg:IMG_TYPE[] = [
  {
    description: "Banner1",
    imgsrc: Banner1,
  },
  {
    description: "Banner2",
    imgsrc: Banner2,
  },
  {
    description: "Banner3",
    imgsrc: Banner3,
  },
];
const Swiper:React.FC = function () {
  return (
    <div className="swiper_content">
      <Carousel autoplay>
        {swiperImg.map((item, index) => {
          return (
            <div key={index}>
              <h3 className="swiper">
                <img src={item.imgsrc} alt={item.description} />
              </h3>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
export default Swiper;