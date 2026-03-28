import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useMyAttendance = () =>
  useQuery({
    queryKey: ["myAttendance"],
    queryFn: async () => {
      const res = await api.get("/attendance/me");
      return res.data;
    },
  });

export const useMarkAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.post("/attendance/mark"),
    onSuccess: () => qc.invalidateQueries(["myAttendance"]),
  });
};
