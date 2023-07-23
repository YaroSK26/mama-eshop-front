

import ProductBox from "./ProductBox"
import { RevealWrapper } from "../node_modules/next-reveal";


const NewProducts = ({ products }) => {

  return (
    <>
      <h1 className="m-4 text-xl text-center">New products</h1>
      <RevealWrapper delay={0}>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {products?.length > 0 &&
              products.map((product) => (
                  <ProductBox
                    key={product._id}
                    {...product}
                  />
              
              ))}
          </div>
        </div>
      </RevealWrapper>
    </>
  );
};

export default NewProducts;