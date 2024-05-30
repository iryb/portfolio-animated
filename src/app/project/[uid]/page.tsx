import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formatDate } from "@/utils/formatDate";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  const formattedDate = formatDate(page.data.date);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10">
      <Heading as="h1" size="md" className="mt-10 mb-8">
        {page.data.title}
      </Heading>
      <p className="mt-8 mb-8 border-b border-slate-600 text-xl font-medium text-slate-300">
        {formattedDate}
      </p>
      <PrismicNextImage
        field={page.data.hover_image}
        className="max-w-[400px] mb-8"
        imgixParams={{ q: 90 }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
