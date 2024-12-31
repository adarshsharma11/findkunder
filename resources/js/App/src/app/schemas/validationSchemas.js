import * as yup from "yup";

/**
 * Form Validation Schema
 */

export const updateAccountProfileSchema = yup.object().shape({
  role: yup.string()
    .required("Role is required")
    .oneOf(["admin", "user"], "Invalid role selection"),
  first_name: yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  last_name: yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  telephone: yup
  .string()
  .required("You must enter a phone")
  .matches(/^\d{8}$/, "Phone number must be exactly 8 digits"),
  company: yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  cvr: yup.string()
    .required("Company CVR is required")
    .matches(/^\d+$/, "CVR must contain only numbers")
    .min(8, "CVR must be at least 8 digits")
    .max(10, "CVR must be less than 10 digits"),
});

export const companySchema = yup.object().shape({
  company_name: yup
    .string()
    .required("You must enter a company name")
    .min(2, "The company name must be at least 2 characters"),
  cvr: yup
    .string()
    .required("You must enter a CVR")
    .max(20, "CVR must not exceed 20 characters"),
  description: yup.string().optional(),
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

export const locationSchema = yup.object().shape({
  company_id: yup.string().required('You must select company'),
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
});

export const contactSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("You must enter a first name")
    .max(255, "First name must not exceed 255 characters"),
  location_id: yup.string().required('You must select location'),
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
    .matches(/^\d{8}$/, "Phone number must be exactly 8 digits"),
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

const subcategorySchema = yup.object().shape({
  id: yup.mixed().nullable(),
  name: yup.string().required('Subcategory name is required'),
  parent_id: yup.number().nullable()
})

export const createCaterorySchema = yup.object().shape({
  name: yup.string().required("You must enter display name"),
  question: yup.string().nullable(),
  subcategories: yup.array().of(subcategorySchema).optional().default([]),
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
  person_id: yup
    .string()
    .required("You must enter a contact person")
    .max(255, "Last name must not exceed 255 characters"),
  notes: yup.string().trim().default(""),
});

export const adminProfileSchema = yup.object().shape({
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

export const inquiryContactSchema = yup.object().shape({
  contact_name: yup
    .string()
    .required("You must enter a company")
    .max(255, "First name must not exceed 255 characters"),
  contact_email: yup
    .string()
    .required("You must enter a contact person email")
    .email('Please enter a valid email address'),
  contact_phone: yup
    .string()
    .required("You must enter a phone")
    .matches(/^\d{8}$/, "Phone number must be exactly 8 digits"),
});

export const inquiryCompanySchema = yup.object().shape({
  company_ame: yup
    .string()
    .optional()
    .max(255, 'Company name must not exceed 255 characters'),
  cvr_number: yup
    .string()
    .optional()
    .matches(/^\d+$/, 'CVR number must contain only digits'),
  street: yup.string().optional(),
  postal_code: yup
    .string()
    .optional()
    .matches(/^\d+$/, 'Postal code must contain only digits'),
  city: yup.string().optional(),
  location_id: yup.string().required('You must select your location'),
  website: yup.string().nullable(),
  customer_type_id: yup.string().optional(),
  company_description: yup.string().optional(),
});

export const leadUpdateSchema = yup.object().shape({
  contact_name: yup.string().required("You must enter a company").max(255, "First name must not exceed 255 characters"),
  contact_email: yup.string().required("You must enter a contact person email").email('Please enter a valid email address'),
  contact_phone: yup.string().required("You must enter a phone").matches(/^\d{8}$/, "Phone number must be exactly 8 digits"),
  company_name: yup.string().optional().max(255, 'Company name must not exceed 255 characters'),
  cvr_number: yup.string().optional().matches(/^\d+$/, 'CVR number must contain only digits'),
  street: yup.string().optional(),
  postal_code: yup.string().optional().matches(/^\d+$/, 'Postal code must contain only digits'),
  city: yup.string().optional(),
  location_id: yup.string().required('You must select your location'),
  website: yup
  .string()
  .nullable()
  .matches(/\.com$/, 'Website must end with .com'),
  customer_type_id: yup.string().optional(),
  company_description: yup.string().optional().trim().default(""),
  who_do_you_need: yup.string().optional(),
  specific_preferences: yup.string().optional(),
  physical_attendance_required: yup.string().optional(),
  physical_attendance_details: yup.string().when('physical_attendance_required', {
    is: 'Yes',
    then: yup.string().required('Please elaborate on your need regarding physical attendance'),
    otherwise: yup.string(),
  }),
  do_not_contact: yup.string().optional(),
  //attachments_per_year: yup.number().typeError('Attachments per year must be a number').min(0, 'Attachments per year must be at least 0').optional(),
  //employees_count: yup.number().typeError('Employees count must be a number').min(0, 'Employees count must be at least 0').optional(),
});


export const additionalInfoSchema = yup.object().shape({
  who_do_you_need: yup.string().optional(),
  specific_preferences: yup.string().optional(),
  physical_attendance_required: yup.string().optional(),
  physical_attendance_details: yup
    .string()
    .when('physical_attendance_required', {
      is: 'Yes',
      then: yup.string().required('Please elaborate on your need regarding physical attendance'),
      otherwise: yup.string(),
    }),
  do_not_contact: yup.string(),
});

export const assignPersonSchema = yup.object().shape({
  assigned_customers: yup.array().of(yup.number().required()).optional(),
});

export const composeEmailSchema = yup.object().shape({
  subject: yup.string()
    .required('Subject is required')
    .max(255, 'Subject cannot be longer than 255 characters'),
  body: yup.string()
    .required('Body is required')
    .min(10, 'Body must be at least 10 characters long'),
});