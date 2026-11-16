"use client";

import { createContext, useContext } from "react";

const BlogDataContext = createContext(null);

export function BlogDataProvider({ value, children }) {
  return (
    <BlogDataContext.Provider value={value}>
      {children}
    </BlogDataContext.Provider>
  );
}

export function useBlogData() {
  return useContext(BlogDataContext);
}
