/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

import type { Banner } from "../../sanity/banner";

type Props = {
  footerBanner: Banner;
};
export const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}: Props) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img
          src={urlFor(image).url()}
          className="footer-banner-image"
          alt="banner image"
        />
      </div>
    </div>
  );
};
