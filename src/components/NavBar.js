"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "@/store/cartSlice";

const links = [
  { href: "/products", label: "Products" },
  { href: "/profile", label: "Profile" },
  { href: "/cart", label: "Cart" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function NavBar() {
  const pathname = usePathname();
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" href="/products">
          <span className="brand-mark">S</span>
          <span>shoply</span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map((link) => (
            <Link
              className={
                pathname.startsWith(link.href) ? "nav-link active" : "nav-link"
              }
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
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
