import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaCreditCard, FaCalendarAlt } from "react-icons/fa";
import "../../styles/dashboard.css";
import "../../styles/table.css";

export const MemberDashboard = () => {
  const qc = useQueryClient();

  const { data: attendance = [] } = useQuery({
    queryKey: ["myAttendance"],
    queryFn: async () => (await api.get("/attendance/me")).data,
  });

  const markAttendance = useMutation({
    mutationFn: () => api.post("/attendance/mark"),
    onSuccess: () => {
      toast.success("Attendance marked successfully");
      qc.invalidateQueries(["myAttendance"]);
    },
  });

  const makePayment = async () => {
    await api.post("/payments", { amount: 50 });
    toast.success("Payment initiated");
  };

  return (
    <div className="dashboard">
      <h1>Member Dashboard</h1>
      <p className="dashboard-subtitle">
        Track your fitness journey and stay consistent 💪
      </p>

      {/* ACTION CARDS */}
      <div className="action-cards">
        <div className="action-card" onClick={() => markAttendance.mutate()}>
          <FaCheckCircle />
          <h3>Mark Attendance</h3>
          <p>Check in for today’s workout</p>
        </div>

        <div className="action-card" onClick={makePayment}>
          <FaCreditCard />
          <h3>Pay Membership</h3>
          <p>Manage your subscription</p>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="table-container dark">
        <h2>
          <FaCalendarAlt /> My Attendance
        </h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length === 0 && (
              <tr>
                <td>No attendance records yet</td>
              </tr>
            )}

            {attendance.map((a) => (
              <tr key={a._id}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
