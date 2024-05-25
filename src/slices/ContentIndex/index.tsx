import ContentList from "@/components/ContentList";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const contentType = slice.primary.content_type || "Blog";

  const items =
    contentType === "Blog"
      ? await client.getAllByType("blog_post")
      : await client.getAllByType("project");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-7xl mx-auto px-4 md:px-10"
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.title}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.link_title}
      />
    </section>
  );
};

export default ContentIndex;
