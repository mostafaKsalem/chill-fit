import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Button from "../components/Button";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { items, addItem, removeItem, clearCart } = useContext(CartContext);
  if (items.length === 0) {
    return (
      <div className="flex flex-col  items-center gap-12 mt-20 ">
        <p className="font-semibold text-3xl text-gray-600">Cart is empty!</p>
        <ShoppingCart size="60px" />
      </div>
    );
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center w-full px-4">
        <ul className="w-full space-y-4 mt-8">
          {items.map((item, index) => (
            <li
              key={index}
              className="w-full flex items-center gap-6 p-4 border rounded-lg hover:bg-gray-200 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-32 object-cover rounded-lg"
              />
              <div className="flex flex-col flex-grow">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <h2 className=" text-md text-gray-600 mt-4">
                  {item.description}
                </h2>
                <h3 className="text-lg font-bold text-gray-800 mt-4">
                  ${item.price}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="text-xl"
                  width="w-10"
                  onClick={() => addItem(item)}
                >
                  +
                </Button>
                <span className="text-xl font-semibold">{item.quantity}</span>
                <Button
                  className="text-xl"
                  width="w-10"
                  onClick={() => removeItem(item.id)}
                >
                  –
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {(items.length > 1 || items.some((item) => item.quantity > 1)) && (
        <div className="w-full mt-8 p-4 border-t-2 border-gray-300 flex justify-between items-center ">
          <h2 className="text-2xl font-bold text-gray-800">Total:</h2>
          <p className="text-2xl font-bold ">${totalPrice.toFixed(2)}</p>
        </div>
      )}

      <span className="flex w-full justify-center items-center mt-10">
        <Button className="w-36" onClick={clearCart}>
          Clear Cart
        </Button>
      </span>
    </div>
  );
}

export default Cart;
