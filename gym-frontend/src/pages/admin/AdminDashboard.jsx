import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { CreateClass } from "./CreateClass";
import "../../styles/dashboard.css";
import "../../styles/table.css";

export const AdminDashboard = () => {
  const qc = useQueryClient();

  // USERS
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get("/users")).data,
  });

  // CLASSES
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => (await api.get("/classes")).data,
  });

  // ATTENDANCE
  const { data: attendance = [] } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => (await api.get("/attendance/all")).data,
  });

  // DELETE USER
  const deleteUser = useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => qc.invalidateQueries(["users"]),
  });

  return (
    <div className="dashboard">
      <h1 style={{color:"#ff4d5a",cursor:"pointer"}}>Admin Dashboard</h1>
      <CreateClass />

      {/* USERS */}
      <div className="table-container">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser.mutate(u._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CLASSES */}
      <div className="table-container">
        <h2>Classes</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
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

      {/* ATTENDANCE */}
<div className="table-container dark">
  <h2>All Attendance</h2>
  <table>
    <thead>
      <tr>
        <th>Member Name & Email</th>
        <th> Attendence Date</th>
      </tr>
    </thead>
    <tbody>
      {attendance.map((a) => (
        <tr key={a._id}>
          <td>
            {a.member?.name}
            <br />
            <span style={{ opacity: 0.7, fontSize: "13px" }}>
              {a.member?.email}
            </span>
          </td>
          <td>{new Date(a.date).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};
