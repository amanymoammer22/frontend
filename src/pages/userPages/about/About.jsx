
export default function About() {
    return (
        <div className="bg-[var(--bg-Color)] mx-auto py-12 px-4 md:px-20 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left content */}
            <div className="px-4 md:px-16 py-10 flex flex-col gap-10">
                <h2 className="text-4xl md:text-6xl text-center text-white font-extrabold mb-6">About Us</h2>

                {/* Project Introduction */}
                <div className="bg-[var(--bg-colorA)] font-[Inknut_Antiqua]  flex flex-col gap-6 p-6 md:p-8 rounded-3xl shadow-md text-black items-center text-center">
                    <h3 className="font-bold mb-2 text-2xl md:text-3xl w-fit md:w-52 bg-[var(--bgtext-coler)] rounded-3xl px-4 py-2">Project Introduction</h3>
                    <p className="text-sm md:text-base italic max-w-xl">
                        Our platform is a digital space dedicated to showcasing Palestinian embroidery in a modern and elegant way. We aim to highlight this traditional handcraft, passed down through
                        generations, and present it to the world in a simple and accessible form.
                    </p>
                </div>

                {/* Project Goal */}
                <div className="bg-[var(--bg-colorA)] flex flex-col font-[Inknut_Antiqua] gap-6 p-6 md:p-8 rounded-3xl shadow-md text-black items-center text-center">
                    <h3 className="font-bold mb-2 text-2xl md:text-3xl w-fit bg-[var(--bgtext-coler)] rounded-3xl px-4 py-2">Project Goal</h3>
                    <p className="text-sm md:text-base italic max-w-xl">
                        Our mission is to preserve Palestinian heritage and celebrate embroidery as one of the most significant symbols of cultural identity. We also strive to support artisans and
                        Palestinian women who continue to create these handmade pieces with love and dedication.
                    </p>
                </div>

                {/* About the Team */}
                <div className="bg-[var(--bg-colorA)] flex flex-col font-[Inknut_Antiqua] gap-6 p-6 md:p-8 rounded-3xl shadow-md text-black items-center text-center">
                    <h3 className="font-bold mb-2 text-2xl md:text-3xl w-fit bg-[var(--bgtext-coler)] rounded-3xl px-4 py-2">About the Team</h3>
                    <p className="text-sm md:text-base italic max-w-xl">
                        We are a team of Computer Engineering students at the Islamic University, combining our passion for heritage with technology to create a digital experience where visitors can
                        explore, discover, and purchase Palestinian embroidery.
                    </p>
                </div>
            </div>

            {/* Right image */}
            <div className="hidden md:flex justify-center items-stretch py-16 mt-8">
                <img src="bggg.png" alt="PalestinianEmbroidery" className="h-full object-cover" />
            </div>
        </div>
    );
}
