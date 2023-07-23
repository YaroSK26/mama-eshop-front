
const CartPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-8 mt-10">
      <div className="bg-gray-200 p-2 rounded-md">
        <h1 className="text-2xl  text  font-bold">Cart</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
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
                  <td>+ 1 -</td>
                  <td>{p.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-200 p-2 rounded-md">
        <h1 className="text-2xl text mb-4 font-bold">Account details</h1>
        <form className="flex flex-col">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <div className="flex justify-around gap-2">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Postal Code" />
          </div>
          <input type="text" placeholder="Street Address" />
          <input type="text" placeholder="Country" />

          <button className="primary-nowrap whitespace-nowrap">
            Continue to payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartPage