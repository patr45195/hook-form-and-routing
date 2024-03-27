import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useController, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IUser {
  id: number;
  name: string;
  age: number;
  city: number;
  country: number;
}

interface ICities {
  id: number;
  city: string;
}

interface ICountries {
  id: number;
  country: string;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().int().positive(),
  city: z.number().int().positive(),
  country: z.coerce.number(),
});

type FormSchema = z.infer<typeof formSchema>;

export const fetchDefaultUserValues = async () => {
  try {
    const { data } = await axios.get<IUser>("http://localhost:4444/user/1");

    const { name, age, city, country } = data;

    return {
      name,
      age,
      city,
      country,
    };
  } catch (error) {
    console.log("Error fetching default user values", error);
    return {
      name: "",
      age: 0,
      city: 0,
      country: 0,
    };
  }
};

export const fetchAdditionalValues = async () => {
  try {
    const citiesPromise = axios.get<ICities[]>("http://localhost:4444/cities");
    const countriesPromise = axios.get<ICountries[]>(
      "http://localhost:4444/countries"
    );

    const [citiesResponse, countriesResponse] = await Promise.all([
      citiesPromise,
      countriesPromise,
    ]);

    const cities = citiesResponse.data;
    const countries = countriesResponse.data;

    return { cities, countries };
  } catch (error) {
    console.log(error);
    return { cities: [], countries: [] };
  }
};

export const MyForm = () => {
  const [cities, setCities] = useState<ICities[] | undefined>();
  const [countries, setCountries] = useState<ICountries[] | undefined>();

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchAdditionalValues();

        setCities(response?.cities);
        setCountries(response?.countries);
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormSchema>({
    defaultValues: async () => await fetchDefaultUserValues(),
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  const nameProps = useController({
    name: "name",
    control,
  });
  const ageProps = useController({
    name: "age",
    control,
  });

  const cityProps = useController({
    name: "city",
    control,
  });

  const countryProps = useController({
    name: "country",
    control,
  });

  if (!cities || !countries) return <div>Loading...</div>;

  return (
    <Box sx={{ width: "223px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel id="name">Name</InputLabel>
        <TextField
          {...nameProps.field}
          value={nameProps.field.value ?? ""}
          id="name"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />

        <InputLabel id="age">Age</InputLabel>
        <TextField
          {...ageProps.field}
          value={ageProps.field.value ?? ""}
          id="age"
          onChange={(e) =>
            ageProps.field.onChange(parseInt(e.target.value, 10) || 0)
          }
        />

        <InputLabel id="city">City</InputLabel>
        <Autocomplete
          id="city"
          options={cities ?? []}
          getOptionLabel={(option) => option.city}
          value={
            cities?.find((city) => city.id === cityProps.field.value) || null
          }
          onChange={(event, value) =>
            cityProps.field.onChange(value?.id ?? null)
          }
          renderInput={(params) => <TextField {...params} />}
        />

        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="country"
          id="country"
          value={countryProps.field.value || countries[0].id}
          onChange={(e) => countryProps.field.onChange(e.target.value)}
        >
          {countries?.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>

        <Button type="submit" variant="contained" disabled={!isDirty}>
          Submit
        </Button>
      </form>
    </Box>
  );
};
