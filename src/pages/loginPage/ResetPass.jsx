import { useState } from "react";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrlApi } from "../../store/authStore";

export default function ResetPass() {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromPrevPage = location.state?.email || "";
    const [codeVerified, setCodeVerified] = useState(false); // ✅ حالة تتحكم بإظهار الفورم الثاني

    // ✅ Schema للتحقق من الكود
    const verifyCodeSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        code: Yup.string().length(6, "Code must be 6 digits").required("Reset code is required"),
    });

    // ✅ Schema لإعادة تعيين الباسورد
    const resetPasswordSchema = Yup.object({
        newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Password confirmation is required"),
    });

    // ✅ أول فورم - تحقق من الكود
    const formikVerify = useFormik({
        initialValues: { email: emailFromPrevPage, code: "" },
        validationSchema: verifyCodeSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const res = await axios.post(`${backendUrlApi}api/v1/auth/verifyResetCode`, {
                    email: values.email,
                    resetCode: values.code,
                });
                console.log("✅ Code verified:", res.data);
                toast.success("Code verified successfully!");
                setCodeVerified(true); // ✅ نعرض الفورم الثاني
            } catch (err) {
                toast.error(err.response?.data?.message || "Invalid code");
            } finally {
                setSubmitting(false);
            }
        },
    });

    // ✅ ثاني فورم - إعادة تعيين الباسورد
    const formikReset = useFormik({
        initialValues: { newPassword: "", passwordConfirm: "" },
        validationSchema: resetPasswordSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const res = await axios.post(`${backendUrlApi}api/v1/auth/resetPassword`, {
                    email: formikVerify.values.email,
                    newPassword: values.newPassword,
                    passwordConfirm: values.passwordConfirm,
                });

                console.log("✅ Password reset:", res.data);
                toast.success("Password reset successfully!");
                navigate("/login");
            } catch (err) {
                toast.error(err.response?.data?.message || "Something went wrong");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <main className="min-h-screen bg-[var(--bg-Color)] flex items-center justify-center p-6">
            <section className="w-full max-w-lg bg-[#66120e] rounded-lg shadow-2xl p-8 sm:p-10 border border-black/10">
                <h2 className="text-center text-2xl font-semibold text-gray-100 mt-1">{codeVerified ? "Set New Password" : "Verify Reset Code"}</h2>

                {!codeVerified ? (
                    // ✅ فورم التحقق من الكود
                    <FormikProvider value={formikVerify}>
                        <form onSubmit={formikVerify.handleSubmit} className="mt-8 space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-100 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={formikVerify.handleChange}
                                    value={formikVerify.values.email}
                                    className="w-full rounded-md bg-gray-300/80 text-black px-4 py-3"
                                />
                                {formikVerify.touched.email && formikVerify.errors.email && <p className="text-amber-300">{formikVerify.errors.email}</p>}
                            </div>

                            {/* Code */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-100 mb-1">Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    onChange={formikVerify.handleChange}
                                    value={formikVerify.values.code}
                                    className="w-full rounded-md bg-gray-300/80 text-black px-4 py-3"
                                />
                                {formikVerify.touched.code && formikVerify.errors.code && <p className="text-amber-300">{formikVerify.errors.code}</p>}
                            </div>

                            <button type="submit" disabled={formikVerify.isSubmitting} className="w-full bg-amber-500 py-3 rounded-md font-bold text-black">
                                {formikVerify.isSubmitting ? "Verifying..." : "Verify Code"}
                            </button>
                        </form>
                    </FormikProvider>
                ) : (
                    // ✅ فورم تعيين الباسورد
                    <FormikProvider value={formikReset}>
                        <form onSubmit={formikReset.handleSubmit} className="mt-8 space-y-5">
                            {/* Password */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-100 mb-1">New Password</label>
                                <Field name="newPassword" type="password" placeholder="Enter new password" className="w-full rounded-md bg-gray-300/80 text-black px-4 py-3" />
                                <ErrorMessage name="newPassword" component="p" className="text-amber-300" />
                            </div>

                            {/* Password Confirm */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-100 mb-1">Confirm Password</label>
                                <Field name="passwordConfirm" type="password" placeholder="Confirm password" className="w-full rounded-md bg-gray-300/80 text-black px-4 py-3" />
                                <ErrorMessage name="passwordConfirm" component="p" className="text-amber-300" />
                            </div>

                            <button type="submit" disabled={formikReset.isSubmitting} className="w-full bg-amber-500 py-3 rounded-md font-bold text-black">
                                {formikReset.isSubmitting ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </FormikProvider>
                )}
            </section>
        </main>
    );
}
