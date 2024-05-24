"use client";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-[8rem] overflow-hidden"
      ref={component}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <Heading as="h2" size="lg" className="mb-8">
          {slice.primary.title}
        </Heading>
      </div>
      {slice.items.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4"
          aria-label={tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <React.Fragment key={i}>
              <span
                className="tech-name text-8xl font-extrabold uppercase tracking-tighter mx-2"
                style={{
                  color: i === 7 && tech_color ? tech_color : "transparent",
                  WebkitTextStroke:
                    i === 7 && tech_color
                      ? "inherit"
                      : "2px rgba(255, 255, 255, 0.15)",
                }}
              >
                {tech_name}
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
