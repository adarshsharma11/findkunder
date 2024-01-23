import { useState } from "react";
import TextField from "@mui/material/TextField";
import AddContact from "../modal/AddCustomer";
import AddCompany from "../modal/AddCompany";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewCompany } from "../../../companies/store/companySlice";
import { addNewPerson } from "../../../contact-person/store/contactPersonSlice";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import {
  companySchema,
  contactSchema,
} from "../../../../../schemas/validationSchemas";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const dispatch = useDispatch();
  const companyMethods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(companySchema),
  });
  const contactMethods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(contactSchema),
  });
  const { companies, contacts, setCompanies, setContacts } = props;
  const { control, formState, setValue, trigger } = methods;
  const [invalidContact, setInvalidContact] = useState(false);
  const [invalidCompany, setInvalidCompany] = useState(false);
  const [companyName, setCompany] = useState(false);
  const [contactName, setContact] = useState(false);
  const { errors } = formState;

  const handleAutocompleteChange = (event, newValue) => {
    // Check if the entered value is not present in the available contacts
    const isValid = contacts.some((contact) => contact.id === newValue?.id);
    if (isValid) {
      setInvalidContact(false);
    } else {
      setContact(newValue);
      setInvalidContact(true);
    }
    // Set the value in the form state
    setValue("person_id", newValue?.id || newValue, { shouldDirty: true });
    trigger("person_id");
  };

  const handleCompanyAutocompleteChange = (event, newValue) => {
    // Check if the entered value is not present in the available contacts
    const isValid = companies.some((company) => company.id === newValue?.id);
    if (isValid) {
      setInvalidCompany(false);
    } else {
      setCompany(newValue);
      setInvalidCompany(true);
    }
    // Set the value in the form state
    setValue("company_id", newValue?.id || newValue, { shouldDirty: true });
    trigger("company_id");
  };

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
              freeSolo
              options={companies || []}
              getOptionLabel={(option) =>
                option ? `${option.company_name}` : ""
              }
              value={companies.find((company) => company.id === value) || ""}
              onChange={handleCompanyAutocompleteChange}
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
              freeSolo
              options={contacts || []}
              getOptionLabel={(contact) =>
                contact ? `${contact.first_name} ${contact.last_name}` : ""
              }
              value={contacts.find((contact) => contact.id === value) || ""}
              onChange={handleAutocompleteChange}
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
      <FormProvider {...companyMethods}>
        <AddCompany
          invalidCompany={invalidCompany}
          setInvalidCompany={setInvalidCompany}
          companyName={companyName}
          handleSaveCompany={handleSaveCompany}
        />
      </FormProvider>
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
