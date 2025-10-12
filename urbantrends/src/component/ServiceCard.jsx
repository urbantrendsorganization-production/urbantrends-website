import React from "react";
import styled from "styled-components";

const ServiceCard = ({
  width = "300px",
  height = "320px",
  image,
  title = "Service Title",
  description = "Short description about this service goes here.",
  buttonText = "Learn More",
}) => {
  return (
    <StyledWrapper width={width} height={height}>
      <div className="card">
        <div className="blob" />
        <div className="bg">
          {image && <img src={image} alt={title} className="card-img" />}
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
          <button className="card-btn">{buttonText}</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    position: relative;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 16px;
    overflow: hidden;
    background: #efefef;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  .bg {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(18px);
    border-radius: 14px;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .card-img {
    width: 100%;
    height: 45%;
    object-fit: cover;
    border-radius: 10px;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 10px;
    color: #333;
  }

  .card-desc {
    font-size: 0.95rem;
    color: #555;
    flex-grow: 1;
    margin-top: 5px;
  }

  .card-btn {
    background: #565656;
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
    transition: background 0.3s ease;
  }

  .card-btn:hover {
    background: #bcbcbc;
    color: #000;
  }

  .blob {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: #565656;
    filter: blur(20px);
    opacity: 0.3;
    animation: blob-bounce 6s infinite ease-in-out;
    z-index: 1;
  }

  @keyframes blob-bounce {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    .card {
      width: 90vw;
      height: auto;
      margin: 10px 0;
    }

    .bg {
      padding: 16px;
    }

    .card-img {
      height: 180px;
    }

    .card-title {
      font-size: 1rem;
    }

    .card-desc {
      font-size: 0.85rem;
    }

    .card-btn {
      width: 100%;
      font-size: 0.9rem;
      padding: 10px 0;
    }

    .blob {
      width: 80%;
      height: 60%;
      filter: blur(14px);
      opacity: 0.25;
    }
  }

  /* 💻 Tablet */
  @media (min-width: 769px) and (max-width: 1024px) {
    .card {
      width: 45vw;
      height: 320px;
    }

    .card-img {
      height: 150px;
    }
  }

  /* 🖥 Desktop */
  @media (min-width: 1025px) {
    .card {
      width: ${(props) => props.width};
      height: ${(props) => props.height};
    }
  }
`;

export default ServiceCard;
