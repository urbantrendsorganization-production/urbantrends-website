import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [getServices, setGetServices] = useState([]);
  const backendLink = import.meta.env.VITE_MAIN_LINK;
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${backendLink}/v2/api/services`);
      setGetServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    const scrollAmount = 350;
    current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
  };

  const handleRedirect = (slug) => {
    navigate(`/services/${slug}`)
  };

  return (
    <section className="card-section">
      <button className="scroll-arrow left" onClick={() => scroll('left')}>
        &lt;
      </button>

      <div className="card-container" ref={scrollRef} >
        {getServices?.map((service) => (
          <div className="card" key={service.id} onClick={ () => handleRedirect(service.slug)}>
            <img
              src={service.service_image}
              alt={service.title}
              className="card-img"
            />
            <div className="card-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <br />
              <p className='text-sm'>({service.slug})</p>
            </div>
          </div>
        ))}
      </div>

      <button className="scroll-arrow right" onClick={() => scroll('right')}>
        &gt;
      </button>
    </section>
  );
};

export default Card;
