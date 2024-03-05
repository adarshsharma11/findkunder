import { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddContact from "../modal/AddCustomer";
import InputLabel from "@mui/material/InputLabel";
import AddCompany from "../modal/AddCompany";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewCompany } from "../../../companies/store/companySlice";
import { addNewPerson } from "../../../contact-person/store/contactPersonSlice";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { contactSchema } from "../../../../../schemas/validationSchemas";
const filter = createFilterOptions();
function BasicInfoTab(props) {
  const methods = useFormContext();
  const dispatch = useDispatch();
  const contactMethods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(contactSchema),
  });
  const {
    companies,
    contacts,
    setCompanies,
    setContacts,
    categories,
    customerTypes,
  } = props;
  const { control, formState, setValue, trigger } = methods;
  const [invalidContact, setInvalidContact] = useState(false);
  const [invalidCompany, setInvalidCompany] = useState(false);
  const [companyName, setCompany] = useState(false);
  const [contactName, setContact] = useState(false);
  const { errors } = formState;

  const handleSaveCompany = (values) => {
    dispatch(addNewCompany(values)).then((addedCompany) => {
      const payload = addedCompany?.payload;
      dispatch(showMessage({ message: "Company added successfully!" }));
      setCompanies((prevCompanies) => [...prevCompanies, payload]);
      setValue("company_id", payload.id, { shouldDirty: true });
      trigger("company_id");
      setInvalidCompany(false);
    });
  };

  const handleSaveContact = (values) => {
    dispatch(addNewPerson(values)).then((addedContact) => {
      const payload = addedContact?.payload;
      dispatch(showMessage({ message: "Contact added successfully!" }));
      setContacts((prevContacts) => [...prevContacts, payload]);
      setValue("person_id", payload.id, { shouldDirty: true });
      trigger("person_id");
      setInvalidContact(false);
    });
  };

  return (
    <div className="flex justify-between w-full space-x-8">
      <div className="w-full">
        <Controller
          name="company_id"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16"
              value={companies.find((company) => company.id === value) || ""}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    setInvalidCompany(true);
                    setCompany(newValue);
                  });
                } else if (newValue && newValue.inputValue) {
                  setInvalidCompany(true);
                  setCompany(newValue.inputValue);
                } else {
                  onChange(newValue?.id);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    company_name: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={companies || []}
              getOptionLabel={(option) => {
                // e.g. value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.company_name;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li {...props}>{option.company_name}</li>
              )}
              freeSolo
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    id="company_id"
                    error={!!errors.company_id}
                    required
                    helperText={errors?.company_id?.message}
                    placeholder="Select company"
                    label="Select Company"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </>
              )}
            />
          )}
        />
        <InputLabel id="customerTypes-label">The customer can be:</InputLabel>
        <Controller
          name="customerTypes"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <div className="mt-8 mb-16">
              {customerTypes &&
                customerTypes?.map((category) => (
                  <div key={category.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedCategories = isChecked
                              ? [...value, category.id]
                              : value.filter((id) => id !== category.id);
                            onChange(updatedCategories);
                          }}
                          checked={value.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />
                  </div>
                ))}
            </div>
          )}
        />
        <InputLabel id="categories-label">I/We offer:</InputLabel>
        <Controller
          name="categories"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <div className="mt-8 mb-16">
              {categories &&
                categories?.map((category) => (
                  <div key={category.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedCategories = isChecked
                              ? [
                                  ...value,
                                  category.id,
                                  ...category.subcategories.map(
                                    (sub) => sub.id
                                  ),
                                ]
                              : value.filter(
                                  (id) =>
                                    ![
                                      ...category.subcategories.map(
                                        (sub) => sub.id
                                      ),
                                      category.id,
                                    ].includes(id)
                                );
                            onChange(updatedCategories);
                          }}
                          checked={value.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />

                    {category.subcategories && (
                      <div style={{ marginLeft: 20 }}>
                        {category.subcategories.map((sub) => (
                          <FormControlLabel
                            key={sub.id}
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const updatedCategories = isChecked
                                    ? [...value, sub.id]
                                    : value.filter((id) => id !== sub.id);
                                  onChange(updatedCategories);
                                }}
                                checked={value.includes(sub.id)}
                              />
                            }
                            label={sub.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="notes"
              multiline
              rows={8}
              error={!!errors.notes}
              helperText={errors?.notes?.message}
              label="Notes"
              type="text"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div className="w-full">
        <Controller
          name="person_id"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16"
              value={contacts.find((contact) => contact.id === value) || ""}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    setInvalidContact(true);
                    setContact(newValue);
                  });
                } else if (newValue && newValue.inputValue) {
                  setInvalidContact(true);
                  setContact(newValue.inputValue);
                } else {
                  onChange(newValue?.id);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    first_name: `Add "${params.inputValue}"`,
                    last_name: "",
                  });
                }
                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={contacts || []}
              getOptionLabel={(option) => {
                // e.g. value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return `${option.first_name} ${option.last_name}`?.trim();
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, contact) => (
                <li
                  {...props}
                >{`${contact.first_name} ${contact.last_name}`}</li>
              )}
              freeSolo
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    id="person_id"
                    error={!!errors.person_id}
                    required
                    helperText={errors?.person_id?.message}
                    placeholder="Select contact"
                    label="Select Contact"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </>
              )}
            />
          )}
        />
      </div>
      <AddCompany
        invalidCompany={invalidCompany}
        setInvalidCompany={setInvalidCompany}
        companyName={companyName}
        handleSaveCompany={handleSaveCompany}
      />
      <FormProvider {...contactMethods}>
        <AddContact
          setInvalidContact={setInvalidContact}
          invalidContact={invalidContact}
          contactName={contactName}
          handleSaveContact={handleSaveContact}
        />
      </FormProvider>
    </div>
  );
}

export default BasicInfoTab;
