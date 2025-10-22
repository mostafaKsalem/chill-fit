import { CLOTHES } from "../assets/CLOTHES";
import ProductItem from "../components/ProductItem";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 ">
      <h1 className="text-4xl m-8">Welcome to Chill Fit!</h1>
      <p className=" text-xl font-medium  text-center  mb-24">
        Discover your style with Chill Fit — where comfort meets confidence.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 flex-1">
        {CLOTHES.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
