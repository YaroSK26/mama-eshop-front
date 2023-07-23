import Header from "../components/Header";
import NewProducts from "../components/NewProducts"
import {mongooseConnect} from "../lib/mongoose"
import { Product } from "../models/Products";

export default function Home({newProducts}) {
  return (
    <>
      <Header></Header>
      <NewProducts products={newProducts}>
      </NewProducts>
    </>
  );
}


export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}