import { useEffect, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import Carousel from "react-grid-carousel";

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
            <div className="lg:flex gap-10 px-10">
              <div className="lg:w-2/5">
                <img src={product.image} alt={product.title} />
              </div>

              <div className="lg:w-3/5 pt-4 lg:pt-0 pb-2">
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

                <h3 className="text-lg font-semibold text-gray-600">
                  {product.title.length >= 30 ? (
                    <p>{product.title.slice(0, 30)}...</p>
                  ) : (
                    <p>{product.title}</p>
                  )}
                </h3>

                {/* price */}

                <div className="py-3">
                  {product.new_price ? (
                    <div className="flex items-end gap-4">
                      <p className="text-3xl font-bold text-orange-500">
                        ${product.new_price}
                      </p>

                      <p className="text-lg font-bold text-gray-400 line-through">
                        ${product.old_price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-orange-500">
                      ${product.old_price}
                    </p>
                  )}
                </div>

                {/* description */}

                <p className="font-medium text-gray-500">
                  {product.description}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default MainSlide;
