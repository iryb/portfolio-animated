"use client";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MutableRefObject, useRef } from "react";
import Shapes from "./Shapes";

gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const container = useRef(null);

  useGSAP(
    () => {
      let tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );
      tl.fromTo(
        ".position-animation",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          delay: 0.2,
        }
      );
    },
    { scope: container }
  );

  const splitLetters = (str: KeyTextField, key: string) => {
    if (!str) return;
    return str.split("").map((letter, index) => (
      <span
        className={`inline-block name-animation name-animation-${key} opacity-0`}
        key={index}
      >
        {letter}
      </span>
    ));
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-7xl mx-auto px-4 md:px-10 h-screen flex"
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center w-full">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,16vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
            ref={container}
          >
            <span className="block text-slate-300">
              {splitLetters(slice.primary.first_name, "fname")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {splitLetters(slice.primary.last_name, "lname")}
            </span>
            <span className="block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-3xl position-animation">
              {slice.primary.position}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
