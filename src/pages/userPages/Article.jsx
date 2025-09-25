
export default function Article() {
    return (
     
            <div className="bg-[var(--bg-footer)] min-h-screen p-8 md:p-14  mt-20">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="font-bold text-[#A81A30] mb-4 text-3xl md:text-4xl">Our Palestinian Heritage</h2>
                    <p className="text-base md:text-xl text-[#00000066] ">
                        Palestinian embroidery is not just a decoration, but a language that tells the stories of our ancestors and the nation’s ancient heritage.
                    </p>
                </div>

                <div className="">
                    {/* Section 1 */}
                    <div className="flex flex-col md:flex-row items-center  justify-center gap-8 md:gap-16  py-10 px-5">
                        <img
                            src="artImg.jpg"
                            alt="Tatreez embroidery"
                            className="w-full max-w-2xl md:w-2/5 h-60 xl:h-96 rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <p className="text-black leading-relaxed text-base md:text-xl max-w-xl line-clamp-3 md:line-clamp-none">
                            This piece reflects the timeless beauty of traditional Palestinian embroidery, known as Tatreez. The geometric red patterns, highlighted with green and blue stitches, are
                            handwoven with great care, carrying stories of heritage and identity. Once used to decorate garments and household items, today these designs are reimagined into modern
                            accessories, keeping tradition alive in everyday life.
                        </p>
                    </div>

                    {/* Section 2 (reverse on desktop) */}
                    <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16  py-10 px-5">
                        <img
                            src="art2img.jpg"
                            alt="Tatreez embroidery"
                            className="w-full max-w-2xl md:w-2/5 h-60 xl:h-96 rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <p className="text-black leading-relaxed text-base md:text-xl max-w-xl line-clamp-3 md:line-clamp-none">
                            A colorful celebration of nature, this hand embroidery brings to life a garden of flowers through delicate cross-stitching. Every flower and color represents creativity,
                            patience, and the intimate connection between the artisan and her craft. Such embroidery not only decorates fabrics but also preserves cultural expression, passed down
                            through generations.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16  py-10 px-5">
                        <img
                            src="art3img.jpg"
                            alt="Tatreez embroidery"
                            className="w-full max-w-2xl md:w-2/5 h-60 xl:h-96 rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <p className="text-black leading-relaxed text-base md:text-xl max-w-xl  line-clamp-3 md:line-clamp-none">
                            This stunning embroidery tray showcases vibrant patterns rooted in Middle Eastern heritage. The careful arrangement of motifs and colors tells stories of community,
                            resilience, and artistry. Handmade embroidery like this is more than decoration—it is a form of cultural memory, carrying the spirit of ancestors into today’s homes and
                            daily traditions.
                        </p>
                    </div>

                    {/* Section 4 (reverse on desktop) */}
                    <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 py-10 px-5">
                        <img
                            src="art4img.jpg"
                            alt="Tatreez embroidery"
                            className="w-full max-w-2xl md:w-2/5 h-60 xl:h-96 rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <p className="text-black leading-relaxed text-base md:text-xl max-w-xl line-clamp-3 md:line-clamp-none">
                            This stunning piece blends two powerful symbols of Palestinian heritage: The iconic black-and-white keffiyeh — a symbol of identity and resistance. Colorful tatreez
                            embroidery — a timeless tradition of storytelling through stitches. Together, they tell a story of resilience, roots, and pride. A heritage that lives on, thread by thread.
                        </p>
                    </div>
                </div>
            </div>
    );
}
