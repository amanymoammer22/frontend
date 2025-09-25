import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

export default function TestSwiper() {
    return (
        <div className="w-full  mx-auto m-auto px-4 sm:px-6 lg:px-14 py-[30px]">
            <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="rounded-xl ">
                <SwiperSlide>
                    <div className="w-full flex flex-col items-center bg-white p-4 my-3 rounded-xl shadow-md box-border">
                        <div className="w-full h-48 sm:h-60 lg:h-72 overflow-hidden">
                            <img src="img2.jpg " alt="Product" className="w-full h-full object-cover select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
                        </div>
                        <p className="mt-2 font-semibold text-sm sm:text-base">$30.00</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full flex flex-col items-center bg-white p-4 my-3 rounded-xl shadow-md box-border">
                        <div className="w-full h-48 sm:h-60 lg:h-72 overflow-hidden">
                            <img src="palestine.jpg" alt="Product" className="w-full h-full object-cover select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
                        </div>
                        <p className="mt-2 font-semibold text-sm sm:text-base">$15.00</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full flex flex-col items-center bg-white p-4 my-3 rounded-xl shadow-md box-border">
                        <div className="w-full h-48 sm:h-60 lg:h-72 overflow-hidden">
                            <img src="img1.jpg " alt="Product" className="w-full h-full object-cover select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
                        </div>
                        <p className="mt-2 font-semibold text-sm sm:text-base">$20.00</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full flex flex-col items-center bg-white p-4 my-3 rounded-xl shadow-md box-border">
                        <div className="w-full h-48 sm:h-60 lg:h-72 overflow-hidden">
                            <img src="img3.jpg " alt="Product" className="w-full h-full object-cover select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
                        </div>
                        <p className="mt-2 font-semibold text-sm sm:text-base">$25.00</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full flex flex-col items-center bg-white p-4 my-3 rounded-xl shadow-md box-border">
                        <div className="w-full h-48 sm:h-60 lg:h-72 overflow-hidden">
                            <img src="img4.jpg " alt="Product" className="w-full h-full object-cover select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
                        </div>
                        <p className="mt-2 font-semibold text-sm sm:text-base">$35.00</p>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className="flex justify-center mt-8">
                <Link to="./product " ><Button value="View All" /></Link>
            </div>
        </div>
    );
}
