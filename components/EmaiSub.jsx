import React from "react";

const EmaiSub = () => {
  return (
    <div className="  max-w-5xl w-full mb-6 min-h-[40vh]  mx-auto rounded bg-[#fcf0e4] grid place-content-center my-2 ">
      <div className=" relative max-w-full md:w-1/3 lg:w-1/2 w-full px-2 mx-auto flex flex-col items-center space-y-4 ">
        <h1 className="text-center  text-3xl font-medium  text-[#1c412f]">
          Join our newsLetter to get the latest discounts & offers in our shop
        </h1>
        <input
          type="text"
          placeholder="example@email.com"
          className="py-2 px-4 rounded-full border outline-none w-full "
        />
        <button className=" text-[#fcf0e4] bg-[#1c412f] py-1 px-4 rounded-full border absolute bottom-1 right-4">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default EmaiSub;
