import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrlApi } from "../../store/authStore";

// update product 

export default function ProductItem({ product, setProducts, onClose }) {
    const [title, setTitle] = useState(product.title);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [loading, setLoading] = useState(false);

const handleUpdate = async () => {
    try {
        setLoading(true);   
        const res = await axios.put(`${backendUrlApi}api/v1/products/${product._id}`, {
            title,
            description,
            price,
            quantity,
        });

        setProducts((prev) => prev.map((p) => (p._id === product._id ? res.data.data : p)));

        toast.success("✅ Product updated successfully!");
        onClose(); // أغلق المودال
    } catch (err) {
        console.error(err);
        toast.error("❌ Failed to update product!");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-2xl shadow-lg w-[400px]"
                onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط داخل المودال
            >
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>

                <label htmlFor="title" className="block mb-2 font-semibold">
                    title :{" "}
                </label>
                <input className="border p-2 rounded w-full mb-3" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="description" className="block mb-2 font-semibold">
                    description :{" "}
                </label>
                <textarea className="border p-2 rounded w-full mb-3" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="price" className="block mb-2 font-semibold">
                    price :{" "}
                </label>
                <input className="border p-2 rounded w-full mb-3" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                <label htmlFor="quantity" className="block mb-2 font-semibold">
                    quantity :{" "}
                </label>
                <input className="border p-2 rounded w-full mb-3" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleUpdate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
