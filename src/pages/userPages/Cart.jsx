import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrashAlt, FaWhatsapp } from "react-icons/fa";
import { emptyToCart, fetchCart, removeToCart, updateItemToCart } from "../../store/cartStore";
import { authStore, backendUrlApi } from "../../store/authStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const increment = async (index) => {
        const updatedItems = [...cartItems];
        const newQty = updatedItems[index].quantity + 1;

        try {
            const data = await updateItemToCart(updatedItems[index]._id, newQty);
            setCart(data.data);
            setCartItems(data.data.cartItems);
        } catch (err) {
            console.error(err);
        }
    };

    const decrement = async (index) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].quantity > 1) {
            const newQty = updatedItems[index].quantity - 1;

            try {
                const data = await updateItemToCart(updatedItems[index]._id, newQty);
                setCart(data.data);
                setCartItems(data.data.cartItems);
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        const getCart = async () => {
            const user = authStore.getState().user;
            if (!user) {
                toast.error("You are not login, Please login to get access this route");
                return;
            }
            try {
                const data = await fetchCart();
                setCart(data.data);
                console.log(data.data);
                setCartItems(data.data.cartItems);
            } catch (err) {
                console.error(err);
            }
        };
        getCart();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            const data = await removeToCart(itemId);
            setCart(data.data);
            setCartItems(data.data.cartItems);
            if (data.data.cartItems.length === 0) setCart(null);
        } catch (err) {
            toast.error(err.response?.data?.message || "❌ Error removing item");
        }
    };

 const handlEmptyCart = async () => {
     try {
         const data = await emptyToCart(cart._id);
         setCart(data.data);
         setCartItems(data.data.cartItems);
         if (data.data.cartItems.length === 0) setCart(null);
         toast.success("🗑️ Cart cleared successfully!");
     } catch (err) {
         toast.error(err.response?.data?.message || "❌ Error removing item");
     }
    };
    

    function handleWhatsappOrder() {
        if (!cart || !cart.cartItems) return;

        const phoneNumber = "201040962751"; // ضع رقمك هنا مع كود الدولة

        // جهز نص الرسالة
        let message = "Hello! I want to place this order:\n\n";
        cart.cartItems.forEach((item) => {
            message += `- ${item.title} x${item.quantity} = $${item.quantity * item.price}\n`;
        });
        message += `\nTotal: $${cart.totalCartPrice}\n`;
        message += "Please deliver to my address.";

        // إنشاء الرابط
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // فتح الرابط
        window.open(url, "_blank");
    }

    if (!cart || cartItems.length === 0)
        return (
            <div className="flex items-center justify-center h-fit gap-8 p-16 bg-[var(--bg-Color)] text-white  mt-16">
                <div>
                    <Player autoplay loop src="animations/Empty Cart.json" className="w-40 h-40" />
                    <h2 className="text-3xl p-2 font-bold">Your Cart is Empty</h2>
                    <h4 className="text-lg p-2">Add something to make me happy :)</h4>
                    <Link to="/Product" className="flex items-center justify-center gap-2 p-3">
                        <button className="p-2 border rounded-xl text-[var(--bg-footer)] transition duration-300 hover:text-black text-center">Continue Shopping</button>
                    </Link>
                </div>
            </div>
        );

 return (
     <div className="min-h-screen bg-[var(--bg-Color)] text-white">
         <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
             <h1 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide mb-8">Shopping Cart</h1>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Left: cart items */}
                 <div className="lg:col-span-2 space-y-4">
                     {cart.cartItems.map((i, index) => (
                         <div key={i._id} className="bg-[#65120c]/70 rounded-xl border border-white/10 overflow-hidden">
                             <div className="flex items-stretch gap-3 p-3">
                                 <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/10 shrink-0">
                                     <img
                                         src={i.imageCover.startsWith("./") ? `${backendUrlApi}${i.imageCover}` : `${backendUrlApi}/product/${i.imageCover}`}
                                         alt={i.title}
                                         className="w-full h-full object-cover"
                                     />
                                 </div>

                                 <div className="flex-1 flex justify-between">
                                     <div>
                                         <h4 className="text-lg font-semibold">{i.title}</h4>

                                         <div className="ml-auto mt-2">
                                             <p className="text-white/80 text-sm">price: ${i.price}</p>
                                             <p className="font-medium">total price: ${i.quantity * i.price}</p>
                                         </div>
                                     </div>

                                     <div className="flex items-center gap-4 mt-3">
                                         <div className="flex items-center gap-2">
                                             <button onClick={() => decrement(index)} className="w-7 h-7 rounded-full border border-white/20 grid place-items-center hover:bg-white/10">
                                                 <FaMinus />
                                             </button>
                                             <span className="font-semibold">{i.quantity}</span>
                                             <button onClick={() => increment(index)} className="w-7 h-7 rounded-full border border-white/20 grid place-items-center hover:bg-white/10">
                                                 <FaPlus />
                                             </button>
                                         </div>

                                         <button onClick={() => handleRemove(i._id)} className="text-red-400 hover:text-red-300 ml-2">
                                             <FaTrashAlt size={20} />
                                         </button>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     ))}

                     {/* actions under list */}
                     <div className="flex flex-wrap gap-3 pt-2">
                         <button onClick={handlEmptyCart} className="px-4 py-2 rounded-full text-sm font-semibold bg-[var(--bg-btn)] text-black">
                             Empty the basket
                         </button>
                         <Link to="/Product" className="px-4 py-2 rounded-full text-sm font-semibold bg-[var(--bg-btn)]">
                             Continue shopping
                         </Link>
                     </div>
                 </div>

                 {/* Right: summary */}
                 <aside className="lg:col-span-1">
                     <div className="bg-[#f7efe9] text-[#2b1a16] rounded-xl border border-black/10 p-4">
                         <h3 className="font-extrabold tracking-wide mb-3">Order summary</h3>

                         <div className="space-y-2 text-sm">
                             {cart.cartItems.map((i) => (
                                 <div key={`s-${i._id}`} className="flex justify-between">
                                     <span className="truncate pr-2">
                                         {i.title} x{i.quantity}
                                     </span>
                                     <span className="font-semibold">${i.quantity * i.price}</span>
                                 </div>
                             ))}
                         </div>

                         <div className="h-px bg-black/10 my-3" />

                         <div className="flex justify-between items-center text-base">
                             <span className="font-extrabold">Grand total</span>
                             <span className="font-extrabold">${cart.totalCartPrice}</span>
                         </div>

                         <a
                             onClick={handleWhatsappOrder}
                             target="_blank"
                             rel="noreferrer"
                             className="mt-3 inline-flex items-center justify-center gap-2 w-full rounded-lg bg-[#f40e0e] hover:bg-[#d33531] text-white font-semibold py-2 cursor-pointer">
                             <FaWhatsapp className="text-white" />
                             Receive the order via WhatsApp
                         </a>

                         <div className="mt-3 bg-[#d7baba] p-2 rounded-2xl">
                             <p className="font-bold mb-2">Order method</p>
                             <ol className="list-decimal pl-5 space-y-1 ">
                                 <li>Click “Complete Order via WhatsApp”.</li>
                                 <li>Confirm your order with customer service.</li>
                                 <li>Specify delivery address.</li>
                                 <li>Payment upon receipt.</li>
                             </ol>
                         </div>
                     </div>
                 </aside>
             </div>
         </div>
     </div>
 );

}