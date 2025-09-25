
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrashAlt, FaTicketAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchWishlist, removeToWishlist } from "../../store/wishlistStore";
import { backendUrlApi } from "../../store/authStore";
import { Player } from "@lottiefiles/react-lottie-player";
export default function Wishlist() {

    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  // Fetch wishlist on mount
  
   useEffect(() => {
    const getWishlist = async () => {
      try {
        const data = await fetchWishlist();
        console.log("Fetched wishlist:", data); 
        setWishlistItems(data.data || []); // data.data 
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getWishlist();
  }, []);

    // Remove item from wishlist
    const handleRemove = async (itemId) => {
      try {
              await removeToWishlist(itemId);
              const data = await fetchWishlist(); 
              setWishlistItems(data.data || []);
              toast.success("Item removed from wishlist");
        } catch (err) {
           toast.error(err.response?.data?.message || "Failed to remove item");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Player autoplay loop src="/animations/Loading Dots.json" style={{ width: 200, height: 200 }} />
            </div>
        );
    }

    if ( wishlistItems.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen flex-col gap-6 py-[20px]  mt-20">
                <FaRegHeart size={200} className="text-gray-300 " />
                <h2 className="text-3xl font-bold">Your Wishlist is Empty</h2>
                <p className="text-gray-500">Start adding products you love to your wishlist.</p>
                <Link to="/Product" className="px-6 py-3 bg-[var(--bg-Color)] text-white rounded-lg hover:bg-red-100 hover:text-black text-xl">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white mt-16">
            <div className="mb-4">
                <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-pink-500">
                    <FaArrowLeft /> Back to Home
                </Link>
                <hr className="my-4 border-gray-200" />
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Wishlist ({wishlistItems.length} items)</h2>
                <span className="text-gray-600 text-sm">Review your items and manage your wishlist</span>
                <hr className="my-4 border-gray-200" />
            </div>

            <div>
                {wishlistItems.map((item) => (
                    <div key={item._id} className="grid grid-cols-6 gap-4 items-center py-6 border-b border-gray-300">
                        <div className="col-span-2 flex gap-4">
                            <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                <img src={`${backendUrlApi}${item.imageCover}`} alt={item.pro_name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.description}</p>
                            </div>
                        </div>

                        <div className="text-center">${item.price}</div>

                        <div className="text-center">
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                                <FaTrashAlt size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
