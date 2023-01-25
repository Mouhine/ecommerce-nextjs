import React from "react";
import {
  removeFromCart,
  clearCart,
  setCartState,
} from "../redux/features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { urlFor } from "../utils/Client";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import { setTotalPrice } from "../redux/features/cartSlice";
import { handleCheckout } from "../utils/PaymentFunctions";
import PaypalBtns from "./PaypalBtns";

const Cart = () => {
  const dispatch = useDispatch();
  const { carteItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(setTotalPrice());
    console.log(totalPrice);
  }, [totalItems]);
  return (
    <div className="fixed right-0 top-0 bg-white max-w-md w-full md:1/3 lg:w-1/4 min-h-screen  drop-shadow z-50 px-2">
      <div className="flex items-center justify-between py-4 px-2">
        <p className="text-lg font-medium "> Cart</p>
        <button onClick={() => dispatch(setCartState())}>
          <AiFillCloseCircle size={24} />
        </button>
      </div>
      <div className="space-y-2 max-h-[300px]  overflow-y-scroll ">
        {carteItems?.map((p) => {
          return (
            <article className="flex relative items-start   space-x-4 border bg-white  p-2 ">
              <div className=" w-1/3">
                {p.cover && (
                  <img
                    src={urlFor(p.cover)}
                    alt=""
                    className="w-full object-fill"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-4 items-start mt-4">
                <h1 className="text-sm">{p.title.slice(0, 50)}</h1>
                <div className="flex items-center justify-between w-full">
                  <p>{p.price * p.q + " $"}</p>
                  <p>{p.q}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(p._id))}
                className="absolute right-1 top-1 "
              >
                <AiFillCloseCircle size={24} />
              </button>
            </article>
          );
        })}
      </div>

      <div className="absolute left-0 bottom-0 space-y-2   w-full  px-4 ">
        <div className="flex justify-between items-center">
          <p>Total Items</p>
          <p>{totalItems}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Total Price</p>
          <p>{totalPrice + " $"}</p>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-300 py-2 rounded w-full mx-auto px-2"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
        <div className="flex flex-col justify-between  space-y-2 items-center">
          <button
            className="bg-blue-300 py-2 rounded w-full mx-auto px-2"
            onClick={() => {
              console.log(carteItems);
              handleCheckout(carteItems);
            }}
            disabled={carteItems.length === 0 && true}
          >
            Pay with stripe
          </button>

          {carteItems.length !== 0 && (
            <div className="w-full">
              <PaypalBtns />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
