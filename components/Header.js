
import { useContext } from "react";
import {CartContext }from "./CartContext";
import Logo from "./icons/Logo";
import Link from "next/link";

const Header = ({ products }) => {
  const { cartProducts } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center   bg-green-600 p-3 w-full mb-2 text-white text-lg">
      <Logo></Logo>
        <Link href="/cart">Cart ({cartProducts.length  ||0 })</Link>
      
    </div>
  );
};

export default Header;

