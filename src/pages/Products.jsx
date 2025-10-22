import { useEffect, useMemo, useState } from "react";
import { CLOTHES } from "../assets/CLOTHES";
import ProductItem from "../components/ProductItem";
import PaginationBar from "../components/PaginationBar";

function Products() {
  const [shuffledClothes, setShuffledClothes] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const saved = localStorage.getItem("shuffledClothes");
    if (saved) {
      setShuffledClothes(JSON.parse(saved));
    } else {
      const clothes = [...CLOTHES].sort(() => Math.random() - 0.5);
      setShuffledClothes(clothes);
      // localStorage.setItem("shuffledClothes", JSON.stringify(clothes));
    }
  }, [CLOTHES]);

  const filteredClothes = useMemo(() => {
    return shuffledClothes.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGender =
        genderFilter === "all" ||
        (item.gender && item.gender.toLowerCase() === genderFilter);
      return matchesSearch && matchesGender;
    });
  }, [shuffledClothes, searchQuery, genderFilter]);

  const totalPages = Math.ceil(filteredClothes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredClothes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <div className="flex justify-center items-center mb-8 gap-4 ">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white border font-semibold border-gray-300 rounded-xl px-4 py-2 mx-auto h-10 w-40 sm:w-80 md:w-[30rem] lg:w-[40rem] focus:w-[20rem] sm:focus:w-[20rem] md:focus:w-[34rem] lg:focus:w-[60rem] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
          className=" bg-white border font-semibold border-gray-300 rounded-xl px-3 py-2 outline-none "
        >
          <option value="all">All</option>
          <option value="male">Men</option>
          <option value="female">Women</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 flex-1">
        {currentItems.length > 0 ? (
          currentItems.map((item) => <ProductItem key={item.id} item={item} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>

      {filteredClothes.length > itemsPerPage && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
        />
      )}
    </div>
  );
}

export default Products;
