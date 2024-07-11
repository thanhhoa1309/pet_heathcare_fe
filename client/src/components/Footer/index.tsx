"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="container-fluid bg-dark text-white pb-5 px-sm-3 px-md-5">
        <div className="row pt-5">
          <div className="col-lg-4 col-md-12 mb-5">
            <h1 className="mb-3 display-5 text-capitalize text-white">
              <span className="text-primary">Pet</span>Lover
            </h1>
            <p className="m-0">
              Welcome to Pet Lover, your online pet shop! We offer high-quality
              pet supplies, from food and toys to grooming essentials. With
              great customer service and fast shipping, Pet Lover is your go-to
              for all pet needs. Visit us today!
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="text-primary mb-4">Get In Touch</h5>
                <p>
                  <i className="fa fa-map-marker-alt mr-2"></i>Ho Chi Minh city
                </p>
                <p>
                  <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
                </p>
                <p>
                  <i className="fa fa-envelope mr-2"></i>PetLover@gmail.com
                </p>
                <div className="d-flex justify-content-start mt-4">
                  {/* <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                    style={{ width: "36px", height: "36px" }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                    style={{ width: "36px", height: "36px" }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                    style={{ width: "36px", height: "36px" }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                    style={{ width: "36px", height: "36px" }}
                    href="#"
                  >
                    <i className="fab fa-instagram"></i>
                  </a> */}
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-primary mb-4">Popular Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link className="text-white mb-2" href="/">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </Link>
                  <Link className="text-white mb-2" href="/about">
                    <i className="fa fa-angle-right mr-2"></i>About Us
                  </Link>
                  <Link className="text-white mb-2" href="/service">
                    <i className="fa fa-angle-right mr-2"></i>Our Services
                  </Link>
                  <Link className="text-white mb-2" href="/booking">
                    <i className="fa fa-angle-right mr-2"></i>Booking
                  </Link>
                  <Link className="text-white" href="/contact">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-primary mb-4">Newsletter</h5>
                <form action="">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control border-0"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-lg btn-primary btn-block border-0"
                      type="submit"
                    >
                      Submit Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="container-fluid text-white py-4 px-sm-3 px-md-5"
        style={{ background: "#111111" }}
      >
        <div className="row">
          <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white"></p>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <ul className="nav d-inline-flex">
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">
                  Privacy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">
                  Terms
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">
                  FAQs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
}
