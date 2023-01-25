import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { client, urlFor } from "../utils/Client";
const Banner = () => {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    const getBanner = async () => {
      try {
        const Banner = await client.fetch(`*[_type == "banner"]`);
        setBanner(Banner[0]);
        console.log(banner);
      } catch (error) {
        console.log(error);
      }
    };
    getBanner();
  }, []);
  return (
    <div className="w-[100%] max-w-5xl my-[80px] min-h-[50vh] rounded-lg border py-4  bg-[#fcf0e4] mx-auto flex flex-col md:flex-row  justify-between items-center ">
      {banner?.cover && (
        <img src={urlFor(banner?.cover)} height={400} width={400} />
      )}
      <div className="space-y-6 w-[90%] md:w-1/2">
        <h1 className="text-4xl font-bold text-[#1c412f] ">{banner?.title1}</h1>
        <p className="text-gray-600 font-bold  ">{banner?.title2}</p>
        <button className="text-white bg-[#1c412f] px-8 py-2 rounded-full">
          Buy Now
        </button>
      </div>
      <div>
        <h1></h1>
      </div>
    </div>
  );
};

export default Banner;
