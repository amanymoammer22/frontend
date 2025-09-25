export default function InputField({ label, name, type = "text", placeholder, formik }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-2xl font-light text-black/80 py-2">
                {label}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full px-4 py-2  rounded-3xl  border focus:border-none focus:outline-none focus:ring-2 focus:ring-[var(--MainColor)] "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
            />
            {formik.touched[name] && formik.errors[name] ? <p className="text-red-500 text-sm">{formik.errors[name]}</p> : null}
        </div>
    );
}
