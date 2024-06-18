import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddContact from "../modal/AddCustomer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
import FormControl from '@mui/material/FormControl';
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
    isAdmin,
    customerLocations,
    product,
  } = props;
  const { control, formState, setValue, trigger } = methods;
  const [invalidContact, setInvalidContact] = useState(false);
  const [invalidCompany, setInvalidCompany] = useState(false);
  const [companyName, setCompany] = useState(false);
  const [contactName, setContact] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCustomerTypes, setSelectedCutomerTypes] = useState([]);
  const { errors } = formState;


  useEffect(() => {
    if (product && product?.customer_locations?.length > 0) {
      const locationIds = product.customer_locations.map(location => location.id);
      setSelectedLocations(locationIds);
      //setValue("customer_locations", locationIds);
    } else {
      setSelectedLocations([]);
    }
  }, [product]);

  useEffect(() => {
    if (product && product?.customer_types?.length > 0) {
      const typeIds = product.customer_types.map(type => type.id);
      setSelectedCutomerTypes(typeIds);
      //setValue("customer_types", typeIds);
    } else {
      setSelectedCutomerTypes([]);
    }
  }, [product]);

  useEffect(() => {
    if (product && product?.categories?.length > 0) {
      const categoryIds = product.categories.map(category => category.id);
      setSelectedCategories(categoryIds);
      //setValue("categories", categoryIds);
    } else {
      setSelectedCategories([]);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.notes !== undefined) {
      setValue("notes", product.notes || "", { shouldDirty: true });
    }
  }, [product, setValue]);

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
    <div className="flex flex-col">
    <div className="flex justify-between w-full space-x-8">
       {isAdmin && product?.user && (
        <div className="w-full">
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
       </div>
      )}
      <div className="w-full">
        <Controller
          name="company_id"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16"
              value={companies.find((company) => company.id === value)}
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
                    placeholder="Select location"
                    label="Select Location"
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
      <div className="w-full">
      {isAdmin &&
         <>
         <Controller
           name="status"
           control={control}
           defaultValue="0"
           render={({ field }) => (
            <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
             <Select
               {...field}
               labelId="status-label"
               id="status"
               className="mt-8 mb-16"
               error={!!errors.status}
               helperText={errors?.status?.message}
               required
               displayEmpty
               variant="outlined"
               fullWidth
             >
               <MenuItem value="" disabled>Select Status</MenuItem>
               <MenuItem value="3">High Priority</MenuItem>
               <MenuItem value="2">Medium Priority</MenuItem>
               <MenuItem value="1">Low Priority</MenuItem>
               <MenuItem value="0">No Priority</MenuItem>
             </Select>
             </FormControl>
           )}
         />
         </>
        }
      </div>
    </div>
    <div className="flex justify-between w-full space-x-8">
      <div className="w-full">
        <InputLabel id="customerTypes-label">The customer can be:</InputLabel>
        <Controller
          name="customer_types"
          control={control}
          defaultValue={[]}
          //value={selectedCustomerTypes}
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
                            const updatedCategories = isChecked && !selectedCustomerTypes.includes(category.id)
                              ? [...selectedCustomerTypes, category.id]
                              : selectedCustomerTypes.filter((id) => id !== category.id);
                              setSelectedCutomerTypes(updatedCategories);
                            onChange(updatedCategories);
                          }}
                          checked={selectedCustomerTypes.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />
                  </div>
                ))}
            </div>
          )}
        />
        </div>
        <div className="w-full">
        <InputLabel id="customerTypes-label">The customer must be located in:</InputLabel>
        <Controller
          name="customer_locations"
          control={control}
          defaultValue={[]}
          //value={selectedLocations}
          render={({ field: { onChange, value } }) => (
            <div className="mt-8 mb-16">
              {customerLocations &&
                customerLocations?.map((category) => (
                  <div key={category.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const locationId = category.id;
                          let updatedLocations;
                          if (isChecked && !selectedLocations.includes(category.id)) {
                            updatedLocations = [...selectedLocations, category.id];
                          } else {
                            updatedLocations = selectedLocations.filter((id) => id !== locationId);
                          }
                          setSelectedLocations(updatedLocations);
                          onChange(updatedLocations);
                          //trigger("customerLocations");
                        }}
                        checked={selectedLocations.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />
                  </div>
                ))}
            </div>
          )}
        />
        </div>
        <div className="w-full">
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
                          const updatedCategories = isChecked  && !selectedCategories.includes(category.id)
                            ? [...selectedCategories, category.id]
                            : selectedCategories.filter(
                                (id) => id !== category.id
                              );
                          setSelectedCategories(updatedCategories);
                          onChange(updatedCategories);
                        }}
                        checked={selectedCategories.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />
                    {category.subcategories && selectedCategories.includes(category.id) && (
                      <div style={{ marginLeft: 20 }}>
                        {category.subcategories.map((sub) => (
                          <FormControlLabel
                            key={sub.id}
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const updatedCategories = isChecked && !selectedCategories.includes(sub.id)
                                    ? [...selectedCategories, sub.id]
                                    : selectedCategories.filter((id) => id !== sub.id);
                                  setSelectedCategories(updatedCategories);
                                  onChange(updatedCategories);
                                }}
                                checked={selectedCategories.includes(sub.id)}
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
        </div>
      </div>
      <div className="max-w-3xl">
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
              label="Internal Notes"
              type="text"
              variant="outlined"
              fullWidth
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
