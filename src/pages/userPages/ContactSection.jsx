    import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrlApi } from "../../store/authStore";

export default function ContactSection() {
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          setLoading(true);
          await axios.post(`${backendUrlApi}api/v1/subscribe`, formData);
          toast.success("🎉 You are subscribed!");
          setFormData({ name: "", email: "", message: "" });
      } catch (err) {
          console.error(err);
          toast.error(err.response?.data?.message || "❌ Subscription failed.");
      } finally {
          setLoading(false);
      }
  };

    return (
        <section className="bg-[var(--bg-Color)] text-white mt-16">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="text-3xl font-bold mb-3">Contact</h3>
                        <p className="text-white/85 leading-relaxed mb-6">
                            We would love to hear from you! please fill out the form below or get in touch with us directly using the contact information provided
                        </p>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-white/20 placeholder-white/80 text-white px-4 py-3 ring-1 ring-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                required
                            />
                            <input
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-white/20 placeholder-white/80 text-white px-4 py-3 ring-1 ring-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full rounded-xl bg-white/20 placeholder-white/80 text-white px-4 py-3 ring-1 ring-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"></textarea>

                            <button
                                type="submit"
                                className="inline-flex items-center px-5 py-2 rounded-lg bg-amber-400 text-black font-semibold italic shadow hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                                {loading ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                    </div>

                    <div className="flex md:justify-end">
                        <div className="w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden bg-white/10 border border-white/15 shadow-lg hidden md:flex">
                            <img src="contactimg.jpg" alt="Decorative pillows" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}