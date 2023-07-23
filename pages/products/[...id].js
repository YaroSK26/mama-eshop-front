/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import Header from "../../components/Header";
import Cart from "../../components/icons/Cart";
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Products";
import { CartContext } from "../../components/CartContext";

const ProductPage = ({ product , _id}) => {
  const { addProduct } = useContext(CartContext);

      const [activeImage, setActiveImage] = useState(product.images?.[0]);

      function handleImageClick(image) {
          setActiveImage(image)
      }

  return (
    <>
      <Header></Header>
      <div className="flex    lg:flex-row  flex-col   m-auto  ">
        <div className="bg-gray-200 w-96 h-96 ml-20 mt-10 flex flex-col justify-center items-center ">
          <img
            className="w-72 h-72 mt-2 overflow-hidden  rounded-md "
            src={activeImage}
            alt=""
          />
          <div className="flex my-2 gap-3 mb-2 first-letter: ">
            {product.images.map((image) => (
              <div
                key={image}
                active={image === activeImage}
                onClick={() => handleImageClick(image)}
                className={`cursor-pointer ${
                  activeImage === image ? "border-2 border-blue-500" : ""
                }`}
              >
                <img className="w-24 h-24 rounded-md border-2" src={image} />
              </div>
            ))}
          </div>
        </div>

        <div className="ml-20 ">
          <h1 className="font-bold text-3xl mt-10  mb-5">{product.title}</h1>
          <p className="w-96 mb-5">{product.description}</p>
          <div className="flex gap-8 relative ">
            <p className="font-bold text-xl mb-2">{product.price}€</p>

            <button
              onClick={() => addProduct(product._id)}
              className="  absolute  primary  left-12 bottom-1 whitespace-nowrap flex  gap-1 "
            >
              <Cart></Cart>Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}