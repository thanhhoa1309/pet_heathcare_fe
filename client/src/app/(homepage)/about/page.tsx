"use client";
import Image from "next/image";
import * as image from "@/assets/images/images";

const AboutPage = () => {
  return (
    <>
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
              Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore
              sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet
              dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed
              diam duo
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
                <Image className="img-fluid w-100" src={image.about1} alt="" />
              </div>
              <div className="col-6 p-0">
                <Image className="img-fluid w-100" src={image.about2} alt="" />
              </div>
              <div className="col-6 p-0">
                <Image className="img-fluid w-100" src={image.about3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
              vero no sit. Et elitr stet sed sit sed kasd. Erat duo eos et erat
              sed diam duo
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
    </>
  );
};

export default AboutPage;
