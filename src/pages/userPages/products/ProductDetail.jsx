import {  useState } from "react";
import { backendUrlApi } from "../../../store/authStore";
import toast from "react-hot-toast";
import { addToCart } from "../../../store/cartStore";

export default function ProductDetail({ product }) {
    const [quantity, setQuantity] = useState(1);
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); 

  


    const handleAddToCart = async () => {
            try {
                const res = await addToCart(product._id);
                toast.success("Product added to cart successfully..!", { duration: 1200, position: "top-center" });
                console.log("✅ Cart:", res.data);
            } catch (err) {
                toast.error(err.response?.data?.message || " Failed to add product to cart", {
                    duration: 2000,
                    position: "top-center",
                });
            }
        };

    if (!product) return null;
    return (
        <div className="max-w-7xl mx-auto px-2 py-5 grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
            {/* Image */}
            <div className="flex flex-col items-center">
                <div className="overflow-hidden rounded-2xl shadow-md">
                    <img
                        src={product.imageCover.startsWith("./") ? `${backendUrlApi}${product.imageCover}` : `${backendUrlApi}/product/${product.imageCover}`}
                        alt="Product"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Info under image */}
                <div className="mt-6 space-y-3 text-gray-600 text-sm w-full">
                    <div className="flex items-center gap-2">
                        <span>
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                height="25px"
                                width="25px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                                <path d="M3 9l4 0"></path>
                            </svg>
                        </span>{" "}
                        Free shipping on orders over $100
                    </div>
                    <div className="flex items-center gap-2">
                        <span>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                        </span>{" "}
                        30-day return policy
                    </div>
                </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-5">
                {/* Title + Price */}
                <div>
                    <h2 className="text-lg font-semibold w-full rounded-lg bg-[#f2f2eb] p-2 shadow-sm mb-5 ">{product.title}</h2>
                    <span className=" font-semibold w-full rounded-lg bg-[#f2f2eb]  p-2 shadow-sm  ">${product.price}</span>
                </div>
                {/* Description */}
                <p className="w-full rounded-lg bg-[#f2f2eb] p-2 shadow-sm break-words whitespace-pre-wrap">{product.description}</p>

                {/* <div>
                    <h4 className="font-semibold mb-2">Size</h4>
                </div> */}
                {/* Quantity */}
                <div>
                    <h4 className="font-semibold mb-2">Quantity</h4>
                    <div className="flex items-center gap-2">
                        <button onClick={decrement} className="w-9 h-9 rounded-lg bg-[#f2f2eb] shadow-sm">
                            -
                        </button>
                        <span className="px-4">{quantity}</span>
                        <button onClick={increment} className="w-9 h-9 rounded-lg bg-[#f2f2eb] shadow-sm">
                            +
                        </button>
                    </div>
                </div>
                {/* Add to Cart */}
                <button onClick={handleAddToCart} className="text-center  text-sm sm:text-base font-semibold bg-[var(--bg-btn)] text-white rounded-full px-4 py-2 hover:opacity-90 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
