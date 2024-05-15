import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "@/components/Avatar";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-7xl mx-auto px-4 md:px-10 h-screen"
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
          {slice.primary.title}
        </Heading>

        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.text} />
        </div>
        <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />

        <Avatar
          image={slice.primary.image}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </section>
  );
};

export default About;
