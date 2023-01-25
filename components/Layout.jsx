import { useSelector } from "react-redux";
import Navbar from "./navBar";
import Cart from "./Cart";

export default function Layout({ children }) {
  const { carteItems, isOpen } = useSelector((state) => state.cart);

  return (
    <>
      {isOpen && <Cart />}
      <Navbar />
      <main>{children}</main>
    </>
  );
}
