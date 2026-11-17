"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

interface ViewTransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
}

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

export function ViewTransitionLink({
  href,
  children,
  className,
  onClick,
  ariaLabel,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    // Preserve standard browser behavior for modified clicks (new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    const url = typeof href === "string" ? href : href.pathname || "/";
    if (url.startsWith("#") || url.startsWith("http")) {
      return;
    }

    const doc = document as DocumentWithTransition;
    if (typeof doc.startViewTransition === "function") {
      e.preventDefault();
      doc.startViewTransition(() => {
        flushSync(() => {
          router.push(url);
        });
      });
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </Link>
  );
}
