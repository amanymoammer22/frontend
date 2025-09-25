import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../../layouts/adminLayout/MainLayout';
import Dashboard from '../../pages/adminPages/Dashboard';
import Orders from '../../pages/adminPages/Orders';
import Products from '../../pages/adminPages/Products';
import Items from '../../pages/adminPages/AddItem';
import AddItem from '../../pages/adminPages/AddItem';
import NotFound from '../../pages/NotFound';
import AdminRoute from './AdminRoute';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminRoute />}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="additem" element={<AddItem />} />

                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
   
}
