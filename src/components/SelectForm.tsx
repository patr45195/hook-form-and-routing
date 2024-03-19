import { Select as MuiSelect } from "@mui/material";
import { useForm, useController } from "react-hook-form";
import { Input } from "@mui/material";

export const SelectForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      select: "",
    },
  });

  const { field: firstNameField } = useController({
    name: "firstName",
    control,
  });

  const { field: selectField } = useController({
    name: "select",
    control,
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...firstNameField} />
      <MuiSelect {...selectField} defaultValue="chocolate">
        <option value="chocolate">Chocolate</option>
        <option value="strawberry">Strawberry</option>
        <option value="vanilla">Vanilla</option>
      </MuiSelect>
      <input type="submit" />
    </form>
  );
};
