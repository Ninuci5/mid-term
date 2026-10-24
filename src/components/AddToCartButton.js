"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  return (
    <button
      className="button dark-button"
      type="button"
      onClick={() =>
        dispatch(
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          }),
        )
      }
    >
      Add to cart <span>+</span>
    </button>
  );
}
