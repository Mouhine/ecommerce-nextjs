import React, { useEffect, useState } from "react";
import { client, urlFor } from "../utils/Client";
import Cart from "./ProductCard";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { handleCheckout } from "../utils/PaymentFunctions";
import Link from "next/link";
const FooterBanner = () => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getBanner = async () => {
      try {
        const Banner = await client.fetch(`*[_type == "banner"]`);
        setBanner(Banner[1]);
        console.log(banner);
      } catch (error) {
        console.log(error);
      }
    };
    const getProducts = async () => {
      const products = await client.fetch(`*[_type == "product"]`);
      setProducts(products);
    };
    getProducts();
    getBanner();
  }, []);
  return (
    <div className="grid grid-cols-12 grid-rows-2 max-w-5xl w-[90%] mx-auto min-h-[50vh] my-8 gap-4">
      <section className="  col-span-12 md:col-span-8 lg:col-span-8 bg-blue-400  lg:row-span-2 md:h-[50vh] p-4 rounded-lg">
        <div className=" p-4  rounded-lg   mx-auto flex flex-col md:flex-row justify-between items-center ">
          <div className="md:w-[50%]">
            {banner?.cover && (
              <img src={urlFor(banner?.cover)} className="w-full" />
            )}
          </div>
          <div className="space-y-6 md:w-[70%]">
            <h1 className="text-3xl font-bold text-[#1c412f] ">
              {banner?.title1}
            </h1>
            <p className="text-gray-300 text-sm pb-2  ">{banner?.title2}</p>

            <Link href={"/product/43f5aed8-e2ae-4fc0-a794-5bf10e183047"}>
              <button className="text-white bg-[#1c412f] px-8 py-2 rounded-full">
                Learn more
              </button>
            </Link>
          </div>
          <div>
            <h1></h1>
          </div>
        </div>
      </section>
      <section className=" col-span-12 md:col-span-4 flex  flex-col items-center row-span-2   space-y-4   gap-2 ">
        {products?.slice(3, 5).map((p) => {
          return (
            <section
              key={p._id}
              className="relative h-full w-full z-20  border bg-[#fcf0e4]  p-4 rounded-xl overflow-hidden"
            >
              <Link href={`/product/${p._id}`}>
                <div className="  mx-auto absolute top-0 -z-20 ">
                  {p.cover && (
                    <img
                      src={urlFor(p.cover)}
                      alt=""
                      className="w-full h-full rounded-lg object-fill"
                    />
                  )}
                </div>
              </Link>
              <h1 className="absolute top-6 left-4 text-[#fff]  font-medium">
                {p.title.slice(0, 60)}
              </h1>
              <div className="flex items-center justify-between absolute w-full  bottom-1 left-0 px-4">
                <button
                  className="text-white bg-[#1c412f] px-4 py-1 rounded-full   "
                  onClick={() => handleCheckout([p])}
                >
                  Buy Now
                </button>
                <button
                  className="border p-2 rounded-full  bg-white  "
                  onClick={() => dispatch(addToCart(p))}
                >
                  <MdAddShoppingCart />
                </button>
              </div>
              <div className="absolute w-full inset-0 bg-black/50 -z-30 "></div>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default FooterBanner;
