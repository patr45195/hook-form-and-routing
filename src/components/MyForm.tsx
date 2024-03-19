import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";

interface IFormData {
  name: string;
  age: number;
  city: number;
  country: number;
}

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
    formState: { isDirty },
  } = useForm<IFormData>({
    defaultValues: async () => await fetchDefaultUserValues(),
  });

  const onSubmit = (data: IFormData) => console.log(data);

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

  if (!cities) return <div>Loading...</div>;

  return (
    <Box sx={{ width: "223px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel id="name">Name</InputLabel>
        <TextField
          {...nameProps.field}
          value={nameProps.field.value ?? ""}
          id="name"
        />

        <InputLabel id="age">Age</InputLabel>
        <TextField
          {...ageProps.field}
          value={ageProps.field.value ?? ""}
          id="age"
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
        <Autocomplete
          id="country"
          options={countries ?? []}
          getOptionLabel={(option) => option.country}
          value={
            countries?.find(
              (country) => country.id === countryProps.field.value
            ) || null
          }
          onChange={(event, value) =>
            countryProps.field.onChange(value?.id ?? null)
          }
          renderInput={(params) => <TextField {...params} />}
        />

        <Button type="submit" variant="contained" disabled={!isDirty}>
          Submit
        </Button>
      </form>
    </Box>
  );
};
