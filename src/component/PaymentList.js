import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PaymentList() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  const groupedData = payments.reduce((acc, payment) => {
    acc[payment.category] = (acc[payment.category] || 0) + payment.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Payment Amount",
        data: Object.values(groupedData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const totalEarnings = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const handleButtonClick = (index) => {
    const updatedPayments = [...payments];
    updatedPayments[index].completed = !updatedPayments[index].completed;
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    setPayments(updatedPayments);
  };

  const handleDelete = (index) => {
    const updatedPayments = payments.filter((_, i) => i !== index);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    setPayments(updatedPayments);
  };

  const handleEdit = (index) => {
    navigate(`/editpaymentForm/${index}`);
  };

  const handlepaymenttracking = (index) => {
    const paymentData = payments[index];
    localStorage.setItem("selectedPayment", JSON.stringify(paymentData));
    navigate(`/PaymentTracking/${index}`);
  };

  return (
    <>
      <div>
        <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Payment List
          </h1>
          <h2 className="text-lg font-semibold mb-2">
            Total Earnings: ${totalEarnings.toFixed(2)}
          </h2>
          <>
            <div className="mb-6">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Categories",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Payment Amount ($)",
                      },
                      beginAtZero: true,
                    },
                  },
                }}
                style={{ height: "400px", width: "100%" }}
              />
            </div>
          </>
        </div>
        <div className="max-w-6xl mx-auto my-8 p-6 flex flex-col gap-10">
         
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Project Name</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">End Date</th>{" "}
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Payment Method</th>
                <th className="border border-gray-300 p-2">Actions</th>
                <th className="border border-gray-300 p-2">Payment Tracking</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleButtonClick(index)}
                      className={`text-white px-4 py-1 rounded ${
                        payment.completed
                          ? "bg-red-500 hover:bg-red-700"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                    >
                      {payment.completed ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {payment.projectName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {payment.description}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(payment.endDate).toLocaleDateString()}
                  </td>{" "}
                  <td className="border border-gray-300 p-2">
                    {payment.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {payment.paymentMethod}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handlepaymenttracking(index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Track Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
