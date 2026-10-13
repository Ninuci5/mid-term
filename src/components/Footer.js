export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <LinkBrand />
          <p>Thoughtful goods for everyday living.</p>
        </div>
        <div className="footer-links">
          <a href="/products">Shop</a>
          <a href="/profile">Account</a>
          <a href="/cart">Your cart</a>
        </div>
        <p className="copyright">© 2025 Shoply. Made with care.</p>
      </div>
    </footer>
  );
}

function LinkBrand() {
  return (
    <a className="brand footer-brand" href="/products">
      <span className="brand-mark">S</span>
      <span>shoply</span>
    </a>
  );
}
