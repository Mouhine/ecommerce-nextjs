import React from "react";
import { useRouter } from "next/router";
import { client, urlFor } from "../../utils/Client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import ProductCard from "../../components/ProductCard";
import { addToCart, incqyt, decqyt } from "../../redux/features/cartSlice";
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
const ProductDetails = ({ product, products }) => {
  const router = useRouter();
  const { id } = router.query;
  const { carteItems, qyt } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(id);
  return (
    <div className="max-w-5xl w-[100%] mx-auto  space-y-8 mt-[80px] ">
      <section className="grid grid-cols-12  ">
        <div className=" col-span-12  md:col-span-6 lg:col-span-5 ">
          <Splide
            options={{
              perPage: 1,
            }}
          >
            {product?.images?.map((image) => {
              return (
                <SplideSlide>
                  <img src={urlFor(image)} />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
        <div className="flex flex-col justify-center col-span-12 md:col-span-6 lg:col-span-5 px-4 lg:col-start-7 space-y-3">
          <h1 className="text-xl font-meduim ">{product.title}</h1>
          <p className="text-sm font-thin text-gray-500">
            {product.description}
          </p>
          <p> price : {product.price + " $"}</p>
          <section className="flex space-x-3 items-center justify-between">
            <button
              className="border p-2 rounded-full "
              onClick={() => {
                dispatch(addToCart({ ...product, q: qyt }));
              }}
            >
              <MdAddShoppingCart />
            </button>
            <div className="flex space-x-4 items-center">
              <button
                className="p-2 rounded-full border"
                onClick={() => dispatch(incqyt())}
              >
                <AiOutlinePlusCircle />
              </button>
              <p>{qyt}</p>
              <button
                className="p-2 rounded-full border"
                onClick={() => dispatch(decqyt())}
              >
                <AiOutlineMinusCircle />
              </button>
            </div>
          </section>
        </div>
      </section>
      <h1 className="text-center py-8 text-2xl font-meduim text-gray-500">
        Similar Products you may Like
      </h1>
      <section className=" h-[50vh] mx-auto    ">
        <Splide
          options={{
            perPage: 4,
            rewind: true,

            gap: "1rem",
            breakpoints: {
              924: {
                perPage: 3,
              },
              620: {
                perPage: 2,
              },
              420: {
                perPage: 1,
              },
            },
          }}
        >
          {products.map((p) => {
            return (
              <SplideSlide>
                <ProductCard p={p} key={p._id} />
              </SplideSlide>
            );
          })}
        </Splide>
      </section>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const query = `*[_type == "product" && _id == "${id}"][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  // console.log(product);
  // console.log(products);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
