import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Products";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;

  // Remove cache-control headers
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  res.json(await Product.find({ _id: ids }));
}
