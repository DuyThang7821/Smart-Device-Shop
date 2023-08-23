import React, { useEffect, useState } from "react";
import { Banner, Sidebar, BestSellers } from "../../components";

const Home = () => {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[20%] flex-auto ">
          <Sidebar />
          <span>Deal daily</span>
        </div>

        <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto ">
          <Banner />

          <BestSellers />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};
export default Home;
