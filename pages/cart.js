/* eslint-disable @next/next/no-img-element */
// Import the Header component
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import Header from "../components/Header";
import axios from "axios"
import Link from "next/link";
import Spinner from "../components/Spinner"
import { withSwal } from "react-sweetalert2";


const Cart = ({swal}) => {
    const {
      cartProducts,
      setCartProducts,
      addProduct,
      removeProduct,
      clearCart,
      clearCartWithX,
      
    } = useContext(CartContext);

    const [products, setProducts] = useState()
    const [loading , setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
      const [isSuccess, setIsSuccess] = useState(false);

    

  useEffect(() => {
    
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setLoading(true);
        setProducts(response.data);
         setLoading(false);
      });
    } else {
      setProducts([]);
    }

    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
 
  }, [cartProducts, clearCart]);


    function moreOfThisProduct(id) {
      addProduct(id);
    }
    function lessOfThisProduct(id) {
      removeProduct(id);
    }

   async function goToPayment(ev){
    ev.preventDefault();
      const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
     if (
       name === "" ||
       email === "" ||
       city === "" ||
       postalCode === "" ||
       streetAddress === "" ||
       country === ""
     ) {
       swal.fire({
         title: "Please fill in all required fields",
         icon: "error",
       });
       return;
     }
    if (response.data.url) {
      window.location = response.data.url;
      if (window.location.href.includes("success")) {
        setIsSuccess(true);
        clearCart();
      }
    }
    }


    if (isSuccess) {
      return (
        <>
          <Header />
          <div className="ml-10 mt-5">
            <h1 className="font-bold text-2xl">Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </div>
        </>
      );
    }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-8 mt-10">
        <div className="bg-gray-200 p-2 rounded-md">
          <div className="flex justify-between mb-2">
            {products?.length > 0 && (
              <>
                <h1 className="text-2xl  text  font-bold">Cart</h1>
                <p
                  onClick={clearCartWithX}
                  className="mr-2 bg-green-600 text-white rounded-md px-3  pt-1 cursor-pointer "
                > X
                </p>
              </>
            )}
            {products?.length === 0 && (
              <>
                <h1 className="text-2xl  text  font-bold">Cart</h1>
              </>
            )}
          </div>

          <table className="w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 && (
                <td>
                  Add something to cart.
                  <Link className="text-blue-500 " href="/">
                    Go shopping
                  </Link>
                </td>
              )}
              {loading === true && <Spinner fullWidth={true}></Spinner>}
              {products?.length > 0 &&
                products.map((p) => (
                  <tr key={p.title} className=" text-center">
                    <td>
                      <div className="flex items-center flex-col  ">
                        <img
                          className="w-24 h-20 rounded-md mt-2   "
                          src={p.images?.[0]}
                          alt=""
                        />
                        <p>{p.title}</p>
                      </div>
                    </td>
                    <td>
                      <span
                        onClick={() => lessOfThisProduct(p._id)}
                        className=" select-none px-2 pb-1 mr-2 cursor-pointer bg-green-600 rounded-md text-white"
                      >
                        -
                      </span>
                      {cartProducts.filter((id) => id === p._id).length}
                      <span
                        onClick={() => moreOfThisProduct(p._id)}
                        className=" select-none px-2 pb-1  ml-2 cursor-pointer  bg-green-600 rounded-md text-white"
                      >
                        +
                      </span>
                    </td>
                    <td>
                      {p.price *
                        cartProducts.filter((id) => id === p._id).length}
                      €
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-200 p-2 rounded-md">
          <h1 className="text-2xl text mb-4 font-bold">Account details</h1>
          <form className="flex flex-col">
            <input
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(ev) => setEmail(ev.target.value)}
              type="text"
              placeholder="Email"
            />
            <div className="flex justify-around gap-2">
              <input
                onChange={(ev) => setCity(ev.target.value)}
                type="text"
                placeholder="City"
              />
              <input
                onChange={(ev) => setPostalCode(ev.target.value)}
                type="text"
                placeholder="Postal Code"
              />
            </div>
            <input
              onChange={(ev) => setStreetAddress(ev.target.value)}
              type="text"
              placeholder="Street Address"
            />
            <input
              onChange={(ev) => setCountry(ev.target.value)}
              type="text"
              placeholder="Country"
            />

            <button  onClick={goToPayment} className="primary-nowrap whitespace-nowrap">
              Continue to payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withSwal(Cart)
