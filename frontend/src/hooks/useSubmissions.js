// src/hooks/useSubmissions.js
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export function useSubmissions({ page, limit, sortOrder }) {
  return useQuery({
    queryKey: ["submissions", page, limit, sortOrder],
    queryFn: async () => {
      const res = await api.get("/submissions", {
        params: {
          page,
          limit,
          sortBy: "createdAt",
          sortOrder,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}
