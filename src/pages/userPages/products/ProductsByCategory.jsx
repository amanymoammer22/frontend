import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authStore, backendUrlApi } from "../../../store/authStore";
import toast from "react-hot-toast";
import { addToCart } from "../../../store/cartStore";
import { addToWishlist } from "../../../store/wishlistStore";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaCartPlus, FaEye, FaHeart, FaTimes } from "react-icons/fa";
import ProductDetail from "./ProductDetail";
import ProductPagination from "./ProductPagination";
import FilterDrawer from "./FilterDrawer";

export default function ProductsByCategory() {
     const { categoryId } = useParams();
     const [products, setProducts] = useState([]);
     const [minPrice, setMin] = useState(0);
     const [maxPrice, setMax] = useState(300);
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [selectedProduct, setSelectedProduct] = useState(null);
     const [loading, setLoading] = useState(true);
     const [category, setCategory] = useState(null);

     const fetchProducts = async (currentPage = 1, min = minPrice, max = maxPrice) => {
         try {
             setLoading(true);
             const params = new URLSearchParams();
             params.append("page", currentPage);
             params.append("limit", 8);
             if (min !== undefined) params.append("price[gte]", min);
             if (max !== undefined) params.append("price[lte]", max);
             if (categoryId) params.append("category", categoryId); // <-- مهم!

             const url = `${backendUrlApi}api/v1/products?${params.toString()}`;
             // console.log("🔗 Final URL:", url);
             const res = await axios.get(url);

             setProducts(res.data.data || []);
             setTotalPages(res.data.paginationResult?.numberOfPages || 1);
         } catch (err) {
             console.error("Error fetching products:", err);
         } finally {
             setLoading(false);
         }
     };

     const fetchCategory = async () => {
         if (!categoryId) return;
         try {
             const res = await axios.get(`${backendUrlApi}api/v1/categories/${categoryId}`);
             setCategory(res.data.data);
         } catch (err) {
             console.error("Error fetching category:", err);
         }
    };
    
     useEffect(() => {
         fetchProducts(page);
         fetchCategory();
     }, [page, categoryId]);

    
     const handleApplyFilter = () => {
         setPage(1); 
         fetchProducts(1);
     };

     const handleClearFilters = () => {
         setMin(0);
         setMax(300);
         setPage(1);
         fetchProducts(1, 0, 300); // مع categoryId مثبت
     };
     const handleAddToCart = async (p) => {
         try {
             const user = authStore.getState().user;
             if (!user) {
                 toast.error("Please log in to continue.");
                 return;
             }
             const res = await addToCart(p._id);
             toast.success("Product added to cart successfully..!", { duration: 1200, position: "top-center" });
             console.log("✅ Cart:", res.data);
         } catch (err) {
             console.error(err);
         }
    };

    const handleAddToWishlist = async (p) => {
            const user = authStore.getState().user;
            if (!user) {
                toast.error("Please log in to continue.");
                return;
            }
          try {
              const res = await addToWishlist(p._id);
              toast.success("Product added to Wishlist successfully..!", { duration: 1200, position: "top-center" });
              console.log("✅ Wishlist:", res.data);
          } catch (err) {
              console.error(err);
          }
    };
    

       return (
           <div className="text-neutral-900 font-[Abhaya Libre,serif] bg-[var(--bg-footer)] mt-20">
               {category && (
                   <div
                       className=" flex items-center justify-center px-4 sm:px-6 lg:px-14  w-full h-auto lg:h-64 bg-cover bg-center   "
                       style={{
                           backgroundImage: "url('/bannimg.jpeg')",
                       }}>
                       <div className="inset-0 flex items-center justify-center">
                           <h1 className="text-[var(--bgtext-coler)] md:text-4xl text-2xl font-bold">{category.name}</h1>
                       </div>
                   </div>
               )}

               <div className="grid grid-cols-[1fr_290px] gap-4 max-lg:grid-cols-1">
                   {/* Products */}
                   <main className="bg-[var(--bg-footer)] order-1 max-lg:order-2">
                       <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] py-8">
                           {loading ? (
                               <Player autoplay loop src="animations/Loading Dots.json" style={{ width: "300px", height: "300px" }} />
                           ) : (
                               products.map((p) => (
                                   <article key={p._id} className="px-4">
                                       <div className="flex flex-col bg-white p-4 my-3 rounded-2xl shadow-md hover:shadow-2xl transition-shadow group relative">
                                           {/* Product Image + Overlay */}
                                           <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                                               {/* Image */}
                                               <img
                                                   src={p.imageCover.startsWith("./") ? `${backendUrlApi}${p.imageCover}` : `${backendUrlApi}/product/${p.imageCover}`}
                                                   alt={p.title}
                                                   className="w-full h-full object-cover select-none"
                                                   draggable="false"
                                                   onDragStart={(e) => e.preventDefault()}
                                               />

                                               {/* Overlay */}
                                               <div className="overlay absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                   {/* Eye Button */}
                                                   <button onClick={() => setSelectedProduct(p)} className="p-2 rounded-full shadow-md transition bg-[var(--bg-btn)]">
                                                       <FaEye size={25} color="black" className="hover:scale-110 transition-transform" />
                                                   </button>
                                               </div>
                                           </div>

                                           {selectedProduct && (
                                               <div className="fixed inset-0 z-50 flex items-center justify-center">
                                                   <div className="fixed inset-0 bg-white/10  transition-opacity duration-300 opacity-100" onClick={() => setSelectedProduct(null)}></div>
                                                   <div
                                                       className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative z-10 transform scale-95 opacity-0 transition-all duration-300 ease-out
                                                       animate-fade-in-scale">
                                                       <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold" onClick={() => setSelectedProduct(null)}>
                                                           <FaTimes size={20} />
                                                       </button>
                                                       <ProductDetail product={selectedProduct} />
                                                   </div>
                                               </div>
                                           )}

                                           {/* Product Info */}
                                           <div className="mt-3 flex flex-col gap-3">
                                               {/* Title + Wishlist */}
                                               <div className="flex items-center justify-between">
                                                   <h4 className="text-base font-semibold truncate">{p.title}</h4>
                                                   <button onClick={() => handleAddToWishlist(p)} className="hover:scale-110 transition-transform" aria-label="Add to wishlist">
                                                       <FaHeart size={20} className="text-red-500" />
                                                   </button>
                                               </div>

                                               {/* Price + Add to Cart */}
                                               <div className="flex items-center justify-between">
                                                   <p className="text-sm sm:text-base font-medium text-gray-700">${p.price}</p>
                                                   <button
                                                       onClick={() => handleAddToCart(p)}
                                                       className="flex items-center gap-2 text-sm sm:text-base font-semibold bg-[var(--bg-btn)] text-white rounded-full px-4 py-2 hover:opacity-90 transition">
                                                       Add to cart
                                                       <FaCartPlus size={18} />
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                   </article>
                               ))
                           )}
                       </div>
                       <ProductPagination page={page} total={totalPages} onChange={(newPage) => setPage(newPage)} />
                   </main>

                   {/* Filter Card on the right */}
                   <aside className="flex gap-6 order-2 max-lg:order-1 py-5">
                       <FilterDrawer
                           minPrice={minPrice}
                           maxPrice={maxPrice}
                           setMin={setMin}
                           setMax={setMax}
                           onApply={handleApplyFilter}
                           onClear={handleClearFilters}
                           setProducts={setProducts}
                           categoryId={categoryId}
                       />
                   </aside>
               </div>
           </div>
       );
    }
