import { useEffect, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import Carousel from "react-grid-carousel";

import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#d9d7d7",
};

const MyDot = ({ isActive }) => (
  <span
    style={{
      display: "inline-block",
      height: isActive ? "8px" : "8px",
      width: isActive ? "45px" : "8px",
      background: "#F67316",
      borderRadius: "8px",
      transition: "all 0.5s ease",
    }}
  ></span>
);

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./data.json");
      const data = await res.json();

      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="border-b-[3px] border-gray-300 pb-3 mb-10">
        <span className="text-2xl font-bold text-gray-700 border-b-[3px] border-orange-500 pb-3">
          BEST SELLERS
        </span>
      </div>

      <div className="w-[90vw] lg:w-auto">
        <Carousel
          cols={1}
          rows={3}
          gap={40}
          scrollSnap={true}
          hideArrow={true}
          showDots={true}
          dot={MyDot}
          mobileBreakpoint={0}
          loop
        >
          {products.map((product, idx) => (
            <Carousel.Item key={idx}>
              <div className="flex gap-6">
                {/* image */}

                <div className="flex justify-center items-center w-3/12">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="w-9/12">
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

                  <h3 className="sm:text-lg font-semibold text-gray-600 hover:text-orange-500 duration-200 cursor-pointer pt-1">
                    {product.title.length >= 30 ? (
                      <p>{product.title.slice(0, 30)}...</p>
                    ) : (
                      <p>{product.title}</p>
                    )}
                  </h3>

                  {/* price */}

                  <div className="pt-2">
                    {product.new_price ? (
                      <div className="flex items-end gap-4">
                        <p className="text-xl sm:text-2xl font-bold text-orange-500">
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
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default BestSellers;
