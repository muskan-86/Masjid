import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Event = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
          breakpoint: 480, // Small screens (e.g., phones)
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            horizontal: true, // Enable vertical scrolling for small screens
          },
        },
      ],
    customPaging: () => (
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "gray",
          borderRadius: "50%",
        }}
      />
    ),
    
  };

  return (
    <div 
    className="container gap-5" 
    style={{ 
      width: "90%", 
      maxWidth: "1500px", 
      margin: "0 auto"  
    }}
  >
    <Slider {...settings}>
      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-80 object-cover" src="/Why-Islam-is-true-1536x1536.jpg" alt="Event 1" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/Discussion-Navigating-Relationships.jpg" alt="Event 2" />
          <div className="absolute bottom-5    flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/traditional-iftar-fast-breaking.jpg" alt="Event 3" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/khutba.jpg" alt="Event 4" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/donations.jpg" alt="Event 5" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/community.jpg" alt="Event 6" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 shadow-2xl rounded-2xl w-72 object-cover" src="/Islamic-Studies-Course-Quran-Oasis.jpg" alt="Event 7" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/quran.jpg" alt="Event 8" />
          <div className="absolute bottom-5   flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="card w-70 rounded-lg">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <img className="h-72 rounded-2xl w-72 object-cover" src="/khutba.jpg" alt="Event 9" />
          <div className="absolute bottom-5  flex items-center justify-center">
            <button className="w-[100%] text-center font-semibold text-black bg-white bg-opacity-100 py-2 px-5 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      </div>
    </Slider>
  </div>
  );
};

export default Event;
