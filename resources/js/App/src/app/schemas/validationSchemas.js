import * as yup from "yup";

/**
 * Form Validation Schema
 */
export const companySchema = yup.object().shape({
  company_name: yup
    .string()
    .required("You must enter a company name")
    .min(5, "The company name must be at least 5 characters"),
  cvr: yup
    .string()
    .required("You must enter a CVR")
    .max(20, "CVR must not exceed 20 characters"),
  street: yup
    .string()
    .required("You must enter a street")
    .max(255, "Street must not exceed 255 characters"),
  postal_code: yup
    .string()
    .required("You must enter a postal code")
    .max(20, "Postal code must not exceed 20 characters"),
  city: yup
    .string()
    .required("You must enter a city")
    .max(255, "City must not exceed 255 characters"),
  location: yup
    .string()
    .required("You must enter a location")
    .max(255, "Location must not exceed 255 characters"),
  website: yup.string().nullable(),
  linkedin: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      "Invalid LinkedIn URL. Please enter a valid LinkedIn URL"
    ),
  facebook: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(
      /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
      "Invalid Facebook URL. Please enter a valid Facebook URL"
    ),
});

export const contactSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("You must enter a first name")
    .max(255, "First name must not exceed 255 characters"),
  title: yup
    .string()
    .required("You must enter a title")
    .max(255, "First name must not exceed 255 characters"),
  last_name: yup
    .string()
    .required("You must enter a last name")
    .max(255, "Last name must not exceed 255 characters"),
  email: yup
    .string()
    .required("You must enter a email")
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters"),
  phone: yup
    .string()
    .required("You must enter a phone")
    .max(20, "Phone must not exceed 20 characters"),
  comment: yup
    .string()
    .nullable()
    .max(255, "Comment must not exceed 255 characters"),
  linkedin: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      "Invalid LinkedIn URL. Please enter a valid LinkedIn URL"
    ),
});