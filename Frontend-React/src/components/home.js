import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./navbar";


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <p className="primary-subheading">Welcome to the Library Management System of Aurora’s PG College.</p>
          <h1 className="primary-heading">
            Your Gateway to Knowledge Starts Here.
          </h1>
          <p className="primary-text">
           Here, you can easily explore, search, and manage a wide collection of your favorite books across all genres and categories. Whether you’re a casual reader or a research enthusiast, our library is your go-to destination for knowledge and inspiration.
          </p>
          {/* <button className="secondary-button">
            Explore 
          </button> */}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;