import { NavLink, useLocation } from "react-router-dom";
import Button from "./Button";
import { useAddItem } from "../hooks/useAddItem";

function ProductItem({ item }) {
  const addItem = useAddItem();
  const handleAddClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(item);
  };

  const location = useLocation();

  return (
    <NavLink to={`/products/${item.id}`}>
      <div className="flex flex-col bg-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-200">
        <img
          src={item.image}
          alt={item.description}
          className="w-full h-64 object-cover rounded-xl mb-3"
        />
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold truncate">{item.name}</h1>
          {location.pathname != "/" && (
            <Button className="text-xl" width="w-10" onClick={handleAddClick}>
              +
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-gray-700 text-sm line-clamp-2 overflow-hidden">
            {item.description}
          </h2>
          <h3>${item.price}</h3>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductItem;
