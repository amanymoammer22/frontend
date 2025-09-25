// import axios from "axios";
// import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { backendUrlApi } from "../../store/authStore";

export default function ProductPageHeader() {
  
    return (
        <div
            className=" flex flex-col lg:flex-row justify-between items-center 
                       px-4 sm:px-6 lg:px-14 py-12 mt-16
                       w-full h-auto lg:h-64 bg-cover bg-center 
                       shadow-md gap-6"
            style={{
                backgroundImage: "url('bannimg.jpeg')",
            }}>
            <div className="flex flex-col gap-6 text-center lg:text-left">
                {/* Back to Home */}
                {/* <div>
                    <Link
                        to="/"
                        className="px-5 flex items-center justify-center lg:justify-start gap-2 
                                   text-gray-500 transition duration-300 
                                   hover:text-[var(--MainColor)]">
                        <FaArrowLeft size={20} />
                        Back to Home
                    </Link>
                </div> */}

                <div className="text-[#8b5050]">
                    <h2 className="text-3xl   lg:text-4xl  font-bold">Discover Authentic Palestinian Craft</h2>
                    <p
                        className="text-base sm:text-lg md:text-xl mt-2 
                                 max-w-md sm:max-w-lg mx-auto lg:mx-0">
                        Meticulously embroidered pieces that celebrate place, memory, and identity.
                    </p>
                </div>
            </div>

            {/* ⬇ Choose collection */}
            {/* <div className="dropdown relative mt-4 lg:mt-0">
                <div tabIndex={0} role="button">
                    <button
                        className="flex  gap-2 
                                   bg-[var(--MainColor)] hover:bg-[var(--havericon)] 
                                   text-white border border-transparent hover:border-[var(--MainColor)]  
                                   px-5 py-2 rounded-xl shadow-lg transition text-lg sm:text-xl">
                        <FaArrowDown size={20} />
                        Choose collection
                    </button>
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content  absolute right-0 mt-2 
                               menu rounded-lg z-10 w-52 sm:w-60 p-2 
                               shadow bg-[var(--gb-cart)] text-center">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <li key={cat._id}>
                                <Link to={`/products/category/${cat.name}`} className="block py-2 hover:text-[var(--MainColor)]">
                                    {cat.name}
                                </Link>
                                <hr />
                            </li>
                        ))
                    ) : (
                        <li>
                            <span className="text-gray-400">No categories found</span>
                        </li>
                    )}
                </ul>
            </div> */}
        </div>
    );
}
