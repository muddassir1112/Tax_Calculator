import { createContext, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { DeductionForm } from "./component/deductions/DeductionForm";
import { IncomeForm } from "./component/income/IncomeForm";
import { NavBar } from "./component/navbar/NavBar";
import { Summary } from "./component/summary/Summary";
export const TaxContext = createContext();

function App() {
  const [income, setIncome] = useState({
    grossIncome: "",
    basicSalary: "",
    hra: "",
    lta: "",
    aoa: "",
  });
  const [deduction, setDeduction] = useState({
    totalDeductionAmt: "",
    standardDeduction: 50000,
    c80c: "",
    d80d: "",
    t80tta: "",
    trp: "",
    hraExemption: "",
  });
  const [taxableAmtSal, setTaxableAmtSal] = useState(0);
  const [OldTaxAmt, setOldtaxAmt] = useState("");
  const [newTaxAmt, setNewTaxAmt] = useState("");
  const AppLayout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  );
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AppLayout />}>
          <Route path="/" element={<IncomeForm />} />
          <Route path="/deduction" element={<DeductionForm />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </>
    )
  );
  return (
    <TaxContext.Provider
      value={{
        income,
        setIncome,
        deduction,
        setDeduction,
        taxableAmtSal,
        setTaxableAmtSal,
        OldTaxAmt,
        setOldtaxAmt,
        newTaxAmt,
        setNewTaxAmt,
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </TaxContext.Provider>
  );
}

export default App;
