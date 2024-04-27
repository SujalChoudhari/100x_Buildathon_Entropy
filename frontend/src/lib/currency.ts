import numeral from "numeral";

export const format = (amount: number, opt = "0a") => {
  return numeral(amount).format(opt).toUpperCase();
};
