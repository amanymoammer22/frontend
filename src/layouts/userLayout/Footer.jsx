import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="bg-[var(--bg-Color)]">
            <footer className="bg-[var(--bg-footer)]  text-black  [font-family:var(--header-font)] m-auto px-4 sm:px-6 lg:px-14 py-[20px] rounded-t-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 lg:p-0">
                    <div className="flex flex-col items-start  ">
                        <img src="logo.jpg" alt="" className="h-[184.79px] w-[200.64px] flex  items-center" />
                        <h1 className="w-[145.7px] text-center">Palestinian Embroidery</h1>
                    </div>

                    <div>
                        <h6 className="footer-title text-lg font-semibold mb-3 text-[#f41919]">Quick Links</h6>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="link link-hover">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="footer-title text-lg font-semibold mb-3 text-[#f41919]">Contact Us</h6>
                        <ul className="space-y-2 text-sm">
                            <li>📍 Gaza, Palestine</li>
                            <li>✉ PalestinianEmbroidery_ps@gmail.com</li>
                            <li>☎ +972 592 414 844</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="footer-title text-lg font-semibold mb-3 text-[#f41919]">Follow us</h6>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="#"
                                className="w-8 h-8 text-black bg-white flex items-center justify-center rounded-full hover:bg-[var(--bg-Color)] hover:text-white  transform transition duration-300 hover:scale-110 hover:rotate-6">
                                <FaFacebookF size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 text-black bg-white flex items-center justify-center rounded-full hover:bg-[var(--bg-Color)] hover:text-white  transform transition duration-300 hover:scale-110 hover:rotate-6">
                                <FaWhatsapp size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 text-black bg-white flex items-center justify-center rounded-full hover:bg-[var(--bg-Color)] hover:text-white transform transition duration-300 hover:scale-110 hover:rotate-6">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-300 mb-6" />

                <div className="w-2/3 mx-auto text-center bg-gray-200">
                    <p className="text-sm text-black p-3">© {new Date().getFullYear()} Palestinian Embroidery. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );

}

