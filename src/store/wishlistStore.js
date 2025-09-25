import axios from "axios";
import { authStore, backendUrlApi } from "./authStore";
import toast from "react-hot-toast";


const API = axios.create({
    baseURL: backendUrlApi,
});

API.interceptors.request.use((config) => {
    const token = authStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export async function addToWishlist(productId) {
    try {
        const res = await API.post("api/v1/wishlist", {
            productId,
        });
        return res.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "❌ Add to wishlist failed");
    }
}

export const fetchWishlist = async () => {
    try {
        const res = await API.get("api/v1/wishlist");
        return res.data; 
    } catch (err) {
        console.error(err);
    }
};

export async function removeToWishlist(itemId) {
    try {
        const res = await API.delete(`api/v1/wishlist/${itemId}`);
        return res.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "❌  Remove from cart failed");
    }
}
