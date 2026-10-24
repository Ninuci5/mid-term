"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from "@/store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const total = useSelector(selectTotalPrice);

  return (
    <section className="page-shell cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Your cart</h1>
        </div>
        <span className="muted">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.length === 0 && (
            <p className="cart-empty muted">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-thumb">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-main">
                <h3>{item.title}</h3>
                <p className="muted">${item.price.toFixed(2)} each</p>
                <div className="quantity">
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    disabled={item.quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <aside className="summary">
          <p className="eyebrow">ORDER SUMMARY</p>
          <div>
            <span>Total products</span>
            <strong>{totalQuantity}</strong>
          </div>
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
          <button
            className="button dark-button"
            type="button"
            disabled={items.length === 0}
          >
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
