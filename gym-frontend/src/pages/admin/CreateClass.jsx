import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { FaDumbbell } from "react-icons/fa";
import "../../styles/form.css";

export const CreateClass = () => {
  const qc = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    time: "",
    capacity: "",
    trainer: "",
  });

  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => (await api.get("/users/trainers")).data,
  });

  const createClass = useMutation({
    mutationFn: () => api.post("/classes", form),
    onSuccess: () => {
      toast.success("Class created successfully");
      qc.invalidateQueries(["classes"]);
      setForm({ title: "", time: "", capacity: "", trainer: "" });
    },
  });

  const submit = (e) => {
    e.preventDefault();
    createClass.mutate();
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>
        <FaDumbbell /> Create New Class
      </h2>

      <div className="form-group">
        <label>Class Title</label>
        <input
          placeholder="Morning Yoga"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          placeholder="07:00 AM"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Capacity</label>
        <input
          type="number"
          placeholder="20"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Trainer</label>
        <select
          value={form.trainer}
          onChange={(e) => setForm({ ...form, trainer: e.target.value })}
          required
        >
          <option value="">Select Trainer</option>
          {trainers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" disabled={createClass.isLoading}>
        {createClass.isLoading ? "Creating..." : "Create Class"}
      </button>
    </form>
  );
};
