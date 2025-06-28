import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

const Reservation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    phone: "",
    guests: "2", // Default number of guests
  });
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.date || !formData.time || !formData.phone || !formData.guests) {
        throw new Error("Please fill all fields");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Phone validation (10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      // Validate number of guests
      if (parseInt(formData.guests) < 1 || parseInt(formData.guests) > 20) {
        throw new Error("Number of guests must be between 1 and 20");
      }

      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reservation/send`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);

      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
        time: "",
        phone: "",
        guests: "2",
      });
    } catch (error) {
      // Improved error handling
      const errorMessage =
        error.response?.data?.message || error.message || "Reservation failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="reservation" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call +919047172095</p>
            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  min="11:00"
                  max="22:00"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone (10 digits)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "RESERVE NOW"}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;