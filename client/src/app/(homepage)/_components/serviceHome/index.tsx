"use client";

import UseAxiosAuth from "@/utils/axiosClient";
import { http } from "@/utils/config";
import { useEffect, useState } from "react";

export default function ServiceHome() {
  const [services, setServices] = useState<any[]>([]);
  // const instance = UseAxiosAuth();

  const fetchData = async () => {
    try {
      const res = await http.get(`/api/v1/service`);
      if (res.data.status === 200 || res.data.status === 201) {
        let tempRes = res.data.data;
        setServices(tempRes);
        console.log(tempRes);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid bg-light pt-5">
        <div className="container py-5">
          <div className="d-flex flex-column text-center mb-5">
            <h4 className="text-secondary mb-3">Our Services</h4>
            <h1 className="display-4 m-0">
              <span className="text-primary">Premium</span> Pet Services
            </h1>
          </div>
          <div className="row pb-3">
            {services.map((service: any) => {
              return (
                <>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                      <h3 className="flaticon-vaccine display-3 font-weight-normal text-secondary mb-3"></h3>
                      <h3 className="mb-3">{service.name}</h3>
                      <p>Price: ${service.price}</p>
                      <p>Type: {service.type}</p>
                      {/* <a className="text-uppercase font-weight-bold" href="">
                        Read More
                      </a> */}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
