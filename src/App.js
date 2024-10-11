import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import Home from "./Dashboard/Home/Home";
import Navbar from "./component/Navbar";
import PaymentList from "./component/PaymentList";
import PaymentForm from "./component/PaymentForm";
import EditPaymentForm from "./component/EditPaymentForm";
import PaymentTracking from "./component/PaymentTracking";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path="/editpaymentForm/:index" element={<EditPaymentForm />} />
        <Route path="/paymentList" element={<PaymentList />} />
        <Route path="/PaymentTracking/:index" element={<PaymentTracking />} />
      </Routes>
    </div>
  );
}

export default App;
