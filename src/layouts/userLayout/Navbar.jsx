import { FaBars, FaRegHeart, FaShoppingBag,FaTimes, FaUserCircle } from 'react-icons/fa';
import LinkItem from '../../components/ui/LinkItem';
 import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authStore } from '../../store/authStore';
import AuthLink from '../../validation/AuthLink';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, logout } = authStore();
        const handleLogout = () => {
            logout(); // يمسح التخزين + Zustand
            setMenuOpen(false); // اغلاق المينيو لو مفتوح
            navigate("/login", { replace: true });
            console.log("logout success");
        };

     return (
         <div className="w-full fixed top-0 left-0 z-50  mx-auto px-4 sm:px-4 lg:px-6 py-[20px] flex items-center justify-between bg-[var(--bg-Color)] ">
             <div className="flex items-center space-x-[10px]">
                 <img src="logo.jpg" alt="" className="h-[54.79px] w-[71.64px] flex items-center" />
                 <h1 className="w-[145.7px] text-white">Palestinian Embroidery</h1>
             </div>
             <div className=" hidden md:flex items-center space-x-[40px] [font-family:var(--header-font)]">
                 <LinkItem>home</LinkItem>
                 <LinkItem>product</LinkItem>
                 <LinkItem>about</LinkItem>
                 <LinkItem>contact</LinkItem>
             </div>
             <div className="flex items-center space-x-[15px]  text-white">
                 <div className="flex justify-between space-x-[15px]   capitalize cursor-pointer transition duration-300 ">
                     <Link to="/Wishlist">
                         <FaRegHeart size={30} className="md:flex hidden transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                     </Link>

                     <AuthLink isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

                     {/* <Link to="/login">
                         <FaUserCircle size={30} className="transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                     </Link> */}

                     <Link to="/cart">
                         <FaShoppingBag size={30} className="md:flex hidden transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                     </Link>
                 </div>

                 <div className="md:hidden flex items-center">
                     <button type="button" onClick={() => setMenuOpen(!menuOpen)}>
                         {" "}
                         {menuOpen ? <FaTimes size={25} color="var(--bg-colorA)" /> : <FaBars size={25} color="var(--bg-colorA)" />}
                     </button>
                 </div>

                 <div
                     className={` z-10 absolute top-[80px] right-2.5 min-w-16 rounded-2xl bg-[#833b3b] border border-[var(--bg-Color)] overflow-hidden flex flex-col items-center space-y-3 p-5 shadow-lg md:hidden  transition-all duration-500 ease-in-out
                 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
                     <LinkItem>home</LinkItem>
                     <LinkItem>product</LinkItem>
                     <LinkItem>about</LinkItem>
                     <LinkItem>contact</LinkItem>
                     <Link to="/cart">
                         <FaShoppingBag size={30} className="flex md:hidden transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                     </Link>

                     <Link to="/Wishlist">
                         <FaRegHeart size={30} className="flex md:hidden transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                     </Link>
                 </div>
             </div>
         </div>
     );

}



