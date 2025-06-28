import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
              Welcome to Velvet Dine, where fine dining meets elegance and comfort.
              We take pride in offering a delightful culinary experience with a menu
              crafted to satisfy every palate. Our seamless reservation system ensures
              that booking your table is effortless, whether for a casual dinner or a
              special occasion. At Velvet Dine, we focus on exceptional service, warm
              ambiance, and mouthwatering flavors that create unforgettable memories.
              Reserve your table today and indulge in a truly refined dining experience!
            </p>
            <Link to={"/menu"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
