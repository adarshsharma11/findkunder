export const validateNumberInput = (value) => {
  const regex = /^\d{2,}$/; // At least two digits
  return regex.test(value) || "Must be a valid number and at least two digits long";
};