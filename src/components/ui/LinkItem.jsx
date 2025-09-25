import { Link, useLocation } from "react-router-dom";

export default function LinkItem({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const pageName = path == "/" ? "home" : path.replace("/", "");
  return (
      <Link
          to={children === "home" ? "/" : `/${children}`}
          className={`text-[18px] font-light capitalize relative transition duration-300 
      ${
          children === pageName
              ? "text-[var(--bgtext-coler)] after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:w-full after:h-[2px] after:bg-[var(--bg-colorA)] font-medium"
              : "text-white font-bold hover:text-[var(--bgtext-coler)] hover:after:w-full after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[var(--bg-colorA)] after:transition-all after:duration-500"
      }
`}>
          {children}
      </Link>
  );
}
