"use client";

import FeedBackHome from "@/app/(homepage)/_components/feedback";
import ServiceHome from "@/app/(homepage)/_components/serviceHome";

const ServicePage = () => {
  return (
    <>
      <section>
        <ServiceHome></ServiceHome>
      </section>

      <section>
        <FeedBackHome></FeedBackHome>
      </section>
    </>
  );
};

export default ServicePage;
