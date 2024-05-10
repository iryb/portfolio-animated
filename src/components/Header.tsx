import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import React from "react";

export const Header = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 px-4 md:px-10">
      <nav>
        <ul>
          <li>
            <Link href="/" aria-label="Home page">
              {settings.data.title}
            </Link>
          </li>
          {settings.data.nav_item.map((item, index) => (
            <li key={index}>
              <PrismicNextLink field={item.link}>{item.label}</PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
