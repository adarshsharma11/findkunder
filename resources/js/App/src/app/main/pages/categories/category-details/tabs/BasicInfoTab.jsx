import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import CategoryEditModal from "../modal/CategotyEditModal";
import { Controller, useFormContext } from "react-hook-form";

const EditButton = styled(Button)({
  border: 'none',
});

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { categoryId, product } = props;
  const { control, formState, setValue } = methods;
  const { errors } = formState;
  const [subcategories, setSubcategories] = React.useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);


  React.useEffect(() => {
    if (product && product.subcategories) {
      setSubcategories(
        product.subcategories
      );
    }
  }, [product]);


  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  }
  
  const onEditCategories = (editedSubcategories) => {
     setSubcategories(editedSubcategories);
     setValue("subcategories", editedSubcategories,  {
      shouldDirty: categoryId !== "new",
      shouldValidate: categoryId !== "new",
    });
  }
  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="question"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.question}
            helperText={errors?.question?.message}
            label="Question"
            autoFocus
            id="question"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
          name="subcategories"
          control={control}
          render={({ field }) => (
            <div>
            <div className="flex items-center">
              <InputLabel id="demo-checkbox-label">Subskills</InputLabel>
              <EditButton
                  className="whitespace-nowrap mx-4"
                  variant="outlined"
                  onClick={toggleEditModal}
                 >
                  <FuseSvgIcon className="hidden sm:flex">
                      heroicons-outline:pencil-alt
                    </FuseSvgIcon>
                 </EditButton>
                 {isEditModalOpen && 
                  <CategoryEditModal
                    isOpen={isEditModalOpen}
                    onClose={toggleEditModal}
                    categories={subcategories}
                    onEditCategories={onEditCategories}
                    categoryId={categoryId}
                  />
                 }
                 
        </div>
        {subcategories?.length > 0 &&
        subcategories.map((subcategory) => (
          <div key={subcategory.id} className="flex items-center">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    const checked = e.target.checked;
                    let updatedSubcategories;
                    if (checked) {
                      updatedSubcategories = [...subcategories, subcategory];
                    } else {
                      updatedSubcategories = subcategories.filter(
                        (s) => s.id !== subcategory.id
                      );
                    }
                    setSubcategories(updatedSubcategories);
                    field.onChange(updatedSubcategories);
                  }}
                  checked={subcategories.some((s) => s.id === subcategory.id)}
                  disabled={true}
                />
              }
              label={subcategory.name}
            />
          </div>
        ))}
        </div>
        )}
        />
    </div>
  );
}

export default BasicInfoTab;
