"use client";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import type { Product as ProductType } from "../../../../sanity/product";
import { useCartContext } from "@/context/CartProvider";

type Props = {
  product: ProductType;
};
export const ProductQuantity = ({ product }: Props) => {
  const { resetQty, decQty, incQty, qty, onAdd, setShowCart } =
    useCartContext();

  useEffect(() => {
    resetQty();
  }, [product._id]);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <>
      <div className="quantity">
        <h3>Quantity:</h3>
        <p className="quantity-desc">
          <span className="minus" onClick={decQty}>
            <AiOutlineMinus />
          </span>
          <span className="num">{qty}</span>
          <span className="plus" onClick={incQty}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="add-to-cart"
          onClick={() => onAdd(product, qty)}
        >
          Add to Cart
        </button>
        <button type="button" className="buy-now" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </>
  );
};
