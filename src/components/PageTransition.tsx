import { ViewTransition } from "react";

/**
 * Wraps a route's content so navigations turn it like a page: the old route
 * leafs away from the spine and the new one settles in (keyframes live in
 * globals.css). It must sit inside each page, not the root layout, so it
 * mounts and unmounts with the route and fires enter/exit.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
