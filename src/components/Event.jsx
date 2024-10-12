import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from '../firebase-config'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Event.css";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        width: "20px",  // You can adjust for mobile here
        height: "20px",
        right: '10px',
        zIndex: 50,
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        width: "20px", // You can adjust for mobile here
        height: "20px",
        left: '10px',
        zIndex: 50,
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );
};

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort events by order property (ascending)
        const sortedEvents = eventsList.sort((a, b) => (a.order || 0) - (b.order || 0));
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Failed to load events.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handlePosterClick = (eventId) => {
    navigate(`/event-details/${eventId}`, { state: { eventId } });
  };

  const [slidesToShow, setSlidesToShow] = useState(3);

useEffect(() => {
  const handleResize = () => {
    setSlidesToShow(window.innerWidth < 768 ? 1 : 3);
  };

  window.addEventListener("resize", handleResize);
  handleResize(); // Set initial value

  return () => window.removeEventListener("resize", handleResize);
}, []);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  afterChange: (current) => setCurrentSlide(current),
  customPaging: (i) => (
    <div
      style={{
        width: "12px",
        height: "12px",
        marginTop: "20px",
        background: i === currentSlide ? getDotColor(i) : "gray",
        borderRadius: "50%",
        transition: 'background-color 0.3s ease',
      }}
    />
  ),
};

  
  const getDotColor = (i) => {
    return "#10B981"; // Tailwind color for active dots
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container gap-5" style={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
      <Slider {...settings}>
        {events.map(event => (
          <div key={event.id} className="card w-70 rounded-lg" onClick={() => handlePosterClick(event.id)}>
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img className="h-72 rounded-2xl w-72 object-cover" src={event.posterUrl} alt={event.title} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Event;
