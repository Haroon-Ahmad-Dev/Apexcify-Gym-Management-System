import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import "../../styles/table.css";
import "../../styles/dashboard.css";

export const TrainerDashboard = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => (await api.get("/classes")).data,
  });

  return (
    <div className="dashboard">
      <h1>Trainer Dashboard</h1>

      <div className="table-container">
        <h2>Assigned Classes</h2>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Time</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.time}</td>
                <td>{c.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
