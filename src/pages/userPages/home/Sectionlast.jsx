import { Link } from 'react-router-dom';
import Button from "../../../components/ui/Button";

export default function Sectionlast() {
  return (
      <div className="mx-auto p-6 sm:px-4 lg:px-14 py-[30px] w-full bg-[var(--bg-Color)]  text-white flex md:flex-row items-center md:items-stretch h-60 mb-16 mt-16">
          {/* Text content */}

          <div className="w-full md:2/3  flex-1 py-3 flex flex-col justify-between ">
              <h3 className="text-xl md:text-2xl font-bold ">start your journey with Palestinian heritage</h3>
              <p className="text-sm md:text-base  leading-relaxed">
                  Discover the beauty of oriental embroidery and get unique pieces that reflect your authenticity and refined taste and tell the story of the immortal Palestinian heritage
              </p>
              <div className="flex justify-center mb-10">
                  <Link to="/Article">
                      <Button value="Read more" />
                  </Link>
              </div>
          </div>
          {/* Image */}
          <div className="hidden md:flex  md:w-1/3 h-72 sm:h-80 md:h-96  justify-center p-4 sm:p-6 relative overflow-visible">
              <img
                  src="mirror.png"
                  alt="Palestinian embroidery mirror"
                  className="h-full object-contain 
               -m-8 sm:-m-12 md:-m-16 lg:-m-16"
              />
          </div>
      </div>
  );
}
