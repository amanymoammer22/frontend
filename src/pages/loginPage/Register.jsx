import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authStore, backendUrlApi } from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";
// import { useAuthStore } from "../../store/authStore";

export default function Register() {

  const navigate = useNavigate();
  const login = authStore((state) => state.login);
    const handleSubmit = async (values, { setSubmitting }) => {
           try {
               const payload = {
                   firstName: values.firstName,
                   lastName: values.lastName,
                   email: values.email,
                   password: values.password,
                   passwordConfirm: values.passwordConfirm,
               };

               const res = await axios.post(`${backendUrlApi}api/v1/auth/signup`, payload);
               const { token, data: user } = res.data;
               localStorage.setItem("token", res.data.token);

               login(user, token, values.remember);

               toast.success("Signup successful 🎉", { duration: 1200, position: "top-center" });
               navigate("/");
           } catch (error) {
               toast.error(error.response?.data?.message || "Signup failed. Try again.", {
                   duration: 2000,
                   position: "top-center",
               });
           } finally {
               setSubmitting(false);
           }
    };
    


const schema = Yup.object({
    firstName: Yup.string().min(3, "Too short").required("Required"),
    lastName: Yup.string().min(2, "Too short").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
    passwordConfirm: Yup.string()
        .min(6, "Min 6 chars")
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

  return (
      <div className="min-h-screen w-full bg-[var(--bg-Color)] flex items-start md:items-center justify-center py-14">
          <div className="w-full max-w-2xl px-6">
              <h1 className="text-center text-3xl md:text-4xl font-semibold text-white mb-8">Create Account</h1>

              <Formik initialValues={{ firstName: "", lastName: "", email: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                  <Form className="space-y-6">
                      {/* First Name */}
                     
                      <div>
                          <label className="block text-xl text-white font-semibold mb-2">First Name</label>
                          <Field name="firstName" placeholder="Enter your Name" className="w-full rounded-lg bg-gray-200/80 placeholder-gray-500 px-4 py-3 outline-none focus:ring-2 ring-amber-500" />
                          <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-amber-300" />
                      </div>

                      {/* Last Name */}
                      <div>
                          <label className="block text-xl text-white font-semibold mb-2">Last Name</label>
                          <Field
                              name="lastName"
                              placeholder="Enter your Last Name"
                              className="w-full rounded-lg bg-gray-200/80 placeholder-gray-500 px-4 py-3 outline-none focus:ring-2 ring-amber-500"
                          />
                          <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-amber-300" />
                      </div>

                      {/* Email */}
                      <div>
                          <label className="block text-xl text-white font-semibold mb-2">Email</label>
                          <Field
                              name="email"
                              type="email"
                              placeholder="Enter Your Email"
                              className="w-full rounded-lg bg-gray-200/80 placeholder-gray-500 px-4 py-3 outline-none focus:ring-2 ring-amber-500"
                          />
                          <ErrorMessage name="email" component="div" className="mt-1 text-sm text-amber-300" />
                      </div>

                      {/* Password */}
                      <div>
                          <label className="block text-xl text-white font-semibold mb-2">Password</label>
                          <Field
                              name="password"
                              type="password"
                              placeholder="Enter Your Password"
                              className="w-full rounded-lg bg-gray-200/80 placeholder-gray-500 px-4 py-3 outline-none focus:ring-2 ring-amber-500"
                          />
                          <ErrorMessage name="password" component="div" className="mt-1 text-sm text-amber-300" />
                      </div>

                      {/* passwordConfirm */}
                      <div>
                          <label className="block text-xl text-white font-semibold mb-2">password Confirm</label>
                          <Field
                              name="passwordConfirm"
                              type="password"
                              placeholder="Enter Your password Confirm"
                              className="w-full rounded-lg bg-gray-200/80 placeholder-gray-500 px-4 py-3 outline-none focus:ring-2 ring-amber-500"
                          />
                          <ErrorMessage name="password" component="div" className="mt-1 text-sm text-amber-300" />
                      </div>

                      <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-[#3b0a08] font-semibold px-5 py-2.5 disabled:opacity-60 w-1/3 text-xl">
                          Submit
                      </button>
                  </Form>
              </Formik>
          </div>
      </div>
  );
}

