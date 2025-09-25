import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../validation/loginSchema";
import { FaSignInAlt } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import { authStore, backendUrlApi } from "../../store/authStore";
import toast from "react-hot-toast";
import { flushSync } from "react-dom";

export default function Login() {
    const navigate = useNavigate();
    const login = authStore((state) => state.login);
    
    // const login = authStore((state) => state.login);
    // login(user, token, values.remember);

     const handleSubmit = async (values, { setSubmitting }) => {
        const data = { email: values.email, password: values.password };
         try {
             const res = await axios.post(`${backendUrlApi}api/v1/auth/login`, data);
             const { token, data: user } = res.data;
              flushSync(() => {
                  login(user, token, values.remember);
              });
           
         
             if (user.role === "admin") {
                 console.log("adminlogin");
                 navigate("/admin");
             } else {
                 navigate("/");
                 
             }
              console.log("Current User:", user.role);
              toast.success("Logged In Successfully..!", { duration: 1200, position: "top-center" });
         } catch (err) {
             console.log(err +"err pass");
             toast.error(err.response?.data?.message || "Login failed", {
                 duration: 2000,
                 position: "top-center",
             });
         } finally {
             setSubmitting(false);
         }
     };
    
  const formik = useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: handleSubmit,
  });

  return (
      <main className="min-h-screen bg-[var(--bg-Color)] flex items-center justify-center p-6">
          <section className="w-full max-w-lg bg-[#66120e] rounded-lg shadow-2xl p-8 sm:p-10 border border-black/10">
              <div className="flex justify-center mb-6">
                  <img src="/logo.jpg" alt="Palestinian Embroidery" className="w-20 h-20 rounded-md ring-1 ring-white/20 object-cover mt-2" />
              </div>

              <h3 className="text-center text-sm tracking-wide text-gray-200">Palestinian Embroidery</h3>
              {/* <h2 className="text-center text-2xl font-semibold text-gray-100 mt-1">Artisan Login</h2> */}

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

                  <div>
                      <label className="block text-lg font-semibold text-gray-100 mb-1">Password</label>
                      <input
                          type="password"
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          placeholder="enter Your Password"
                          className="w-full rounded-md bg-gray-300/80 placeholder-gray-600 text-black px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {formik.touched.password && formik.errors.password && <p className="mt-1 text-sm text-amber-300">{formik.errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between text-[13px] text-gray-200/90">
                      <Link to="/forgotpass" className="hover:underline text-[15px]">
                          Forgot your password?
                      </Link>
                      <Link to="/register" className="hover:underline text-[15px]">
                          Create new Account!
                      </Link>
                  </div>
                  <button
                      type="submit"
                      className=" text-xl w-full inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition px-4 py-3 font-bold italic text-black">
                      <FaSignInAlt className="text-lg" />
                      <span>sign in </span>
                  </button>
              </form>

              <div className="mt-8 text-center">
                  <Link to="/" className="inline-flex items-center gap-2 text-white/95 hover:underline font-semibold">
                      <span className="-ml-1">←</span> Back to Website
                  </Link>
              </div>
          </section>
      </main>
  );
}

