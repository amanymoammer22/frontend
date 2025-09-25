import axios from "axios";
import {  useEffect, useRef, useState } from "react";
import { FaArrowDown, FaFilter, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { backendUrlApi } from "../../../store/authStore";

export default function FilterDrawer({ minPrice, maxPrice, setMin, setMax, onApply, onClear, setProducts, categoryId }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-5 right-5 z-30 lg:hidden
                   bg-[var(--bg-Color)] text-white p-3 rounded-full shadow-lg">
                <FaFilter size={20} className="" />
            </button>

            {/*   */}
            {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black opacity-45 z-20 lg:hidden"></div>}

            {/*   */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-[#efefe8] px-5 py-8 z-30 shadow-lg mt-20
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}
                    lg:hidden`}>
                {/*   */}
                <button onClick={() => setOpen(false)} className="absolute top-8 right-4 text-gray-600 hover:text-black">
                    <FaTimes size={20} color="var(--bg-Color)" />
                </button>

                <div className="mt-10">
                    <SearchBar setProducts={setProducts} categoryId={categoryId} />
                    <DropdownCollection />
                    <FilterContent
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMin={setMin}
                        setMax={setMax}
                        onApply={() => {
                            onApply();
                            setOpen(false);
                        }}
                        onClear={() => {
                            onClear();
                            setOpen(false);
                        }}
                        setProducts
                    />
                </div>
            </div>

            {/* Sidebar */}
            <aside
                className="hidden lg:block bg-[#efefe8] rounded-2xl p-5  mx-auto
                   sticky top-24 h-max shadow-[0_6px_18px_rgba(0,0,0,.08)] w-[300px]">
                <div className="my-2">
                    <SearchBar setProducts={setProducts} categoryId={categoryId} />
                </div>
                <div className="mb-8">
                    <DropdownCollection />
                </div>
                <FilterContent minPrice={minPrice} maxPrice={maxPrice} setMin={setMin} setMax={setMax} onApply={onApply} onClear={onClear} />
            </aside>
        </>
    );
}


function FilterContent({
    minPrice,
    maxPrice,
    setMin,
    setMax,
    onApply,
    onClear
}){

  return (
      <>
          <hr className="mt-5 w-full" />

          <h3 className="text-xl sm:text-2xl mb-4 mt-4">Price Range</h3>

          {/* Range slider */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 mb-2">
              <span>0$</span>
              <input type="range" min="0" max="300" step="1" value={Math.min(minPrice, maxPrice)} onChange={(e) => setMin(+e.target.value)} className="flex-1 accent-[#b30d0d]" />
              <span>300$</span>
          </div>

          {/* Min / Max inputs */}
          <div className="flex items-center gap-2 mb-4">
              <input
                  type="number"
                  placeholder="min"
                  value={minPrice}
                  onChange={(e) => setMin(+e.target.value)}
                  className="w-20 sm:w-[90px] h-9 rounded-full border border-neutral-300 px-3 outline-none text-sm"
              />
              <span className="text-neutral-500">-</span>
              <input
                  type="number"
                  placeholder="max"
                  value={maxPrice}
                  onChange={(e) => setMax(+e.target.value)}
                  className="w-20 sm:w-[90px] h-9 rounded-full border border-neutral-300 px-3 outline-none text-sm"
              />
          </div>
          {/* Buttons */}

          <button
              onClick={onApply}
              className="w-full h-10 sm:h-11 rounded-xl border border-[var(--MainColor)] text-[var(--MainColor)]
                   mt-2 hover:bg-[#b30d0d18] text-sm sm:text-base">
              Apply Filter
          </button>

          <button
              onClick={onClear}
              className="w-full h-10 sm:h-11 rounded-xl border border-[var(--MainColor)] text-[var(--MainColor)]
                   mt-2 hover:bg-[#b30d0d18] text-sm sm:text-base">
              Clear All filters
          </button>
      </>
  );
}

// categories
function DropdownCollection() {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const dropdownRef = useRef(null);
   

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${backendUrlApi}api/v1/categories`);
                // setCategoryId(cat._id);
                setCategories(res.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (open && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div className="mt-4 lg:mt-0" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex gap-2 justify-center items-center bg-[var(--MainColor)] border border-[var(--bg-Color)]
             text-[var(--bg-Color)] px-5 py-2 rounded-xl shadow-lg transition text-lg sm:text-xl">
                <FaArrowDown size={20} />
                Explore Crafts
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 mt-2" : "max-h-0"}`}>
                <ul className="rounded-lg w-40 sm:w-60 shadow bg-[var(--bg-Color)] text-center text-white">
                    {categories.length > 0 ? (
                        <>
                            <li>
                                <Link to="/product" className="block py-2 hover:bg-[var(--bg-colorA)] hover:text-[var(--bg-Color)]" onClick={() => setOpen(false)}>
                                    All Products
                                </Link>
                                <hr />
                            </li>

                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <Link to={`/products/category/${cat._id}`} className="block py-2 hover:bg-[var(--bg-colorA)] hover:text-[var(--bg-Color)]" onClick={() => setOpen(false)}>
                                        {cat.name}
                                    </Link>
                                    <hr />
                                </li>
                            ))}
                        </>
                    ) : (
                        <li>
                            <span className="text-gray-400">No categories found</span>
                        </li>
                    )}
                </ul>

            </div>
        </div>
    );
}

// search

function SearchBar({ setProducts, categoryId }) {
    const [keyword, setKeyword] = useState("");

      useEffect(() => {
          setKeyword("");
      }, [categoryId]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${backendUrlApi}api/v1/products?keyword=${keyword}${categoryId ? `&category=${categoryId}` : ""}`);
            setProducts(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="border border-bg-[var(--bg-Color)] p-2 rounded w-full text-[var(--bg-Color)] "
            />
            <button type="submit" className="bg-[var(--bg-btn)] hover:opacity-90 px-4 py-2 rounded">
                Search
            </button>
        </form>
    );
}