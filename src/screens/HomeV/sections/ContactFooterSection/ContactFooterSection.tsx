import React from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";

const footerColumns = [
  {
    links: [
      { label: "PORTFOLIO", path: "/portfolio" },
      { label: "SERVICES", path: "/services" },
      { label: "PROCESS", path: "/process" },
      { label: "LOOKBOOK", path: "/lookbook" },
    ],
  },
  {
    links: [
      { label: "ABOUT US", path: "/about" },
      { label: "BLOG", path: "/blog" },
      { label: "CONTACT", path: "/contact" },
      { label: "CAREERS", path: "/contact" },
      { label: "MEDIA", path: "/lookbook" },
    ],
  },
  {
    links: [
      { label: "RESIDENTIAL", path: "/services" },
      { label: "COMMERCIAL", path: "/services" },
      { label: "HOSPITALITY", path: "/services" },
      { label: "BESPOKE", path: "/services" },
    ],
  },
];

const socialLinks = [
  { name: "INSTAGRAM" },
  { name: "FACEBOOK" },
  { name: "PINTEREST" },
  { name: "TWITTER" },
];

export const ContactFooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-primary-01 relative z-50 py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[170px]">
      <div className="flex flex-col gap-8 md:gap-[79px]">
        <div className="flex flex-col items-center gap-8 md:gap-[79px] relative group">
          {/* Hover Pop-up Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] transition-all duration-500 ease-out opacity-100 scale-100 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-0">
            <img
              src="/q.png"
              alt=""
              className="w-full h-full object-contain opacity-20"
            />
          </div>

          <h2 className="relative z-10 w-full max-w-[809px] font-heading-03 font-[number:var(--heading-03-font-weight)] [font-style:var(--heading-03-font-style)] text-primary-03 text-3xl md:text-4xl lg:text-5xl text-center tracking-[var(--heading-03-letter-spacing)] leading-tight mb-4">
            TRANSFORMING HOUSES INTO HOMES WITH SOUL.
          </h2>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full md:w-[301px] h-[50px] md:h-[69px] bg-transparent border-[#fcfbfa] hover:bg-transparent"
              >
                <span className="font-button-02 font-[number:var(--button-02-font-weight)] text-primary-03 text-sm md:text-[length:var(--button-02-font-size)] tracking-[var(--button-02-letter-spacing)] leading-[var(--button-02-line-height)] [font-style:var(--button-02-font-style)]">
                  START YOUR JOURNEY
                </span>
              </Button>
            </Link>
            <p className="text-secondary-03 text-xs tracking-widest opacity-80">
              WE SPEAK ENGLISH, TELUGU & HINDI
            </p>
          </div>
        </div>

        <Separator className="bg-secondary-03 h-px opacity-20" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-[104px]">
          <div className="flex-1 flex flex-col gap-6 md:gap-8">
            <h3 className="font-label-big font-[number:var(--label-big-font-weight)] text-secondary-03 text-sm md:text-[length:var(--label-big-font-size)] tracking-[var(--label-big-letter-spacing)] leading-[var(--label-big-line-height)] [font-style:var(--label-big-font-style)]">
              SUBSCRIBE TO RECEIVE DESIGN INSIGHTS
            </h3>

            <div className="relative bg-white/5 h-[50px] md:h-[68px]">
              <Input
                placeholder="Enter your email"
                className="h-full bg-transparent border-0 text-secondary-03 font-body-02 font-[number:var(--body-02-font-weight)] text-sm md:text-[length:var(--body-02-font-size)] tracking-[var(--body-02-letter-spacing)] leading-[var(--body-02-line-height)] [font-style:var(--body-02-font-style)] placeholder:text-secondary-03/50 px-4 md:px-6"
              />
            </div>

            <div className="flex gap-2 md:gap-4 items-start">
              <Checkbox className="w-4 h-4 rounded border-[#f8f5f3] mt-1" />
              <p className="flex-1 font-caption font-[number:var(--caption-font-weight)] text-secondary-03 text-xs md:text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
                I've read the Privacy Policy and I consent to INFINITY  Interiors sending me marketing communications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-[60px]">
            {footerColumns.map((column, columnIndex) => (
              <nav key={columnIndex} className="flex flex-col gap-3 md:gap-[19px]">
                {column.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.path}
                    className="font-label-medium font-[number:var(--label-medium-font-weight)] text-secondary-03 text-xs md:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <Separator className="bg-secondary-03 h-px opacity-20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="font-caption font-[number:var(--caption-font-weight)] text-secondary-03 text-xs md:text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
              Hyderabad, India
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <span className="font-caption font-[number:var(--caption-font-weight)] text-secondary-03 text-xs md:text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
              Connect with us
            </span>
          </div>
        </div>
      </div>

      <Separator className="bg-secondary-03 h-px mt-8 opacity-20" />

      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 h-auto md:h-[58px]">
          {socialLinks.map((social, index) => (
            <React.Fragment key={index}>
              <a
                href="https://www.instagram.com/infinityinteriors_18/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center font-label-small font-[number:var(--label-small-font-weight)] text-secondary-03 text-xs md:text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] [font-style:var(--label-small-font-style)] hover:text-white transition-colors border-l border-secondary-03/20 first:border-l-0 py-3 md:py-0"
              >
                {social.name}
              </a>
            </React.Fragment>
          ))}
        </div>
        <Separator className="bg-secondary-03 h-px mt-0 opacity-20" />
      </div>

      <Separator className="bg-secondary-03 h-px opacity-20" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8">
        <p className="font-label-small font-[number:var(--label-small-font-weight)] text-secondary-02 text-xs md:text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] [font-style:var(--label-small-font-style)] text-center md:text-left">
          © 2000 INFINITY INTERIORS. ALL RIGHTS RESERVED.
        </p>

        <a href="https://bravoo.in" target="_blank" rel="noopener noreferrer" className="font-label-small text-secondary-02 text-xs tracking-widest hover:text-white transition-colors">
          Developed by <span className="font-bold underline decoration-1 underline-offset-4">Bravoo.in</span>
        </a>

        <Link href="/privacy" className="font-label-small font-[number:var(--label-small-font-weight)] text-secondary-02 text-xs md:text-[length:var(--label-small-font-size)] text-center md:text-right tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] [font-style:var(--label-small-font-style)] hover:text-white">
          PRIVACY POLICY | TERMS OF USE
        </Link>
      </div>
    </footer>
  );
};