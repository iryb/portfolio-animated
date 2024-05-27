"use client";
import { Content } from "@prismicio/client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText: Content.ContentIndexSlice["primary"]["link_title"];
};

export default function ContentList({
  items,
  contentType,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const urlPrefixes = contentType === "Blog" ? "/blog" : "/project";

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="list-item opacity-0f">
            <Link
              href={`${urlPrefixes}/${item.uid}`}
              className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
              aria-label={item.data.title || ""}
            >
              <span className="text-3xl font-bold">{item.data.title}</span>
              <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                {viewMoreText}
                <MdArrowOutward />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage: "",
        }}
      ></div>
    </div>
  );
}
