import { useEffect, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import Carousel from "react-grid-carousel";
import { GoHeartFill } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";

import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#d9d7d7",
};

const MainSlide = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./slide1.json");
      const data = setProducts(await res.json());
    };

    fetchData();
  }, []);

  return (
    <>
      <Carousel cols={2} rows={2} gap={100} scrollSnap={true} loop>
        {products.map((product, idx) => (
          <Carousel.Item key={idx}>
            <div className="relative group lg:flex gap-10 px-10">
              {/* image */}

              <div className="lg:w-2/5 relative group p-4">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100">
                  <GoHeartFill className="text-xl text-gray-400 hover:text-orange-500 cursor-pointer bg-white rounded-full duration-300 w-9 h-9 p-2" />

                  <TfiReload className="text-xl text-gray-400 hover:text-orange-500 cursor-pointer bg-white rounded-full duration-300 w-9 h-9 p-2" />

                  <IoSearch className="text-xl text-gray-400 hover:text-orange-500 cursor-pointer bg-white rounded-full duration-300 w-9 h-9 p-2" />
                </div>

                <img
                  src={product.image}
                  alt={product.title}
                  className="flex justify-center items-center"
                />
              </div>

              <div className="lg:w-3/5 pt-4 lg:pt-0">
                {/* rating */}

                <p>
                  <Rating
                    style={{ maxWidth: 100 }}
                    readOnly
                    value={product.rating}
                    itemStyles={myStyles}
                  />
                </p>

                {/* title */}

                <h3 className="text-lg font-semibold text-gray-600 pt-1">
                  {product.title.length >= 30 ? (
                    <p>{product.title.slice(0, 30)}...</p>
                  ) : (
                    <p>{product.title}</p>
                  )}
                </h3>

                {/* price */}

                <div className="py-2">
                  {product.new_price ? (
                    <div className="flex items-end gap-4">
                      <p className="text-2xl font-bold text-orange-500">
                        ${product.new_price}
                      </p>

                      <p className="text-lg font-bold text-gray-400 line-through">
                        ${product.old_price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-orange-500">
                      ${product.old_price}
                    </p>
                  )}
                </div>

                {/* description */}

                <p className="font-medium text-gray-500">
                  {product.description}
                </p>

                {/* cart button */}

                <button className="btn uppercase text-base font-medium text-white bg-gray-600 hover:bg-gray-600 opacity-0 group-hover:opacity-100 rounded-full px-6 mt-5">
                  Add to Cart
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default MainSlide;
