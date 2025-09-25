import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import { authStore } from "../store/authStore";

export default function NotFound() {

     const user = authStore.getState().user;
     const role = (user?.role || "").toLowerCase();

     const linkTo = role === "admin" ? "/admin" : "/"; // admin => dashboard, else home
     const linkText = role === "admin" ? "Go to Dashboard" : "Go Home";

   return (
       <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
           <div className="px-4 lg:py-12">
               <div className="lg:gap-4 lg:flex">
                   <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                       <Player autoplay loop src="animations/NotFound.json" />
                       <p className="mb-8 text-center md:text-lg">The page you’re looking for doesn’t exist.</p>
                       <Link to={linkTo} className="inline-block bg-[var(--bg-Color)] p-3 text-white rounded-md">
                           {linkText}
                       </Link>
                   </div>
               </div>
           </div>
       </div>
   );
}

// add