import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputLabel, TextField } from "@mui/material";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { z } from "zod";

export const removeUnnecessary = (str: string) => {
  if (!str || str.length <= 2) {
    return "";
  }

  return str.substring(1, str.length - 1);
};

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  json: z.string().refine((jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }, "Invalid JSON format"),
});

type FormSchema = z.infer<typeof formSchema>;

export const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      firstName: "Alex",
      json: JSON.stringify({ id: 1, name: "John", age: 30 }),
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log({
      firstName: data.firstName,
      json: JSON.parse(data.json),
    });
    // console.log(data);
  };

  const firstNameProps = useController({
    name: "firstName",
    control,
  });
  const jsonProps = useController({
    name: "json",
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel id="firstName">First Name</InputLabel>
      <TextField
        {...firstNameProps.field}
        value={firstNameProps.field.value ?? ""}
        id="firstName"
      />

      <InputLabel id="json">JSON Data</InputLabel>
      <TextField
        {...jsonProps.field}
        id="json"
        type="text"
        error={!!errors.json}
        helperText={errors.json ? errors.json.message : ""}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
