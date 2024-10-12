import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentList() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  const togglePaymentStatus = (index) => {
    const updatedPayments = [...payments];
    updatedPayments[index].completed = !updatedPayments[index].completed; 
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    setPayments(updatedPayments);
  };

  const handleBackToHome = () => {
    navigate("/paymentList"); 
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Payment List</h1>
      {payments.length > 0 ? (
        <>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-2 px-4 border-b">Project Name</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Payment Method</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="py-2 px-4 border-b">{payment.projectName}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{payment.paymentMethod}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => togglePaymentStatus(index)}
                      className={`px-2 py-1 rounded ${
                        payment.completed
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {payment.completed ? "Paid" : "Unpaid"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Home
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-xl font-bold">No Payment Data Found</p>
        </div>
      )}
    </div>
  );
}
