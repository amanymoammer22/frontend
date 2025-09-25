import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrlApi } from "../../store/authStore";

export default function AddProduct({ onClose, onProductAdded }) {

    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
    const [description, setDescription] = useState("");
    const [imageCover, setImageCover] = useState(null);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${backendUrlApi}api/v1/categories`);
                setCategories(res.data.data);
            } catch (err) {
                console.error(err);
                toast.error("⚠️ Failed to fetch categories.");
            }
        };
        fetchCategories();
    }, []);

    const handleAddProduct = async () => {
        if (!title || !price || !quantity || !description || !imageCover || !category) {
            toast.error("⚠️ Please fill all fields.");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("quantity", quantity);
            formData.append("price", price);
            if (priceAfterDiscount) {
                formData.append("priceAfterDiscount", priceAfterDiscount);
            }
            formData.append("description", description);
            formData.append("category", category);
            formData.append("imageCover", imageCover); 
            for (let [key, value] of formData.entries()) {
                console.log(`${key} =>`, value);
            }

            const res = await axios.post(`${backendUrlApi}api/v1/products`, formData);
           console.log(res.data); 
            toast.success("✅ Product added successfully!");
            onProductAdded(res.data.data);
            onClose();
        }
         
        catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "❌ Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40" onClick={onClose}>
            <div className="bg-white p-6 rounded-2xl w-[400px]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Add Product</h2>

                <input className="border p-2 rounded w-full mb-3" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="border p-2 rounded w-full mb-3" type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <input className="border p-2 rounded w-full mb-3" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input
                    className="border p-2 rounded w-full mb-3"
                    type="number"
                    placeholder="Price After Discount (optional)"
                    value={priceAfterDiscount}
                    onChange={(e) => setPriceAfterDiscount(e.target.value)}
                />
                <textarea className="border p-2 rounded w-full mb-3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input className="border p-2 rounded w-full mb-3" type="file" accept="image/*" onChange={(e) => setImageCover(e.target.files[0])} />

                <select className="border p-2 rounded w-full mb-3" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleAddProduct} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
