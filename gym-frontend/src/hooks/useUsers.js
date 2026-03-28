import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });
