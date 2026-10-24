"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

const TOAST_DURATION_MS = 2000;

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  // A counter restarts the timer when the user adds again while the toast is visible.
  const [toastId, setToastId] = useState(0);

  useEffect(() => {
    if (!toastId) return;
    const timer = setTimeout(() => setToastId(0), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toastId]);

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );
    setToastId((current) => current + 1);
  };

  return (
    <>
      <button className="button dark-button" type="button" onClick={handleAdd}>
        Add to cart <span>+</span>
      </button>
      {toastId > 0 && (
        <div className="toast" role="status">
          Added to cart
        </div>
      )}
    </>
  );
}
