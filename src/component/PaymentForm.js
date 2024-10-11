import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [projectName, setProjectName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(""); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !amount ||
      isNaN(amount) ||
      amount <= 0 ||
      !date ||
      !paymentMethod ||
      !projectName ||
      !category
    ) {
      return;
    }

    const newPaymentEntry = {
      amount: Number(amount),
      date,
      paymentMethod,
      projectName,
      category,
      description,
    };

    const existingPayments = JSON.parse(localStorage.getItem("payments")) || [];
    const updatedPayments = [...existingPayments, newPaymentEntry];
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    resetForm();
    navigate("/");
  };

  const resetForm = () => {
    setAmount("");
    setDate("");
    setPaymentMethod("");
    setProjectName("");
    setCategory("");
    setDescription(""); 
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Create a New Payment Entry
      </h1>
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
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Housing">Housing</option>
            <option value="Leisure">Leisure</option>
            <option value="Transport">Transport</option>
          </select>
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Add a description..."
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
