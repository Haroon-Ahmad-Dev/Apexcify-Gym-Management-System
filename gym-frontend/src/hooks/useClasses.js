import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useClasses = () =>
  useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await api.get("/classes");
      return res.data;
    },
  });
