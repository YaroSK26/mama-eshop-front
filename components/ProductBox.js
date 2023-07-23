/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import Cart from "./icons/Cart";
import { CartContext} from "../components/CartContext"
import Link from "next/link";





const ProductBox = ({_id, title,  price, images ,}) => {

  const { addProduct } = useContext(CartContext);
  

  return (
    <div>
      <Link key={_id} href={"/products/" + _id}>
        <div className=" w-60 h-64 bg-gray-200 relative rounded-lg m-2">
          <div className="bg-white w-48 h-32 absolute top-3 left-6 rounded-md">
            <img
              className=" absolute top-4 left-12 rounded-md  w-24 h-24"
              src={images?.[0]}
              alt=""
            />
          </div>
          <div className="absolute top-48 left-1  gap-10 mx-6 flex">
            <span>
              <p className="absolute bottom-3 whitespace-nowrap">{title}</p>
            </span>
            <p className="absolute top-3 font-bold">{price}€</p>
          </div>
        </div>
      </Link>
      <div className="relative" onClick={() => addProduct(_id)}>
        <button className="  absolute left-28 bottom-7 primary  whitespace-nowrap flex  gap-1 ">
          <Cart></Cart>Add to cart
        </button>
      </div>
      
    </div>
  );
};

export default ProductBox;
