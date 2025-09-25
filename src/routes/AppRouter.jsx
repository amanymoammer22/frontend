import {  Route, Routes } from "react-router-dom";
import UserRoutes from "./userRouter.jsx/UserRoutes";
import AdminRoutes from "./adminRouter.jsx/AdminRoutes";

export default function AppRouter() {
    return (
            
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>  
       
        
    );
}
