import { InstagramIcon } from "lucide-react";
import React from "react";

const instagramImages = [
  {
    src: "/image-1.svg",
    alt: "Image",
  },
  {
    src: "/image-2.svg",
    alt: "Image",
  },
  {
    src: "/image-3.svg",
    alt: "Image",
  },
  {
    src: "/image-4.svg",
    alt: "Image",
  },
];

export const InstagramFeedSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 md:py-10 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-[51px]">
        <h2 className="font-heading-05 font-[number:var(--heading-05-font-weight)] text-primary-01 text-3xl md:text-[length:var(--heading-05-font-size)] tracking-[var(--heading-05-letter-spacing)] leading-[var(--heading-05-line-height)] [font-style:var(--heading-05-font-style)]">
          #PAVAN
        </h2>

        <a
          href="https://www.instagram.com/bswinteriors_18/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <InstagramIcon className="w-5 h-5 md:w-6 md:h-6 text-secondary-01" />
          <div className="font-label-medium font-[number:var(--label-medium-font-weight)] text-secondary-01 text-base md:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] whitespace-nowrap [font-style:var(--label-medium-font-style)]">
            FOLLOW US ON INSTAGRAM
          </div>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-[31px]">
        {instagramImages.map((image, index) => (
          <div key={index} className="aspect-[366/392] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt={image.alt}
              src={image.src}
            />
          </div>
        ))}
      </div>
    </section>
  );
};