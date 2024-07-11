"use client";
import Image from "next/image";
import * as image from "@/assets/images/images";
import ServiceHome from "@/app/(homepage)/_components/serviceHome";
import FeedBackHome from "@/app/(homepage)/_components/feedback";
import "@/styles/homepage.scss";

export default function Home() {
  return (
    <>
      <section>
        <div className="container-fluid p-0">
          <div
            id="header-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Image className="w-100" src={image.carousel1} alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h3 className="text-white mb-3 d-none d-sm-block">
                      Best Pet Services
                    </h3>
                    <h1 className="display-3 text-white mb-3">
                      Keep Your Pet Happy
                    </h1>
                    <h5 className="text-white mb-3 d-none d-sm-block">
                      Duo nonumy et dolor tempor no et. Diam sit diam sit diam
                      erat
                    </h5>
                    <a
                      href=""
                      className="btn btn-lg btn-primary mt-3 mt-md-4 px-4"
                    >
                      Book Now
                    </a>{" "}
                    <a
                      href=""
                      className="btn btn-lg btn-secondary mt-3 mt-md-4 px-4"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <Image className="w-100" src={image.carousel2} alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h3 className="text-white mb-3 d-none d-sm-block">
                      Best Pet Services
                    </h3>
                    <h1 className="display-3 text-white mb-3">
                      Pet Spa & Grooming
                    </h1>
                    <h5 className="text-white mb-3 d-none d-sm-block">
                      Duo nonumy et dolor tempor no et. Diam sit diam sit diam
                      erat
                    </h5>
                    <a
                      href=""
                      className="btn btn-lg btn-primary mt-3 mt-md-4 px-4"
                    >
                      Book Now
                    </a>{" "}
                    <a
                      href=""
                      className="btn btn-lg btn-secondary mt-3 mt-md-4 px-4"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#header-carousel"
              data-slide="prev"
            >
              <div
                className="btn btn-primary rounded"
                style={{ width: "45px", height: "45px" }}
              >
                <span className="carousel-control-prev-icon mb-n2"></span>
              </div>
            </a>
            <a
              className="carousel-control-next"
              href="#header-carousel"
              data-slide="next"
            >
              <div
                className="btn btn-primary rounded"
                style={{ width: "45px", height: "45px" }}
              >
                <span className="carousel-control-next-icon mb-n2"></span>
              </div>
            </a>
          </div>
        </div>

        <div className="container-fluid bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="bg-primary py-5 px-4 px-sm-5">
                  <form className="py-5">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control border-0 p-4"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="form-group">
                      <div
                        className="date"
                        id="date"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control border-0 p-4 datetimepicker-input"
                          placeholder="Reservation Date"
                          data-target="#date"
                          data-toggle="datetimepicker"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div
                        className="time"
                        id="time"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control border-0 p-4 datetimepicker-input"
                          placeholder="Reservation Time"
                          data-target="#time"
                          data-toggle="datetimepicker"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select border-0 px-4"
                        style={{ height: "47px" }}
                      >
                        <option selected>Select A Service</option>
                        <option value="1">Service 1</option>
                        <option value="2">Service 1</option>
                        <option value="3">Service 1</option>
                      </select>
                    </div>
                    <div>
                      <button
                        className="btn btn-dark btn-block border-0 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
                <h4 className="text-secondary mb-3">Going for a vacation?</h4>
                <h1 className="display-4 mb-4">
                  Book For <span className="text-primary">Your Pet</span>
                </h1>
                <p>
                  Labore vero lorem eos sed aliquy ipsum aliquy sed. Vero dolore
                  dolore takima ipsum lorem rebum
                </p>
                <div className="row py-2">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-house font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Pet Boarding</h5>
                      </div>
                      <p>
                        Diam amet eos at no eos sit lorem, amet rebum ipsum
                        clita stet
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-food font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Pet Feeding</h5>
                      </div>
                      <p>
                        Diam amet eos at no eos sit lorem, amet rebum ipsum
                        clita stet
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-grooming font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Pet Grooming</h5>
                      </div>
                      <p className="m-0">
                        Diam amet eos at no eos sit lorem, amet rebum ipsum
                        clita stet
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-toy font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Pet Tranning</h5>
                      </div>
                      <p className="m-0">
                        Diam amet eos at no eos sit lorem, amet rebum ipsum
                        clita stet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row py-5">
            <div className="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5">
              <h4 className="text-secondary mb-3">About Us</h4>
              <h1 className="display-4 mb-4">
                <span className="text-primary">Boarding</span> &{" "}
                <span className="text-secondary">Daycare</span>
              </h1>
              <h5 className="text-muted mb-3">
                Amet stet amet ut. Sit no vero vero no dolor. Sed erat ut sea.
                Just clita ut stet kasd at diam sit erat vero sit.
              </h5>
              <p className="mb-4">
                Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam
                dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr
                stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat
                sed diam duo
              </p>
              <ul className="list-inline">
                <li>
                  <h5>
                    <i className="fa fa-check-double text-secondary mr-3"></i>
                    Best In Industry
                  </h5>
                </li>
                <li>
                  <h5>
                    <i className="fa fa-check-double text-secondary mr-3"></i>
                    Emergency Services
                  </h5>
                </li>
                <li>
                  <h5>
                    <i className="fa fa-check-double text-secondary mr-3"></i>
                    24/7 Customer Support
                  </h5>
                </li>
              </ul>
              <a href="" className="btn btn-lg btn-primary mt-3 px-4">
                Learn More
              </a>
            </div>
            <div className="col-lg-5">
              <div className="row px-3">
                <div className="col-12 p-0">
                  <Image
                    className="img-fluid w-100"
                    src={image.about1}
                    alt=""
                  />
                </div>
                <div className="col-6 p-0">
                  <Image
                    className="img-fluid w-100"
                    src={image.about2}
                    alt=""
                  />
                </div>
                <div className="col-6 p-0">
                  <Image
                    className="img-fluid w-100"
                    src={image.about3}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ServiceHome></ServiceHome>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <Image className="img-fluid w-100" src={image.feature} alt="" />
            </div>
            <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <h4 className="text-secondary mb-3">Why Choose Us?</h4>
              <h1 className="display-4 mb-4">
                <span className="text-primary">Special Care</span> On Pets
              </h1>
              <p className="mb-4">
                Dolor lorem lorem ipsum sit et ipsum. Sadip sea amet diam sed ut
                vero no sit. Et elitr stet sed sit sed kasd. Erat duo eos et
                erat sed diam duo
              </p>
              <div className="row py-2">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-cat font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Best In Industry</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-doctor font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Emergency Services</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <h1 className="flaticon-care font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Special Care</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <h1 className="flaticon-dog font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Customer Support</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-light pt-5 pb-4">
          <div className="container py-5">
            <div className="d-flex flex-column text-center mb-5">
              <h4 className="text-secondary mb-3">Pricing Plan</h4>
              <h1 className="display-4 m-0">
                Choose the <span className="text-primary">Best Price</span>
              </h1>
            </div>
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="card border-0">
                  <div className="card-header position-relative border-0 p-0 mb-4">
                    <Image className="card-img-top" src={image.price2} alt="" />
                    <div
                      className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                      style={{
                        top: "0",
                        left: "0",
                        zIndex: "1",
                        background: "rgba(0, 0, 0, .5)",
                      }}
                    >
                      <h3 className="text-primary mb-3">Basic</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          $
                        </small>
                        49
                        <small
                          className="align-bottom"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Mo
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="card-body text-center p-0">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Feeding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Boarding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-times text-danger mr-2"></i>Spa &
                        Grooming
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-times text-danger mr-2"></i>
                        Veterinary Medicine
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer border-0 p-0">
                    <a
                      href=""
                      className="btn btn-primary btn-block p-3"
                      style={{ borderRadius: "0" }}
                    >
                      Signup Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card border-0">
                  <div className="card-header position-relative border-0 p-0 mb-4">
                    <Image className="card-img-top" src={image.price2} alt="" />
                    <div
                      className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                      style={{
                        top: "0",
                        left: "0",
                        zIndex: "1",
                        background: "rgba(0, 0, 0, .5)",
                      }}
                    >
                      <h3 className="text-secondary mb-3">Standard</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          $
                        </small>
                        99
                        <small
                          className="align-bottom"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Mo
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="card-body text-center p-0">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Feeding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Boarding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>Spa &
                        Grooming
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-times text-danger mr-2"></i>
                        Veterinary Medicine
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer border-0 p-0">
                    <a
                      href=""
                      className="btn btn-secondary btn-block p-3"
                      style={{ borderRadius: "0" }}
                    >
                      Signup Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card border-0">
                  <div className="card-header position-relative border-0 p-0 mb-4">
                    <Image className="card-img-top" src={image.price3} alt="" />
                    <div
                      className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                      style={{
                        top: "0",
                        left: "0",
                        zIndex: "1",
                        background: "rgba(0, 0, 0, .5)",
                      }}
                    >
                      <h3 className="text-primary mb-3">Premium</h3>
                      <h1 className="display-4 text-white mb-0">
                        <small
                          className="align-top"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          $
                        </small>
                        149
                        <small
                          className="align-bottom"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Mo
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="card-body text-center p-0">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Feeding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Boarding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>Spa &
                        Grooming
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Veterinary Medicine
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer border-0 p-0">
                    <a
                      href=""
                      className="btn btn-primary btn-block p-3"
                      style={{ borderRadius: "0" }}
                    >
                      Signup Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 pt-5 pb-3">
          <div className="d-flex flex-column text-center mb-5">
            <h4 className="text-secondary mb-3">Team Member</h4>
            <h1 className="display-4 m-0">
              Meet Our <span className="text-primary">Team Member</span>
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team card position-relative overflow-hidden border-0 mb-4">
                <Image className="card-img-top" src={image.team1} alt="" />
                <div className="card-body text-center p-0">
                  <div className="team-text d-flex flex-column justify-content-center bg-light">
                    <h5>Mollie Ross</h5>
                    <i>Founder & CEO</i>
                  </div>
                  <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team card position-relative overflow-hidden border-0 mb-4">
                <Image className="card-img-top" src={image.team2} alt="" />
                <div className="card-body text-center p-0">
                  <div className="team-text d-flex flex-column justify-content-center bg-light">
                    <h5>Jennifer Page</h5>
                    <i>Chef Executive</i>
                  </div>
                  <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team card position-relative overflow-hidden border-0 mb-4">
                <Image className="card-img-top" src={image.team3} alt="" />
                <div className="card-body text-center p-0">
                  <div className="team-text d-flex flex-column justify-content-center bg-light">
                    <h5>Kate Glover</h5>
                    <i>Doctor</i>
                  </div>
                  <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team card position-relative overflow-hidden border-0 mb-4">
                <Image className="card-img-top" src={image.team4} alt="" />
                <div className="card-body text-center p-0">
                  <div className="team-text d-flex flex-column justify-content-center bg-light">
                    <h5>Lilly Fry</h5>
                    <i>Trainer</i>
                  </div>
                  <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      className="btn btn-outline-primary rounded-circle text-center px-0"
                      style={{ width: "36px", height: "36px" }}
                      href="#"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeedBackHome></FeedBackHome>
      </section>
    </>
  );
}
