import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const splitLetters = (str: KeyTextField, key: string) => {
    if (!str) return;
    return str.split("").map((letter, index) => (
      <span
        className={`inline-block name-animation name-animation-${key}`}
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
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {splitLetters(slice.primary.first_name, "fname")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {splitLetters(slice.primary.last_name, "lname")}
            </span>
            <span className="block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-2xl">
              {slice.primary.position}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
