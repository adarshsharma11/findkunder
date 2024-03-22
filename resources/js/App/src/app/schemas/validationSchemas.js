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

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted."),
});

export const updateProfileSchema = yup.object().shape({
  name: yup.string().required("You must enter display name"),
});

export const createCustomerTypeSchema = yup.object().shape({
  name: yup.string().required("You must enter display name"),
});

export const createUserAccountSchema = yup.object().shape({
  email: yup.string().required("You must enter display name")
  .email('Please enter a valid email address'),
});

export const createCaterorySchema = yup.object().shape({
  name: yup.string().required("You must enter display name"),
  parent_id: yup.string().nullable(),
});

export const updateProfilePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Please enter your old password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .required("Please enter confirm password.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const profileSchema = yup.object().shape({
  company_id: yup
    .string()
    .required("You must enter a company")
    .max(255, "First name must not exceed 255 characters"),
  person_id: yup
    .string()
    .required("You must enter a contact person")
    .max(255, "Last name must not exceed 255 characters"),
  notes: yup.string().trim().default(""),
});

export const adminProfileSchema = yup.object().shape({
  company_id: yup
    .string()
    .required("You must enter a company")
    .max(255, "Company name must not exceed 255 characters"),
  person_id: yup
    .string()
    .required("You must enter a contact person")
    .max(255, "Contact person name must not exceed 255 characters"),
  notes: yup.string().trim().default(""),
  status: yup
    .mixed()
    .oneOf(['0', '1', '2', '3'], "Invalid status value")
    .required("You must select a status"),
});