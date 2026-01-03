
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 md:gap-8 items-center lg:items-start text-center lg:text-left">
            <h1 className="font-heading-01 font-[number:var(--heading-01-font-weight)] text-primary-01 text-4xl md:text-5xl lg:text-[length:var(--heading-01-font-size)] tracking-[var(--heading-01-letter-spacing)] leading-[1.2] lg:leading-[var(--heading-01-line-height)] [font-style:var(--heading-01-font-style)]">
              ROOTED IN HERITAGE,<br className="hidden md:block" /> CRAFTED FOR MODERN LIVING.
            </h1>
            <p className="font-body-01 text-lg text-secondary-01 max-w-xl">
              Experience the <strong>best interiors in Hyderabad</strong>, where timeless tradition meets contemporary luxury.
            </p>

            <Link href="/portfolio">
              <Button
                variant="outline"
                className="w-fit h-auto px-8 py-3 md:px-10 md:py-6 border border-solid border-primary-01 bg-transparent hover:bg-primary-01 hover:text-white hover:scale-105 transition-all duration-300 rounded-none"
              >
                <span className="font-button-02 font-[number:var(--button-02-font-weight)] text-sm md:text-[length:var(--button-02-font-size)] tracking-[var(--button-02-letter-spacing)] leading-[var(--button-02-line-height)] [font-style:var(--button-02-font-style)]">
                  VIEW OUR WORK
                </span>
              </Button>
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end mt-2 lg:mt-0">
            <img
              className="w-full max-w-[600px] lg:max-w-[819px] h-auto object-cover"
              alt="Interior Design Showcase"
              src="/images.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};