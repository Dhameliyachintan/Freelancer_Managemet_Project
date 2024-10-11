import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPaymentForm() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    const currentPayment = storedPayments[index];
    if (currentPayment) {
      setPayment(currentPayment);
      setProjectName(currentPayment.projectName);
      setDate(currentPayment.date);
      setEndDate(currentPayment.endDate);
      setCategory(currentPayment.category);
      setAmount(currentPayment.amount);
      setPaymentMethod(currentPayment.paymentMethod);
      setDescription(currentPayment.description);
    }
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPayment = {
      ...payment,
      projectName,
      date,
      endDate,
      category,
      amount: parseFloat(amount),
      paymentMethod,
      description,
    };

    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    storedPayments[index] = updatedPayment;
    localStorage.setItem("payments", JSON.stringify(storedPayments));
    navigate("/paymentList");
  };

  if (!payment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Edit Payment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Name:
          </label>
          <select
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a project</option>
            <option value="Project Alpha">Project Alpha</option>
            <option value="Project Beta">Project Beta</option>
            <option value="Project Gamma">Project Gamma</option>
            <option value="Project Delta">Project Delta</option>
            <option value="Project Epsilon">Project Epsilon</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a project category</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Research">Research</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Payment Method:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="Add a description..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
