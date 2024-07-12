"use client";

import UseAxiosAuth from "@/utils/axiosClient";
import Image from "next/image";
import avatar from "@/assets/images/userDefault.png";
import { http } from "@/utils/config";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeedBackHome() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  // const instance = UseAxiosAuth();

  const fetchData = async () => {
    try {
      const res = await http.get(`/api/v1/review`);
      if (res.data.status === 200 || res.data.status === 201) {
        let tempRes = res.data.data;
        setFeedbacks(tempRes);
        console.log(tempRes);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid bg-light pt-5 p-0 py-5">
        <div className="container p-0 py-5">
          <div className="d-flex flex-column text-center mb-5">
            <h4 className="text-secondary mb-3">Testimonial</h4>
            <h1 className="display-4 m-0">
              Our Client <span className="text-primary">Says</span>
            </h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <Slider {...settings}>
              {feedbacks.map((feedback: any) => {
                return (
                  <>
                    <div className="bg-white mx-auto p-4">
                      <div className="d-flex align-items-end mb-3 mt-n4 ml-n4 p-3">
                        <Image
                          className="img-fluid"
                          src={avatar}
                          style={{ width: "80px", height: "80px" }}
                          alt=""
                        />
                        <div className="ml-3">
                          <h5>{feedback.author}</h5>
                          <i>
                            <Rate
                              defaultValue={Number(feedback.rating)}
                              disabled
                            ></Rate>
                          </i>
                          <p className="m-0">{feedback.comment}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
