import { useCallback } from "react";

export const useInfiniteScroll = ({
  threshold = 60,
  loading = false,
  totalPages,
  page,
  setPage,
} = {}) => {
  const handleScroll = useCallback(
    (e) => {
      if (loading) return;
      const scrollTop = e.target.scrollTop;
      const clientHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;

      const remaining = scrollHeight - (scrollTop + clientHeight);

      if (remaining < threshold && totalPages !== page) {
        setPage((prev) => prev + 1);
      }
    },
    [threshold, loading, page, totalPages, setPage]
  );

  return handleScroll;
};
