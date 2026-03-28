import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import { toast } from "react-toastify";

export const useCreateClass = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post("/classes", data),
    onSuccess: () => {
      toast.success("Class created successfully");
      qc.invalidateQueries(["classes"]);
    },
  });
};
