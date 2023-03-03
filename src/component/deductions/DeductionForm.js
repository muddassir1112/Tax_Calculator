import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaxContext } from "../../App";
import {
  calculateNewTaxRegime,
  calculateOldTaxRegime,
} from "../calculations/TaxCalculation";
import { checkValidation } from "../income/IncomeForm";

export const DeductionForm = () => {
  const data = useContext(TaxContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    alertBox: "none",
    alertMsg: "",
  }); //state to display alert box
  const [checked, setChecked] = useState(false);
  // refs to get the values
  const C80C_AMT = useRef();
  const D80D_AMT = useRef();
  const T80TTA_AMT = useRef();
  const TRP_AMT = useRef();
  let v1, v2, v3, hras;
  // useEffect Hook to persist the values in the input boxes
  useEffect(() => {
    if (data.deduction.c80c !== "") {
      C80C_AMT.current.value = data.deduction.c80c;
    }
    if (data.deduction.d80d !== "") {
      D80D_AMT.current.value = data.deduction.d80d;
    }
    if (data.deduction.t80tta !== "") {
      T80TTA_AMT.current.value = data.deduction.t80tta;
    }
    if (data.deduction.trp !== "") {
      TRP_AMT.current.value = data.deduction.trp;
    }
  }, []);
  // function to check whether it is metro city or not
  const handleCity = () => {
    if (!checked) {
      setChecked(true);
    } else setChecked(false);
  };
  // function to calculate the tax with total deduction and hra exemption
  const handleCalculateTax = () => {
    let CityTemp = 0;
    if (
      checkValidation(
        C80C_AMT.current.value,
        D80D_AMT.current.value,
        T80TTA_AMT.current.value,
        TRP_AMT.current.value,
        alert,
        setAlert
      )
    ) {
      if (checked === true) {
        CityTemp = 0.5 * parseFloat(data.income.basicSalary);
      } else if (checked === false) {
        CityTemp = 0.4 * parseFloat(data.income.basicSalary);
      }
      // hra exemption function called
      hras = handleCalculateHraExpemtion(CityTemp);
      v1 =
        C80C_AMT.current.value > 150000
          ? 150000
          : parseFloat(C80C_AMT.current.value);
      v2 =
        D80D_AMT.current.value > 12000
          ? 12000
          : parseFloat(D80D_AMT.current.value);
      v3 =
        T80TTA_AMT.current.value > 8000
          ? 8000
          : parseFloat(T80TTA_AMT.current.value);
      data.setDeduction({
        standardDeduction: 50000,
        c80c: v1,
        d80d: v2,
        t80tta: v3,
        trp: parseFloat(TRP_AMT.current.value),
        hraExemption: hras,
        totalDeductionAmt: 50000 + v1 + v2 + v3 + hras,
      });
      // taxable amount function is called
      let taxAmtSal = calculateTaxableAmount();
      // taxable amount set in the context state
      data.setTaxableAmtSal(taxAmtSal);
      // old tax calculation function is called and it get set in the context state of old tax amount
      data.setOldtaxAmt(calculateOldTaxRegime(taxAmtSal));
      // new tax calculation function is called and it get set in the context state of new tax amount
      data.setNewTaxAmt(calculateNewTaxRegime(taxAmtSal));
      navigate("/summary");
    }
  };
  // function to calculate hra exemption
  const handleCalculateHraExpemtion = (CityExpense) => {
    let RentTemp1 =
      parseFloat(TRP_AMT.current.value) -
      0.1 * parseFloat(data.income.basicSalary);
    let RentTemp2 = RentTemp1 < 0 ? 0 : RentTemp1;
    if (data.income.hra <= CityExpense && data.income.hra <= RentTemp2) {
      return parseFloat(data.income.hra);
    } else if (CityExpense <= data.income.hra && CityExpense <= RentTemp2) {
      return parseFloat(CityExpense);
    } else return parseFloat(RentTemp2);
  };
  // function to calculate taxable amount
  const calculateTaxableAmount = () => {
    let taxAmount = parseFloat(
      data.income.grossIncome - (50000 + v1 + v2 + v3 + hras)
    );
    if (taxAmount <= 250000) {
      return taxAmount;
    } else {
      taxAmount = parseFloat(
        data.income.grossIncome - (50000 + v1 + v2 + v3 + hras) - 250000
      );
      return taxAmount;
    }
  };

  return (
    <>
      {/* Income */}
      <div className="container card p-4 shadow forms w-50 m-auto mt-3 mb-4">
        <h2 className="mb-3" style={{ color: "#3f51b5", textAlign: "center" }}>
          Dedcution Summary
        </h2>
        <form>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              disabled
              value="50000"
            />
            <label htmlFor="floatingInput">
              Standard Dedcution(₹ per annum)
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="HRA"
              ref={C80C_AMT}
            />
            <label htmlFor="floatingPassword">80C(₹ per annum)</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Leave Travel Allowance"
              ref={D80D_AMT}
            />
            <label htmlFor="floatingPassword">80D(₹ per annum)</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Any Othe Allowance"
              ref={T80TTA_AMT}
            />
            <label htmlFor="floatingPassword">80TTA(₹ per annum)</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Any Othe Allowance"
              ref={TRP_AMT}
            />
            <label htmlFor="floatingPassword">
              Total Rent Paid(₹ per annum)
            </label>
          </div>
          {/* alert box */}
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
            style={{ display: alert.alertBox }}
          >
            <strong>{alert.alertMsg}</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert({ alertBox: "none", alertMsg: "" })}
              aria-label="Close"
            ></button>
          </div>
          {/* alert box */}
          {/* Check for metro city */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={() => handleCity()}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Do you live in Mumbai,Delhi,Chennai,Kolkata?
            </label>
            <h1>{checked}</h1>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link
              to="/"
              className="btn btn-primary btn--next me-md-2"
              type="button"
            >
              <i className="far fa-arrow-alt-circle-left"></i> Back
            </Link>
            <button
              className="btn btn-primary btn--next"
              type="button"
              onClick={handleCalculateTax}
            >
              Calculate Tax <i className="far fa-arrow-alt-circle-right"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
