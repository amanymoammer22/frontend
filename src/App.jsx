import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";
export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Toaster/>
                <AppRouter />
            </BrowserRouter>
        </div>
    );
}
