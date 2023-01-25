import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { RiStore2Line } from "react-icons/ri";
import { setCartState } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
const NavBar = () => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);
  return (
    <nav className="flex fixed top-0 left-[50%] -translate-x-[50%] z-40 bg-white drop-shadow  items-center justify-between max-w-5xl w-[100%] mx-auto border-b py-4 px-6">
      <Link href={"/"}>
        <RiStore2Line />
      </Link>
      <div className="relative">
        <BiCartAlt
          onClick={() => dispatch(setCartState())}
          className="cusor-pointer"
        />
        {totalItems !== 0 && (
          <div className="absolute -top-2 -right-3 w-4 grid place-content-center h-4 bg-red-200  rounded-full border">
            <p
              style={{
                fontSize: "6px",
              }}
              className=""
            >
              {totalItems}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
