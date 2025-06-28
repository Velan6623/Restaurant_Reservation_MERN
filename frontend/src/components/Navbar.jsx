import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartItemCount }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`);
    }
  };

  return (
    <nav>
      {/* Logo on the left */}
      <div className="logo" onClick={() => scrollToSection("home")}>
        VELVET DINE
      </div>

      {/* Navbar links in the center */}
      <div className={`navLinks ${show ? "showmenu" : ""}`}>
        <div className="links">
          <a onClick={() => scrollToSection("home")}>HOME</a>
          <a onClick={() => scrollToSection("about")}>ABOUT US</a>
          <a onClick={() => scrollToSection("services")}>SERVICES</a>
          <a onClick={() => scrollToSection("team")}>TEAM</a>
          <a onClick={() => scrollToSection("reservation")}>RESERVATION</a>
        </div>
      </div>

      {/* OUR MENU and CART buttons on the right */}
      <div className="menuCartButtons">
        <button className="menuBtn" onClick={() => navigate("/menu")}>
          OUR MENU
        </button>
        <button className="cartBtn" onClick={() => navigate("/cart")}>
          CART ({cartItemCount})
        </button>
      </div>

      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;