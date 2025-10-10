import React from 'react';
import styled from 'styled-components';

const ServiceCard = ({
  width = "250px",
  height = "300px",
  image,
  title = "Service Title",
  description = "Short description about this service goes here.",
  buttonText = "Learn More"
}) => {
  return (
    <StyledWrapper width={width} height={height}>
      <div className="card">
        <div className="bg">
          {image && <img src={image} alt={title} className="card-img" />}
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
          <button className="card-btn">{buttonText}</button>
        </div>
        <div className="blob" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #efefef;
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(${(props) => props.width} - 10px);
    height: calc(${(props) => props.height} - 10px);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    z-index: 2;
    outline: 2px solid white;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    text-align: center;
    gap: 10px;
  }

  .card-img {
    max-width: 100%;
    max-height: 40%;
    object-fit: cover;
    border-radius: 8px;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }

  .card-desc {
    font-size: 0.9rem;
    color: #555;
    flex-grow: 1; /* pushes button to bottom */
  }

  .card-btn {
    background: #565656;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease;
  }

  .card-btn:hover {
    background: #BCBCBC;
    color: black;
  }

  .blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: calc(${(props) => props.width} * 0.6);
    height: calc(${(props) => props.height} * 0.6);
    border-radius: 50%;
    background-color: #565656;
    filter: blur(12px);
    animation: blob-bounce 5s infinite ease;
  }

  @keyframes blob-bounce {
    0%   { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
    25%  { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
    50%  { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
    75%  { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
    100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
  }
`;

export default ServiceCard;
