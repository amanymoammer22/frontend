import axios from "axios";
import toast from "react-hot-toast";
import { authStore, backendUrlApi } from "./authStore";

const API = axios.create({
    baseURL: backendUrlApi,
});

API.interceptors.request.use((config) => {
    const token = authStore.getState().token; 
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/**
 * Add product to cart
 * @param {string} productId
 * @param {string|null} size
 * @returns {Promise<Object>} response data
 */
export async function addToCart(productId ) {
    try {
        const res = await API.post("api/v1/cart", {
            productId
        });
        return res.data;
    } catch (err) {
        if (err.response?.status === 404) {
            return { data: { cartItems: [] } };
        }
        toast.error(err.response?.data?.message || "❌ Add to cart failed");
    }
}

export async function fetchCart() {
    try {
        const res = await API.get("api/v1/cart");
        return res.data;
    } catch (err) {
        if (err.response?.status === 404) {
            return { data: { cartItems: [] } };
        }
        toast.error(err.response?.data?.message || "❌ Fetch cart failed");
    }
}

export async function removeToCart(itemId) {
    try {
        const res = await API.delete(`api/v1/cart/${itemId}`);
        return res.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "❌  Remove from cart failed");
    }
}

export async function emptyToCart() {
    const res = await API.delete(`api/v1/cart`);
    console.log(res.data);
    return { data: { cartItems: [] } };
}




export async function updateItemToCart(itemId, quantity) {
    try {
        const res = await API.put(`api/v1/cart/${itemId}`, { quantity });
        return res.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "❌ Update cart item failed");
    }
}
