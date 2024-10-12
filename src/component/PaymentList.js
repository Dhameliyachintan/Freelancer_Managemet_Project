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

  return (
    <div>
      <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Payment List</h1>
        <h2 className="text-lg font-semibold mb-2">
          Total Earnings: ${totalEarnings.toFixed(2)}
        </h2>
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
      </div>
      <div className="max-w-6xl mx-auto my-8 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{payment.projectName}</h3>
              <button
                onClick={() => handleButtonClick(index)}
                className={`text-white px-3 py-1 rounded ${payment.completed ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}`}
              >
                {payment.completed ? "Active" : "Inactive"}
              </button>
            </div>
            <p className="text-gray-700"><strong> description:- </strong> {payment.description}</p>
            <p className="text-gray-600"><strong>Date:- </strong>  {new Date(payment.date).toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>End Date:- </strong>  {new Date(payment.endDate).toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>Category:- </strong>  {payment.category}</p>
            <p className="text-gray-600"><strong>Payment Method:- </strong>  {payment.paymentMethod}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
