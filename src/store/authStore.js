import { create } from "zustand";
const AUTH_KEY = "auth";
const savedAuth = JSON.parse(localStorage.getItem(AUTH_KEY)) || JSON.parse(sessionStorage.getItem(AUTH_KEY)) || null;
export const backendUrlApi = "http://localhost:5000/";
// const auth = JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth")) || null;


export const authStore = create((set) => ({
    user: savedAuth?.user ?? null,
    token: savedAuth?.token ?? null,
    isLoggedIn: !!savedAuth?.token,

    login: (user, token, remember = false) => {
        const payload = { user, token };
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);

        (remember ? localStorage : sessionStorage).setItem(AUTH_KEY, JSON.stringify(payload));

        set({
            user,
            token,
            isLoggedIn: true,
        });
    },

    logout: () => {
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);

        set({
            user: null,
            token: null,
            isLoggedIn: false,
        });
    },
}));


