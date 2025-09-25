import { Link, useLocation } from "react-router-dom";

export default function AdminLinkItem({ children }) {
    const location = useLocation();
    const decodedPath = decodeURIComponent(location.pathname);

    // نجيب اسم الصفحة بعد /admin/
    let pageName = decodedPath === "/admin" ? "dashboard" : decodedPath.replace("/admin/", "").toLowerCase();

    // نحول pageName بحيث يكون بدون مسافات
    pageName = pageName.replace(/\s+/g, "");

    // نحول children ل lowercase ونشيل المسافات عشان المقارنة تصير صح
    const normalizedChildren = children.toLowerCase().replace(/\s+/g, "");

    return (
        <Link
            to={normalizedChildren === "dashboard" ? "/admin" : `/admin/${normalizedChildren}`}
            className={`block text-[18px] font-bold capitalize transition duration-300 p-2 rounded-2xl w-full text-center
        ${normalizedChildren === pageName ? "bg-[var(--bg-hover)] text-white font-medium" : "text-white hover:bg-[var(--bg-hover)]"}
      `}>
            {children}
        </Link>
    );
}