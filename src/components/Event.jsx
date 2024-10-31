import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../firebase-config"; // Import Firebase config
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Event.css";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "gray",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        right: "2px",
        zIndex: 50,
        cursor: "pointer",
      }}
      onClick={onClick}
    ></div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "gray",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        left: "2px",
        zIndex: 50,
        cursor: "pointer",
      }}
      onClick={onClick}
    ></div>
  );
};

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false); // Track image loading
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedEvents = eventsList.sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Failed to load events.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Preload images to prevent flicker
  useEffect(() => {
    if (events.length) {
      const promises = events.map((event) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = event.posterUrl;
          img.onload = resolve;
        });
      });

      Promise.all(promises).then(() => setImagesLoaded(true));
    }
  }, [events]);

  // Detect window resize for mobile/desktop layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePosterClick = (eventId) => {
    navigate(`/event-details/${eventId}`, { state: { eventId } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    autoplay: !isMobile,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
   
    afterChange: (current) => setCurrentSlide(current),
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          background: i === currentSlide ? getDotColor(i) : "gray",
          borderRadius: "50%",
          transition: "background-color 0.3s ease",
        }}
      />
    ),
  };

  const getDotColor = (i) => {
    return "#10B981"; // Tailwind color for active dots
  };

  if (loading || !imagesLoaded) return <div>Loading...</div>;

  if (!events.length) return <div>No events available to display.</div>;

  return (
    <div
      style={{
        width: "80%",
        maxWidth: isMobile ? "450px" : "1500px",
        margin: "0 auto",
      }}
    >
      <Slider {...settings}>
        {events.map((event) => (
          <div
            key={event.id}
            className="card w-70 rounded-lg"
            onClick={() => handlePosterClick(event.id)}
          >
            <div className="relative flex flex-col items-center justify-center">
              <img
                className="h-72 rounded-2xl w-72 object-cover mb-4"
                src={event.posterUrl}
                alt={event.title}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Event;
