import  { Tooltip } from "react-tooltip";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AuthLink({ isLoggedIn, handleLogout }) {
    return (
        <div className="flex items-center space-x-[5px] capitalize cursor-pointer transition duration-200 hover:text-[var(--havericon)]">
            {isLoggedIn ? (
                <>
                    <FaSignOutAlt data-tooltip-id="logout" onClick={handleLogout} size={30} className="transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                    <Tooltip
                        id="logout"
                        place="bottom"
                        content="logout"
                        style={{
                            backgroundColor: "var(--bg-footer)",
                            color: "var(--bg-Color)",
                            fontSize: ".9rem",
                        }}
                    />
                </>
            ) : (
                <>
                    <Link to="/login">
                        <FaSignInAlt data-tooltip-id="login" size={30} className="transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                    </Link>
                    <Tooltip
                        id="login"
                        place="bottom"
                        content="login"
                        style={{
                            backgroundColor: "var(--bg-footer)",
                            color: "var(--bg-Color)",
                            fontSize: ".9rem", 
                        }}
                    />
                </>
            )}
        </div>
    );
}
