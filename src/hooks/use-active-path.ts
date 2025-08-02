"use client";

import { usePathname } from "next/navigation";

export function useActivePath() {
  const pathname = usePathname();

  return {
    pathname,
    isActive: (href: string) => {
      if (href === "/dashboard") {
        return pathname === "/dashboard";
      }
      if (href === "/dashboard/favourites") {
        // Only active if we're exactly on the favourites page, not on individual memory pages
        return pathname === "/dashboard/favourites";
      }
      // For individual memory pages, check exact match or if it's a favourites URL that matches
      if (href.startsWith("/dashboard/favourites/")) {
        // Decode both URLs for comparison to handle spaces and special characters
        const decodedPathname = decodeURIComponent(pathname);
        const decodedHref = decodeURIComponent(href);
        return decodedPathname === decodedHref;
      }
      return pathname === href || pathname.startsWith(href);
    },
  };
}
