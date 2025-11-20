// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
import bg from '../assets/earth.png';
import logoImg from '../assets/logo.png';

export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add('landing-mode');
    return () => document.body.classList.remove('landing-mode');
  }, []);

  return (
    <div className="landing-root">
      {/* HERO wrapper: overlays + bg are limited to this area only */}
      <header className="hero-wrapper">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        />
        <div className="hero-overlay-multiply" />
        <div className="hero-overlay-gradient" />

        <div className="hero-inner">
          <div className="landing-logo">
            <img src={logoImg} alt="WasteZero logo" />
          </div>

          <div className="landing-content">
            <h1 className="landing-title">
              Together for a <span className="accent"></span>
            </h1>
            <h1 className="landing-title">
              <span className="accent">Cleaner Tomorrow</span>
            </h1>

            <p className="landing-sub">
              Small actions today create sustainable tomorrows. Join WasteZero and make your neighborhood greener.
            </p>

            <div className="landing-ctas">
              <Link to="/signup" className="btn-primary">Get Started →</Link>
              <a href="#schedule" className="btn-secondary">Schedule Pickup</a>
            </div>

            <p className="landing-stat">♻️ <strong>12,458 kg</strong> of waste recycled through WasteZero this month!</p>

            <div className="landing-tags">
              <span className="tag">Free Pickups</span>
              <span className="tag">Eco-Friendly</span>
              <span className="tag">24/7 Support</span>
              <span className="tag">Community Driven</span>
            </div>
          </div>
        </div>
      </header>

      {/* === content below the hero — overlays no longer cover these === */}
      <main>
        <section className="about-section" id="about">
          <h2>About WasteZero</h2>
          <p>
            WasteZero is dedicated to creating cleaner, greener communities by helping individuals
            and organizations reduce waste and recycle efficiently. We believe sustainability starts
            with small, consistent actions — and we make those actions easy.
          </p>
        </section>

        <section className="features-section">
          <h2>Our Mission</h2>
          <p>
            To empower people to take charge of their environmental impact through smart waste
            management solutions. Together, we can build a future where every city shines with
            sustainability.
          </p>
        </section>

        <section className="contact-section" id="schedule">
          <h2>Contact Us</h2>
          <p>
            Have questions or want to collaborate? We’d love to hear from you! Join our mission to
            make the planet waste-free.
          </p>
         
        </section>
      </main>
    </div>
  );
}
