import React from "react";
import { client, urlFor } from "../utils/Client";

const Products = ({ products }) => {
  console.log(products);
  return (
    <section className="my-6 grid grid-cols-3">
      {products?.map((p) => {
        return (
          <div key={p.id}>
            <img src={urlFor(p.cover)} alt="" />
          </div>
        );
      })}
    </section>
  );
};

export default Products;

export async function getServerSideProps() {
  const products = await client.fetch(`*[_type == "product"]`);

  return {
    props: {
      products,
    },
  };
}
