import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { backendUrlApi } from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";

export default function Forgotpass() {

    const navigate = useNavigate();
   const handleSubmit = async (values, { setSubmitting }) => {
       const data = { email: values.email };
       try {
         const res = await axios.post(`${backendUrlApi}api/v1/auth/forgotPassword`, data);
         console.log(res.data);
         toast.success("Reset code sent to your email!", { duration: 1200, position: "top-center" });
         localStorage.setItem("resetEmail", values.email);
         console.log(localStorage.getItem("resetEmail"));
         navigate("/ResetPass", { state: { email: values.email } });
         
       }
       catch (err) {
             toast.error(err.response?.data?.message || "Something went wrong",{
               duration: 2000,
               position: "top-center",
           });
       } finally {
           setSubmitting(false);
       }
   };

   const formik = useFormik({
       initialValues: { email: "" },
       onSubmit: handleSubmit,
   });
 
   return (
       <main className="min-h-screen bg-[var(--bg-Color)] flex items-center justify-center p-6">
           <section className="w-full max-w-lg bg-[#66120e] rounded-lg shadow-2xl p-8 sm:p-10 border border-black/10">
               <h3 className="text-center text-2xl font-semibold tracking-wide text-gray-200">Reset Your Password</h3>
               <p className="text-center text-lg  text-gray-100 mt-1"> We will send you an email to reset your password</p>

               <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
                   <div>
                       <label className="block text-lg font-semibold text-gray-100 mb-1">Email</label>
                       <input
                           type="email"
                           name="email"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                           placeholder="Enter Your Email"
                           className="w-full rounded-md bg-gray-300/80 placeholder-gray-600 text-black px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                       />
                       {formik.touched.email && formik.errors.email && <p className="mt-1 text-sm text-amber-300">{formik.errors.email}</p>}
                   </div>

                   <button
                       type="submit"
                       className=" text-xl w-full inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition px-4 py-3 font-bold italic text-black">
                       <span>Submit</span>
                   </button>
               </form>

               <div className="mt-5 px-2 ">
                   <Link to="/" className="inline-flex items-center gap-2 text-white/95 hover:underline font-semibold">
                       <span className="-ml-1">Cancle</span>
                   </Link>
               </div>
           </section>
       </main>
   );
}
