import Image from "next/image";
import styles from "./page.module.css";

import { client } from "../lib/client";
import { FooterBanner, HeroBanner, Product } from "@/components";
import type { Product as ProductType } from "../../sanity/product";
import type { Banner } from "../../sanity/banner";

const getData = async (): Promise<{
  products: Array<ProductType>;
  bannerData: Array<Banner>;
}> => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { products, bannerData };
};

export default async function Home() {
  const { products, bannerData } = await getData();

  return (
    <div>
      <HeroBanner heroBanner={bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Seakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product.slug.current} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData[0]} />
    </div>
  );
}
