import React from 'react';
import "aos/dist/aos.css";
import "./output.css";

const Services = () => {

  return (
    <div className="overflow-x-hidden">
      {/* Services List */}
      <div className="flex flex-row flex-wrap justify-around items-center" data-aos="slide-left">
        {/* Service 1 */}
        <div className="flex flex-col gap-12 justify-center items-center p-10">
          <div className="min-h-40 flex flex-col min-w-40 bg-mediumseagreen-300 justify-center items-center rounded-full">
            <img
              className="w-20 h-20 text-center"
              src="./public/graduation-cap@2x.png"
              alt="Education Icon"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-2xl">Education</h3>
            <p className="text-center mt-2 w-full max-w-xs">
              We provide Islamic education to the community. We have a dedicated team of teachers who teach Quran,
              Hadith, and other Islamic subjects.
            </p>
          </div>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col gap-12 justify-center items-center p-10">
          <div className="min-h-40 flex flex-col min-w-40 bg-mediumseagreen-300 justify-center items-center rounded-full">
            <img
              className="w-20 h-20 text-center"
              src="./public/users@2x.png"
              alt="Community Icon"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-2xl">Community</h3>
            <p className="text-center mt-2 w-full max-w-xs">
              We provide support and services to strengthen the community. Our activities include social events, support groups, and outreach.
            </p>
          </div>
        </div>

        {/* Service 3 */}
        <div className="flex flex-col gap-12 justify-center items-center p-10">
          <div className="min-h-40 flex flex-col min-w-40 bg-mediumseagreen-300 justify-center items-center rounded-full">
            <img
              className="w-20 h-20 text-center"
              src="./public/today@2x.png"
              alt="Religious Events Icon"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-2xl">Religious Events</h3>
            <p className="text-center mt-2 w-full max-w-xs">
              We organize various religious events, including prayers, lectures, and community gatherings to promote spiritual growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
