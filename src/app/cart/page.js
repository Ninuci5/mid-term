"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const fallbackItems = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    quantity: 1,
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    quantity: 1,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(() => {
    return fallbackItems;
    /*
    მგონი რაღაც პრობლემა აქააა, ვერ ვხვდები რაა
    if (typeof window === "undefined") return fallbackItems;
    const saved = window.localStorage.getItem("shoply-cart");
    if (!saved) return fallbackItems;
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Saved cart data is invalid.", error);
      return fallbackItems;
    }
    */
  });
  useEffect(() => {
    window.localStorage.setItem("shoply-cart", JSON.stringify(items));
  }, [items]);

  const updateQuantity = (id, delta) =>
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(10, Math.max(1, item.quantity + delta)),
            }
          : item,
      ),
    );
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="page-shell cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Your cart</h1>
        </div>
        <span className="muted">{items.length} items</span>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-thumb">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-main">
                <h3>{item.title}</h3>
                <p className="muted">In stock</p>
                <div className="quantity">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <aside className="summary">
          <p className="eyebrow">ORDER SUMMARY</p>
          <div>
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div>
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="button dark-button" type="button">
            Checkout <span>→</span>
          </button>
          <Link className="continue-link" href="/products">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
