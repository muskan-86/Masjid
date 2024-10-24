import React, { useState, useEffect } from "react";
import "./Loader.css";
import AOS from "aos";
import "aos/dist/aos.css";
const Loader = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 90,
      delay:200,
    });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {loading ? (
        <div id="loader" className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      ) : (
        <div id="main-content">  
        </div>
      )}
    </div>
  );
};

export default Loader;

