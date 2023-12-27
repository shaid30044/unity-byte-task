import BestSellers from "../../Components/BestSellers/BestSellers";
import MainSlide from "../../Components/MainSlide/MainSlide";

const Home = () => {
  return (
    <div className="px-4 sm:px-10 xl:px-20 py-20">
      <MainSlide />

      <div className="grid lg:grid-cols-3">
        <div className="lg:col-span-2"></div>

        <div className="lg:col-span-1">
          <BestSellers />
        </div>
      </div>
    </div>
  );
};

export default Home;
