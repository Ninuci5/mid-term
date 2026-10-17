"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/products", label: "Products" },
  { href: "/profile", label: "Profile" },
  { href: "/cart", label: "Cart" },
];

export default function NavBar() {
  const pathname = usePathname();

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
        </Link>
      </div>
    </header>
  );
}
