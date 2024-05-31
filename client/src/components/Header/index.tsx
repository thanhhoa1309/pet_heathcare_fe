"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className="container-fluid">
        <div className="row py-3 px-lg-5">
          <div className="col-lg-4">
            <a href="" className="navbar-brand d-none d-lg-block">
              <h1 className="m-0 display-5 text-capitalize">
                <span className="text-primary">Pet</span>Lover
              </h1>
            </a>
          </div>
          <div className="col-lg-8 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="d-inline-flex flex-column text-center pr-3 border-right">
                <h6>Opening Hours</h6>
                <p className="m-0">8.00AM - 9.00PM</p>
              </div>
              <div className="d-inline-flex flex-column text-center px-3 border-right">
                <h6>Email Us</h6>
                <p className="m-0">info@example.com</p>
              </div>
              <div className="d-inline-flex flex-column text-center pl-3">
                <h6>Call Us</h6>
                <p className="m-0">+012 345 6789</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-lg-5">
          <a href="" className="navbar-brand d-block d-lg-none">
            <h1 className="m-0 display-5 text-capitalize font-italic text-white">
              <span className="text-primary">Safety</span>First
            </h1>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between px-3"
            id="navbarCollapse"
          >
            <div className="navbar-nav mr-auto py-0">
              <a href="index.html" className="nav-item nav-link active">
                Home
              </a>
              <a href="about.html" className="nav-item nav-link">
                About
              </a>
              <a href="service.html" className="nav-item nav-link">
                Service
              </a>
              <a href="price.html" className="nav-item nav-link">
                Price
              </a>
              <a href="booking.html" className="nav-item nav-link">
                Booking
              </a>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Pages
                </a>
                <div className="dropdown-menu rounded-0 m-0">
                  <a href="blog.html" className="dropdown-item">
                    Blog Grid
                  </a>
                  <a href="single.html" className="dropdown-item">
                    Blog Detail
                  </a>
                </div>
              </div>
              <a href="contact.html" className="nav-item nav-link">
                Contact
              </a>
            </div>
            <Link
              href="/auth/login"
              className="btn btn-lg btn-primary px-3 d-none d-lg-block"
            >
              Sign in
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
