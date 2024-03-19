import React from "react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import FaqSection from "../components/FaqSection";

const Home = () => {
  return (
    <div className="d-flex align-items-center justify-content-center text-center flex-column">
      <h1 className="px-2 px-lg-5 mx-lg-5 lh-base mt-5 pt-5 display-6">
        <span className="text-primary"> Secure File </span> Sharing Made Simple:
        <br /> Welcome to <span className="text-primary"> DataDrop</span>!
      </h1>
      <div className="d-flex mt-4">
        <Link to="/login" className="btn btn-primary me-lg-3 px-4">
          Get Started
        </Link>
        <Link
          to="/about"
          className="btn btn-link text-decoration-none text-dark"
        >
          Learn More
        </Link>
      </div>

      <Features />
      <Testimonials />
      <FaqSection />
    </div>
  );
};

export default Home;
