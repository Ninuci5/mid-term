"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Products could not be loaded.");
        const data = await response.json();
        if (!cancelled) {
          setProducts(data);
          setStatus("ready");
        }
      } catch (error) {
        if (!cancelled) setStatus("error");
        console.error(error);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="page-shell">
      <div className="hero">
        <div>
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <h1>
            Good things,
            <br />
            <em>well chosen.</em>
          </h1>
          <p className="hero-copy">
            A considered collection of products made to bring a little more joy
            to your everyday.
          </p>
          <a className="button dark-button" href="#collection">
            Explore collection <span>↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun"></div>
          <div className="hero-shape"></div>
          <div className="hero-label">
            NEW
            <br />
            ARRIVALS
          </div>
        </div>
      </div>
      <div className="section-heading" id="collection">
        <div>
          <p className="eyebrow">OUR COLLECTION</p>
          <h2>Shop the edit</h2>
        </div>
        <span className="muted">{products.length || "—"} pieces</span>
      </div>
      {status === "loading" && (
        <div className="loading">Curating your collection...</div>
      )}
      {status === "error" && (
        <div className="error-box">
          We could not load the collection. Please refresh and try again.
        </div>
      )}
      {status === "ready" && (
        <div className="product-grid">
          {products.map((product) => (
            <Link
              className="product-card"
              href={`/products/details/${product.id}`}
              key={product.id}
            >
              <div className="product-image-wrap">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <span className="category">{product.category}</span>
                <h3>{product.title}</h3>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
