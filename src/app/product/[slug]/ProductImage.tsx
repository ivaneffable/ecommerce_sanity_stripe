/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

import { client, urlFor } from "../../../lib/client";

type Props = {
  image: Array<string>;
};
export const ProductImage = ({ image }: Props) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="image-container">
        <img
          src={urlFor(image?.[index]).url()}
          className="product-detail-image"
          alt="product image"
        />
      </div>
      <div className="small-images-container">
        {image?.map((item, i) => (
          <img
            key={i}
            src={urlFor(item).url()}
            className={
              i === index ? "small-image selected-image" : "small-image"
            }
            onMouseEnter={() => setIndex(i)}
            alt="product image"
          />
        ))}
      </div>
    </div>
  );
};
