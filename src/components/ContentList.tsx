import { Content } from "@prismicio/client";
import React from "react";

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
  return (
    <div>
      <ul>
        <li>
          <a href="">
            <div></div>
          </a>
        </li>
      </ul>
    </div>
  );
}
