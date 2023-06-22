/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import type { Product as ProductType } from "../../sanity/product";

type Props = {
  product: ProductType;
};
export const Product = ({ product: { image, name, slug, price } }: Props) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image[0]).url()}
            width={250}
            height={250}
            className="product-image"
            alt="product image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};
