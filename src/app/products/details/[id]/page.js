import Link from "next/link";

async function getProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error("Product could not be loaded.");
  return response.json();
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <section className="page-shell detail-page">
      <Link className="back-link" href="/products">
        ← Back to products
      </Link>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="rating">
            <span>★★★★★</span> {product.rating.rate}{" "}
            <small>({product.rating.count} reviews)</small>
          </div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <button className="button dark-button" type="button">
            Add to cart <span>+</span>
          </button>
          <div className="detail-meta">
            <span>Free delivery</span>
            <span>30-day returns</span>
            <span>Secure checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
