import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputLabel, TextField } from "@mui/material";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
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
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  const firstNameProps = useController({
    name: "firstName",
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

      <Button type="submit">Submit</Button>
    </form>
  );
};
