//function to calculate tax as per old regime
export const calculateOldTaxRegime = (taxableAmountSalary) => {
  let OldtaxAmt = 0;
  if (taxableAmountSalary <= 250000) {
    OldtaxAmt = 0;
  } else if (taxableAmountSalary > 250000 && taxableAmountSalary <= 500000) {
    OldtaxAmt = 0.05 * (taxableAmountSalary - 250000);
  } else if (taxableAmountSalary > 500000 && taxableAmountSalary <= 1000000) {
    OldtaxAmt = 0.2 * (taxableAmountSalary - 500000) + 12500;
  } else if (taxableAmountSalary > 1000000) {
    OldtaxAmt = 0.3 * (taxableAmountSalary - 1000000) + 112500;
  }
  return OldtaxAmt;
};
// function to calutate tax as per new regime
export const calculateNewTaxRegime = (taxableAmountSalary) => {
  let taxAmt = 0;
  if (taxableAmountSalary <= 250000) {
    taxAmt = 0;
  } else if (taxableAmountSalary > 250000 && taxableAmountSalary <= 500000) {
    taxAmt = 0.05 * (taxableAmountSalary - 250000);
  } else if (taxableAmountSalary > 500000 && taxableAmountSalary <= 750000) {
    taxAmt = 12500 + 0.1 * (taxableAmountSalary - 500000);
  } else if (taxableAmountSalary > 750000 && taxableAmountSalary <= 1000000) {
    taxAmt = 37500 + 0.15 * (taxableAmountSalary - 750000);
  } else if (taxableAmountSalary > 1000000 && taxableAmountSalary <= 1250000) {
    taxAmt = 75000 + 0.2 * (taxableAmountSalary - 1000000);
  } else if (taxableAmountSalary > 1250000 && taxableAmountSalary <= 1500000) {
    taxAmt = 125000 + 0.25 * (taxableAmountSalary - 1250000);
  } else if (taxableAmountSalary > 1500000) {
    taxAmt = 187500 + 0.3 * (taxableAmountSalary - 1500000);
  }
  return taxAmt;
};
