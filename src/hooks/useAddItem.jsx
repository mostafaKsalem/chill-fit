import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import toast from "react-hot-toast";

export function useAddItem() {
  const { addItem } = useContext(CartContext);

  const handleAddItem = (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart successfully!`, {
      duration: 2000,
      style: {
        background: "#16A34A",
        color: "#fff",
        fontWeight: "normal",
      },
    });
  };

  return handleAddItem;
}