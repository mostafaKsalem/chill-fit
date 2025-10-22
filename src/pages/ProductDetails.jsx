import { useParams } from "react-router-dom";
import { CLOTHES } from "../assets/CLOTHES";
import Button from "../components/Button";
import { ShoppingCart } from "lucide-react";
import { useAddItem } from "../hooks/useAddItem";

function ProductDetails() {
  const { productId } = useParams();
  const product = CLOTHES.find((item) => item.id.toString() === productId);
  if (!product) {
    return <h1>Product not found!</h1>;
  }

  const addItem = useAddItem();

  return (
    <div className="p-6 flex flex-col justify-center items-center ">
      <img
        src={product.image}
        alt={product.description}
        className="w-96 h-[40rem] object-cover rounded-2xl mb-8"
      />
      <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
      <h2 className="text-gray-700 font-semibold mb-8">
        {product.description}
      </h2>
      <h3 className="text-gray-700 font-semibold text-xl mb-8">
        $ {product.price}
      </h3>
      <Button
        className="w-36 flex items-center gap-2 p-2"
        onClick={() => addItem(product)}
      >
        Add to Cart <ShoppingCart />{" "}
      </Button>
    </div>
  );
}

export default ProductDetails;
