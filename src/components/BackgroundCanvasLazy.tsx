"use client";
import dynamic from "next/dynamic";

// Loaded after first paint so three.js stays out of the shared baseline JS chunk.
// Must live in a client module: next/dynamic in a Server Component makes the
// export nondeterministic (outlined Flight row lands on a random page).
export default dynamic(() => import("components/BackgroundCanvas"), {
  ssr: false,
  loading: () => null,
});
