import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";
import ContactImageTab from "./ContactImageTab";

function BasicInfoTab(props) {
  const { isAdmin, product, isAddProfile } = props;
  const methods = useFormContext();
  const { t } = useTranslation("contactPerson");
  const { control, formState } = methods;
  const { errors } = formState;
  const linkedInFieldName = isAddProfile ? "contactLinkedin" : "linkedin";
  const titleOptions = [
    {
      value: "approved_auditor",
      label: t("approved_auditor"),
    },
    {
      value: "bookkeeper",
      label: t("bookkeeper"),
    },
    {
      value: "other",
      label: t("other"),
    },
  ];

  return (
    <div>
       {isAdmin && product?.user && (
        <Controller
          name="user_email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="user_email"
              label="User"
              InputProps={{
                readOnly: true,
              }}
              value={product.user?.email || ''}
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.title}
              required
              displayEmpty
              helperText={errors?.title?.message}
              id="title"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Title
              </MenuItem>
              {titleOptions &&
                titleOptions?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.first_name}
            required
            helperText={errors?.first_name?.message}
            label="First Name"
            autoFocus
            id="first_name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="last_name"
            error={!!errors.last_name}
            helperText={errors?.last_name?.message}
            label="Last Name"
            type="text"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            label="Email"
            type="text"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="phone"
            error={!!errors.phone}
            helperText={errors?.phone?.message}
            label="Phone"
            required
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <ContactImageTab isAddProfile={isAddProfile}/>
      <Controller
        name={linkedInFieldName}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id={linkedInFieldName}
            error={!isAddProfile ? !!errors.linkedin : !!errors.contactLinkedin}
            helperText={!isAddProfile ? errors?.linkedin?.message : errors?.contactLinkedin?.message}
            label="Linkedin"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />    
    </div>
  );
}

export default BasicInfoTab;
