import React from "react";
import { urlFor } from "../utils/Client";
import { MdAddShoppingCart } from "react-icons/md";
import Link from "next/link";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckout } from "../utils/PaymentFunctions";
const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const { carteItems } = useSelector((state) => state.cart);

  return (
    <section className="relative  rounded-lg border h-[300px] ">
      <Link href={`/product/${p._id}`}>
        <div key={p.id} className=" border rounded-lg m-3 h-[60%]">
          {p?.cover && (
            <img
              src={urlFor(p.cover)}
              alt=""
              className="w-full h-full object-fill "
            />
          )}
        </div>
      </Link>
      <h1 className="px-2 font-semibold  text-gray-500">
        {p.title.slice(0, 40)}
      </h1>
      {/* <p className="font-mono text-sm text-gray-400 p-3">
                {p.description.slice(0, 60) + "..."}
              </p> */}
      <div className="flex items-center justify-between px-2 py-2">
        <button
          className="border p-2 rounded-full "
          onClick={() => {
            dispatch(addToCart({ ...p, q: 1 }));
          }}
        >
          <MdAddShoppingCart />
        </button>
        <button className="px-5 0  top-1 left-2 border rounded-xl ">
          {p.price + "$"}
        </button>
      </div>
    </section>
  );
};

export default ProductCard;
