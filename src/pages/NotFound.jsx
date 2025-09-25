import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

export default function NotFound() {
   return (
       <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
           <div className="px-4 lg:py-12">
               <div className="lg:gap-4 lg:flex">
                   <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                       <Player autoplay loop src="animations/NotFound.json" />
                       <p className="mb-8 text-center md:text-lg">The page you’re looking for doesn’t exist.</p>
                       <Link to={"/"} className="inline-block bg-[var(--MainColor)] p-2 text-white rounded-md">
                           Go Home
                       </Link>
                   </div>
               </div>
           </div>
       </div>
   );
}

// add