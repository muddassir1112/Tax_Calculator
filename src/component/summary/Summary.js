import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaxContext } from "../../App";

export const Summary = () => {
  const data = useContext(TaxContext);
  const navigate = useNavigate();
  // reset function
  const handleReset = () => {
    navigate("/");
    data.setIncome({
      grossIncome: "",
      basicSalary: "",
      hra: "",
      lta: "",
      aoa: "",
    });
    data.setDeduction({
      totalDeductionAmt: "",
      standardDeduction: 50000,
      c80c: "",
      d80d: "",
      t80tta: "",
      trp: "",
      hraExemption: "",
    });
  };
  return (
    // To display the data in the table
    <div className="container card shadow w-75 m-auto mt-3">
      {data.OldTaxAmt === "" && data.newTaxAmt === "" ? (
        <div className="card mt-2 mb-2">
          <div className="card-header">
            <h2 style={{ textAlign: "center" }}>Cleartax</h2>
          </div>
          <div className="card-body">
            <h5 className="card-title">No tax Calculated</h5>
            <p className="card-text">
              Please enter all the details to get your tax calculated.
            </p>
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      ) : (
        <table
          className="table table-striped table-hover mt-3"
          style={{
            borderCollapse: "collapse",
            backgroundImage:
              "linear-gradient(to bottom, #5ee7df 0%, #b490ca 100%)",
          }}
        >
          <tbody>
            <tr>
              <th>
                <h3>Nature</h3>
              </th>
              <th>
                <h3>Amount</h3>
              </th>
            </tr>
            <tr>
              <th>Income From Salary</th>
              <td>₹{data.income.basicSalary}</td>
            </tr>
            <tr>
              <th>Income From Other Sources</th>
              <td>
                ₹
                {data.income.aoa +
                  data.income.hra +
                  data.income.lta}
              </td>
            </tr>
            <tr>
              <th>Gross Total Income</th>
              <th>₹{data.income.grossIncome}</th>
            </tr>
            <tr>
              <th colSpan={3}>Deductions</th>
            </tr>
            <tr>
              <td>Standard Dedcution</td>
              <td>₹50000</td>
            </tr>
            <tr>
              <td>80C</td>
              <td>₹{data.deduction.c80c}</td>
            </tr>
            <tr>
              <td>80D</td>
              <td>₹{data.deduction.d80d}</td>
            </tr>
            <tr>
              <td>80TTA</td>
              <td>₹{data.deduction.t80tta}</td>
            </tr>
            <tr>
              <th>Total Deduction Amount</th>
              <th>₹{data.deduction.totalDeductionAmt}</th>
            </tr>
            <tr>
              <th>Gross Taxable Income</th>
              <th>₹{data.taxableAmtSal}</th>
            </tr>
            <tr>
              <th>Total tax on above(including cess as per old regime)</th>
              <th>₹{data.OldTaxAmt}</th>
            </tr>
            <tr>
              <th>Total tax on above(including cess as per new regime)</th>
              <th>₹{data.newTaxAmt}</th>
            </tr>
            <tr>
              <th colSpan={3}>
                <button
                  className="btn btn-primary btn--next float-end"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
