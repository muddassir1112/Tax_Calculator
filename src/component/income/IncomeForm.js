import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaxContext } from "../../App";
import "../../App.css";
export const IncomeForm = () => {
  const data = useContext(TaxContext); //useContext Hook
  const navigate = useNavigate(); //useNavigate Hook
  const [alert, setAlert] = useState({
    alertBox: "none",
    alertMsg: "",
  });
  // refs to get the input box values
  const BASIC_SAL_AMT = useRef();
  const HRA_AMT = useRef();
  const LTA_AMT = useRef();
  const AOA_AMT = useRef();
  useEffect(() => {
    if (data.income.basicSalary !== "") {
      BASIC_SAL_AMT.current.value = data.income.basicSalary;
    }
    if (data.income.hra !== "") {
      HRA_AMT.current.value = data.income.hra;
    }
    if (data.income.lta !== "") {
      LTA_AMT.current.value = data.income.lta;
    }
    if (data.income.aoa !== "") {
      AOA_AMT.current.value = data.income.aoa;
    }
  }, []);
  // function to calculate gross income and get set in the context state of income
  const handleGrossIncome = () => {
    if (
      checkValidation(
        BASIC_SAL_AMT.current.value,
        HRA_AMT.current.value,
        LTA_AMT.current.value,
        AOA_AMT.current.value,
        alert,
        setAlert
      )
    ) {
      let temp = 0;
      temp =
        parseFloat(BASIC_SAL_AMT.current.value) +
        parseFloat(HRA_AMT.current.value) +
        parseFloat(LTA_AMT.current.value) +
        parseFloat(AOA_AMT.current.value);
      data.setIncome({
        grossIncome: temp,
        basicSalary: parseFloat(BASIC_SAL_AMT.current.value),
        hra: parseFloat(HRA_AMT.current.value),
        lta: parseFloat(LTA_AMT.current.value),
        aoa: parseFloat(AOA_AMT.current.value),
      });
      navigate("/deduction");
    }
  };
  return (
    <>
      {/* Income */}
      <div className="container card p-4 shadow forms w-50 m-auto mt-3">
        <h2 className="mb-3" style={{ color: "#3f51b5", textAlign: "center" }}>
          Income Summary
        </h2>
        <form>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Enter your salary"
              ref={BASIC_SAL_AMT}
              autoFocus
            />
            <label htmlFor="floatingInput">Basic Salary(₹ per annum)</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="HRA"
              ref={HRA_AMT}
            />
            <label htmlFor="floatingPassword">HRA(₹ per annum)</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Leave Travel Allowance"
              ref={LTA_AMT}
            />
            <label htmlFor="floatingPassword">LTA(₹ per annum)</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Any Othe Allowance"
              ref={AOA_AMT}
            />
            <label htmlFor="floatingPassword">
              Any Other Allowance(₹ per annum)
            </label>
          </div>
          {/* alert box */}
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
            style={{ display: alert.alertBox }}
          >
            <strong> {alert.alertMsg}</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert({ alertBox: "none", alertMsg: "" })}
              aria-label="Close"
            ></button>
          </div>
          {/* alert box */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary btn--next me-md-2" type="button">
              <i className="far fa-arrow-alt-circle-left"></i> Back
            </button>
            <button
              className="btn btn-primary btn--next"
              type="button"
              onClick={handleGrossIncome}
            >
              Next <i className="far fa-arrow-alt-circle-right"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
// validation function has been exported for other component
export const checkValidation = (
  BASIC_SAL_AMT,
  HRA_AMT,
  LTA_AMT,
  AOA_AMT,
  alert,
  setAlert
) => {
  // validation checked
  if (BASIC_SAL_AMT === "" || isNaN(BASIC_SAL_AMT) || BASIC_SAL_AMT < 0) {
    setAlert({
      alertBox: "block",
      alertMsg: "First field can not be empty(has alphabet) or in negative !!!",
    });
    return false;
  } else if (HRA_AMT === "" || isNaN(HRA_AMT) || HRA_AMT < 0) {
    setAlert({
      alertBox: "block",
      alertMsg:
        "Second field can not be empty(has alphabet) or in negative !!!",
    });
    return false;
  } else if (LTA_AMT === "" || isNaN(LTA_AMT) || LTA_AMT < 0) {
    setAlert({
      alertBox: "block",
      alertMsg: "Third field can not be empty(has alphabet) or in negative !!!",
    });
    return false;
  } else if (AOA_AMT === "" || isNaN(AOA_AMT) || AOA_AMT < 0) {
    setAlert({
      alertBox: "block",
      alertMsg:
        "Fourth field can not be empty(has alphabet) or in negative !!!",
    });
    return false;
  } else {
    setAlert({ alertBox: "none", alertMsg: "" });
    return true;
  }
};
