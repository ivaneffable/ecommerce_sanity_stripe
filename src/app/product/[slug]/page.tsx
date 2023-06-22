import React from "react";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../../lib/client";
import { Product } from "../../../components";
import type { Product as ProductType } from "../../../../sanity/product";

import { ProductImage } from "./ProductImage";
import { ProductQuantity } from "./ProductQuantity";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const query = `*[_type == "product" && slug.current == '${params.slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product: ProductType = await client.fetch(query);
  const products: Array<ProductType> = await client.fetch(productsQuery);

  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <ProductImage image={image} />

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <ProductQuantity product={product} />

          <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {products.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products: Array<ProductType> = await client.fetch(query);

  const paths = products.map((product) => ({
    slug: product.slug.current,
  }));

  return paths;
}
