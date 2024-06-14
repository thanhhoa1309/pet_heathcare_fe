"use client";
import Image from "next/image";
import * as image from "@/assets/images/images";

const BookingPage = () => {
  return (
    <>
      <section>
        <div className="container-fluid bg-light pt-5">
          <div className="container py-5">
            <div className="row pb-3">
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                  <h3 className="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
                  <h3 className="mb-3">Pet Boarding</h3>
                  <p>
                    Diam amet eos at no eos sit lorem, amet rebum ipsum clita
                    stet, diam sea est magna diam eos, rebum sit vero stet ipsum
                    justo
                  </p>
                  <a className="text-uppercase font-weight-bold" href="">
                    Read More
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                  <h3 className="flaticon-food display-3 font-weight-normal text-secondary mb-3"></h3>
                  <h3 className="mb-3">Pet Feeding</h3>
                  <p>
                    Diam amet eos at no eos sit lorem, amet rebum ipsum clita
                    stet, diam sea est magna diam eos, rebum sit vero stet ipsum
                    justo
                  </p>
                  <a className="text-uppercase font-weight-bold" href="">
                    Read More
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                  <h3 className="flaticon-grooming display-3 font-weight-normal text-secondary mb-3"></h3>
                  <h3 className="mb-3">Pet Grooming</h3>
                  <p>
                    Diam amet eos at no eos sit lorem, amet rebum ipsum clita
                    stet, diam sea est magna diam eos, rebum sit vero stet ipsum
                    justo
                  </p>
                  <a className="text-uppercase font-weight-bold" href="">
                    Read More
                  </a>
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
      </section>
    </>
  );
};

export default BookingPage;
