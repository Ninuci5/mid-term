"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_STORAGE_KEY,
  loggedOut,
  selectIsAuthReady,
  selectToken,
} from "@/store/authSlice";
import { selectTotalQuantity } from "@/store/cartSlice";

const links = [
  { href: "/products", label: "Products" },
  { href: "/profile", label: "Profile" },
];

const guestLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const totalQuantity = useSelector(selectTotalQuantity);
  const token = useSelector(selectToken);
  const isAuthReady = useSelector(selectIsAuthReady);

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch(loggedOut());
    router.push("/login");
  };

  const renderLink = (link) => (
    <Link
      className={
        pathname.startsWith(link.href) ? "nav-link active" : "nav-link"
      }
      href={link.href}
      key={link.href}
    >
      {link.label}
    </Link>
  );

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" href="/products">
          <span className="brand-mark">S</span>
          <span>shoply</span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map(renderLink)}
          {/* Hidden until the saved login is read, so Login doesn't flash for signed-in users. */}
          {isAuthReady &&
            (token ? (
              <button className="nav-link nav-logout" type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              guestLinks.map(renderLink)
            ))}
        </nav>
        <Link className="nav-bag" href="/cart" aria-label="Open cart">
          <span aria-hidden="true">♡</span>
          <span>Cart</span>
          <span className="nav-bag-count">{totalQuantity}</span>
        </Link>
      </div>
    </header>
  );
}
