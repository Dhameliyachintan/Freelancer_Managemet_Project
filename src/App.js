import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Dashboard/Home/Home";
import Navbar from "./component/Navbar";
import PaymentList from "./component/PaymentList";
import PaymentForm from "./component/PaymentForm";
import EditPaymentForm from "./component/EditPaymentForm";
import PaymentData from "./component/PaymentData";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path="/editpaymentForm/:index" element={<EditPaymentForm />} />
        <Route path="/paymentList" element={<PaymentList />} />
        <Route path="/Paymentdata" element={<PaymentData />} />
      </Routes>
    </div>
  );
}

export default App;
