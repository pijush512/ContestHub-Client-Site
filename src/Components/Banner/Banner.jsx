import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const sliderData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
      title: "Unlock Your Potential in Coding",
      subTitle: "Join the elite developers in our next global hackathon.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
      title: "Master the Art of Design",
      subTitle: "Showcase your creativity and win amazing prizes.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
      title: "Innovation at its Peak",
      subTitle: "The ultimate battle for tech innovators is here.",
    },
  ];

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 flex items-center justify-center">
                <div className="text-center px-6 max-w-4xl animate-fadeIn">
                  <span className="inline-block bg-blue-600 text-white text-xs md:text-sm font-bold px-4 py-1 rounded-full mb-4 uppercase tracking-widest">
                    Featured Contest
                  </span>
                  
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  
                  <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    {slide.subTitle}
                  </p>

                  <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl w-full max-w-xl mx-auto shadow-2xl">
                    <input
                      type="text"
                      placeholder="Find your contest..."
                      className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-300"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          transform: scale(0.6);
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          opacity: 1;
          width: 25px;
          border-radius: 10px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;